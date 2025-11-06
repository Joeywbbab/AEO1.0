"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
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
import { Settings, Trash2, Plus, TrendingUp, TrendingDown, ExternalLink, ChevronDown, ChevronRight } from "lucide-react"
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { mockCompetitors, type Competitor } from "@/lib/mock-data"
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  Cell,
} from "recharts"

// Types for competitor analytics
type IntentType = "Comparative" | "Transactional" | "Informational"

type CompetitorData = {
  id: string
  name: string
  visibility: number // 0-100
  usage: number // citation count
  dominantIntent: IntentType
  mentionVolume: number // overall mention volume
  trend: number // week-over-week percentage
}

type IntentDistributionData = {
  competitor: string
  Comparative: number
  Transactional: number
  Informational: number
}

type VisibilityContributor = {
  id: string
  competitor: string
  prompt: string
  intent: IntentType
  pageUrl: string
  visibilityScore: number
  avgRank: number
  mentionedBrands?: string[] // Array of brand names mentioned
}

type DomainRecommendation = {
  id: string
  domain: string
  dominantIntent: IntentType
  mentions: number
  citationVolume: number
  mentionedBrands?: string[] // Array of brand names mentioned in this domain
}

// Mock data for the new dashboard
const mockCompetitorData: CompetitorData[] = [
  {
    id: "1",
    name: "Monday.com",
    visibility: 82,
    usage: 156,
    dominantIntent: "Comparative",
    mentionVolume: 320,
    trend: 4.2,
  },
  {
    id: "2",
    name: "Trello",
    visibility: 68,
    usage: 98,
    dominantIntent: "Informational",
    mentionVolume: 245,
    trend: -1.3,
  },
  {
    id: "3",
    name: "ClickUp",
    visibility: 76,
    usage: 134,
    dominantIntent: "Comparative",
    mentionVolume: 289,
    trend: 2.8,
  },
  {
    id: "4",
    name: "Notion",
    visibility: 72,
    usage: 112,
    dominantIntent: "Informational",
    mentionVolume: 267,
    trend: 1.5,
  },
  {
    id: "5",
    name: "Asana (You)",
    visibility: 85,
    usage: 178,
    dominantIntent: "Transactional",
    mentionVolume: 385,
    trend: 5.7,
  },
  {
    id: "6",
    name: "Jira",
    visibility: 79,
    usage: 145,
    dominantIntent: "Comparative",
    mentionVolume: 298,
    trend: 0.9,
  },
]

const mockIntentDistribution: IntentDistributionData[] = [
  { competitor: "Monday.com", Comparative: 45, Transactional: 28, Informational: 27 },
  { competitor: "Trello", Comparative: 22, Transactional: 18, Informational: 60 },
  { competitor: "ClickUp", Comparative: 48, Transactional: 32, Informational: 20 },
  { competitor: "Notion", Comparative: 25, Transactional: 20, Informational: 55 },
  { competitor: "Asana (You)", Comparative: 38, Transactional: 42, Informational: 20 },
  { competitor: "Jira", Comparative: 52, Transactional: 30, Informational: 18 },
]

