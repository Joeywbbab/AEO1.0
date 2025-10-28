"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings, Trash2, Plus, TrendingUp, TrendingDown, ChevronRight, ChevronDown } from "lucide-react"
import { mockCompetitors, type Competitor } from "@/lib/mock-data"

type PromptData = {
  id: string
  prompt: string
  usage: string
  avgCitations: number
  pageUrls: string[]
}

type IntentData = {
  id: string
  intent: string
  prompts: PromptData[]
  trend: number // Added trend percentage for WoW change
}

type CitationData = {
  id: string
  competitor: string
  domain: string
  pageUrl: string
  usage: string
  avgCitations: number
}

const mockIntentData: IntentData[] = [
  {
    id: "1",
    intent: "Comparative",
    trend: 4.2,
    prompts: [
      {
        id: "1-1",
        prompt: "Compare project management tools for remote teams",
        usage: "45%",
        avgCitations: 3.2,
        pageUrls: ["/features/project-management", "/comparison/asana-vs-monday", "/blog/best-pm-tools-2024"],
      },
      {
        id: "1-2",
        prompt: "Which task management software is best for startups",
        usage: "38%",
        avgCitations: 2.9,
        pageUrls: ["/startup-guide", "/pricing/startup-plan", "/blog/startup-tools"],
      },
      {
        id: "1-3",
        prompt: "Compare collaboration tools for distributed teams",
        usage: "35%",
        avgCitations: 3.1,
        pageUrls: ["/features/collaboration", "/integrations", "/case-studies/remote-work"],
      },
    ],
  },
  {
    id: "2",
    intent: "Transactional",
    trend: -2.1,
    prompts: [
      {
        id: "2-1",
        prompt: "How to set up automation workflows",
        usage: "32%",
        avgCitations: 2.8,
        pageUrls: ["/guides/automation-setup", "/tutorials/workflow-basics", "/docs/automation-api"],
      },
      {
        id: "2-2",
        prompt: "Buy project management software with free trial",
        usage: "29%",
        avgCitations: 2.6,
        pageUrls: ["/pricing", "/free-trial", "/plans/enterprise"],
      },
      {
        id: "2-3",
        prompt: "Sign up for team collaboration platform",
        usage: "27%",
        avgCitations: 2.5,
        pageUrls: ["/signup", "/plans/team", "/onboarding"],
      },
    ],
  },
  {
    id: "3",
    intent: "Informational",
    trend: 1.8,
    prompts: [
      {
        id: "3-1",
        prompt: "Best practices for agile project management",
        usage: "28%",
        avgCitations: 2.5,
        pageUrls: ["/resources/agile-guide", "/blog/agile-best-practices", "/case-studies/agile-success"],
      },
      {
        id: "3-2",
        prompt: "What is kanban methodology",
        usage: "25%",
        avgCitations: 2.3,
        pageUrls: ["/learn/kanban-basics", "/blog/kanban-explained", "/resources/methodology-guide"],
      },
      {
        id: "3-3",
        prompt: "How does sprint planning work",
        usage: "22%",
        avgCitations: 2.1,
        pageUrls: ["/guides/sprint-planning", "/blog/scrum-guide", "/templates/sprint-template"],
      },
    ],
  },
]

const mockCitationData: CitationData[] = [
  {
    id: "1",
    competitor: "ABC",
    domain: "abc.com",
    pageUrl: "/features/collaboration",
    usage: "38%",
    avgCitations: 4.1,
  },
  {
    id: "2",
    competitor: "DEF",
    domain: "def.io",
    pageUrl: "/blog/remote-teams",
    usage: "29%",
    avgCitations: 3.5,
  },
  {
    id: "3",
    competitor: "GHJ",
    domain: "ghj.com",
    pageUrl: "/solutions/enterprise",
    usage: "24%",
    avgCitations: 3.2,
  },
]

