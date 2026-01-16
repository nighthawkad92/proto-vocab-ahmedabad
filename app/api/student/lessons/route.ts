import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/database.types'

// Mark this route as dynamic since it uses request parameters
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const classId = searchParams.get('classId')

    if (!classId) {
      return NextResponse.json(
        { error: 'Class ID is required' },
        { status: 400 }
      )
    }

    // Create a fresh Supabase client for this request
    // Using service role key as anon key has caching issues on Vercel
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey)

    // Get all lessons for grade 4
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

    // Get unlocked lessons for this class
    console.log('🔍 [STUDENT LESSONS API] Query start:', {
      timestamp: new Date().toISOString(),
      classId,
      supabaseUrl,
      usingServiceRole: !!supabaseServiceKey
    })

    const { data: unlocks, error: unlocksError, count } = await supabase
      .from('lesson_unlocks')
      .select('lesson_id, unlocked_at, unlocked_by', { count: 'exact' })
      .eq('class_id', classId)

    console.log('🔓 [STUDENT LESSONS API] Query result:', {
      timestamp: new Date().toISOString(),
      count,
      unlocksLength: unlocks?.length || 0,
      unlocks: unlocks || [],
      error: unlocksError
    })

    if (unlocksError) {
      console.error('Failed to fetch unlocks:', unlocksError)
      return NextResponse.json(
        { error: 'Failed to fetch unlocks' },
        { status: 500 }
      )
    }

    // Map unlocks to only include lesson_id for the response
    const unlocksResponse = (unlocks || []).map(u => ({ lesson_id: u.lesson_id }))

    const responseData = {
      lessons: lessons || [],
      unlocks: unlocksResponse,
    }

    console.log('📤 [STUDENT LESSONS API] Response being sent:', {
      timestamp: new Date().toISOString(),
      lessonsCount: responseData.lessons.length,
      unlocksCount: responseData.unlocks.length,
      unlockIds: responseData.unlocks.map(u => u.lesson_id),
      rawUnlocksData: unlocks // Log the full data from DB for debugging
    })

    return NextResponse.json(
      responseData,
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          'CDN-Cache-Control': 'no-store',
          'Vercel-CDN-Cache-Control': 'no-store',
        },
      }
    )
  } catch (error) {
    console.error('Error fetching lessons:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
