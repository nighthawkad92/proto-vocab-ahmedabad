import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/database.types'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { classId: string } }
) {
  try {
    const { classId } = params

    // Create fresh Supabase client with cache disabled
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey, {
      db: { schema: 'public' },
      auth: { persistSession: false },
      global: { headers: { 'cache-control': 'no-cache' } }
    })

    // Get class info
    const { data: classInfoData, error: classError } = await supabase
      .from('classes')
      .select('id, name, grade, teacher_id, class_code, created_at')
      .eq('id', classId)
      .single()

    if (classError || !classInfoData) {
      console.error('Failed to fetch class:', classError)
      return NextResponse.json(
        { error: 'Failed to fetch class' },
        { status: 500 }
      )
    }

    // Store class info for response
    const classInfo = classInfoData

    // Get students with attempt stats
    // Force fresh data by adding timestamp to bypass any Supabase client caching
    const { data: studentsData, error: studentsError } = await supabase
      .from('students')
      .select(`
        id,
        name,
        last_active,
        attempts:attempts(
          id,
          questions_attempted,
          questions_correct
        )
      `)
      .eq('class_id', classId)
      .order('name', { ascending: true })
      .limit(1000) // Add limit to force query re-execution

    if (studentsError) {
      console.error('Failed to fetch students:', studentsError)
      return NextResponse.json(
        { error: 'Failed to fetch students' },
        { status: 500 }
      )
    }

    console.log('📊 [CLASS DATA API] Raw students data from DB:', {
      count: studentsData?.length || 0,
      studentIds: studentsData?.map((s: any) => ({ id: s.id, name: s.name }))
    })

    // Process student data to calculate stats
    const students = (studentsData || []).map((student: any) => {
      const attempts = student.attempts || []
      const attemptsCount = attempts.length

      let totalQuestions = 0
      let totalCorrect = 0

      attempts.forEach((attempt: any) => {
        totalQuestions += attempt.questions_attempted || 0
        totalCorrect += attempt.questions_correct || 0
      })

      const avgAccuracy = totalQuestions > 0
        ? Math.round((totalCorrect / totalQuestions) * 100)
        : 0

      return {
        id: student.id,
        name: student.name,
        last_active: student.last_active,
        attempts_count: attemptsCount,
        avg_accuracy: avgAccuracy,
      }
    })

    // Get all lessons for the class's grade (use literal 4 for now since all classes are grade 4)
    const { data: lessons, error: lessonsError } = await supabase
      .from('lessons')
      .select('id, title, description, order')
      .eq('grade', 4)
      .order('order', { ascending: true })

    if (lessonsError) {
      console.error('Failed to fetch lessons:', lessonsError)
      return NextResponse.json(
        { error: 'Failed to fetch lessons' },
        { status: 500 }
      )
    }

    console.log('📚 [CLASS DATA API] Lessons fetched:', {
      count: lessons?.length || 0
    })

    return NextResponse.json(
      {
        classInfo,
        students,
        lessons: lessons || [],
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'CDN-Cache-Control': 'no-store',
          'Vercel-CDN-Cache-Control': 'no-store',
        },
      }
    )
  } catch (error) {
    console.error('Error fetching class data:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
