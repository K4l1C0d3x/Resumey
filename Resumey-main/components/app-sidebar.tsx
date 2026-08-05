"use client"

import * as React from "react"
import Link from "next/link"
import {
  IconFileText,
  IconFiles,
  IconGitCompare,
  IconBrain,
  IconSettings,
  IconHelp,
  IconInnerShadowTop,
} from "@tabler/icons-react"

import { NavMain } from '@/components/nav-main'
import { NavSecondary } from '@/components/nav-secondary'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const data = {
  user: {
    name: "User",
    email: "user@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Create Resume",
      url: "/dashboard/create",
      icon: IconFileText,
    },
    {
      title: "My Resumes",
      url: "/dashboard/resumes",
      icon: IconFiles,
    },
    {
      title: "Compare Resume",
      url: "/dashboard/compare",
      icon: IconGitCompare,
    },
    {
      title: "ATS Score",
      url: "/dashboard/ats-score",
      icon: IconBrain,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: IconSettings,
    },
    {
      title: "Help",
      url: "/dashboard/help",
      icon: IconHelp,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="pt-6 pb-2 px-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center font-bold shadow-sm">
                  <IconFileText className="size-4 text-primary-foreground" />
                </div>
                <span className="text-base font-semibold truncate">Resumey</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
