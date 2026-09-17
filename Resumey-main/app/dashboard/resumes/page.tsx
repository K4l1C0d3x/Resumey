"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { 
  FileText, 
  Edit2, 
  Trash2, 
  Plus, 
  MoreVertical,
  Share2,
  Copy
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Resume {
  id: string
  title: string
  domain: string
  personal_info?: {
    fullName?: string
    email?: string
    phone?: string
    summary?: string
  }
  created_at: string
  updated_at: string
}

export default function MyResumesPage() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchResumes()
  }, [])

  const fetchResumes = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/resumes")
      if (!response.ok) throw new Error("Failed to fetch resumes")
      const data = await response.json()
      setResumes(data || [])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load resumes",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resume?")) return

    try {
      const response = await fetch(`/api/resumes?id=${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete resume")
      setResumes(resumes.filter((r) => r.id !== id))
      toast({
        title: "Success",
        description: "Resume deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete resume",
        variant: "destructive",
      })
    }
  }

  const handleDuplicate = async (resume: Resume) => {
    try {
      const response = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...resume,
          title: `${resume.title} (Copy)`,
          id: undefined, // Create new resume
        }),
      })

      if (!response.ok) throw new Error("Failed to duplicate resume")
      
      const newResume = await response.json()
      setResumes([newResume, ...resumes])
      
      toast({
        title: "Success",
        description: "Resume duplicated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to duplicate resume",
        variant: "destructive",
      })
    }
  }

  const handleShare = (resume: Resume) => {
    const shareUrl = `${window.location.origin}/dashboard/resumes/${resume.id}`
    navigator.clipboard.writeText(shareUrl)
    toast({
      title: "Link Copied",
      description: "Resume link copied to clipboard",
    })
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center h-full min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  const totalSlots = 3
  const emptySlotsCount = Math.max(0, totalSlots - resumes.length)
  const emptySlots = Array.from({ length: emptySlotsCount })

  return (
    <div className="flex-1 space-y-8 max-w-6xl mx-auto p-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resumes</h1>
          <p className="text-muted-foreground mt-2">
            Manage and optimize your resumes for any role.
          </p>
        </div>
        <Link href="/dashboard/create">
          <Button variant="outline" className="gap-2 bg-background">
            <Plus className="size-4" />
            New Resume
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Filled Resume Slots */}
        {resumes.map((resume, index) => (
          <Card key={resume.id} className="flex flex-col overflow-hidden h-[380px] group border border-border/50 hover:border-primary/30 transition-all shadow-sm hover:shadow-md relative">
            <Link href={`/dashboard/resumes/${resume.id}`} className="absolute inset-0 z-10" />
            
            {/* Resume Preview Box */}
            <div className="flex-1 bg-white relative overflow-hidden flex items-start justify-center p-4 border-b">
               {/* Simulate Resume Layout */}
               <div className="w-[80%] h-[120%] bg-white border shadow-sm rounded-sm p-4 text-[6px] text-gray-800 leading-tight space-y-2 transform -translate-y-2">
                 <div className="text-center font-bold text-[8px] border-b pb-1">{resume.personal_info?.fullName?.toUpperCase() || 'YOUR NAME'}</div>
                 <div className="space-y-1">
                   <div className="font-bold border-b pb-0.5">EDUCATION</div>
                   <div>Bachelor of Technology</div>
                 </div>
                 <div className="space-y-1">
                   <div className="font-bold border-b pb-0.5">EXPERIENCE</div>
                   <div>Software Developer Intern</div>
                   <div className="text-gray-500">Worked on building web apps.</div>
                 </div>
                 <div className="space-y-1">
                   <div className="font-bold border-b pb-0.5">PROJECTS</div>
                   <div>Resume Builder</div>
                   <div className="text-gray-500">Built a resume builder using React.</div>
                 </div>
               </div>

               {/* Dropdown Menu - Needs to be above the Link overlay */}
               <div className="absolute top-2 right-2 z-20">
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white text-black shadow-sm">
                        <MoreVertical className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/resumes/${resume.id}/ai-edit`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-indigo-500"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
                          Edit with AI
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare(resume)}>
                        <Share2 className="size-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicate(resume)}>
                        <Copy className="size-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDelete(resume.id)} className="text-destructive">
                        <Trash2 className="size-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
               </div>
            </div>

            {/* Footer */}
            <div className="p-4 flex items-center justify-between bg-card relative z-20">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground line-clamp-1">{resume.title}</h3>
                  <Link href={`/dashboard/resumes/${resume.id}`}>
                    <Edit2 className="w-3 h-3 text-muted-foreground hover:text-foreground transition-colors" />
                  </Link>
                </div>
                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                  <span>{new Date(resume.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span>•</span>
                  <span className="line-clamp-1">{resume.personal_info?.fullName || 'Anonymous'}</span>
                </div>
              </div>
              
              {/* Score Indicator */}
              <div className="w-10 h-10 rounded-full border-[3px] border-destructive flex items-center justify-center font-bold text-destructive text-sm bg-background">
                42
              </div>
            </div>
          </Card>
        ))}

        {/* Empty Slots */}
        {emptySlots.map((_, index) => (
          <Card key={`empty-${index}`} className="flex flex-col overflow-hidden h-[380px] border-dashed border-2 border-border bg-transparent shadow-none items-center justify-center relative group hover:border-primary/30 transition-all">
            <Link href="/dashboard/create" className="absolute inset-0 z-10" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center pb-16">
              <div className="w-12 h-12 rounded-lg bg-card border flex items-center justify-center mb-4 group-hover:bg-primary/5 transition-colors">
                <Plus className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-muted-foreground font-medium">Add another resume</p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between border-t border-dashed bg-card/50 backdrop-blur-sm">
              <div>
                <h3 className="font-semibold text-foreground">Resume {resumes.length + index + 1}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Empty slot</p>
              </div>
              <div className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                Upload <span>&rarr;</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Optimization Banner */}
      {resumes.length > 0 && (
        <Card className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-card border-border/50">
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-1">What you can gain</h3>
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              Push your score from <span className="font-bold text-foreground">42</span> <span className="text-muted-foreground">&rarr;</span> <span className="font-bold text-emerald-500">53</span>
            </p>
          </div>
          <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-center">
              <p className="font-bold text-emerald-500 text-lg">+11</p>
              <p className="text-xs text-muted-foreground">pts possible</p>
            </div>
            <Button className="bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-black dark:hover:bg-slate-200">
              Optimize now &rarr;
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
