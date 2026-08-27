import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import { randomUUID } from 'crypto'

const STORAGE_FILE = join(process.cwd(), 'data', 'resumes.json')

try {
  mkdirSync(join(process.cwd(), 'data'), { recursive: true })
} catch (error) {}

const getLocalResumes = (): any[] => {
  try {
    if (existsSync(STORAGE_FILE)) {
      const content = readFileSync(STORAGE_FILE, 'utf-8')
      if (content && content.trim() !== '') {
        return JSON.parse(content)
      }
    }
  } catch (e) {}
  return []
}

const saveLocalResumes = (resumes: any[]) => {
  try {
    writeFileSync(STORAGE_FILE, JSON.stringify(resumes, null, 2), 'utf-8')
  } catch (e) {}
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    try {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (id) {
        const { data, error } = await supabase
          .from("resumes")
          .select("*")
          .eq("id", id)
          .maybeSingle()

        if (!error && data) {
          return NextResponse.json(data)
        }
      } else {
        let query = supabase.from("resumes").select("*")
        if (user) {
          query = query.eq("user_id", user.id)
        }
        const { data, error } = await query.order("updated_at", { ascending: false })

        if (!error && data && data.length > 0) {
          return NextResponse.json(data)
        }
      }
    } catch (sbErr) {
      console.log("Supabase fetch fallback")
    }

    const localResumes = getLocalResumes()
    if (id) {
      const found = localResumes.find((r) => r.id === id)
      if (found) return NextResponse.json(found)
      return NextResponse.json({ error: "Resume not found" }, { status: 404 })
    }

    return NextResponse.json(localResumes)
  } catch (error: any) {
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      id,
      title,
      domain,
      personalInfo,
      personal_info,
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

    // Ensure valid UUID for PostgreSQL
    const validId = (id && id.length === 36 && id.includes('-')) ? id : randomUUID()

    const resumeData: any = {
      id: validId,
      title: title || "Untitled Resume",
      domain: domain || "General",
      personal_info: personalInfo || personal_info || {},
      objective: objective || "",
      skills: Array.isArray(skills) ? skills : [],
      education: Array.isArray(education) ? education : [],
      experience: Array.isArray(experience) ? experience : [],
      certificates: Array.isArray(certificates) ? certificates : [],
      internships: Array.isArray(internships) ? internships : [],
      projects: Array.isArray(projects) ? projects : [],
      presentations: Array.isArray(presentations) ? presentations : [],
      achievements: Array.isArray(achievements) ? achievements : [],
      extracurricular: Array.isArray(extracurricular) ? extracurricular : [],
      languages: Array.isArray(languages) ? languages : [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Attempt saving to Supabase
    try {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        const payload = {
          ...resumeData,
          user_id: user.id,
        }

        if (id) {
          const { data, error } = await supabase
            .from("resumes")
            .update(payload)
            .eq("id", id)
            .select()
            .single()

          if (error) {
            console.error("Supabase UPDATE error:", error)
          } else if (data) {
            resumeData.id = data.id
          }
        } else {
          const { data, error } = await supabase
            .from("resumes")
            .insert([payload])
            .select()
            .single()

          if (error) {
            console.error("Supabase INSERT error:", error)
          } else if (data) {
            resumeData.id = data.id
          }
        }
      }
    } catch (sbErr) {
      console.log("Supabase save bypassed")
    }

    // Save to local storage
    let localResumes = getLocalResumes()
    const existingIndex = localResumes.findIndex((r) => r.id === resumeData.id)

    if (existingIndex !== -1) {
      localResumes[existingIndex] = { ...localResumes[existingIndex], ...resumeData }
    } else {
      localResumes.unshift(resumeData)
    }

    saveLocalResumes(localResumes)

    return NextResponse.json(resumeData)
  } catch (error: any) {
    console.error("Error saving resume:", error)
    return NextResponse.json({ error: "Failed to save resume" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Resume ID required" }, { status: 400 })
    }

    try {
      const supabase = await createClient()
      await supabase.from("resumes").delete().eq("id", id)
    } catch (e) {}

    let localResumes = getLocalResumes()
    localResumes = localResumes.filter((r) => r.id !== id)
    saveLocalResumes(localResumes)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete resume" }, { status: 500 })
  }
}
