import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "GEO - Growth Engine Optimization",
  description: "AI-powered brand visibility analytics",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <SidebarProvider>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
              <Suspense fallback={<div>Loading...</div>}>
                <main className="flex-1 overflow-auto">{children}</main>
              </Suspense>
            </div>
          </div>
        </SidebarProvider>
        <Analytics />
      </body>
    </html>
  )
}
