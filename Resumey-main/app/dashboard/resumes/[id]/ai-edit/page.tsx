"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { 
  ChevronLeft, 
  Undo, 
  Download, 
  X, 
  MessageSquare,
  ArrowRight,
  Send
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function AIEditorPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  
  const resumeId = params.id as string

  useEffect(() => {
    // Simulate loading resume data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center h-full min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] -m-4 sm:-m-6 lg:-m-8">
      {/* Left Column: Editor Area */}
      <div className="flex-1 flex flex-col bg-muted/20 overflow-y-auto border-r relative">
        
        {/* Top Action Bar */}
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b px-6 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild className="gap-2 text-muted-foreground">
            <Link href={`/dashboard/resumes/${resumeId}`}>
              <ChevronLeft className="w-4 h-4" />
              Switch resume
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-background">
              <Undo className="w-4 h-4" />
              Undo
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-background">
              <Download className="w-4 h-4" />
              Export PDF
            </Button>
          </div>
        </div>

        <div className="p-6 max-w-4xl mx-auto w-full space-y-6">
          
          {/* ATS Score Card */}
          <Card className="p-4 bg-background border-destructive/20 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full border-4 border-destructive flex items-center justify-center font-bold text-destructive flex-shrink-0">
                42
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">ATS Score: 42/100</h3>
                  <Button variant="link" className="text-muted-foreground p-0 h-auto text-sm">
                    Full analysis &darr;
                  </Button>
                </div>
                <p className="text-muted-foreground text-sm mt-1">High risk of being filtered out before anyone reads it.</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t flex justify-between items-center text-sm">
              <span className="text-muted-foreground">5 of 6 areas need attention. Impact and Production are your biggest gaps.</span>
            </div>
          </Card>

          {/* Edit Notice Banner */}
          <div className="bg-background border rounded-lg p-3 flex items-center justify-between text-sm shadow-sm">
            <div className="flex items-center gap-2">
              <EditIcon className="w-4 h-4 text-muted-foreground" />
              <span><strong>Resume preview is editable.</strong> Click text to make manual changes.</span>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span>Hover for actions, select text for AI edits.</span>
              <button className="hover:text-foreground"><X className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Interactive Resume Canvas Mockup */}
          <div className="bg-white text-black shadow-lg rounded-sm border p-12 mx-auto min-h-[800px] max-w-[800px] font-serif relative">
            
            {/* Resume Header */}
            <div className="text-center mb-8 relative group">
              <h1 className="text-4xl font-bold mb-2 tracking-wide uppercase">Christy Abraham</h1>
              <div className="text-sm text-gray-600 flex justify-center gap-2 items-center flex-wrap">
                <span>+91 9961944890</span> | 
                <span className="underline">christyabraham346@gmail.com</span> | 
                <span className="underline">LinkedIn</span> | 
                <span className="underline">GitHub</span> | 
                <span>Uzhavoor, Kottayam, Kerala</span>
              </div>
              <button className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-gray-700 transition flex items-center gap-1">
                <EditIcon className="w-3 h-3" /> Edit Contact
              </button>
            </div>

            {/* Experience Section with AI Edits */}
            <div className="mb-6">
              <div className="border-b-2 border-black flex items-center gap-4 pb-1 mb-3 group">
                <h2 className="text-lg font-bold uppercase tracking-wider">Experience (2)</h2>
                <div className="opacity-0 group-hover:opacity-100 flex items-center gap-2 text-xs text-gray-500 font-sans">
                  <button className="hover:text-black flex items-center gap-1">&uarr; &darr;</button>
                  <button className="hover:text-black flex items-center gap-1">+ new</button>
                  <button className="hover:text-red-600 ml-auto flex items-center gap-1"><TrashIcon className="w-3 h-3" /> delete section</button>
                </div>
              </div>

              {/* Item 1 */}
              <div className="mb-4 group relative">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-base">Web Development Intern <span className="text-gray-400 font-normal text-xs ml-2 opacity-0 group-hover:opacity-100 cursor-pointer">+ bullet</span></h3>
                  <span className="text-sm text-gray-600 italic">Start – End</span>
                </div>
                <div className="flex justify-between items-baseline mb-2 text-sm italic text-gray-700">
                  <span>Algon</span>
                  <span>Location</span>
                </div>
                
                <ul className="list-disc pl-5 space-y-2 text-sm font-sans">
                  {/* AI Suggestion Block */}
                  <li className="relative">
                    <div className="bg-red-50 text-red-900 line-through px-1 -mx-1 mb-1 opacity-70">
                      Gained hands-on experience in web development technologies and best practices.
                    </div>
                    <div className="bg-green-50 text-green-900 px-2 py-1 -mx-2 rounded-sm border border-green-200">
                      <span className="font-bold text-green-700 mr-1">+</span>
                      Engineered responsive web components using HTML and CSS, improving page load times by 15% through optimized asset management.
                    </div>
                    <div className="flex items-center justify-between mt-2 font-sans text-xs">
                      <button className="text-blue-600 flex items-center gap-1 font-medium hover:underline">
                        <MessageSquare className="w-3 h-3" /> Discuss
                      </button>
                      <div className="flex gap-1">
                        <Button size="sm" className="h-7 text-xs bg-green-700 hover:bg-green-800 text-white rounded-sm px-3">Accept</Button>
                        <Button size="sm" variant="destructive" className="h-7 text-xs rounded-sm px-3">Reject</Button>
                      </div>
                    </div>
                  </li>
                  
                  <li>Worked on building and maintaining web pages using HTML and related tools.</li>
                  
                  {/* AI Suggestion Block 2 */}
                  <li className="relative">
                    <div className="bg-red-50 text-red-900 line-through px-1 -mx-1 mb-1 opacity-70">
                      Collaborated with team members to deliver web-based solutions within deadlines.
                    </div>
                    <div className="bg-green-50 text-green-900 px-2 py-1 -mx-2 rounded-sm border border-green-200">
                      <span className="font-bold text-green-700 mr-1">+</span>
                      Collaborated with a cross-functional team using Git for version control, ensuring seamless integration of front-end features into the main codebase.
                    </div>
                    <div className="flex items-center justify-between mt-2 font-sans text-xs">
                      <button className="text-blue-600 flex items-center gap-1 font-medium hover:underline">
                        <MessageSquare className="w-3 h-3" /> Discuss
                      </button>
                      <div className="flex gap-1">
                        <Button size="sm" className="h-7 text-xs bg-green-700 hover:bg-green-800 text-white rounded-sm px-3">Accept</Button>
                        <Button size="sm" variant="destructive" className="h-7 text-xs rounded-sm px-3">Reject</Button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
          </div>

        </div>
      </div>

      {/* Right Column: AI Assistant Sidebar */}
      <div className="w-full lg:w-96 flex flex-col bg-background h-full">
        <div className="p-4 border-b">
          <h2 className="font-bold text-lg flex items-center gap-2">
            <SparklesIcon className="w-5 h-5 text-primary" /> Polish AI
          </h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* AI Greeting Card */}
          <div className="bg-muted/50 border rounded-xl p-4 text-sm space-y-3">
            <p className="font-semibold">Hi CHRISTY 👋</p>
            <p>I'm Polish, your resume editor.</p>
            <p>Your resume scored <strong>42/100</strong> for ATS - there's real upside here.</p>
            <p>I found 6 high-impact fixes, focused on technical depth and keyword coverage.</p>
            <p>These are the fastest wins for ATS match and recruiter scan. You can ask me to improve your resume anytime.</p>
            <div className="inline-block bg-green-100 text-green-800 font-medium px-2 py-1 rounded text-xs">
              6 edits added
            </div>
          </div>

          {/* Suggested Next Moves */}
          <div>
            <h4 className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-3">Suggested Next Moves</h4>
            <div className="space-y-2">
              <button className="w-full text-left p-3 rounded-lg border hover:bg-muted/50 transition-colors flex items-center justify-between group">
                <span className="text-sm text-foreground/80 line-clamp-2 pr-2">Add a bullet to my internship detailing a specific bug fix or feature implementation</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="w-full text-left p-3 rounded-lg border hover:bg-muted/50 transition-colors flex items-center justify-between group">
                <span className="text-sm text-foreground/80 line-clamp-2 pr-2">Quantify the impact of my astrology project with user-focused metrics</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 border-t bg-background">
          <div className="relative">
            <Input 
              placeholder="Ask Polish to edit your resume..." 
              className="pr-10 bg-muted/30"
            />
            <Button size="icon" variant="ghost" className="absolute right-1 top-1 w-8 h-8 text-muted-foreground hover:text-primary">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper Icons
function EditIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 Z"/>
    </svg>
  )
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
    </svg>
  )
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
  )
}
