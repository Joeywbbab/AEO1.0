"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { RefreshCw, TrendingUp, Minus, Calendar, Filter, Tag, Info } from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import {
  mockDashboardVisibilityTrend,
  mockDashboardCompetitiveRanking,
  mockRecentChats,
  mockTopSources,
} from "@/lib/mock-data"

export default function DashboardPage() {
  return (
    <TooltipProvider>
      <div className="flex h-full flex-col">
        <div className="border-b border-border bg-card">
          <div className="flex h-16 items-center gap-4 px-6">
            <div className="flex items-center gap-2">
              <Select defaultValue="30d">
                <SelectTrigger className="w-[160px] bg-background">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="14d">Last 14 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-[160px] bg-background">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Models</SelectItem>
                  <SelectItem value="gpt">GPT</SelectItem>
                  <SelectItem value="perplexity">Perplexity</SelectItem>
                  <SelectItem value="ai-overview">AI Overview</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all-tags">
                <SelectTrigger className="w-[160px] bg-background">
                  <Tag className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-tags">All Tags</SelectItem>
                  <SelectItem value="remote">remote</SelectItem>
                  <SelectItem value="collaboration">collaboration</SelectItem>
                  <SelectItem value="comparison">comparison</SelectItem>
                  <SelectItem value="agile">agile</SelectItem>
                  <SelectItem value="automation">automation</SelectItem>
                  <SelectItem value="workflows">workflows</SelectItem>
                  <SelectItem value="features">features</SelectItem>
                  <SelectItem value="pricing">pricing</SelectItem>
                  <SelectItem value="startups">startups</SelectItem>
                  <SelectItem value="ai">AI</SelectItem>
                  <SelectItem value="memory">memory</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon" className="bg-background">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="flex h-full flex-col gap-6 p-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Overview of visibility trends, competitive rankings, and recent activity
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-secondary/50 rounded-lg border border-border">
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs text-muted-foreground flex items-center gap-1.5">
                    Visibility
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Percentage of chats mentioning each brand</p>
                      </TooltipContent>
                    </Tooltip>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">78%</span>
                    <div className="flex items-center gap-1 text-chart-3">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-medium">+5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-secondary/50 rounded-lg border border-border">
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs text-muted-foreground flex items-center gap-1.5">
                    Citation Rate
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Percentage of AI answers citing your domain as a source</p>
                      </TooltipContent>
                    </Tooltip>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">45%</span>
                    <div className="flex items-center gap-1 text-chart-3">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-medium">+3%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-secondary/50 rounded-lg border border-border">
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs text-muted-foreground flex items-center gap-1.5">
                    AEO Score
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Overall Answer Engine Optimization score</p>
                      </TooltipContent>
                    </Tooltip>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">78</span>
                    <div className="flex items-center gap-1 text-chart-3">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-medium">+2</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-secondary/50 rounded-lg border border-border">
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs text-muted-foreground flex items-center gap-1.5">
                    Share of Voice
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Your brand's percentage of total mentions</p>
                      </TooltipContent>
                    </Tooltip>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">22%</span>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Minus className="h-4 w-4" />
                      <span className="text-sm font-medium">0%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Visibility Trend Chart */}
              <Card className="rounded-lg border border-border">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-medium">Visibility Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mockDashboardVisibilityTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" stroke="#999" style={{ fontSize: "12px" }} />
                      <YAxis stroke="#999" style={{ fontSize: "12px" }} />
                      <Line
                        type="monotone"
                        dataKey="yourBrand"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        name="Your Brand"
                        dot={{ r: 3 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="competitorA"
                        stroke="#9ca3af"
                        strokeWidth={2}
                        name="Competitor A"
                        dot={{ r: 3 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="competitorB"
                        stroke="#d1d5db"
                        strokeWidth={2}
                        name="Competitor B"
                        dot={{ r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Right: Industry Ranking Table */}
              <Card className="rounded-lg border border-border">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-medium">Industry Ranking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="font-medium text-xs">Competitor</TableHead>
                          <TableHead className="font-medium text-xs text-center">Visibility</TableHead>
                          <TableHead className="font-medium text-xs text-center">Avg. Rank</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockDashboardCompetitiveRanking.map((row, index) => (
                          <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                            <TableCell className="text-sm py-4 font-medium">{row.brand}</TableCell>
                            <TableCell className="text-sm text-center">{row.visibilityScore}</TableCell>
                            <TableCell className="text-sm text-center font-semibold">{row.rank.toFixed(1)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Recent Chats - spans 2 columns */}
              <Card className="rounded-lg border border-border lg:col-span-2">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-medium">Recent Chats</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    Latest AI conversations mentioning your brand
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="font-medium text-xs w-12">Chat</TableHead>
                          <TableHead className="font-medium text-xs">Title</TableHead>
                          <TableHead className="font-medium text-xs text-center">Mentions</TableHead>
                          <TableHead className="font-medium text-xs text-right">Created</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockRecentChats.map((chat) => (
                          <TableRow key={chat.id} className="hover:bg-muted/30 transition-colors">
                            <TableCell className="text-center py-4">
                              <span className="text-xl">{chat.modelIcon}</span>
                            </TableCell>
                            <TableCell className="text-sm py-4">
                              <div>{chat.title}</div>
                            </TableCell>
                            <TableCell className="py-4">
                              <div className="flex items-center justify-center gap-1.5">
                                {chat.mentions.map((mention, idx) => (
                                  <div
                                    key={idx}
                                    className="flex h-6 w-6 items-center justify-center rounded-md text-xs font-semibold text-white"
                                    style={{ backgroundColor: mention.color }}
                                    title={mention.brand}
                                  >
                                    {mention.icon}
                                  </div>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="text-sm text-right text-muted-foreground py-4">
                              {chat.created}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Right: Top Sources - spans 1 column */}
              <Card className="rounded-lg border border-border lg:col-span-1">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-medium">Top Sources</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    Most cited domains in recent conversations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="font-medium text-xs text-center w-16">Rank</TableHead>
                          <TableHead className="font-medium text-xs">Domain</TableHead>
                          <TableHead className="font-medium text-xs text-right">Avg. Citations</TableHead>
                          <TableHead className="font-medium text-xs text-right">Usage</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockTopSources.map((source) => (
                          <TableRow key={source.rank} className="hover:bg-muted/30 transition-colors">
                            <TableCell className="text-center py-4">
                              <span className="text-sm font-semibold text-primary">#{source.rank}</span>
                            </TableCell>
                            <TableCell className="text-sm py-4 font-medium">{source.domain}</TableCell>
                            <TableCell className="text-sm text-right py-4">{source.count}</TableCell>
                            <TableCell className="text-sm text-right py-4">
                              <span className="text-muted-foreground">{source.percentage}%</span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
