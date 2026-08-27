'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Mail, Lock, Eye, EyeOff, Loader2, Sparkles, User, FileText, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (error: any) {
      toast({
        title: 'Google Sign In Error',
        description: error.message || 'Could not connect to Google',
        variant: 'destructive',
      })
      setGoogleLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
          },
        })

        if (error) {
          if (error.message.toLowerCase().includes('already registered')) {
            throw new Error('An account with this email already exists. Please Sign In.')
          }
          throw error
        }

        if (data.session) {
          toast({
            title: 'Account Created!',
            description: 'Logged in successfully. Redirecting...',
          })
          router.push('/dashboard/resumes')
          router.refresh()
          return
        }

        const { error: signInErr } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (!signInErr) {
          toast({
            title: 'Account Created!',
            description: 'Signed in successfully. Redirecting...',
          })
          router.push('/dashboard/resumes')
          router.refresh()
          return
        }

        toast({
          title: 'Account Created',
          description: 'Account created! Please Sign In now.',
        })
        setMode('signin')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          if (error.message.toLowerCase().includes('invalid login credentials')) {
            throw new Error('Invalid email or password. If you are new, click "Sign Up" above.')
          }
          throw error
        }

        toast({
          title: 'Welcome Back!',
          description: 'Successfully signed in to Resumey.',
        })

        router.push('/dashboard/resumes')
        router.refresh()
      }
    } catch (error: any) {
      toast({
        title: mode === 'signup' ? 'Sign Up Issue' : 'Sign In Issue',
        description: error.message || 'Authentication failed',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGuestMode = (e: React.MouseEvent) => {
    e.preventDefault()
    toast({
      title: 'Guest Mode Activated',
      description: 'Entering Resumey dashboard...',
    })
    router.push('/dashboard/resumes')
    router.refresh()
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-slate-950 text-slate-50">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/landing" className="inline-flex items-center gap-2 text-2xl font-bold text-slate-100 hover:text-white transition-colors">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg shadow-md">
              <FileText className="h-5 w-5" />
            </div>
            Resumey
          </Link>
        </div>

        {/* Auth Card */}
        <Card className="bg-slate-900/90 border-slate-800 text-slate-100 shadow-2xl backdrop-blur-xl">
          <CardHeader className="space-y-4 text-center pb-2 pt-6">
            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 p-1 bg-slate-950 rounded-lg border border-slate-800">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  setMode('signup')
                }}
                className={`py-2 text-sm font-semibold rounded-md transition-all cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  setMode('signin')
                }}
                className={`py-2 text-sm font-semibold rounded-md transition-all cursor-pointer ${
                  mode === 'signin'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign In
              </button>
            </div>

            <CardTitle className="text-xl font-bold">
              {mode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
            </CardTitle>
            <CardDescription className="text-slate-400 text-xs md:text-sm">
              {mode === 'signup'
                ? 'Fill in your details below to create an account'
                : 'Enter your credentials to access your saved resumes'}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4 space-y-4">
            {/* Google Sign In Button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="w-full h-11 border-slate-800 bg-slate-950/60 hover:bg-slate-800 text-slate-100 font-semibold gap-3 cursor-pointer transition-all"
            >
              {googleLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )}
              Continue with Google
            </Button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-900 px-2 text-slate-400 font-medium">Or email</span>
              </div>
            </div>

            {/* Email / Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium text-slate-200">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Alex Hunter"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10 bg-slate-950/60 border-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-primary"
                      required={mode === 'signup'}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-200">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="alex@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-slate-950/60 border-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-slate-200">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-slate-950/60 border-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-primary"
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-200 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full h-10 font-semibold cursor-pointer gap-2" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {mode === 'signup' ? 'Creating Account...' : 'Signing In...'}
                  </>
                ) : (
                  <>
                    {mode === 'signup' ? 'Create Account' : 'Sign In'}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-800" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-900 px-2 text-slate-400 font-medium">Or guest</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleGuestMode}
                className="w-full h-10 gap-2 border-slate-800 bg-slate-950/40 hover:bg-slate-800 text-slate-200 cursor-pointer"
              >
                <Sparkles className="h-4 w-4 text-amber-400" />
                Continue as Guest (No Password)
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
