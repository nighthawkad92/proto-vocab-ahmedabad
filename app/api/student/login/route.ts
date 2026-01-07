import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { classCode, studentName } = await request.json()

    if (!classCode || !studentName) {
      return NextResponse.json(
        { error: 'Class code and student name are required' },
        { status: 400 }
      )
    }

    // Find the class by code
    const { data: classData, error: classError } = await supabase
      .from('classes')
      .select('id, name, teacher_id')
      .eq('class_code', classCode.toUpperCase())
      .single()

    if (classError || !classData) {
      return NextResponse.json(
        { error: 'Invalid class code. Please check with your teacher.' },
        { status: 404 }
      )
    }

    // Check if student already exists in this class
    const { data: existingStudent } = await supabase
      .from('students')
      .select('id, name')
      .eq('class_id', (classData as any).id)
      .eq('name', studentName)
      .single()

    let studentId: string

    if (existingStudent) {
      // Update last_active for existing student
      studentId = (existingStudent as any).id
      // @ts-ignore - Supabase types are strict when env vars aren't set
      await supabase
        .from('students')
        // @ts-ignore
        .update({ last_active: new Date().toISOString() })
        .eq('id', studentId)
    } else {
      // Create new student
      // @ts-ignore - Supabase types are strict when env vars aren't set
      const { data: newStudent, error: createError } = await supabase
        .from('students')
        // @ts-ignore
        .insert({
          class_id: (classData as any).id,
          name: studentName,
          last_active: new Date().toISOString(),
        })
        .select('id')
        .single()

      if (createError || !newStudent) {
        console.error('Failed to create student:', createError)
        return NextResponse.json(
          { error: 'Failed to create student record' },
          { status: 500 }
        )
      }

      studentId = (newStudent as any).id
    }

    return NextResponse.json({
      success: true,
      studentId,
      studentName,
      classId: (classData as any).id,
      classCode: classCode.toUpperCase(),
      className: (classData as any).name,
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
