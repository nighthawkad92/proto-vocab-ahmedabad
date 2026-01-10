import { supabase } from './supabase'
import type { Badge, StudentStats } from './types'

// Badge criteria evaluation functions
const BADGE_CRITERIA: Record<string, (stats: StudentStats, additionalData?: any) => boolean> = {
  'first-steps': (stats) => stats.total_lessons_completed >= 1,
  'week-warrior': (stats) => stats.current_streak_days >= 7,
  'perfect-practice': (stats, data) => data?.hasPerfectAttempt === true,
  'bookworm': (stats) => stats.total_lessons_completed >= 5,
  'century': (stats) => stats.total_questions_correct >= 100,
  'dedicated-learner': (stats) => stats.current_streak_days >= 30,
  'master-student': (stats, data) => stats.total_lessons_completed >= (data?.totalLessons || 5),
  'quick-learner': (stats, data) => data?.hasQuickCompletion === true,
}

/**
 * Calculate student statistics from attempts table
 */
export async function calculateStudentStats(studentId: string): Promise<StudentStats> {
  // @ts-ignore - Supabase types are strict when env vars aren't set
  const { data: attempts, error } = await supabase
    .from('attempts')
    .select('questions_attempted, questions_correct, levels_completed, completed_at, is_abandoned')
    .eq('student_id', studentId)

  if (error) throw error

  const completedAttempts = attempts?.filter((a: any) => a.completed_at && !a.is_abandoned) || []

  const stats = {
    student_id: studentId,
    total_questions_answered: attempts?.reduce((sum: number, a: any) => sum + (a.questions_attempted || 0), 0) || 0,
    total_questions_correct: attempts?.reduce((sum: number, a: any) => sum + (a.questions_correct || 0), 0) || 0,
    total_lessons_completed: completedAttempts.length,
    total_levels_completed: attempts?.reduce((sum: number, a: any) => sum + (a.levels_completed || 0), 0) || 0,
    current_streak_days: 0, // TODO: Implement streak tracking
    longest_streak_days: 0,
    last_practice_date: null,
  }

  return stats as StudentStats
}

/**
 * Update or create student stats in database
 */
export async function updateStudentStats(studentId: string): Promise<void> {
  const stats = await calculateStudentStats(studentId)

  // @ts-ignore - Supabase types are strict when env vars aren't set
  const { error } = await supabase
    .from('student_stats')
    // @ts-ignore
    .upsert({
      student_id: studentId,
      ...stats,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'student_id'
    })

  if (error) throw error
}

/**
 * Get additional data needed for badge evaluation
 */
async function getAdditionalBadgeData(studentId: string) {
  // Check for perfect attempts (100% accuracy)
  // @ts-ignore
  const { data: perfectAttempts } = await supabase
    .from('attempts')
    .select('questions_attempted, questions_correct')
    .eq('student_id', studentId)
    .eq('is_abandoned', false)

  const hasPerfectAttempt = perfectAttempts?.some((a: any) =>
    a.questions_attempted > 0 && a.questions_attempted === a.questions_correct
  )

  // Check for quick completions (< 10 minutes = 600 seconds)
  // @ts-ignore
  const { data: quickAttempts } = await supabase
    .from('attempts')
    .select('duration_seconds')
    .eq('student_id', studentId)
    .lt('duration_seconds', 600)
    .not('duration_seconds', 'is', null)

  const hasQuickCompletion = (quickAttempts?.length || 0) > 0

  // Get total lesson count for student's grade
  // @ts-ignore
  const { data: student } = await supabase
    .from('students')
    .select('class_id, classes(grade)')
    .eq('id', studentId)
    .single()

  // @ts-ignore
  const grade = student?.classes?.grade || 4

  // @ts-ignore
  const { count: totalLessons } = await supabase
    .from('lessons')
    .select('*', { count: 'exact', head: true })
    .eq('grade', grade)

  return {
    hasPerfectAttempt,
    hasQuickCompletion,
    totalLessons: totalLessons || 5,
  }
}

/**
 * Evaluate badge criteria and return newly earned badges
 */
export async function evaluateBadgeCriteria(
  studentId: string
): Promise<Badge[]> {
  // Get current stats
  // @ts-ignore
  const { data: statsData } = await supabase
    .from('student_stats')
    .select('*')
    .eq('student_id', studentId)
    .single()

  const stats = statsData as StudentStats

  if (!stats) {
    // No stats yet, return empty array
    return []
  }

  // Get already earned badges
  // @ts-ignore
  const { data: earnedBadges } = await supabase
    .from('student_badges')
    .select('badge_id')
    .eq('student_id', studentId)

  const earnedBadgeIds = new Set(earnedBadges?.map((b: any) => b.badge_id) || [])

  // Get all badge definitions
  // @ts-ignore
  const { data: allBadges } = await supabase
    .from('badges')
    .select('*')

  // Check additional criteria
  const additionalData = await getAdditionalBadgeData(studentId)

  // Find newly earned badges
  const newBadges: Badge[] = []
  // @ts-ignore
  for (const badge of allBadges || []) {
    // @ts-ignore
    if (earnedBadgeIds.has(badge.id)) continue // Already earned

    // @ts-ignore
    const badgeKey = badge.name.toLowerCase().replace(/ /g, '-')
    const checkFn = BADGE_CRITERIA[badgeKey]

    if (checkFn && checkFn(stats, additionalData)) {
      const newBadge = {
        // @ts-ignore
        ...badge,
        imageUrl: `/badges/${badgeKey}.png`
      } as Badge
      newBadges.push(newBadge)
    }
  }

  return newBadges
}

/**
 * Award badges to student (idempotent)
 */
export async function awardBadges(studentId: string, badges: Badge[]): Promise<void> {
  const now = new Date().toISOString()

  for (const badge of badges) {
    // Check if already awarded (idempotency)
    // @ts-ignore
    const { data: existing } = await supabase
      .from('student_badges')
      .select('id')
      .eq('student_id', studentId)
      .eq('badge_id', badge.id)
      .single()

    if (existing) continue // Already awarded

    // Award badge
    // @ts-ignore
    await supabase
      .from('student_badges')
      // @ts-ignore
      .insert({
        student_id: studentId,
        badge_id: badge.id,
        earned_at: now,
      })
  }
}

/**
 * Get all badges earned by a student
 */
export async function getStudentBadges(studentId: string): Promise<Badge[]> {
  // @ts-ignore
  const { data, error } = await supabase
    .from('student_badges')
    .select(`
      earned_at,
      badges (
        id,
        name,
        description,
        icon,
        criteria
      )
    `)
    .eq('student_id', studentId)
    .order('earned_at', { ascending: false })

  if (error) throw error

  return (data || []).map((item: any) => ({
    ...item.badges,
    imageUrl: `/badges/${item.badges.name.toLowerCase().replace(/ /g, '-')}.png`,
    earned_at: item.earned_at,
  })) as Badge[]
}
