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

    console.log('📤 [STUDENT LESSONS API] Response being sent:', {
      timestamp: new Date().toISOString(),
      lessonsCount: lessons?.length || 0
    })

    return NextResponse.json(
      { lessons: lessons || [] },
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
