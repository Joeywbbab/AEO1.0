"use client"

import * as React from "react"
import { ExternalLink, Filter } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { mockCitations } from "@/lib/mock-data"

export default function CitationsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = React.useState<"domain" | "url">("domain")
  const [selectedMentions, setSelectedMentions] = React.useState<string[]>([])

  // Get unique brand mentions for filter options
  const allBrands = React.useMemo(() => {
    const brands = new Set<string>()
    mockCitations.forEach((citation) => {
      citation.brandMentions.forEach((brand) => brands.add(brand.brand))
    })
    return Array.from(brands)
  }, [])

  const filteredCitations = React.useMemo(() => {
    if (selectedMentions.length === 0) return mockCitations
    return mockCitations.filter((citation) =>
      citation.brandMentions.some((brand) => selectedMentions.includes(brand.brand)),
    )
  }, [selectedMentions])

  // Group citations by domain for domain view
  const citationsByDomain = React.useMemo(() => {
    const grouped = new Map<string, typeof mockCitations>()
    filteredCitations.forEach((citation) => {
      const existing = grouped.get(citation.domain) || []
      grouped.set(citation.domain, [...existing, citation])
    })
    return grouped
  }, [filteredCitations])

  const totalUsageAcrossAll = React.useMemo(() => {
    return filteredCitations.reduce((sum, c) => sum + c.usedTotal, 0)
  }, [filteredCitations])

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border bg-card px-8 py-5">
        <h1 className="text-2xl font-semibold text-foreground mb-1">Citations</h1>
        <p className="text-sm text-muted-foreground">{mockCitations.length} citations · Central index of sources</p>
      </div>

      <div className="border-b border-border bg-card px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("domain")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === "domain"
                  ? "bg-background text-foreground border-2 border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              Domain
            </button>
            <button
              onClick={() => setActiveTab("url")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === "url"
                  ? "bg-background text-foreground border-2 border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              URL
            </button>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Filter className="h-4 w-4" />
                  Mentions
                  {selectedMentions.length > 0 && (
                    <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                      {selectedMentions.length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {allBrands.map((brand) => (
                  <DropdownMenuCheckboxItem
                    key={brand}
                    checked={selectedMentions.includes(brand)}
                    onCheckedChange={(checked) => {
                      setSelectedMentions((prev) => (checked ? [...prev, brand] : prev.filter((b) => b !== brand)))
                    }}
                  >
                    {brand}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {selectedMentions.length > 0 && (
              <Button variant="ghost" size="sm" onClick={() => setSelectedMentions([])}>
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          {activeTab === "domain" ? (
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-b border-border">
                  <TableHead className="text-muted-foreground font-medium py-4 px-6">Domain</TableHead>
                  <TableHead className="text-muted-foreground font-medium py-4 px-6">URLs</TableHead>
                  <TableHead className="text-muted-foreground font-medium py-4 px-6">Avg. Citations</TableHead>
                  <TableHead className="text-muted-foreground font-medium py-4 px-6">Usage</TableHead>
                  <TableHead className="text-muted-foreground font-medium py-4 px-6">Mentions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from(citationsByDomain.entries()).map(([domain, citations]) => {
                  const totalUsage = citations.reduce((sum, c) => sum + c.usedTotal, 0)
                  const usagePercentage = ((totalUsage / totalUsageAcrossAll) * 100).toFixed(1)
                  const avgCitations = (
                    citations.reduce((sum, c) => sum + c.avgCitations, 0) / citations.length
                  ).toFixed(1)
                  const allBrandMentions = citations.flatMap((c) => c.brandMentions)
                  const uniqueBrands = Array.from(new Map(allBrandMentions.map((b) => [b.brand, b])).values())

                  return (
                    <TableRow
                      key={domain}
                      className="cursor-pointer hover:bg-muted/20 border-b border-border last:border-0"
                      onClick={() => router.push(`/analytics/citations/domain/${encodeURIComponent(domain)}`)}
                    >
                      <TableCell className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-foreground font-medium">{domain}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-5 w-5 p-0"
                            asChild
                            onClick={(e) => e.stopPropagation()}
                          >
                            <a href={`https://${domain}`} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <span className="text-sm text-foreground">{citations.length}</span>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <span className="text-sm text-foreground font-medium">{avgCitations}</span>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <span className="text-sm text-foreground font-medium">{usagePercentage}%</span>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <div className="flex gap-1.5">
                          {uniqueBrands.map((brand) => (
                            <div
                              key={brand.brand}
                              className="flex h-6 w-6 items-center justify-center rounded-md text-xs font-semibold text-white"
                              style={{ backgroundColor: brand.color }}
                              title={brand.brand}
                            >
                              {brand.icon}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          ) : (
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-b border-border">
                  <TableHead className="text-muted-foreground font-medium py-4 px-6">URL</TableHead>
                  <TableHead className="text-muted-foreground font-medium py-4 px-6">Mentioned</TableHead>
                  <TableHead className="text-muted-foreground font-medium py-4 px-6">Mentions</TableHead>
                  <TableHead className="text-muted-foreground font-medium py-4 px-6">
                    <div className="flex items-center gap-1">
                      Usage (%)
                      <span className="text-xs">↕</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium py-4 px-6">
                    <div className="flex items-center gap-1">
                      Avg. Citations
                      <span className="text-xs">↕</span>
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCitations.map((citation) => {
                  const usagePercentage = ((citation.usedTotal / totalUsageAcrossAll) * 100).toFixed(1)

                  return (
                    <TableRow key={citation.id} className="hover:bg-muted/20 border-b border-border last:border-0">
                      <TableCell className="max-w-md py-4 px-6">
                        <div className="flex items-start gap-3">
                          <div className="flex h-6 w-6 items-center justify-center rounded bg-muted flex-shrink-0 mt-0.5">
                            <span className="text-xs font-semibold">{citation.domain.charAt(0).toUpperCase()}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground font-medium line-clamp-1 mb-0.5">
                              {citation.pageTitle}
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-1">{citation.url}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <span className="text-sm text-foreground">{citation.mentioned ? "Yes" : "No"}</span>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <div className="flex gap-1.5">
                          {citation.brandMentions.map((brand) => (
                            <div
                              key={brand.brand}
                              className="flex h-6 w-6 items-center justify-center rounded-md text-xs font-semibold text-white"
                              style={{ backgroundColor: brand.color }}
                              title={brand.brand}
                            >
                              {brand.icon}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <span className="text-sm text-foreground font-medium">{usagePercentage}%</span>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <span className="text-sm text-foreground font-medium">{citation.avgCitations}</span>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  )
}
