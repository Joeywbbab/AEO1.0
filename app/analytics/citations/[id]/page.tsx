import { ArrowLeft, ExternalLink, Copy } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { mockCitations } from "@/lib/mock-data"
import { notFound } from "next/navigation"

export default async function CitationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const citation = mockCitations.find((c) => c.id === id)

  if (!citation) {
    notFound()
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header with Breadcrumb */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center gap-4 mb-3">
          <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
            <Link href="/analytics/citations">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <BreadcrumbNav
            items={[
              { label: "Analytics", href: "/analytics/citations" },
              { label: "Citations", href: "/analytics/citations" },
              { label: citation.domain },
            ]}
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground mb-1">{citation.pageTitle}</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{citation.domain}</span>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" asChild>
                <a href={citation.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </div>
          </div>
          <Button variant="outline">
            <Copy className="h-4 w-4 mr-2" />
            Copy URL
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Metadata Cards */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="p-4 bg-card border-border">
              <div className="text-sm text-muted-foreground mb-1">Visibility Rank</div>
              <div className="text-2xl font-bold text-primary">#{citation.visibilityRank}</div>
            </Card>
            <Card className="p-4 bg-card border-border">
              <div className="text-sm text-muted-foreground mb-1">Model</div>
              <Badge variant="secondary">{citation.model}</Badge>
            </Card>
            <Card className="p-4 bg-card border-border">
              <div className="text-sm text-muted-foreground mb-1">Sentiment</div>
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
            </Card>
            <Card className="p-4 bg-card border-border">
              <div className="text-sm text-muted-foreground mb-1">Captured</div>
              <div className="text-sm font-medium text-foreground">
                {new Date(citation.capturedAt).toLocaleDateString()}
              </div>
            </Card>
          </div>

          {/* Mentions */}
          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Mentions</h2>
            <div className="flex gap-3">
              {citation.mentionsMe && (
                <Badge variant="default" className="text-sm">
                  Mentions Your Brand
                </Badge>
              )}
              {citation.mentionsCompetitor && (
                <Badge variant="outline" className="text-sm">
                  Mentions Competitor
                </Badge>
              )}
            </div>
          </Card>

          {/* Source Prompt */}
          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-semibold text-foreground mb-3">Source Prompt</h2>
            <p className="text-sm text-foreground leading-relaxed bg-secondary/30 p-4 rounded-lg">{citation.prompt}</p>
          </Card>

          {/* Detailed Analysis Tabs */}
          <Tabs defaultValue="snippet" className="w-full">
            <TabsList className="bg-card border border-border">
              <TabsTrigger value="snippet">Citation Snippet</TabsTrigger>
              <TabsTrigger value="context">Full Context</TabsTrigger>
              <TabsTrigger value="metadata">Metadata</TabsTrigger>
            </TabsList>

            <TabsContent value="snippet" className="mt-4">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-sm font-semibold text-foreground mb-4">How This Source Was Cited</h3>
                <div className="bg-secondary/30 p-4 rounded-lg">
                  <p className="text-sm text-foreground leading-relaxed">
                    This is where the actual citation snippet would appear, showing exactly how the AI model referenced
                    this source. It would include highlighted mentions of your brand and competitors, along with the
                    surrounding context that explains why this source was chosen.
                  </p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="context" className="mt-4">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-sm font-semibold text-foreground mb-4">Complete AI Response</h3>
                <div className="bg-secondary/30 p-4 rounded-lg">
                  <p className="text-sm text-foreground leading-relaxed">
                    The full AI model response that included this citation would be displayed here, providing complete
                    context for how your brand or competitors were discussed in relation to the source prompt.
                  </p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="metadata" className="mt-4">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-sm font-semibold text-foreground mb-4">Source Metadata</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Domain Authority</span>
                    <span className="text-sm font-medium text-foreground">High</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Content Type</span>
                    <span className="text-sm font-medium text-foreground">Article</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">First Seen</span>
                    <span className="text-sm font-medium text-foreground">
                      {new Date(citation.capturedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-muted-foreground">Times Referenced</span>
                    <span className="text-sm font-medium text-foreground">12</span>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
