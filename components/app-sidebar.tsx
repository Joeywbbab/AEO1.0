"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarHeader,
} from "@/components/ui/sidebar"

type NavItem = {
  title: string
  url: string
  items?: {
    title: string
    url: string
  }[]
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
      },
    ],
  },
  {
    title: "Situation",
    url: "#",
    items: [
      {
        title: "Prompts",
        url: "/analytics/prompts",
      },
      {
        title: "Citations",
        url: "/analytics/citations",
      },
    ],
  },
  {
    title: "Optimization",
    url: "#",
    items: [
      {
        title: "Audit",
        url: "/action/audit",
      },
      {
        title: "Competitors",
        url: "/action/competitors",
      },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">AEO</span>
          </div>
          <span className="text-base font-semibold text-sidebar-foreground">Growth Engine</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-sidebar">
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <div className="px-2 py-1.5">
                  <span className="text-xs font-medium text-sidebar-foreground/60">{item.title}</span>
                </div>
                {item.items && (
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === subItem.url}
                          className="text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                        >
                          <Link href={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