const mockVisibilityContributors: VisibilityContributor[] = [
  {
    id: "1",
    competitor: "Monday.com",
    prompt: "Best project management tools for remote teams",
    intent: "Comparative",
    pageUrl: "/features/remote-collaboration",
    visibilityScore: 92,
    avgRank: 1.8,
    mentionedBrands: ["Monday.com", "Asana", "Trello", "ClickUp", "Notion"],
  },
  {
    id: "2",
    competitor: "Monday.com",
    prompt: "Monday vs Asana comparison",
    intent: "Comparative",
    pageUrl: "/compare/asana",
    visibilityScore: 88,
    avgRank: 1.5,
    mentionedBrands: ["Monday.com", "Asana"],
  },
  {
    id: "3",
    competitor: "Trello",
    prompt: "Simple task management for small teams",
    intent: "Informational",
    pageUrl: "/getting-started",
    visibilityScore: 85,
    avgRank: 2.3,
    mentionedBrands: ["Trello", "Asana", "Notion"],
  },
  {
    id: "4",
    competitor: "ClickUp",
    prompt: "All-in-one productivity platform",
    intent: "Comparative",
    pageUrl: "/features/all-in-one",
    visibilityScore: 90,
    avgRank: 1.9,
    mentionedBrands: ["ClickUp", "Monday.com", "Asana", "Notion"],
  },
  {
    id: "5",
    competitor: "Asana (You)",
    prompt: "How to automate project workflows",
    intent: "Transactional",
    pageUrl: "/automation/workflows",
    visibilityScore: 95,
    avgRank: 1.2,
    mentionedBrands: ["Asana", "Monday.com", "ClickUp"],
  },
  {
    id: "6",
    competitor: "Asana (You)",
    prompt: "Project management software with AI features",
    intent: "Transactional",
    pageUrl: "/features/ai-powered",
    visibilityScore: 93,
    avgRank: 1.4,
    mentionedBrands: ["Asana", "ClickUp"],
  },
  {
    id: "7",
    competitor: "Notion",
    prompt: "What is a collaborative workspace",
    intent: "Informational",
    pageUrl: "/guides/workspace-basics",
    visibilityScore: 87,
    avgRank: 2.1,
    mentionedBrands: ["Notion", "Monday.com", "Asana", "Trello"],
  },
  {
    id: "8",
    competitor: "Jira",
    prompt: "Agile project management tools comparison",
    intent: "Comparative",
    pageUrl: "/solutions/agile",
    visibilityScore: 89,
    avgRank: 1.7,
    mentionedBrands: ["Jira", "Asana", "ClickUp", "Monday.com"],
  },
]

const mockDomainRecommendations: DomainRecommendation[] = [
  {
    id: "1",
    domain: "techcrunch.com",
    dominantIntent: "Informational",
    mentions: 156,
    citationVolume: 892,
    mentionedBrands: ["Asana", "Monday.com", "Trello", "ClickUp", "Notion", "Jira"],
  },
  {
    id: "2",
    domain: "forbes.com",
    dominantIntent: "Comparative",
    mentions: 142,
    citationVolume: 834,
    mentionedBrands: ["Asana", "Monday.com", "ClickUp", "Jira", "Notion"],
  },
  {
    id: "3",
    domain: "g2.com",
    dominantIntent: "Comparative",
    mentions: 138,
    citationVolume: 756,
    mentionedBrands: ["Asana", "Monday.com", "Trello", "ClickUp"],
  },
  {
    id: "4",
    domain: "capterra.com",
    dominantIntent: "Comparative",
    mentions: 125,
    citationVolume: 687,
    mentionedBrands: ["Asana", "Monday.com", "ClickUp", "Jira"],
  },
  {
    id: "5",
    domain: "pcmag.com",
    dominantIntent: "Informational",
    mentions: 118,
    citationVolume: 645,
    mentionedBrands: ["Asana", "Notion", "Trello"],
  },
  {
    id: "6",
    domain: "github.com",
    dominantIntent: "Transactional",
    mentions: 89,
    citationVolume: 512,
    mentionedBrands: ["Asana", "Jira"],
  },
  {
    id: "7",
    domain: "reddit.com",
    dominantIntent: "Informational",
    mentions: 76,
    citationVolume: 423,
    mentionedBrands: ["Asana", "Notion", "Monday.com", "Trello"],
  },
  {
    id: "8",
    domain: "medium.com",
    dominantIntent: "Informational",
    mentions: 64,
    citationVolume: 378,
    mentionedBrands: ["Asana", "Notion", "ClickUp"],
  },
]

// Intent colors - Color Hunt palette
const INTENT_COLORS: Record<IntentType, string> = {
  Comparative: "#E2A16F", // warm peach
  Transactional: "#D1D3D4", // light gray
  Informational: "#FFF0DD", // cream
}

