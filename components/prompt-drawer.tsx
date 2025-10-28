"use client"
import { X, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Prompt } from "@/lib/mock-data"

interface PromptDrawerProps {
  prompt: Prompt | null
  onClose: () => void
}

export function PromptDrawer({ prompt, onClose }: PromptDrawerProps) {
  if (!prompt) return null

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-[600px] border-l border-border bg-card shadow-xl">
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-6">
          <h2 className="text-lg font-semibold text-foreground">Prompt Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Prompt Text */}
          <div className="mb-6">
            <div className="flex items-start justify-between gap-4 mb-2">
              <p className="text-base text-foreground leading-relaxed">{prompt.prompt}</p>
              <Button variant="ghost" size="icon" className="shrink-0">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2 mt-3">
              <Badge variant="secondary">{prompt.stage}</Badge>
              <Badge variant="outline">{prompt.type}</Badge>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="bg-secondary/50">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs text-muted-foreground">Mentions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">{prompt.mentionsMe}</span>
                  <span className="text-sm text-muted-foreground">Me</span>
                  <span className="text-muted-foreground">/</span>
                  <span className="text-2xl font-bold text-foreground">{prompt.mentionsCompetitors}</span>
                  <span className="text-sm text-muted-foreground">Competitors</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary/50">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs text-muted-foreground">Visibility Score</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-foreground">{prompt.visibilityScore}</span>
                  <span className="text-sm text-muted-foreground">/ 100</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary/50">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs text-muted-foreground">Sentiment</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge
                  variant={
                    prompt.sentiment === "Positive"
                      ? "default"
                      : prompt.sentiment === "Neutral"
                        ? "secondary"
                        : "destructive"
                  }
                  className="text-sm"
                >
                  {prompt.sentiment}
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-secondary/50">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs text-muted-foreground">Models Covered</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-lg font-semibold text-foreground">{prompt.modelsCovered.length} / 3</span>
              </CardContent>
            </Card>
          </div>

          {/* Position */}
          <Card className="mb-6 bg-secondary/50">
            <CardHeader>
              <CardTitle className="text-sm text-foreground">Position Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{prompt.position}</p>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="models" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-secondary">
              <TabsTrigger value="models">By Model</TabsTrigger>
              <TabsTrigger value="citations">Citations</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>
            <TabsContent value="models" className="space-y-4 mt-4">
              {prompt.modelsCovered.map((model) => (
                <Card key={model} className="bg-secondary/50">
                  <CardHeader>
                    <CardTitle className="text-sm text-foreground">{model}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>Rank: #{Math.floor(Math.random() * 5) + 1}</p>
                      <p>Snippet presence: Yes</p>
                      <p>Panel placement: Featured</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="citations" className="mt-4">
              <p className="text-sm text-muted-foreground">3 citations linked to this prompt</p>
              <Button variant="outline" className="mt-4 w-full bg-transparent">
                View All Citations
              </Button>
            </TabsContent>
            <TabsContent value="trends" className="mt-4">
              <div className="h-40 flex items-center justify-center border border-border rounded-lg bg-secondary/30">
                <p className="text-sm text-muted-foreground">Visibility trend chart</p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Actions */}
          <div className="flex gap-2 mt-6">
            <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">Open in Citations</Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              Create Content Brief
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
