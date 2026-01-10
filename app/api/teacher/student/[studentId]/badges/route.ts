import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { studentId: string } }
) {
  try {
    const { studentId } = params

    // Get all badges earned by this student with timestamps
    // @ts-ignore
    const { data: studentBadges, error } = await supabase
      .from('student_badges')
      .select(`
        earned_at,
        badges (
          id,
          name,
          icon
        )
      `)
      .eq('student_id', studentId)
      .order('earned_at', { ascending: true })

    if (error) throw error

    // Format badges with imageUrl
    const formattedBadges = studentBadges?.map((sb: any) => ({
      id: sb.badges.id,
      name: sb.badges.name,
      icon: sb.badges.icon,
      imageUrl: `/badges/${sb.badges.name.toLowerCase().replace(/ /g, '-')}.svg`,
      earnedAt: sb.earned_at
    })) || []

    return NextResponse.json({ badges: formattedBadges })
  } catch (error) {
    console.error('Error fetching student badges:', error)
    return NextResponse.json(
      { error: 'Failed to fetch badges' },
      { status: 500 }
    )
  }
}
