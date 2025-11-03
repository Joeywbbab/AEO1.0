"use client"

import { RefreshCw, Calendar, Filter, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type FilterBarProps = {
  dateRange?: string
  onDateRangeChange?: (value: string) => void
  model?: string
  onModelChange?: (value: string) => void
  tag?: string
  onTagChange?: (value: string) => void
  onRefresh?: () => void
  showDateRange?: boolean
  showModel?: boolean
  showTag?: boolean
  availableTags?: string[]
}

export function FilterBar({
  dateRange = "30d",
  onDateRangeChange,
  model = "all",
  onModelChange,
  tag = "all-tags",
  onTagChange,
  onRefresh,
  showDateRange = true,
  showModel = true,
  showTag = true,
  availableTags = ["remote", "collaboration", "comparison", "agile", "automation", "workflows", "features", "pricing", "startups", "AI", "memory"],
}: FilterBarProps) {
  return (
    <div className="border-b border-border bg-card">
      <div className="flex h-16 items-center gap-4 px-6">
        <div className="flex items-center gap-2">
          {showDateRange && (
            <Select value={dateRange} onValueChange={onDateRangeChange}>
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
          )}

          {showModel && (
            <Select value={model} onValueChange={onModelChange}>
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
          )}

          {showTag && (
            <Select value={tag} onValueChange={onTagChange}>
              <SelectTrigger className="w-[160px] bg-background">
                <Tag className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-tags">All Tags</SelectItem>
                {availableTags.map((tagName) => (
                  <SelectItem key={tagName} value={tagName}>
                    {tagName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {onRefresh && (
            <Button variant="outline" size="icon" className="bg-background" onClick={onRefresh}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
