"use client"

import { TemplateSelector } from '@/components/template-selector'
import resumes from '@/data/resumes.json'
import { ResumeFormData } from '@/components/resume/resume-form'

export default function TemplatesPage() {
  const sample = Array.isArray(resumes) && resumes.length > 0 ? resumes[0] : null

  const formattedData: ResumeFormData = {
    id: sample?.id || 'sample-id',
    title: sample?.title || 'Sample Resume',
    domain: sample?.domain || '',
    personalInfo: sample?.personal_info || (sample as any)?.personalInfo || {},
    objective: (sample as any)?.objective || '',
    skills: sample?.skills || [],
    education: sample?.education || [],
    experience: sample?.experience || [],
    certificates: sample?.certificates || [],
    internships: sample?.internships || [],
    projects: sample?.projects || [],
    presentations: sample?.presentations || [],
    achievements: sample?.achievements || [],
    extracurricular: sample?.extracurricular || [],
    languages: sample?.languages || [],
  }

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Templates</h1>
        <TemplateSelector resumeData={formattedData} />
      </div>
    </div>
  )
}
