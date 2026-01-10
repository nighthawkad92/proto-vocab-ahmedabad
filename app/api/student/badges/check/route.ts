import { NextRequest, NextResponse } from 'next/server'
import { evaluateBadgeCriteria, awardBadges, updateStudentStats } from '@/lib/badgeService'

export async function POST(request: NextRequest) {
  try {
    const { studentId } = await request.json()

    if (!studentId) {
      return NextResponse.json(
        { error: 'Student ID is required' },
        { status: 400 }
      )
    }

    // Update stats first
    await updateStudentStats(studentId)

    // Check for new badges
    const newBadges = await evaluateBadgeCriteria(studentId)

    // Award new badges
    if (newBadges.length > 0) {
      await awardBadges(studentId, newBadges)
    }

    return NextResponse.json({ newBadges })
  } catch (error) {
    console.error('Error checking badges:', error)
    return NextResponse.json(
      { error: 'Failed to check badges' },
      { status: 500 }
    )
  }
}
