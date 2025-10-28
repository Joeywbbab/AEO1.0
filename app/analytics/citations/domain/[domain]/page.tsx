"use client"

import Link from "next/link"
import { ChevronRight, ExternalLink } from "lucide-react"
import { notFound, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockCitations } from "@/lib/mock-data"
import { useState, useMemo } from "react"

export default function DomainDetailPage() {
  const params = useParams()
  const domain = decodeURIComponent(params.domain as string)
  const [activeTab, setActiveTab] = useState<"urls" | "chats">("urls")
  const [expandedChatId, setExpandedChatId] = useState<string | null>(null)

  // Filter citations for this domain
  const domainCitations = mockCitations.filter((c) => c.domain === domain)

  if (domainCitations.length === 0) {
    notFound()
  }

  const totalDomainUsage = useMemo(() => {
    return domainCitations.reduce((sum, c) => sum + c.usedTotal, 0)
  }, [domainCitations])

  const domainChats = [
    {
      id: "chat-1",
      modelIcon: "🤖",
      response:
        "The best tools for building AI companions with memory combine long-term conversation storage, semantic recall, and seamless integration with large language models...",
      brandMentions: [
        { icon: "🔷", color: "#3b82f6" },
        { icon: "L", color: "#10b981" },
        { icon: "R", color: "#8b5cf6" },
      ],
      createdAt: "9 hr. ago",
      fullConversation: {
        query: "What are the best tools for building AI companions with memory?",
        response:
          "The best tools for building AI companions with memory combine long-term conversation storage, semantic recall, and seamless integration with large language models. Key solutions include LangChain for orchestration, vector databases like Pinecone or Weaviate for semantic memory, and frameworks like MemGPT for managing conversation context efficiently.",
      },
      citations: [
        {
          icon: "L",
          domain: domain,
          pageTitle: "Memory Management in LangChain",
          pageUrl: `https://${domain}/docs/memory`,
        },
        {
          icon: "P",
          domain: domain,
          pageTitle: "Building Conversational AI",
          pageUrl: `https://${domain}/guides/conversational-ai`,
        },
      ],
    },
    {
      id: "chat-2",
      modelIcon: "🔍",
      response:
        "Building AI companions that remember past interactions involves utilizing both technical and design strategies. The key tools to consider for this are a combination of...",
      brandMentions: [
        { icon: "R", color: "#8b5cf6" },
        { icon: "L", color: "#10b981" },
      ],
      createdAt: "1 day ago",
      fullConversation: {
        query: "How do I build AI companions that remember conversations?",
        response:
          "Building AI companions that remember past interactions involves utilizing both technical and design strategies. The key tools to consider include vector databases for semantic search, conversation history management systems, and context window optimization techniques. Popular frameworks like LangChain provide built-in memory modules.",
      },
      citations: [
        {
          icon: "L",
          domain: domain,
          pageTitle: "Conversation Memory Patterns",
          pageUrl: `https://${domain}/patterns/memory`,
        },
      ],
    },
  ]

  const toggleChat = (chatId: string) => {
    setExpandedChatId(expandedChatId === chatId ? null : chatId)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border bg-card">
        <div className="px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Link href="/analytics/citations" className="hover:text-foreground transition-colors">
              Citations
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{domain}</span>
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-1">{domain}</h1>
          <p className="text-sm text-muted-foreground">
            {domainCitations.length} URL{domainCitations.length !== 1 ? "s" : ""} from this domain
          </p>
        </div>

        <div className="px-8 flex items-center gap-2 border-t border-border pt-3">
          <button
            onClick={() => setActiveTab("urls")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === "urls"
                ? "bg-background text-foreground border-2 border-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            URLs
          </button>
          <button
            onClick={() => setActiveTab("chats")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === "chats"
                ? "bg-background text-foreground border-2 border-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            Chats
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {activeTab === "urls" && (
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-b border-border">
                  <TableHead className="text-muted-foreground font-medium py-4 px-6">URL</TableHead>
                  <TableHead className="text-muted-foreground font-medium py-4 px-6">Mentioned</TableHead>
                  <TableHead className="text-muted-foreground font-medium py-4 px-6">Mentions</TableHead>
                  <TableHead className="text-muted-foreground font-medium py-4 px-6">
                    <div className="flex items-center gap-1">
                      Usage (%)
                      <span className="text-xs">↕</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium py-4 px-6">
                    <div className="flex items-center gap-1">
                      Avg. Citations
                      <span className="text-xs">↕</span>
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {domainCitations.map((citation) => {
                  const usagePercentage = ((citation.usedTotal / totalDomainUsage) * 100).toFixed(1)

                  return (
                    <TableRow key={citation.id} className="hover:bg-muted/20 border-b border-border last:border-0">
                      <TableCell className="max-w-md py-4 px-6">
                        <div className="flex items-start gap-3">
                          <div className="flex h-6 w-6 items-center justify-center rounded bg-muted flex-shrink-0 mt-0.5">
                            <span className="text-xs font-semibold">{citation.domain.charAt(0).toUpperCase()}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground font-medium line-clamp-1 mb-0.5">
                              {citation.pageTitle}
                            </p>
                            <div className="flex items-center gap-2">
                              <p className="text-xs text-muted-foreground line-clamp-1">{citation.url}</p>
                              <Button variant="ghost" size="sm" className="h-4 w-4 p-0 flex-shrink-0" asChild>
                                <a href={citation.url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <span className="text-sm text-foreground">{citation.mentioned ? "Yes" : "No"}</span>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <div className="flex gap-1.5">
                          {citation.brandMentions.map((brand) => (
                            <div
                              key={brand.brand}
                              className="flex h-6 w-6 items-center justify-center rounded-md text-xs font-semibold text-white"
                              style={{ backgroundColor: brand.color }}
                              title={brand.brand}
                            >
                              {brand.icon}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <span className="text-sm text-foreground font-medium">{usagePercentage}%</span>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <span className="text-sm text-foreground font-medium">{citation.avgCitations}</span>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )}

        {activeTab === "chats" && (
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-b border-border">
                  <TableHead className="text-muted-foreground font-medium py-4 px-6 w-12"></TableHead>
                  <TableHead className="text-muted-foreground font-medium py-4 px-6">Chat</TableHead>
                  <TableHead className="text-muted-foreground font-medium py-4 px-6 text-right">Mentions</TableHead>
                  <TableHead className="text-muted-foreground font-medium py-4 px-6 text-right w-32">Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {domainChats.map((chat) => (
                  <>
                    <TableRow
                      key={chat.id}
                      className="border-b border-border cursor-pointer hover:bg-muted/20 last:border-0"
                      onClick={() => toggleChat(chat.id)}
                    >
                      <TableCell className="text-center py-4 px-6">
                        <span className="text-xl">{chat.modelIcon}</span>
                      </TableCell>
                      <TableCell className="text-foreground max-w-2xl py-4 px-6">
                        <div className="truncate">{chat.response}</div>
                      </TableCell>
                      <TableCell className="text-right py-4 px-6">
                        <div className="flex items-center justify-end gap-1.5">
                          {chat.brandMentions.map((mention, idx) => (
                            <div
                              key={idx}
                              className="inline-flex items-center justify-center w-6 h-6 rounded text-xs font-medium text-white"
                              style={{ backgroundColor: mention.color }}
                            >
                              {mention.icon}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground text-sm py-4 px-6">
                        {chat.createdAt}
                      </TableCell>
                    </TableRow>
                    {expandedChatId === chat.id && (
                      <TableRow className="border-b border-border bg-muted/10 last:border-0">
                        <TableCell colSpan={4} className="p-6">
                          <div className="space-y-4">
                            {chat.fullConversation && (
                              <div className="space-y-3">
                                <div>
                                  <div className="text-sm font-semibold text-foreground mb-2">Query:</div>
                                  <div className="text-sm text-muted-foreground">{chat.fullConversation.query}</div>
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-foreground mb-2">Response:</div>
                                  <div className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                                    {chat.fullConversation.response}
                                  </div>
                                </div>
                              </div>
                            )}

                            {chat.citations && chat.citations.length > 0 && (
                              <div className="pt-4 border-t border-border">
                                <div className="text-sm font-semibold text-foreground mb-3">Citations:</div>
                                <div className="space-y-2">
                                  {chat.citations.map((citation, idx) => (
                                    <div key={idx} className="flex items-center gap-3 text-sm">
                                      <div className="inline-flex items-center justify-center w-6 h-6 rounded bg-muted text-xs font-medium">
                                        {citation.icon}
                                      </div>
                                      <div className="flex-1">
                                        <div className="font-medium text-foreground">{citation.domain}</div>
                                        <div className="text-xs text-muted-foreground truncate">
                                          {citation.pageTitle}
                                        </div>
                                      </div>
                                      <Button variant="ghost" size="sm" asChild className="h-7 w-7 p-0">
                                        <a href={citation.pageUrl} target="_blank" rel="noopener noreferrer">
                                          <ExternalLink className="h-3.5 w-3.5" />
                                        </a>
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  )
}
