"use client"

import * as React from "react"
import { MoreVertical, Plus, Filter } from "lucide-react"
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
import { Checkbox } from "@/components/ui/checkbox"
import { mockPrompts } from "@/lib/mock-data"

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
  const [isSelectionMode, setIsSelectionMode] = React.useState(false)
  const [isTagDialogOpen, setIsTagDialogOpen] = React.useState(false)
  const [selectedPromptForTags, setSelectedPromptForTags] = React.useState<string | null>(null)
  const [prompts, setPrompts] = React.useState(mockPrompts)

  const [selectedFilterTags, setSelectedFilterTags] = React.useState<string[]>([])
  const [selectedIntent, setSelectedIntent] = React.useState<string | null>(null)
  const [selectedMentions, setSelectedMentions] = React.useState<string | null>(null)

  const getTagColor = (tagName: string) => {
    return availableTags.find((tag) => tag.name === tagName)?.color || "#6B7280"
  }

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

  const handleToggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode)
    if (isSelectionMode) {
      setSelectedPrompts(new Set())
    }
  }

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
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add a new prompt
          </Button>
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

            <Button variant="outline" size="sm" className="h-10 bg-transparent" onClick={handleToggleSelectionMode}>
              Select
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/30 border-b border-border">
              <tr>
                {isSelectionMode && (
                  <th className="sticky left-0 bg-muted/30 px-6 py-4 w-12 z-10">
                    <input
                      type="checkbox"
                      checked={selectedPrompts.size === filteredPrompts.length && filteredPrompts.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded border-border"
                    />
                  </th>
                )}
                <th
                  className={`sticky bg-muted/30 text-left px-6 py-4 text-xs font-medium text-muted-foreground w-[30%] z-10 ${
                    isSelectionMode ? "left-12" : "left-0"
                  }`}
                >
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
                  <td colSpan={isSelectionMode ? 11 : 10} className="px-6 py-16 text-center">
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
                    onClick={() => {
                      if (isSelectionMode) {
                        handleTogglePrompt(prompt.id)
                      } else {
                        router.push(`/analytics/prompts/${prompt.id}`)
                      }
                    }}
                  >
                    {isSelectionMode && (
                      <td className="sticky left-0 bg-card hover:bg-muted/20 px-6 py-4 z-10 transition-colors">
                        <input
                          type="checkbox"
                          checked={selectedPrompts.has(prompt.id)}
                          onChange={() => handleTogglePrompt(prompt.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-4 h-4 rounded border-border"
                        />
                      </td>
                    )}
                    <td
                      className={`sticky bg-card hover:bg-muted/20 px-6 py-4 z-10 border-r border-border transition-colors ${
                        isSelectionMode ? "left-12" : "left-0"
                      }`}
                    >
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
    </div>
  )
}
