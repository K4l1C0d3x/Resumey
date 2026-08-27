'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/client'
import { 
  ArrowRight, 
  Check, 
  Zap, 
  Target, 
  FileText, 
  Brain, 
  Sparkles,
  ChevronRight,
  CheckCircle2,
  UserCheck,
  LayoutDashboard
} from 'lucide-react'

export default function LandingPage() {
  const router = useRouter()
  const [openItems, setOpenItems] = useState<boolean[]>(new Array(10).fill(false))
  const [user, setUser] = useState<any>(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // Check initial user session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoadingUser(false)
    })

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoadingUser(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const toggleItem = (idx: number) => {
    setOpenItems(prev => prev.map((open, i) => i === idx ? !open : open))
  }

  const features = [
    {
      icon: Target,
      title: 'ATS Keyword Matching',
      description: 'Automatically scan job descriptions and optimize your resume for applicant tracking systems.'
    },
    {
      icon: Zap,
      title: 'AI Content Generation',
      description: 'Generate high-impact bullet points and personal summaries tailored to your target position.'
    },
    {
      icon: Brain,
      title: 'Smart Format Suggestions',
      description: 'Receive real-time feedback on layout, readability, and content structure.'
    },
    {
      icon: CheckCircle2,
      title: 'Templates',
      description: 'Choose from 50+ professionally designed templates'
    }
  ]

  const howItWorks = [
    {
      number: '1',
      title: 'Fill Your Information',
      description: 'Enter your education, experience, and skills'
    },
    {
      number: '2',
      title: 'Choose a Template',
      description: 'Pick from professional, modern, or creative designs'
    },
    {
      number: '3',
      title: 'Check ATS Score',
      description: 'Optimize for applicant tracking systems'
    },
    {
      number: '4',
      title: 'Download & Apply',
      description: 'Export as PDF and start applying today'
    }
  ]

  const faqItems = [
    {
      q: 'Is Resumey ATS-friendly?',
      a: 'Yes. Every template is structured to pass Applicant Tracking Systems (ATS). We use clean formatting, proper section hierarchy, and keyword optimization to ensure your resume can be read by automated systems before it reaches a recruiter.'
    },
    {
      q: 'Can I edit everything the AI writes?',
      a: 'Absolutely. The AI generates a strong starting point, but you have full control. You can rewrite, remove, or customize any section at any time.'
    },
    {
      q: 'Is AI-generated content detectable?',
      a: 'Resumey doesn\'t generate generic filler text. It builds structured, professional bullet points based on your real experience. The final content reflects your input — not robotic templates.'
    },
    {
      q: 'Can students or fresh graduates use Resumey?',
      a: 'Yes. We guide you even if you have no work experience, only internships, academic projects, or freelance work. The system suggests alternatives like skills, coursework, and achievements.'
    },
    {
      q: 'What file formats can I download?',
      a: 'You can export your resume as PDF (recommended for job applications) and Word (.docx). Formatting remains intact after download.'
    },
    {
      q: 'Can I tailor my resume for each job?',
      a: 'Yes. Paste a job description and Resumey will suggest adjustments to match keywords and responsibilities.'
    },
    {
      q: 'Do recruiters see my resume automatically?',
      a: 'Only if you enable Recruiter Match (premium feature). Otherwise, your resume stays private.'
    },
    {
      q: 'Is my data secure?',
      a: 'We use encrypted storage and secure authentication. Your personal information is never sold or shared.'
    },
    {
      q: 'Do I own my resume?',
      a: '100%. Everything you create belongs to you.'
    }
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Content Wrapper */}
      <div className="relative z-50 wave-background-content">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between relative">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center font-bold text-lg group-hover:shadow-lg transition-shadow">
                <FileText className="size-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Resumey</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </a>
              <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </a>
            </div>
            
            <div className="flex items-center gap-3">
              <ThemeToggle />

              {!loadingUser && user ? (
                /* LOGGED IN USER STATE */
                <Button
                  size="sm"
                  onClick={() => router.push('/dashboard/resumes')}
                  className="bg-primary hover:bg-primary/90 gap-2 cursor-pointer shadow-md font-semibold"
                >
                  <LayoutDashboard className="size-4" />
                  Dashboard
                </Button>
              ) : (
                /* LOGGED OUT STATE */
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => router.push('/login')}
                  className="border-primary/50 hover:bg-primary/10 gap-2 cursor-pointer font-semibold"
                >
                  <UserCheck className="size-4" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[calc(100vh-76px)] flex flex-col justify-center pb-12 sm:pb-16 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-12">
            <div className="space-y-6 max-w-4xl mx-auto">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight text-balance animate-in slide-in-from-bottom-4 duration-1000">
                Land more interviews with a{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-accent animate-gradient-x">
                  job-winning resume
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-1000 delay-200">
                Resumey uses AI to craft ATS-optimized resumes tailored to your target role. Get hired faster with proven formatting and content strategies.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => router.push(user ? '/dashboard/create' : '/login')}
                className="bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg transition-all gap-2 text-base font-semibold cursor-pointer"
              >
                {user ? 'Go to Dashboard' : 'Get Started'}
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 text-base cursor-pointer"
                onClick={() => router.push('/templates')}
              >
                View Templates
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 justify-center pt-8">
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-accent fill-current" viewBox="0 0 20 20">
                      <path d="M10 1.5l2.4 7.4h7.7l-6.2 4.5 2.4 7.4-6.3-4.5-6.3 4.5 2.4-7.4-6.2-4.5h7.7l2.4-7.4z" />
                    </svg>
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-foreground">4.8/5</p>
                  <p className="text-sm text-muted-foreground">from 12,000+ users</p>
                </div>
              </div>
              <div className="flex items-center gap-3 border-l border-border pl-8">
                <div>
                  <p className="font-semibold text-foreground">50,000+</p>
                  <p className="text-sm text-muted-foreground">resumes created</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              Everything you need to land your dream job
            </h2>
            <p className="text-muted-foreground text-lg">
              Designed by hiring managers and recruiter-approved to help you stand out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-card border border-border p-6 rounded-xl hover:border-primary/50 transition-all hover:shadow-lg group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              Four simple steps to your new resume
            </h2>
            <p className="text-muted-foreground text-lg">
              From blank page to job-ready application in under 10 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-card border border-border p-6 rounded-xl h-full flex flex-col justify-between">
                  <div>
                    <span className="text-4xl font-bold text-primary/30 mb-4 block">0{step.number}</span>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-muted/30 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleItem(i)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between font-semibold text-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  <span>{item.q}</span>
                  <ChevronRight
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                      openItems[i] ? 'rotate-90 text-primary' : ''
                    }`}
                  />
                </button>
                {openItems[i] && (
                  <div className="px-6 pb-4 text-muted-foreground text-sm border-t border-border/50 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Resumey. Built with Next.js & Supabase.</p>
        </div>
      </footer>
      </div>
    </div>
  )
}
