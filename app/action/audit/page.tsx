"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { RefreshCw, Calendar, Info } from "lucide-react"
import { mockAuditIssues } from "@/lib/mock-data"

export default function AuditPage() {
  const [categoryFilter, setCategoryFilter] = React.useState("all")
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const filteredIssues = mockAuditIssues.filter((issue) => {
    if (categoryFilter === "all") return true
    return issue.category.toLowerCase() === categoryFilter
  })

  if (!mounted) {
    return (
      <div className="flex h-full flex-col">
        {/* Brand Header */}
        <div className="border-b border-border bg-card px-8 py-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-semibold text-foreground">Brand Name</h1>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Last audited: January 15, 2024</span>
              </div>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-background">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                  AEO Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">78</div>
                <p className="text-xs text-muted-foreground mt-1">Out of 100</p>
              </CardContent>
            </Card>

            <Card className="bg-background">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                  Technical Readiness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">85</div>
                <p className="text-xs text-muted-foreground mt-1">Good performance</p>
              </CardContent>
            </Card>

            <Card className="bg-background">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                  Content Quality
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">72</div>
                <p className="text-xs text-muted-foreground mt-1">Needs improvement</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="border-b border-border bg-card px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px] bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="content">Content</SelectItem>
                  <SelectItem value="images">Images</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="sitewide">Sitewide</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" size="sm" className="bg-background">
              <RefreshCw className="h-4 w-4 mr-2" />
              Run Audit
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="rounded-lg border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Critical Issue</TableHead>
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="font-semibold">URL</TableHead>
                  <TableHead className="font-semibold">Details</TableHead>
                  <TableHead className="font-semibold">Detected</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIssues.map((issue) => (
                  <TableRow key={issue.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium text-foreground">{issue.criticalIssue}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{issue.category}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground font-mono">{issue.url}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-md">{issue.details}</TableCell>
                    <TableCell className="text-muted-foreground">{issue.detected}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="flex h-full flex-col">
        {/* Brand Header */}
        <div className="border-b border-border bg-card px-8 py-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-semibold text-foreground">Brand Name</h1>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Last audited: January 15, 2024</span>
              </div>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-background">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                  AEO Score
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Answer Engine Optimization score measuring your content's readiness for AI-powered search
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">78</div>
                <p className="text-xs text-muted-foreground mt-1">Out of 100</p>
              </CardContent>
            </Card>

            <Card className="bg-background">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                  Technical Readiness
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Technical infrastructure and performance optimization for AI crawlers and indexing
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">85</div>
                <p className="text-xs text-muted-foreground mt-1">Good performance</p>
              </CardContent>
            </Card>

            <Card className="bg-background">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                  Content Quality
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Quality and relevance of content for AI understanding and citation worthiness
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">72</div>
                <p className="text-xs text-muted-foreground mt-1">Needs improvement</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="border-b border-border bg-card px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px] bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="content">Content</SelectItem>
                  <SelectItem value="images">Images</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="sitewide">Sitewide</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" size="sm" className="bg-background">
              <RefreshCw className="h-4 w-4 mr-2" />
              Run Audit
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="rounded-lg border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Critical Issue</TableHead>
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="font-semibold">URL</TableHead>
                  <TableHead className="font-semibold">Details</TableHead>
                  <TableHead className="font-semibold">Detected</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIssues.map((issue) => (
                  <TableRow key={issue.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium text-foreground">{issue.criticalIssue}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{issue.category}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground font-mono">{issue.url}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-md">{issue.details}</TableCell>
                    <TableCell className="text-muted-foreground">{issue.detected}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
