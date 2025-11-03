"use client"

import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { mockPromptDetails } from "@/lib/mock-data"
import { notFound, useParams } from "next/navigation"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, Filter } from "lucide-react"

export default function PromptDetailPage() {
  const params = useParams()
  const id = params.id as string
  const prompt = mockPromptDetails[id]
  const [expandedChatId, setExpandedChatId] = useState<string | null>(null)
  const [timeFilter, setTimeFilter] = useState("Last 30 days")
  const [modelFilter, setModelFilter] = useState("All Models")

  if (!prompt) {
    notFound()
  }

  const toggleChat = (chatId: string) => {
    setExpandedChatId(expandedChatId === chatId ? null : chatId)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header with Breadcrumb */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center gap-4 mb-3">
          <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
            <Link href="/analytics/prompts">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <BreadcrumbNav
            items={[
              { label: "Situation", href: "/analytics/prompts" },
              { label: "Prompts", href: "/analytics/prompts" },
              { label: "Detail" },
            ]}
          />
        </div>
        <h1 className="text-xl font-semibold text-foreground">{prompt.prompt}</h1>
        <div className="flex items-center gap-3 mt-3">
          {/* Time Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-2 bg-transparent">
                <Calendar className="h-3.5 w-3.5" />
                {timeFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setTimeFilter("Last 7 days")}>Last 7 days</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeFilter("Last 14 days")}>Last 14 days</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeFilter("Last 30 days")}>Last 30 days</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeFilter("Custom")}>Custom</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Model Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-2 bg-transparent">
                <Filter className="h-3.5 w-3.5" />
                {modelFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setModelFilter("All Models")}>All Models</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setModelFilter("ChatGPT")}>ChatGPT</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setModelFilter("Claude")}>Claude</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setModelFilter("Gemini")}>Gemini</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setModelFilter("Perplexity")}>Perplexity</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6 bg-card border-border">
              <h2 className="text-base font-semibold text-foreground mb-4">Visibility Trend</h2>
              <div className="p-4">
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={prompt.visibilityTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="date"
                      stroke="#e0e0e0"
                      fontSize={11}
                      tick={{ fill: "#999" }}
                      tickFormatter={(value) =>
                        new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                      }
                    />
                    <YAxis stroke="#e0e0e0" fontSize={11} tick={{ fill: "#999" }} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e0e0e0",
                        borderRadius: "6px",
                        fontSize: "12px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))", r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h2 className="text-base font-semibold text-foreground mb-4">Industry Ranking</h2>
              <div className="rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead className="text-muted-foreground">Competitor</TableHead>
                      <TableHead className="text-muted-foreground text-right">Visibility</TableHead>
                      <TableHead className="text-muted-foreground text-right">Avg. Rank</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {prompt.competitorMentions.map((comp) => (
                      <TableRow key={comp.competitor} className="border-border">
                        <TableCell className="font-medium text-foreground">
                          {comp.competitor.includes("Me") ? (
                            <span className="text-primary">{comp.competitor}</span>
                          ) : (
                            comp.competitor
                          )}
                        </TableCell>
                        <TableCell className="text-right text-foreground">{comp.visibility}</TableCell>
                        <TableCell className="text-right text-foreground">{comp.avgRank.toFixed(1)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chat History on left, Top Sources on right */}
            <Card className="bg-card border-border">
              <div className="px-6 py-4 border-b border-border">
                <h2 className="text-base font-semibold text-foreground">Chat History</h2>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground w-12"></TableHead>
                    <TableHead className="text-muted-foreground">Chat</TableHead>
                    <TableHead className="text-muted-foreground text-right">Mentions</TableHead>
                    <TableHead className="text-muted-foreground text-right w-32">Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prompt.chatHistory.map((chat) => (
                    <>
                      <TableRow
                        key={chat.id}
                        className="border-border cursor-pointer hover:bg-muted/30"
                        onClick={() => toggleChat(chat.id)}
                      >
                        <TableCell className="text-center">
                          <span className="text-xl">{chat.modelIcon}</span>
                        </TableCell>
                        <TableCell className="text-foreground max-w-xs">
                          <div className="truncate">{chat.response}</div>
                        </TableCell>
                        <TableCell className="text-right">
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
                        <TableCell className="text-right text-muted-foreground text-sm">{chat.createdAt}</TableCell>
                      </TableRow>
                      {expandedChatId === chat.id && (
                        <TableRow className="border-border bg-muted/10">
                          <TableCell colSpan={4} className="p-6">
                            <div className="space-y-4">
                              {/* Full Conversation */}
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

                              {/* Citations */}
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
            </Card>

            <Card className="p-6 bg-card border-border">
              <h2 className="text-base font-semibold text-foreground mb-4">Top Sources</h2>
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground">Domain</TableHead>
                    <TableHead className="text-muted-foreground text-right">Avg. Citations</TableHead>
                    <TableHead className="text-muted-foreground text-right">Usage</TableHead>
                    <TableHead className="text-muted-foreground"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prompt.topSources.map((source, idx) => (
                    <TableRow key={idx} className="border-border">
                      <TableCell className="font-medium text-foreground">{source.domain}</TableCell>
                      <TableCell className="text-right text-foreground">{source.avgCitations.toFixed(1)}</TableCell>
                      <TableCell className="text-right text-foreground">{source.usage.toFixed(1)}%</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
                          <a href={source.pageUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