export default function CompetitorsPage() {
  const [mentionFilter, setMentionFilter] = React.useState("competitor")
  const [competitorFilter, setCompetitorFilter] = React.useState("all")
  const [expandedPrompts, setExpandedPrompts] = React.useState<Set<string>>(new Set())

  const [competitors, setCompetitors] = React.useState<Competitor[]>(mockCompetitors)
  const [newCompetitorName, setNewCompetitorName] = React.useState("")
  const [newCompetitorDomain, setNewCompetitorDomain] = React.useState("")
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  const calculateIntentAverages = (prompts: PromptData[]) => {
    const totalVisibility = prompts.reduce((sum, p) => sum + Number.parseFloat(p.usage), 0)
    const avgVisibility = (totalVisibility / prompts.length).toFixed(1)

    const totalRank = prompts.reduce((sum, p) => sum + p.avgCitations, 0)
    const avgRank = (totalRank / prompts.length).toFixed(1)

    return { avgVisibility: `${avgVisibility}%`, avgRank: Number.parseFloat(avgRank) }
  }

  const togglePrompt = (promptId: string) => {
    setExpandedPrompts((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(promptId)) {
        newSet.delete(promptId)
      } else {
        newSet.add(promptId)
      }
      return newSet
    })
  }

  const handleAddCompetitor = () => {
    if (newCompetitorName.trim() && newCompetitorDomain.trim()) {
      const newCompetitor: Competitor = {
        id: Date.now().toString(),
        name: newCompetitorName.trim(),
        domain: newCompetitorDomain.trim(),
        addedDate: new Date().toISOString().split("T")[0],
      }
      setCompetitors([...competitors, newCompetitor])
      setNewCompetitorName("")
      setNewCompetitorDomain("")
    }
  }

  const handleDeleteCompetitor = (id: string) => {
    setCompetitors(competitors.filter((c) => c.id !== id))
  }

  return (
    <div className="flex h-full flex-col">
      {/* Page Header */}
      <div className="border-b border-border bg-card px-8 py-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Competitors</h1>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Manage Competitors
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[500px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Manage Competitors</DialogTitle>
                <DialogDescription>Add or remove competitors to track in your analysis.</DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-6">
                {/* Add New Competitor Form */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Add New Competitor</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="competitor-name">Competitor Name</Label>
                      <Input
                        id="competitor-name"
                        placeholder="e.g., Jira"
                        value={newCompetitorName}
                        onChange={(e) => setNewCompetitorName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="competitor-domain">Domain</Label>
                      <Input
                        id="competitor-domain"
                        placeholder="e.g., atlassian.com/jira"
                        value={newCompetitorDomain}
                        onChange={(e) => setNewCompetitorDomain(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleAddCompetitor} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Competitor
                    </Button>
                  </div>
                </div>

                {/* Current Competitors List */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Current Competitors ({competitors.length})</h3>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {competitors.map((competitor) => (
                      <div
                        key={competitor.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-muted/50"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-sm">{competitor.name}</p>
                          <p className="text-xs text-muted-foreground">{competitor.domain}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCompetitor(competitor.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="intent" className="flex-1 flex flex-col">
        <div className="border-b border-border bg-card px-8">
          <TabsList className="bg-transparent h-12">
            <TabsTrigger value="intent" className="data-[state=active]:bg-secondary">
              Intent
            </TabsTrigger>
            <TabsTrigger value="citation" className="data-[state=active]:bg-secondary">
              Citation
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto">
          {/* Intent Tab */}
          <TabsContent value="intent" className="mt-0 h-full">
            <div className="p-6 space-y-4">
              {/* Filter */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Filter: Mention</span>
                <Select value={mentionFilter} onValueChange={setMentionFilter}>
                  <SelectTrigger className="w-[200px] bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="competitor">Competitor</SelectItem>
                    <SelectItem value="u">U</SelectItem>
                    <SelectItem value="comp-and-u">Comp & U</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {mockIntentData.map((intent) => {
                  const { avgVisibility, avgRank } = calculateIntentAverages(intent.prompts)
                  const isPositiveTrend = intent.trend > 0

                  return (
                    <Card key={intent.id} className="overflow-hidden">
                      <CardHeader className="bg-muted/30 pb-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-foreground">{intent.intent} Intent</h3>
                          <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">Avg Visibility:</span>
                              <span className="font-medium text-foreground">{avgVisibility}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">Avg Rank:</span>
                              <span className="font-medium text-foreground">{avgRank}</span>
                            </div>
                            <div
                              className={`flex items-center gap-1 ${
                                isPositiveTrend ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {isPositiveTrend ? (
                                <TrendingUp className="h-4 w-4" />
                              ) : (
                                <TrendingDown className="h-4 w-4" />
                              )}
                              <span className="font-medium">
                                {isPositiveTrend ? "+" : ""}
                                {intent.trend}% WoW
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-muted/20 hover:bg-muted/20">
                              <TableHead className="font-semibold">Related Prompt</TableHead>
                              <TableHead className="font-semibold w-[120px]">Visibility</TableHead>
                              <TableHead className="font-semibold w-[120px]">Avg. Rank</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {intent.prompts.map((prompt) => {
                              const isExpanded = expandedPrompts.has(prompt.id)
                              return (
                                <React.Fragment key={prompt.id}>
                                  {/* Prompt Row (Level 2) */}
                                  <TableRow
                                    className="cursor-pointer hover:bg-muted/50"
                                    onClick={() => togglePrompt(prompt.id)}
                                  >
                                    <TableCell className="font-medium">
                                      <div className="flex items-center gap-2">
                                        {isExpanded ? (
                                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                        )}
                                        <span>{prompt.prompt}</span>
                                      </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{prompt.usage}</TableCell>
                                    <TableCell className="text-muted-foreground">{prompt.avgCitations}</TableCell>
                                  </TableRow>

                                  {/* Page URLs (Level 3) - shown when expanded */}
                                  {isExpanded &&
                                    prompt.pageUrls.map((url, index) => (
                                      <TableRow key={`${prompt.id}-url-${index}`} className="bg-muted/10">
                                        <TableCell colSpan={3} className="pl-12 py-2">
                                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <span>→</span>
                                            <span className="font-mono">{url}</span>
                                          </div>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                </React.Fragment>
                              )
                            })}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </TabsContent>

          {/* Citation Tab */}
          <TabsContent value="citation" className="mt-0 h-full">
            <div className="p-6 space-y-4">
              {/* Filter */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Filter:</span>
                <Select value={competitorFilter} onValueChange={setCompetitorFilter}>
                  <SelectTrigger className="w-[200px] bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Competitors</SelectItem>
                    <SelectItem value="competitor">Competitor</SelectItem>
                    <SelectItem value="u">U</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Citation Table */}
              <div className="rounded-lg border border-border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Competitor</TableHead>
                      <TableHead className="font-semibold">Domain</TableHead>
                      <TableHead className="font-semibold">Page URL</TableHead>
                      <TableHead className="font-semibold">Usage</TableHead>
                      <TableHead className="font-semibold">Avg. Citations</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCitationData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium text-foreground">{item.competitor}</TableCell>
                        <TableCell className="text-muted-foreground">{item.domain}</TableCell>
                        <TableCell className="text-muted-foreground">{item.pageUrl}</TableCell>
                        <TableCell className="text-muted-foreground">{item.usage}</TableCell>
                        <TableCell className="text-muted-foreground">{item.avgCitations}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
