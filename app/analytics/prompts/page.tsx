"use client"

import * as React from "react"
import { MoreVertical, Plus, ChevronDown, Lightbulb, Check, ExternalLink, FileText } from "lucide-react"
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

type TabType = "Active" | "Inactive"

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
  const [adoptedPromptIds, setAdoptedPromptIds] = React.useState<Set<string>>(new Set())
  const [selectedClusterId, setSelectedClusterId] = React.useState<string | null>(null)

  const selectedCluster = selectedClusterId
    ? mockTopicClusters.find(c => c.id === selectedClusterId)
    : null

  // Calculate total suggested prompts count
  const totalSuggestedPrompts = mockTopicClusters.reduce(
    (total, cluster) => total + cluster.subtopics.reduce(
      (subTotal, subtopic) => subTotal + subtopic.prompts.length, 0
    ), 0
  )

  // Get unadopted prompts count for selected cluster
  const clusterUnadoptedCount = selectedCluster
    ? selectedCluster.subtopics.reduce(
        (total, subtopic) => total + subtopic.prompts.filter(p => !adoptedPromptIds.has(p.id)).length, 0
      )
    : 0

  const [selectedFilterTags, setSelectedFilterTags] = React.useState<string[]>([])
  const [selectedIntent, setSelectedIntent] = React.useState<string | null>(null)
  const [selectedMentions, setSelectedMentions] = React.useState<string | null>(null)

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

  const handleAdoptPrompt = (promptId: string, promptText: string, intent: string) => {
    if (adoptedPromptIds.has(promptId)) return

    // Add to adopted set
    setAdoptedPromptIds(prev => new Set([...prev, promptId]))

    // Add to prompts list as Active
    const newPrompt = {
      id: `adopted-${promptId}-${Date.now()}`,
      prompt: promptText,
      intent: intent,
      type: intent as "Informational" | "Comparative" | "Transactional",
      status: "Active" as const,
      stage: "Awareness" as const,
      tags: [],
      visibilityScore: 0,
      sentiment: "Neutral" as const,
      sentimentScore: 0,
      position: "-",
      positionRank: prompts.length + 1,
      mentionsMe: 0,
      mentionsCompetitors: 0,
      brandMentions: [],
      modelsCovered: [],
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      volume: [0, 0, 0, 0, 0, 0, 0],
      country: "US",
    }
    setPrompts(prev => [...prev, newPrompt])
  }

  const handleAdoptAllInCluster = () => {
    if (!selectedCluster) return

    const newAdoptedIds = new Set(adoptedPromptIds)
    const newPrompts: typeof prompts = []

    selectedCluster.subtopics.forEach(subtopic => {
      subtopic.prompts.forEach(prompt => {
        if (!adoptedPromptIds.has(prompt.id)) {
          newAdoptedIds.add(prompt.id)
          newPrompts.push({
            id: `adopted-${prompt.id}-${Date.now()}-${Math.random()}`,
            prompt: prompt.prompt,
            intent: prompt.intent,
            type: prompt.intent as "Informational" | "Comparative" | "Transactional",
            status: "Active" as const,
            stage: "Awareness" as const,
            tags: [],
            visibilityScore: 0,
            sentiment: "Neutral" as const,
            sentimentScore: 0,
            position: "-",
            positionRank: prompts.length + newPrompts.length + 1,
            mentionsMe: 0,
            mentionsCompetitors: 0,
            brandMentions: [],
            modelsCovered: [],
            lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            volume: [0, 0, 0, 0, 0, 0, 0],
            country: "US",
          })
        }
      })
    })

    setAdoptedPromptIds(newAdoptedIds)
    setPrompts(prev => [...prev, ...newPrompts])
  }

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="border-b border-border px-8 py-5">
        {/* Title row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-baseline gap-2">
            <h1 className="text-2xl font-semibold text-foreground">Prompts</h1>
            <span className="text-sm text-muted-foreground font-normal">
              · {displayedPrompts} prompts
            </span>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <a href="/guidelines" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              Guidelines
            </a>
          </Button>
        </div>

        {/* Actions row: Suggested + Add Prompt on right */}
        <div className="flex items-center justify-end gap-3 mb-4">
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
                    <DropdownMenuItem onClick={() => handleBulkMove("Inactive")}>Inactive</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuItem onClick={handleBulkDelete} className="text-destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsClusterSheetOpen(true)}
            className="h-10 flex items-center gap-2"
          >
            <Lightbulb className="h-4 w-4" />
            Suggested
            <span className="ml-1 px-1.5 py-0.5 text-xs bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-full">
              {totalSuggestedPrompts - adoptedPromptIds.size}
            </span>
          </Button>

          <Button size="sm" className="h-10">
            <Plus className="h-4 w-4" />
            Add prompt
          </Button>
        </div>

        {/* Tabs row: Active/Inactive on left, Filters on right */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {(["Active", "Inactive"] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
          {/* Tags filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 bg-transparent gap-2">
                {selectedFilterTags.length > 0 ? `${selectedFilterTags.length} tags` : "All tags"}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem onClick={() => setSelectedFilterTags([])}>
                All tags
              </DropdownMenuItem>
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
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Intent filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 bg-transparent gap-2">
                {selectedIntent || "All intents"}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-40">
              <DropdownMenuItem onClick={() => setSelectedIntent(null)}>All intents</DropdownMenuItem>
              {availableIntents.map((intent) => (
                <DropdownMenuItem key={intent} onClick={() => setSelectedIntent(intent)}>
                  {intent}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mentions filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 bg-transparent gap-2">
                {selectedMentions || "All mentions"}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-40">
              <DropdownMenuItem onClick={() => setSelectedMentions(null)}>All mentions</DropdownMenuItem>
              {availableMentions.map((mention) => (
                <DropdownMenuItem key={mention} onClick={() => setSelectedMentions(mention)}>
                  {mention}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {activeFilterCount > 0 && (
            <Button variant="ghost" size="sm" className="h-9 text-muted-foreground" onClick={handleClearFilters}>
              Clear filters
            </Button>
          )}
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

      {/* Suggested Prompts Sheet */}
      <Sheet open={isClusterSheetOpen} onOpenChange={(open) => {
        setIsClusterSheetOpen(open)
        if (!open) setSelectedClusterId(null)
      }}>
        <SheetContent side="right" className="w-full sm:max-w-5xl overflow-auto p-0">
          <div className="flex h-full">
            {/* Left: Topic Clusters Graph */}
            <div className="w-2/5 border-r border-border p-6 flex flex-col">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-lg font-semibold flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  Topic Clusters
                </SheetTitle>
                <p className="text-sm text-muted-foreground">
                  Select a cluster to view content and prompts
                </p>
              </SheetHeader>

              {/* Radial Graph */}
              <div className="flex-1 flex items-center justify-center">
                <div className="relative w-[320px] h-[320px]">
                  {/* Center Node */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-center z-20">
                    <div>
                      <div className="text-[10px] font-semibold text-foreground">Your Domain</div>
                    </div>
                  </div>

                  {/* Pillar Topics */}
                  {mockTopicClusters.map((cluster, index) => {
                    const totalClusters = mockTopicClusters.length
                    const angle = (index * 360) / totalClusters - 90
                    const radius = 110
                    const x = Math.cos((angle * Math.PI) / 180) * radius
                    const y = Math.sin((angle * Math.PI) / 180) * radius

                    return (
                      <React.Fragment key={cluster.id}>
                        {/* Connection line */}
                        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                          <line x1="160" y1="160" x2={160 + x} y2={160 + y} stroke="currentColor" strokeWidth="2" className={selectedClusterId === cluster.id ? "text-primary" : "text-primary/30"} />
                        </svg>

                        {/* Cluster Node */}
                        <div
                          className={`absolute w-24 h-24 rounded-full flex items-center justify-center text-center cursor-pointer transition-all hover:scale-105 ${
                            selectedClusterId === cluster.id
                              ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2"
                              : "bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-900/50"
                          }`}
                          style={{
                            top: `calc(50% + ${y}px - 48px)`,
                            left: `calc(50% + ${x}px - 48px)`,
                            zIndex: 10,
                          }}
                          onClick={() => setSelectedClusterId(cluster.id)}
                        >
                          <div className="px-2">
                            <div className={`text-[10px] font-medium line-clamp-2 ${selectedClusterId === cluster.id ? "text-primary-foreground" : "text-foreground"}`}>
                              {cluster.pillarTopic}
                            </div>
                            <div className={`text-[9px] mt-0.5 ${selectedClusterId === cluster.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                              {cluster.contentContribution}%
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    )
                  })}
                </div>
              </div>

              {/* Adopted count */}
              <div className="pt-4 border-t border-border text-center">
                <span className="text-sm text-muted-foreground">
                  {adoptedPromptIds.size} prompts adopted
                </span>
              </div>
            </div>

            {/* Right: Cluster Details */}
            <div className="w-3/5 p-6 overflow-auto">
              {selectedCluster ? (
                <div className="space-y-6">
                  {/* Cluster Header */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{selectedCluster.pillarTopic}</h3>
                    <p className="text-sm text-muted-foreground">{selectedCluster.description}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-xs px-2 py-1 bg-muted rounded text-muted-foreground">
                        {selectedCluster.promptCount} prompts
                      </span>
                      <span className="text-xs px-2 py-1 bg-primary/10 rounded text-primary font-medium">
                        {selectedCluster.avgVisibility}% avg visibility
                      </span>
                    </div>
                  </div>

                  {/* Supported Content */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Supported Content
                    </h4>
                    <div className="space-y-2">
                      {selectedCluster.supportedContent.map((content) => (
                        <a
                          key={content.id}
                          href={content.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xs px-2 py-0.5 bg-muted rounded text-muted-foreground">
                              {content.type}
                            </span>
                            <span className="text-sm text-foreground">{content.title}</span>
                          </div>
                          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Suggested Prompts */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        Suggested Prompts
                      </h4>
                      {clusterUnadoptedCount > 0 && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleAdoptAllInCluster}
                          className="text-xs h-7"
                        >
                          Adopt All ({clusterUnadoptedCount})
                        </Button>
                      )}
                    </div>
                    <div className="space-y-2">
                      {selectedCluster.subtopics.flatMap((subtopic) =>
                        subtopic.prompts.map((prompt) => {
                          const isAdopted = adoptedPromptIds.has(prompt.id)
                          return (
                            <div
                              key={prompt.id}
                              className={`p-4 rounded-lg border transition-colors ${
                                isAdopted
                                  ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30"
                                  : "border-border hover:bg-muted/50"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-foreground mb-2">{prompt.prompt}</p>
                                  <div className="flex items-center gap-2 text-xs">
                                    <span className="px-2 py-0.5 bg-muted rounded text-muted-foreground">
                                      {prompt.intent}
                                    </span>
                                    <span className="text-muted-foreground">
                                      {subtopic.name}
                                    </span>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  variant={isAdopted ? "ghost" : "default"}
                                  className={`shrink-0 ${isAdopted ? "text-green-600 dark:text-green-400" : ""}`}
                                  onClick={() => handleAdoptPrompt(prompt.id, prompt.prompt, prompt.intent)}
                                  disabled={isAdopted}
                                >
                                  {isAdopted ? (
                                    <>
                                      <Check className="h-4 w-4 mr-1" />
                                      Adopted
                                    </>
                                  ) : (
                                    "Adopt"
                                  )}
                                </Button>
                              </div>
                            </div>
                          )
                        })
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Lightbulb className="h-12 w-12 text-amber-500/50 mb-4" />
                  <div className="text-foreground font-medium mb-2">Select a Topic Cluster</div>
                  <div className="text-sm text-muted-foreground max-w-xs">
                    Click on a topic cluster to view supported content and adopt suggested prompts for testing.
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
