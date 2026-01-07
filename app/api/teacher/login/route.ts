import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { teacherName } = await request.json()

    if (!teacherName || teacherName.trim().length === 0) {
      return NextResponse.json(
        { error: 'Teacher name is required' },
        { status: 400 }
      )
    }

    // Check if teacher exists by name
    // @ts-ignore - Supabase types are strict when env vars aren't set
    const { data: existingTeacher, error: searchError } = await supabase
      .from('teachers')
      // @ts-ignore
      .select('*')
      .eq('name', teacherName.trim())
      .single()

    if (searchError && searchError.code !== 'PGRST116') {
      throw searchError
    }

    let teacherId: string

    if (existingTeacher) {
      // Teacher exists, return their ID
      // @ts-ignore
      teacherId = existingTeacher.id
    } else {
      // Create new teacher
      // @ts-ignore - Supabase types are strict when env vars aren't set
      const { data: newTeacher, error: createError } = await supabase
        .from('teachers')
        // @ts-ignore
        .insert({
          name: teacherName.trim(),
          email: `${teacherName.toLowerCase().replace(/\s+/g, '.')}@teacher.local`,
        })
        .select()
        .single()

      if (createError) throw createError

      // @ts-ignore
      teacherId = newTeacher.id
    }

    return NextResponse.json({
      success: true,
      teacherId,
      teacherName: teacherName.trim(),
    })
  } catch (error) {
    console.error('Teacher login error:', error)
    return NextResponse.json(
      { error: 'Failed to login' },
      { status: 500 }
    )
  }
}
