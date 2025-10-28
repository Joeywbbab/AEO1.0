"use client"

import { X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Citation } from "@/lib/mock-data"

interface CitationDrawerProps {
  citation: Citation | null
  onClose: () => void
}

export function CitationDrawer({ citation, onClose }: CitationDrawerProps) {
  if (!citation) return null

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-[600px] border-l border-border bg-card shadow-xl">
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-6">
          <h2 className="text-lg font-semibold text-foreground">Citation Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Source Preview */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">{citation.pageTitle}</h3>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-muted-foreground">{citation.domain}</span>
              <Button variant="ghost" size="sm" className="h-6 px-2" asChild>
                <a href={citation.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary">{citation.model}</Badge>
              <Badge variant={citation.mentionsMe ? "default" : "outline"}>
                {citation.mentionsMe ? "Mentions Me" : "No Mention"}
              </Badge>
              {citation.mentionsCompetitor && <Badge variant="outline">Competitor</Badge>}
            </div>
          </div>

          {/* Snippet */}
          <Card className="mb-6 bg-secondary/50">
            <CardHeader>
              <CardTitle className="text-sm text-foreground">Content Snippet</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{citation.snippet}</p>
            </CardContent>
          </Card>

          {/* Metadata */}
          <div className="space-y-4 mb-6">
            <Card className="bg-secondary/50">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs text-muted-foreground">Related Prompt</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground leading-relaxed">{citation.prompt}</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-secondary/50">
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs text-muted-foreground">Visibility Rank</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-2xl font-bold text-primary">#{citation.visibilityRank}</span>
                </CardContent>
              </Card>

              <Card className="bg-secondary/50">
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs text-muted-foreground">Sentiment</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge
                    variant={
                      citation.sentiment === "Positive"
                        ? "default"
                        : citation.sentiment === "Neutral"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {citation.sentiment}
                  </Badge>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-secondary/50">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs text-muted-foreground">Captured</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-sm text-foreground">
                  {new Date(citation.capturedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </CardContent>
            </Card>
          </div>

          {/* Analysis */}
          <Card className="mb-6 bg-secondary/50">
            <CardHeader>
              <CardTitle className="text-sm text-foreground">Visibility Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Appears in top {citation.visibilityRank} results</li>
                <li>• Featured in snippet panel</li>
                <li>• Strong keyword alignment</li>
              </ul>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-2">
            <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
              Compare with Competitor
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              Send to Opportunity
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
