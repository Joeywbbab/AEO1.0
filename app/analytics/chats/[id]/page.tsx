"use client"

import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { mockChatDetails } from "@/lib/mock-data"

export default function ChatDetailPage() {
  const params = useParams()
  const id = params.id as string
  const chat = mockChatDetails[id]

  if (!chat) {
    notFound()
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header with Breadcrumb */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center gap-4 mb-3">
          <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <BreadcrumbNav
            items={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Chats", href: "/dashboard" },
              { label: "Detail" },
            ]}
          />
        </div>
        <h1 className="text-xl font-semibold text-foreground">{chat.query}</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="flex h-full">
          {/* Left Side - Chat Content (2/3 width) */}
          <div className="flex-[2] border-r border-border bg-background p-6 overflow-auto hide-scrollbar">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Query Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-lg">
                    👤
                  </div>
                  <h2 className="text-sm font-semibold text-foreground">Query</h2>
                </div>
                <div className="ml-10 p-4 bg-muted/50 rounded-lg border border-border">
                  <p className="text-sm text-foreground leading-relaxed">{chat.query}</p>
                </div>
              </div>

              {/* Answer Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-lg">
                    {chat.modelIcon}
                  </div>
                  <h2 className="text-sm font-semibold text-foreground">AI Answer</h2>
                </div>
                <div className="ml-10 p-4 bg-card rounded-lg border border-border">
                  <div className="prose prose-sm max-w-none text-foreground">
                    {chat.response.split("\n\n").map((paragraph, idx) => {
                      // Check if paragraph is a heading (starts with **)
                      if (paragraph.startsWith("**") && paragraph.includes(":**")) {
                        const heading = paragraph.replace(/\*\*/g, "").replace(":", "")
                        return (
                          <h3 key={idx} className="text-base font-semibold text-foreground mt-4 mb-2">
                            {heading}
                          </h3>
                        )
                      }
                      // Check if paragraph contains bullet points
                      if (paragraph.includes("- ")) {
                        const lines = paragraph.split("\n")
                        return (
                          <div key={idx} className="space-y-1 mb-4">
                            {lines.map((line, lineIdx) => {
                              if (line.startsWith("- ")) {
                                return (
                                  <div key={lineIdx} className="flex gap-2 text-sm">
                                    <span className="text-muted-foreground">•</span>
                                    <span className="text-foreground">{line.substring(2)}</span>
                                  </div>
                                )
                              }
                              if (line.startsWith("**")) {
                                return (
                                  <p key={lineIdx} className="text-sm font-semibold text-foreground mt-3 mb-1">
                                    {line.replace(/\*\*/g, "")}
                                  </p>
                                )
                              }
                              return null
                            })}
                          </div>
                        )
                      }
                      // Regular paragraph
                      return (
                        <p key={idx} className="text-sm text-foreground leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Chat Details (1/3 width) */}
          <div className="flex-[1] bg-card p-6 overflow-auto">
            <div className="space-y-8">
              {/* Chat Details Section */}
              <div>
                <h3 className="text-base font-semibold text-foreground mb-4">Chat Details</h3>
                <div className="space-y-4">
                  {/* Model */}
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Model</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{chat.modelIcon}</span>
                      <span className="text-sm font-medium text-foreground">{chat.model}</span>
                    </div>
                  </div>

                  {/* Last Run */}
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Last run</div>
                    <div className="text-sm text-foreground">{chat.lastRun}</div>
                  </div>
                </div>
              </div>

              {/* Competitor Mentions Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-foreground">Competitor mentions</h3>
                  <span className="text-sm font-medium text-muted-foreground">
                    {chat.competitorMentions.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {chat.competitorMentions.map((competitor, idx) => {
                    // Check if competitor domain appears in any citation
                    const isInCitation = chat.sources.some(source =>
                      source.url.includes(competitor.domain)
                    )

                    return (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                          <span className="text-sm font-medium text-muted-foreground">
                            {competitor.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-foreground truncate">{competitor.name}</span>
                            {isInCitation && (
                              <span className="text-[10px] px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded">
                                Cited
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">{competitor.domain}</div>
                        </div>
                        <div className="text-right space-y-0.5">
                          <div className="text-sm font-semibold text-foreground">{competitor.mentions}x</div>
                          <div className="flex items-center gap-1">
                            <div className="w-8 h-1.5 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${competitor.score}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">{competitor.score}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Citations Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-foreground">Citations</h3>
                  <span className="text-sm font-medium text-muted-foreground">{chat.sources.length}</span>
                </div>
                <div className="space-y-3">
                  {chat.sources.map((source) => (
                    <div key={source.id} className="flex items-start gap-3 group">
                      <div className="flex items-center justify-center w-8 h-8 rounded bg-muted flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-muted-foreground">📄</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-foreground hover:text-primary transition-colors line-clamp-2 break-words"
                        >
                          {source.title}
                        </a>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:text-primary transition-colors truncate block mt-0.5"
                        >
                          {new URL(source.url).hostname}
                        </a>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                      >
                        <a href={source.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
