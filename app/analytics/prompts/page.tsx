"use client"

import * as React from "react"
import { MoreVertical, Plus, Filter, BookOpen, Network } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { mockPrompts, mockTopicClusters } from "@/lib/mock-data"

type TabType = "Active" | "Suggested" | "Inactive"

type Tag = {
  id: string
  name: string
  color: string
}

const availableTags: Tag[] = [
  { id: "1", name: "remote", color: "#3B82F6" },
  { id: "2", name: "collaboration", color: "#10B981" },
  { id: "3", name: "comparison", color: "#F59E0B" },
  { id: "4", name: "agile", color: "#8B5CF6" },
  { id: "5", name: "automation", color: "#EC4899" },
  { id: "6", name: "workflows", color: "#06B6D4" },
  { id: "7", name: "features", color: "#84CC16" },
  { id: "8", name: "pricing", color: "#F97316" },
  { id: "9", name: "startups", color: "#6366F1" },
  { id: "10", name: "AI", color: "#EF4444" },
  { id: "11", name: "memory", color: "#14B8A6" },
]

const availableIntents = ["Informational", "Comparative", "Transactional"]
const availableMentions = ["Me", "Competitors", "Both"]

export default function PromptsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = React.useState<TabType>("Active")
  const [selectedPrompts, setSelectedPrompts] = React.useState<Set<string>>(new Set())
  const [isTagDialogOpen, setIsTagDialogOpen] = React.useState(false)
  const [selectedPromptForTags, setSelectedPromptForTags] = React.useState<string | null>(null)
  const [prompts, setPrompts] = React.useState(mockPrompts)
  const [isClusterSheetOpen, setIsClusterSheetOpen] = React.useState(false)
  const [selectedClusterId, setSelectedClusterId] = React.useState<string | null>(null)
  const [selectedSubtopicId, setSelectedSubtopicId] = React.useState<string | null>(null)

  const [selectedFilterTags, setSelectedFilterTags] = React.useState<string[]>([])
  const [selectedIntent, setSelectedIntent] = React.useState<string | null>(null)
  const [selectedMentions, setSelectedMentions] = React.useState<string | null>(null)

  const selectedCluster = selectedClusterId
    ? mockTopicClusters.find(c => c.id === selectedClusterId)
    : null

  const handleToggleTag = (promptId: string, tagName: string) => {
    setPrompts(
      prompts.map((prompt) => {
        if (prompt.id === promptId) {
          const hasTag = prompt.tags.includes(tagName)
          return {
            ...prompt,
            tags: hasTag ? prompt.tags.filter((t) => t !== tagName) : [...prompt.tags, tagName],
          }
        }
        return prompt
      }),
    )
  }

  const handleOpenTagDialog = (promptId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedPromptForTags(promptId)
    setIsTagDialogOpen(true)
  }

  const filteredPrompts = prompts.filter((prompt) => {
    const matchesTab = prompt.status === activeTab

    // Filter by tags
    const matchesTags = selectedFilterTags.length === 0 || selectedFilterTags.some((tag) => prompt.tags.includes(tag))

    // Filter by intent
    const matchesIntent = !selectedIntent || prompt.intent === selectedIntent

    // Filter by mentions
    let matchesMentions = true
    if (selectedMentions === "Me") {
      matchesMentions = prompt.mentionsMe > 0
    } else if (selectedMentions === "Competitors") {
      matchesMentions = prompt.mentionsCompetitors > 0
    } else if (selectedMentions === "Both") {
      matchesMentions = prompt.mentionsMe > 0 && prompt.mentionsCompetitors > 0
    }

    return matchesTab && matchesTags && matchesIntent && matchesMentions
  })

  const totalPrompts = prompts.filter((p) => p.status === activeTab).length
  const displayedPrompts = filteredPrompts.length

  const handleTogglePrompt = (promptId: string) => {
    const newSelected = new Set(selectedPrompts)
    if (newSelected.has(promptId)) {
      newSelected.delete(promptId)
    } else {
      newSelected.add(promptId)
    }
    setSelectedPrompts(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedPrompts.size === filteredPrompts.length) {
      setSelectedPrompts(new Set())
    } else {
      setSelectedPrompts(new Set(filteredPrompts.map((p) => p.id)))
    }
  }

  const handleBulkMove = (status: TabType) => {
    console.log(`Moving ${selectedPrompts.size} prompts to ${status}`)
    setSelectedPrompts(new Set())
  }

  const handleBulkDelete = () => {
    console.log(`Deleting ${selectedPrompts.size} prompts`)
    setSelectedPrompts(new Set())
  }

  const handleClearFilters = () => {
    setSelectedFilterTags([])
    setSelectedIntent(null)
    setSelectedMentions(null)
  }

  const activeFilterCount = selectedFilterTags.length + (selectedIntent ? 1 : 0) + (selectedMentions ? 1 : 0)

  const currentPromptForTags = prompts.find((p) => p.id === selectedPromptForTags)

  const handleSingleMove = (promptId: string, status: TabType, e: React.MouseEvent) => {
    e.stopPropagation()
    setPrompts(
      prompts.map((prompt) => {
        if (prompt.id === promptId) {
          return {
            ...prompt,
            status: status,
          }
        }
        return prompt
      }),
    )
  }

  const handleSingleDelete = (promptId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setPrompts(prompts.filter((prompt) => prompt.id !== promptId))
  }

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="border-b border-border px-8 py-5">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-baseline gap-2">
            <h1 className="text-2xl font-semibold text-foreground">Prompts</h1>
            <span className="text-sm text-muted-foreground font-normal">
              · {displayedPrompts} / {totalPrompts} Prompts
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsClusterSheetOpen(true)}
              className="flex items-center gap-2"
            >
              <Network className="h-4 w-4" />
              Topic Clusters
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="/guidelines" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Guidelines
              </a>
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {(["Active", "Suggested", "Inactive"] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  activeTab === tab
                    ? "bg-background text-foreground border-2 border-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border-2 border-transparent"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {selectedPrompts.size > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-10 bg-transparent">
                    Actions ({selectedPrompts.size})
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onClick={() => handleBulkMove("Active")}>Active</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleBulkMove("Suggested")}>Suggested</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleBulkMove("Inactive")}>Inactive</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuItem onClick={handleBulkDelete} className="text-destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-10 bg-transparent gap-2">
                  <Filter className="h-4 w-4" />
                  Filter {activeFilterCount > 0 && `(${activeFilterCount})`}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {/* Tags Submenu */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    Tags {selectedFilterTags.length > 0 && `(${selectedFilterTags.length})`}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="w-48">
                    {availableTags.map((tag) => (
                      <DropdownMenuItem
                        key={tag.id}
                        onClick={(e) => {
                          e.preventDefault()
                          setSelectedFilterTags((prev) =>
                            prev.includes(tag.name) ? prev.filter((t) => t !== tag.name) : [...prev, tag.name],
                          )
                        }}
                      >
                        <div className="flex items-center gap-2 w-full">
                          <input
                            type="checkbox"
                            checked={selectedFilterTags.includes(tag.name)}
                            onChange={() => {}}
                            className="w-4 h-4 rounded border-border"
                          />
                          <span>#{tag.name}</span>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                {/* Intent Submenu */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Intent {selectedIntent && `(${selectedIntent})`}</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="w-40">
                    <DropdownMenuItem onClick={() => setSelectedIntent(null)}>All Intents</DropdownMenuItem>
                    {availableIntents.map((intent) => (
                      <DropdownMenuItem key={intent} onClick={() => setSelectedIntent(intent)}>
                        {intent}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                {/* Mentions Submenu */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    Mentions {selectedMentions && `(${selectedMentions})`}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="w-40">
                    <DropdownMenuItem onClick={() => setSelectedMentions(null)}>All</DropdownMenuItem>
                    {availableMentions.map((mention) => (
                      <DropdownMenuItem key={mention} onClick={() => setSelectedMentions(mention)}>
                        {mention}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>

            {activeFilterCount > 0 && (
              <Button variant="ghost" size="sm" className="h-10" onClick={handleClearFilters}>
                Clear
              </Button>
            )}

            <Button size="sm" className="h-10">
              <Plus className="h-4 w-4" />
              Add Prompt
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/30 border-b border-border">
              <tr>
                <th className="sticky left-0 bg-muted/30 px-6 py-4 w-12 z-10">
                  <input
                    type="checkbox"
                    checked={selectedPrompts.size === filteredPrompts.length && filteredPrompts.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-border"
                  />
                </th>
                <th className="sticky left-12 bg-muted/30 text-left px-6 py-4 text-xs font-medium text-muted-foreground w-[30%] z-10">
                  Prompt
                </th>
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground">Intent</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground">Visibility</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground">Sentiment</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground">Position</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground">Mentions</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground">Tags</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground">Country</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground">Created</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground w-16">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrompts.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-6 py-16 text-center">
                    <p className="text-muted-foreground">No prompts found.</p>
                    <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or tab selection.</p>
                  </td>
                </tr>
              ) : (
                filteredPrompts.map((prompt, index) => (
                  <tr
                    key={prompt.id}
                    className={`hover:bg-muted/20 cursor-pointer transition-colors ${
                      index !== filteredPrompts.length - 1 ? "border-b border-border" : ""
                    }`}
                    onClick={() => router.push(`/analytics/prompts/${prompt.id}`)}
                  >
                    <td className="sticky left-0 bg-card hover:bg-muted/20 px-6 py-4 z-10 transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedPrompts.has(prompt.id)}
                        onChange={() => handleTogglePrompt(prompt.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-4 h-4 rounded border-border"
                      />
                    </td>
                    <td className="sticky left-12 bg-card hover:bg-muted/20 px-6 py-4 z-10 border-r border-border transition-colors">
                      <span className="text-sm text-foreground leading-relaxed">{prompt.prompt}</span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm text-foreground">{prompt.intent}</span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-foreground">{prompt.visibilityScore}%</span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <div
                          className={`w-1 h-4 rounded-full ${
                            prompt.sentiment === "Positive"
                              ? "bg-green-500"
                              : prompt.sentiment === "Neutral"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        />
                        <span className="text-sm text-foreground">{prompt.sentimentScore}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm text-muted-foreground">#{prompt.positionRank}</span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        {prompt.brandMentions.slice(0, 4).map((mention, idx) => (
                          <div
                            key={idx}
                            className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-semibold text-white"
                            style={{ backgroundColor: mention.color }}
                            title={mention.brand}
                          >
                            {mention.icon}
                          </div>
                        ))}
                        {prompt.brandMentions.length > 4 && (
                          <span className="text-xs text-muted-foreground">+{prompt.brandMentions.length - 4}</span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div
                        className="flex items-center gap-1.5 cursor-pointer hover:opacity-70 transition-opacity"
                        onClick={(e) => handleOpenTagDialog(prompt.id, e)}
                      >
                        {prompt.tags.length > 0 ? (
                          prompt.tags.slice(0, 3).map((tagName, idx) => (
                            <span key={idx} className="text-sm text-muted-foreground">
                              #{tagName}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-muted-foreground">Add tags...</span>
                        )}
                        {prompt.tags.length > 3 && (
                          <span className="text-xs text-muted-foreground">+{prompt.tags.length - 3}</span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm text-muted-foreground">US</span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-muted-foreground">{prompt.created}</span>
                    </td>

                    <td className="px-6 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem onClick={(e) => handleSingleMove(prompt.id, "Active", e)}>
                                Active
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => handleSingleMove(prompt.id, "Suggested", e)}>
                                Suggested
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => handleSingleMove(prompt.id, "Inactive", e)}>
                                Inactive
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuSub>
                          <DropdownMenuItem
                            onClick={(e) => handleSingleDelete(prompt.id, e)}
                            className="text-destructive"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isTagDialogOpen} onOpenChange={setIsTagDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Tags</DialogTitle>
            <DialogDescription className="line-clamp-2">{currentPromptForTags?.prompt}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4 max-h-[400px] overflow-y-auto">
            {availableTags.map((tag) => (
              <div key={tag.id} className="flex items-center space-x-3">
                <Checkbox
                  id={`tag-${tag.id}`}
                  checked={currentPromptForTags?.tags.includes(tag.name) || false}
                  onCheckedChange={() => {
                    if (selectedPromptForTags) {
                      handleToggleTag(selectedPromptForTags, tag.name)
                    }
                  }}
                />
                <label
                  htmlFor={`tag-${tag.id}`}
                  className="flex flex-1 cursor-pointer items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  #{tag.name}
                </label>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsTagDialogOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Topic Clusters Sheet */}
      <Sheet open={isClusterSheetOpen} onOpenChange={setIsClusterSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-5xl overflow-auto">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-xl font-semibold">Topic Clusters</SheetTitle>
          </SheetHeader>

          <div className="flex h-[calc(100vh-120px)]">
            {/* Left: Multi-layer Radial Graph */}
            <div className="w-3/5 border-r border-border pr-4 flex items-center justify-center">
              <div className="relative w-[500px] h-[500px]">
                {/* Center Node - Domain/Website */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-center z-20 cursor-pointer hover:bg-primary/20 transition-colors"
                  onClick={() => {
                    setSelectedClusterId(null)
                    setSelectedSubtopicId(null)
                  }}
                >
                  <div>
                    <div className="text-xs font-semibold text-foreground">Your Domain</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">asana.com</div>
                  </div>
                </div>

                {/* Layer 1: Pillar Topics */}
                {mockTopicClusters.map((cluster, index) => {
                  const totalClusters = mockTopicClusters.length
                  const angle = (index * 360) / totalClusters - 90
                  const pillarRadius = 120
                  const pillarX = Math.cos((angle * Math.PI) / 180) * pillarRadius
                  const pillarY = Math.sin((angle * Math.PI) / 180) * pillarRadius

                  return (
                    <React.Fragment key={cluster.id}>
                      {/* Connection from center to pillar */}
                      <svg
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
                        style={{ zIndex: 0 }}
                      >
                        <line
                          x1="250"
                          y1="250"
                          x2={250 + pillarX}
                          y2={250 + pillarY}
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-primary/30"
                        />
                      </svg>

                      {/* Pillar Topic Node */}
                      <div
                        className={`absolute w-20 h-20 rounded-full flex items-center justify-center text-center cursor-pointer transition-all hover:scale-105 ${
                          selectedClusterId === cluster.id
                            ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2"
                            : "bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-900/50"
                        }`}
                        style={{
                          top: `calc(50% + ${pillarY}px - 40px)`,
                          left: `calc(50% + ${pillarX}px - 40px)`,
                          zIndex: 10,
                        }}
                        onClick={() => {
                          setSelectedClusterId(cluster.id)
                          setSelectedSubtopicId(null)
                        }}
                      >
                        <div className="px-1">
                          <div className={`text-[10px] font-medium line-clamp-2 ${selectedClusterId === cluster.id ? "text-primary-foreground" : "text-foreground"}`}>
                            {cluster.pillarTopic}
                          </div>
                          <div className={`text-[9px] mt-0.5 ${selectedClusterId === cluster.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                            {cluster.contentContribution}%
                          </div>
                        </div>
                      </div>

                      {/* Layer 2: Subtopics */}
                      {cluster.subtopics.map((subtopic, subIndex) => {
                        const subtopicCount = cluster.subtopics.length
                        const spreadAngle = 40
                        const subtopicAngle = angle - spreadAngle/2 + (subIndex * spreadAngle) / Math.max(subtopicCount - 1, 1)
                        const subtopicRadius = 200
                        const subtopicX = Math.cos((subtopicAngle * Math.PI) / 180) * subtopicRadius
                        const subtopicY = Math.sin((subtopicAngle * Math.PI) / 180) * subtopicRadius

                        return (
                          <React.Fragment key={subtopic.id}>
                            {/* Connection from pillar to subtopic */}
                            <svg
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
                              style={{ zIndex: 0 }}
                            >
                              <line
                                x1={250 + pillarX}
                                y1={250 + pillarY}
                                x2={250 + subtopicX}
                                y2={250 + subtopicY}
                                stroke="currentColor"
                                strokeWidth="1"
                                className={selectedClusterId === cluster.id ? "text-primary/50" : "text-border"}
                              />
                            </svg>

                            {/* Subtopic Node */}
                            <div
                              className={`absolute w-16 h-16 rounded-lg flex items-center justify-center text-center cursor-pointer transition-all hover:scale-105 ${
                                selectedSubtopicId === subtopic.id
                                  ? "bg-primary/80 text-primary-foreground ring-2 ring-primary"
                                  : selectedClusterId === cluster.id
                                  ? "bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50"
                                  : "bg-muted hover:bg-muted/80"
                              }`}
                              style={{
                                top: `calc(50% + ${subtopicY}px - 32px)`,
                                left: `calc(50% + ${subtopicX}px - 32px)`,
                                zIndex: 5,
                              }}
                              onClick={() => {
                                setSelectedClusterId(cluster.id)
                                setSelectedSubtopicId(subtopic.id)
                              }}
                            >
                              <div className="px-1">
                                <div className={`text-[9px] font-medium line-clamp-2 ${selectedSubtopicId === subtopic.id ? "text-primary-foreground" : "text-foreground"}`}>
                                  {subtopic.name}
                                </div>
                                <div className={`text-[8px] mt-0.5 ${selectedSubtopicId === subtopic.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                                  {subtopic.promptCount}
                                </div>
                              </div>
                            </div>
                          </React.Fragment>
                        )
                      })}
                    </React.Fragment>
                  )
                })}
              </div>
            </div>

            {/* Right: Cluster Details */}
            <div className="w-2/5 pl-6 overflow-auto">
              {selectedCluster ? (
                <div className="space-y-6">
                  {/* Pillar Topic Info */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{selectedCluster.pillarTopic}</h3>
                    <p className="text-sm text-muted-foreground">{selectedCluster.description}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs mt-3">
                      <span className="px-2 py-1 bg-muted rounded text-muted-foreground">
                        {selectedCluster.promptCount} prompts
                      </span>
                      <span className="px-2 py-1 bg-primary/10 rounded text-primary font-medium">
                        {selectedCluster.avgVisibility}% visibility
                      </span>
                      <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 rounded text-amber-700 dark:text-amber-300 font-medium">
                        {selectedCluster.contentContribution}% contribution
                      </span>
                    </div>
                  </div>

                  {/* Subtopics */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-3">Subtopics</h4>
                    <div className="space-y-2">
                      {selectedCluster.subtopics.map((subtopic) => (
                        <div
                          key={subtopic.id}
                          className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                            selectedSubtopicId === subtopic.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:bg-muted/50"
                          }`}
                          onClick={() => setSelectedSubtopicId(subtopic.id)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-foreground">{subtopic.name}</span>
                            <span className="text-xs text-primary font-medium">{subtopic.visibility}%</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{subtopic.promptCount} prompts</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Generated Prompts */}
                  {selectedSubtopicId && (
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-3">Generated Prompts</h4>
                      <div className="space-y-2">
                        {selectedCluster.subtopics
                          .find(s => s.id === selectedSubtopicId)
                          ?.prompts.map((prompt) => (
                            <div
                              key={prompt.id}
                              className="p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
                              onClick={() => {
                                setIsClusterSheetOpen(false)
                                router.push(`/analytics/prompts/${prompt.id}`)
                              }}
                            >
                              <p className="text-sm text-foreground mb-2 line-clamp-2">{prompt.prompt}</p>
                              <div className="flex items-center gap-3 text-xs">
                                <span className="text-muted-foreground">{prompt.intent}</span>
                                <span className="text-primary font-medium">{prompt.visibility}%</span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {!selectedSubtopicId && (
                    <div className="text-sm text-muted-foreground text-center py-4">
                      Select a subtopic to view generated prompts
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="text-muted-foreground text-sm mb-2">Click a pillar topic to view details</div>
                  <div className="text-xs text-muted-foreground">
                    Topic clusters show how your content strategy is organized<br />
                    and how prompts are generated from each topic area.
                  </div>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
