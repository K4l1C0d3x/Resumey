"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { ResumeForm, ResumeFormData } from "@/components/resume/resume-form"
import { useToast } from "@/hooks/use-toast"
import { 
  FileText, 
  Download, 
  FileCode,
  Code
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { TemplateSelector } from "@/components/template-selector"

export default function EditResumePage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [resumeData, setResumeData] = useState<ResumeFormData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'edit' | 'templates'>('edit')

  const resumeId = params.id as string

  useEffect(() => {
    if (resumeId) {
      fetchResume()
    }
  }, [resumeId])

  const fetchResume = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/resumes?id=${resumeId}`)
      if (!response.ok) throw new Error("Failed to fetch resume")
      const data = await response.json()
      setResumeData({
        id: data.id,
        title: data.title,
        domain: data.domain,
        personalInfo: data.personal_info,
        objective: data.objective || '',
        skills: data.skills || [],
        education: data.education || [],
        experience: data.experience || [],
        certificates: data.certificates || [],
        internships: data.internships || [],
        projects: data.projects || [],
        presentations: data.presentations || [],
        achievements: data.achievements || [],
        extracurricular: data.extracurricular || [],
        languages: data.languages || [],
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load resume",
        variant: "destructive",
      })
      router.push("/dashboard/resumes")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (data: ResumeFormData) => {
    try {
      setIsSaving(true)
      const response = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, id: resumeId }),
      })

      if (!response.ok) {
        throw new Error("Failed to save resume")
      }

      // Update local state immediately
      setResumeData(data)
      
      toast({
        title: "Success",
        description: "Resume updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save resume",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleExportPDF = async () => {
    if (!resumeData) return
    
    try {
      // Fetch fresh resume data to ensure latest changes
      const response = await fetch(`/api/resumes?id=${resumeId}`)
      if (!response.ok) throw new Error("Failed to fetch latest resume data")
      
      const freshResumeData = await response.json()
      const formattedData = {
        id: freshResumeData.id,
        title: freshResumeData.title,
        domain: freshResumeData.domain,
        personalInfo: freshResumeData.personal_info,
        personal_info: freshResumeData.personal_info,
        objective: freshResumeData.objective || '',
        skills: freshResumeData.skills || [],
        education: freshResumeData.education || [],
        experience: freshResumeData.experience || [],
        certificates: freshResumeData.certificates || [],
        internships: freshResumeData.internships || [],
        projects: freshResumeData.projects || [],
        presentations: freshResumeData.presentations || [],
        achievements: freshResumeData.achievements || [],
        extracurricular: freshResumeData.extracurricular || [],
        languages: freshResumeData.languages || [],
      }
      
      const { PDFExporter } = await import('@/lib/export/pdf-export')
      const exporter = new PDFExporter(formattedData)
      await exporter.exportToPDF()
      
      toast({
        title: "PDF Export Complete",
        description: "Resume saved as PDF successfully.",
      })
    } catch (error: any) {
      toast({
        title: "Export Failed",
        description: error.message || "Failed to export PDF",
        variant: "destructive",
      })
    }
  }

  const handleExportHTML = async () => {
    if (!resumeData) return
    
    try {
      // Fetch fresh resume data to ensure latest changes
      const response = await fetch(`/api/resumes?id=${resumeId}`)
      if (!response.ok) throw new Error("Failed to fetch latest resume data")
      
      const freshResumeData = await response.json()
      const formattedData = {
        id: freshResumeData.id,
        title: freshResumeData.title,
        domain: freshResumeData.domain,
        personalInfo: freshResumeData.personal_info,
        personal_info: freshResumeData.personal_info,
        objective: freshResumeData.objective || '',
        skills: freshResumeData.skills || [],
        education: freshResumeData.education || [],
        experience: freshResumeData.experience || [],
        certificates: freshResumeData.certificates || [],
        internships: freshResumeData.internships || [],
        projects: freshResumeData.projects || [],
        presentations: freshResumeData.presentations || [],
        achievements: freshResumeData.achievements || [],
        extracurricular: freshResumeData.extracurricular || [],
        languages: freshResumeData.languages || [],
      }
      
      const { ResumeExporter } = await import('@/lib/export')
      const exporter = new ResumeExporter(formattedData)
      exporter.exportToHTML()
      
      toast({
        title: "HTML Export Complete",
        description: "Resume downloaded as HTML file.",
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export HTML file.",
        variant: "destructive",
      })
    }
  }

  const handleExportText = async () => {
    if (!resumeData) return
    
    try {
      // Fetch fresh resume data to ensure latest changes
      const response = await fetch(`/api/resumes?id=${resumeId}`)
      if (!response.ok) throw new Error("Failed to fetch latest resume data")
      
      const freshResumeData = await response.json()
      const formattedData = {
        id: freshResumeData.id,
        title: freshResumeData.title,
        domain: freshResumeData.domain,
        personalInfo: freshResumeData.personal_info,
        personal_info: freshResumeData.personal_info,
        objective: freshResumeData.objective || '',
        skills: freshResumeData.skills || [],
        education: freshResumeData.education || [],
        experience: freshResumeData.experience || [],
        certificates: freshResumeData.certificates || [],
        internships: freshResumeData.internships || [],
        projects: freshResumeData.projects || [],
        presentations: freshResumeData.presentations || [],
        achievements: freshResumeData.achievements || [],
        extracurricular: freshResumeData.extracurricular || [],
        languages: freshResumeData.languages || [],
      }
      
      const { ResumeExporter } = await import('@/lib/export')
      const exporter = new ResumeExporter(formattedData)
      exporter.exportToText()
      
      toast({
        title: "Text Export Complete",
        description: "Resume downloaded as plain text (ATS-friendly).",
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export text file.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Loading resume...</p>
      </div>
    )
  }

  if (!resumeData) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Resume not found</p>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Resume</h1>
          <p className="text-muted-foreground mt-2">
            Update your resume information and choose professional templates
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/resumes/${resumeId}/ai-edit`}>
            <Button className="gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 border-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
              Edit with AI
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Download className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleExportPDF}>
                <FileText className="size-4 mr-2" />
                Export PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportHTML}>
                <FileCode className="size-4 mr-2" />
                Export HTML
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportText}>
                <Code className="size-4 mr-2" />
                Export Text (ATS)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === 'edit' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('edit')}
          className="gap-2"
        >
          Edit Resume
        </Button>
        <Button
          variant={activeTab === 'templates' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('templates')}
          className="gap-2"
        >
          Templates
        </Button>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'edit' ? (
        <ResumeForm
          initialData={resumeData}
          onSubmit={handleSubmit}
          isLoading={isSaving}
        />
      ) : (
        <TemplateSelector key={resumeData?.id || 'template'} resumeData={resumeData} />
      )}
    </div>
  )
}