export default function CompetitorsPage() {
  const router = useRouter()
  const [competitors, setCompetitors] = React.useState<Competitor[]>(mockCompetitors)
  const [newCompetitorName, setNewCompetitorName] = React.useState("")
  const [newCompetitorDomain, setNewCompetitorDomain] = React.useState("")
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [selectedCompetitor, setSelectedCompetitor] = React.useState<string>("all")
  const [selectedIntent, setSelectedIntent] = React.useState<string>("all")
  const [expandedCompetitors, setExpandedCompetitors] = React.useState<Set<string>>(new Set())

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
      setIsDialogOpen(false)
    }
  }

  const handleDeleteCompetitor = (id: string) => {
    setCompetitors(competitors.filter((c) => c.id !== id))
  }

  const toggleCompetitor = (competitorName: string) => {
    setExpandedCompetitors((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(competitorName)) {
        newSet.delete(competitorName)
      } else {
        newSet.add(competitorName)
      }
      return newSet
    })
  }

  // Custom tooltip for scatter chart
  const ScatterTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-foreground mb-2">{data.name}</p>
          <div className="space-y-1 text-sm">
            <p className="text-muted-foreground">
              Visibility: <span className="text-foreground font-medium">{data.visibility}%</span>
            </p>
            <p className="text-muted-foreground">
              Usage: <span className="text-foreground font-medium">{data.usage} citations</span>
            </p>
            <p className="text-muted-foreground">
              Intent: <span className="text-foreground font-medium">{data.dominantIntent}</span>
            </p>
            <p className="text-muted-foreground">
              Volume: <span className="text-foreground font-medium">{data.mentionVolume} mentions</span>
            </p>
            <div className="flex items-center gap-1 pt-1">
              {data.trend > 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={data.trend > 0 ? "text-green-500" : "text-red-500"}>
                {data.trend > 0 ? "+" : ""}
                {data.trend}% WoW
              </span>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  // Filter data based on selections - applies to ALL sections
  const filteredCompetitorData = mockCompetitorData.filter(
    (item) =>
      (selectedCompetitor === "all" || item.name === selectedCompetitor) &&
      (selectedIntent === "all" || item.dominantIntent === selectedIntent)
  )

  const filteredIntentDistribution = mockIntentDistribution.filter(
    (item) => selectedCompetitor === "all" || item.competitor === selectedCompetitor
  )

  const filteredContributors = mockVisibilityContributors.filter(
    (item) =>
      (selectedCompetitor === "all" || item.competitor === selectedCompetitor) &&
      (selectedIntent === "all" || item.intent === selectedIntent)
  )

  const filteredDomains = mockDomainRecommendations.filter(
    (item) => selectedIntent === "all" || item.dominantIntent === selectedIntent
  )

  // Group contributors by competitor
  const groupedContributors = React.useMemo(() => {
    const groups: Record<string, typeof filteredContributors> = {}
    filteredContributors.forEach((item) => {
      if (!groups[item.competitor]) {
        groups[item.competitor] = []
      }
      groups[item.competitor].push(item)
    })
    return groups
  }, [filteredContributors])

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Page Header */}
      <div className="border-b border-border bg-card px-8 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Competitor Analysis</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Visibility, usage, and intent analysis across competitors
            </p>
          </div>

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

      {/* Filters Bar */}
      <div className="border-b border-border bg-card px-8 py-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Competitor:</span>
            <Select value={selectedCompetitor} onValueChange={setSelectedCompetitor}>
              <SelectTrigger className="w-[180px] bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Competitors</SelectItem>
                {mockCompetitorData.map((comp) => (
                  <SelectItem key={comp.id} value={comp.name}>
                    {comp.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Intent:</span>
            <Select value={selectedIntent} onValueChange={setSelectedIntent}>
              <SelectTrigger className="w-[160px] bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Intents</SelectItem>
                <SelectItem value="Comparative">Comparative</SelectItem>
                <SelectItem value="Transactional">Transactional</SelectItem>
                <SelectItem value="Informational">Informational</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Legend */}
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: INTENT_COLORS.Comparative }} />
              <span className="text-xs text-muted-foreground">Comparative</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: INTENT_COLORS.Transactional }} />
              <span className="text-xs text-muted-foreground">Transactional</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: INTENT_COLORS.Informational }} />
              <span className="text-xs text-muted-foreground">Informational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-3 gap-6" style={{ height: "calc(100vh - 220px)" }}>
          {/* Top Left: Scatter Chart */}
          <Card className="flex flex-col col-span-1">
            <CardHeader className="pb-3">
              <CardTitle>Visibility vs Usage Matrix</CardTitle>
              <CardDescription>
                Bubble size represents mention volume. Color indicates dominant intent type.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1" style={{ minHeight: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis
                    type="number"
                    dataKey="visibility"
                    name="Visibility"
                    unit="%"
                    domain={[60, 90]}
                    stroke="#71717a"
                    tick={{ fill: "#a1a1aa", fontSize: 11 }}
                    label={{ value: "Visibility %", position: "bottom", offset: 0, fill: "#a1a1aa", fontSize: 11 }}
                  />
                  <YAxis
                    type="number"
                    dataKey="usage"
                    name="Citations"
                    domain={[80, 190]}
                    stroke="#71717a"
                    tick={{ fill: "#a1a1aa", fontSize: 11 }}
                    label={{ value: "Citations (times)", angle: -90, position: "insideLeft", fill: "#a1a1aa", fontSize: 11 }}
                  />
                  <Tooltip content={<ScatterTooltip />} cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter data={filteredCompetitorData} fill="#8884d8">
                    {filteredCompetitorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={INTENT_COLORS[entry.dominantIntent]} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Right: Intent Distribution */}
          <Card className="flex flex-col col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Intent Distribution by Competitor</CardTitle>
              <CardDescription>Visibility breakdown across different intent types</CardDescription>
            </CardHeader>
            <CardContent className="flex-1" style={{ minHeight: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredIntentDistribution} margin={{ top: 10, right: 20, left: 10, bottom: 50 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis
                    dataKey="competitor"
                    stroke="#71717a"
                    tick={{ fill: "#a1a1aa", fontSize: 11 }}
                    angle={-45}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis stroke="#71717a" tick={{ fill: "#a1a1aa", fontSize: 11 }} label={{ value: "Visibility %", angle: -90, position: "insideLeft", fill: "#a1a1aa" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#18181b",
                      border: "1px solid #27272a",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#fafafa" }}
                  />
                  <Legend wrapperStyle={{ paddingTop: "10px" }} />
                  <Bar dataKey="Comparative" stackId="a" fill={INTENT_COLORS.Comparative} radius={[0, 0, 0, 0]} />
                  <Bar dataKey="Transactional" stackId="a" fill={INTENT_COLORS.Transactional} radius={[0, 0, 0, 0]} />
                  <Bar dataKey="Informational" stackId="a" fill={INTENT_COLORS.Informational} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Bottom Left: Visibility Contributors */}
          <Card className="flex flex-col col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Visibility Contributors</CardTitle>
              <CardDescription>Prompts and pages driving competitor visibility</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="font-semibold">Competitor / Prompt</TableHead>
                    <TableHead className="font-semibold w-[120px] text-center">Intent</TableHead>
                    <TableHead className="font-semibold w-[100px] text-right">Visibility</TableHead>
                    <TableHead className="font-semibold w-[100px] text-right">Avg. Rank</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(groupedContributors).map(([competitorName, items]) => {
                    const isExpanded = expandedCompetitors.has(competitorName)
                    // Calculate average scores for competitor
                    const avgVisibility = (
                      items.reduce((sum, item) => sum + item.visibilityScore, 0) / items.length
                    ).toFixed(1)
                    const avgRank = (items.reduce((sum, item) => sum + item.avgRank, 0) / items.length).toFixed(1)

                    return (
                      <React.Fragment key={competitorName}>
                        {/* Competitor Row (Collapsible Header) */}
                        <TableRow
                          className="bg-muted/20 cursor-pointer hover:bg-muted/30"
                          onClick={() => toggleCompetitor(competitorName)}
                        >
                          <TableCell className="font-semibold text-foreground">
                            <div className="flex items-center gap-2">
                              {isExpanded ? (
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              )}
                              {competitorName}
                              <span className="text-xs text-muted-foreground font-normal ml-1">
                                ({items.length} prompts)
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center" />
                          <TableCell className="text-foreground font-medium text-right">{avgVisibility}%</TableCell>
                          <TableCell className="text-muted-foreground text-right">{avgRank}</TableCell>
                        </TableRow>

                        {/* Prompt Rows (Nested, shown when expanded) */}
                        {isExpanded &&
                          items.map((item) => (
                            <TableRow
                              key={item.id}
                              className="hover:bg-muted/30 cursor-pointer"
                              onClick={() => router.push(`/analytics/prompts/${item.id}`)}
                            >
                              <TableCell className="pl-10">
                                <div className="text-sm text-muted-foreground hover:text-foreground">{item.prompt}</div>
                              </TableCell>
                              <TableCell className="text-center">
                                <span
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                                  style={{
                                    backgroundColor: `${INTENT_COLORS[item.intent]}20`,
                                    color: INTENT_COLORS[item.intent],
                                  }}
                                >
                                  {item.intent}
                                </span>
                              </TableCell>
                              <TableCell className="text-foreground font-medium text-right">{item.visibilityScore}%</TableCell>
                              <TableCell className="text-muted-foreground text-right">{item.avgRank}</TableCell>
                            </TableRow>
                          ))}
                      </React.Fragment>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Bottom Right: Recommended Domains */}
          <Card className="flex flex-col col-span-1">
            <CardHeader className="pb-3">
              <CardTitle>Recommended Domains</CardTitle>
              <CardDescription>High-impact domains for content distribution</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="font-semibold">Domain</TableHead>
                    <TableHead className="font-semibold w-[100px]">Intent</TableHead>
                    <TableHead className="font-semibold w-[80px]">Mentions</TableHead>
                    <TableHead className="font-semibold w-[85px]">Citations</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDomains.map((item) => (
                    <TableRow key={item.id} className="hover:bg-muted/30">
                      <TableCell className="font-medium text-foreground text-sm">{item.domain}</TableCell>
                      <TableCell>
                        <span
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                          style={{
                            backgroundColor: `${INTENT_COLORS[item.dominantIntent]}20`,
                            color: INTENT_COLORS[item.dominantIntent],
                          }}
                        >
                          {item.dominantIntent.slice(0, 4)}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        {item.mentionedBrands && item.mentionedBrands.length > 0 ? (
                          <TooltipProvider>
                            <UITooltip>
                              <TooltipTrigger asChild>
                                <span className="text-foreground font-medium cursor-help hover:text-primary">
                                  {item.mentionedBrands.length}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-[300px]">
                                <div className="space-y-2">
                                  <p className="text-xs font-semibold text-muted-foreground">Mentioned Brands:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {item.mentionedBrands.map((brand) => (
                                      <div
                                        key={brand}
                                        className="flex items-center gap-1.5 px-2 py-1 bg-muted rounded-md"
                                      >
                                        <div className="w-5 h-5 rounded bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-[9px] font-bold">
                                          {brand.charAt(0)}
                                        </div>
                                        <span className="text-xs font-medium">{brand}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </TooltipContent>
                            </UITooltip>
                          </TooltipProvider>
                        ) : (
                          <span className="text-muted-foreground">{item.mentions}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-foreground font-medium text-sm">{item.citationVolume}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
