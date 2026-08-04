import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("POST request received:", body)
    
    const {
      id,
      title,
      domain,
      personalInfo,
      objective,
      skills,
      education,
      experience,
      certificates,
      internships,
      projects,
      presentations,
      achievements,
      extracurricular,
      languages,
    } = body

    const resumeData = {
      id: id || Date.now().toString(),
      title,
      domain,
      personal_info: personalInfo,
      objective,
      skills,
      education,
      experience,
      certificates,
      internships,
      projects,
      presentations,
      achievements,
      extracurricular,
      languages,
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from('resumes')
      .upsert(resumeData)
      .select()
      .single()

    if (error) {
      console.error("Supabase insert error:", error)
      throw error
    }

    return NextResponse.json(data || resumeData)
  } catch (error) {
    console.error("Error saving resume:", error)
    return NextResponse.json(
      { error: "Failed to save resume" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    
    if (id) {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('id', id)
        .single()
        
      if (error || !data) {
        return NextResponse.json({ error: "Resume not found" }, { status: 404 })
      }
      
      return NextResponse.json(data)
    }

    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      
    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("Error fetching resumes:", error)
    return NextResponse.json(
      { error: "Failed to fetch resumes" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Resume ID required" }, { status: 400 })
    }

    const { error } = await supabase
      .from('resumes')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting resume:", error)
    return NextResponse.json(
      { error: "Failed to delete resume" },
      { status: 500 }
    )
  }
}
