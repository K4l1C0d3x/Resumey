"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import {
  IconLogout,
  IconUserCircle,
  IconLogin,
} from "@tabler/icons-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

export function NavUser({
  user: initialUser,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()
  const router = useRouter()
  const supabase = createClient()
  const [userState, setUserState] = useState<{
    name: string
    email: string
    avatar?: string
    isLoggedIn: boolean
  }>({
    name: initialUser.name || "Guest User",
    email: initialUser.email || "Sign in to sync resumes",
    avatar: initialUser.avatar || undefined,
    isLoggedIn: false,
  })

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const name = user.user_metadata?.full_name || user.email?.split('@')[0] || "User"
        setUserState({
          name,
          email: user.email || "",
          avatar: user.user_metadata?.avatar_url || undefined,
          isLoggedIn: true,
        })
      }
    }

    getUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const user = session.user
        const name = user.user_metadata?.full_name || user.email?.split('@')[0] || "User"
        setUserState({
          name,
          email: user.email || "",
          avatar: user.user_metadata?.avatar_url || "",
          isLoggedIn: true,
        })
      } else {
        setUserState({
          name: "Guest User",
          email: "Click to Sign In",
          avatar: "",
          isLoggedIn: false,
        })
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  const handleSignInRedirect = () => {
    router.push("/login")
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={userState.avatar} alt={userState.name} />
                <AvatarFallback className="rounded-lg bg-primary/20 text-primary font-semibold">
                  {userState.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{userState.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {userState.email}
                </span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={userState.avatar} alt={userState.name} />
                  <AvatarFallback className="rounded-lg bg-primary/20 text-primary font-semibold">
                    {userState.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{userState.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {userState.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {userState.isLoggedIn ? (
              <>
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
                    <IconUserCircle className="size-4 mr-2" />
                    Account Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  <IconLogout className="size-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem onClick={handleSignInRedirect}>
                <IconLogin className="size-4 mr-2" />
                Sign In
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
