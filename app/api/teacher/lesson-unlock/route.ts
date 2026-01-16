import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/database.types'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { classId, lessonId, teacherId } = await request.json()

    console.log('🔓 [UNLOCK API] Unlock request:', { classId, lessonId, teacherId })

    if (!classId || !lessonId || !teacherId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create fresh Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey)

    // Insert unlock
    const { data, error } = await supabase
      .from('lesson_unlocks')
      .insert({
        class_id: classId,
        lesson_id: lessonId,
        unlocked_by: teacherId,
      } as any)
      .select()

    if (error) {
      console.error('❌ [UNLOCK API] Failed to unlock lesson:', error)
      return NextResponse.json(
        { error: 'Failed to unlock lesson' },
        { status: 500 }
      )
    }

    console.log('✅ [UNLOCK API] Lesson unlocked successfully:', data)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error unlocking lesson:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const classId = searchParams.get('classId')
    const lessonId = searchParams.get('lessonId')

    console.log('🔒 [LOCK API] Lock request:', { classId, lessonId })

    if (!classId || !lessonId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create fresh Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey)

    // Delete unlock
    const { error } = await supabase
      .from('lesson_unlocks')
      .delete()
      .eq('class_id', classId)
      .eq('lesson_id', lessonId)

    if (error) {
      console.error('❌ [LOCK API] Failed to lock lesson:', error)
      return NextResponse.json(
        { error: 'Failed to lock lesson' },
        { status: 500 }
      )
    }

    console.log('✅ [LOCK API] Lesson locked successfully')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error locking lesson:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
