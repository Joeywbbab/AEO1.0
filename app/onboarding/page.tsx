"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Check, ArrowRight, ArrowLeft, Plus, Minus, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

// Mock assets data (synced from assets)
const assetsWebsites = [
  { value: "manus.ai", label: "manus.ai" },
  { value: "asana.com", label: "asana.com" },
  { value: "notion.so", label: "notion.so" },
  { value: "monday.com", label: "monday.com" },
]

const assetsCompetitors = [
  { name: "Genspark", domain: "genspark.ai" },
  { name: "Perplexity", domain: "perplexity.ai" },
  { name: "OpenAI", domain: "openai.com" },
  { name: "Anthropic", domain: "anthropic.com" },
  { name: "Google", domain: "google.com" },
]

const industries = [
  "AI & Machine Learning",
  "SaaS & Cloud Services",
  "Developer Tools & Platforms",
  "Cybersecurity & Data Privacy",
  "E-commerce Platforms",
  "Marketing & Analytics",
  "Healthcare Technology",
  "Financial Technology",
  "Education Technology",
  "Project Management",
  "Automation",
  "Enterprise Software",
]

const suggestedPrompts = [
  { id: "1", prompt: "What are the best AI agent platforms in 2025?", intent: "Informational" },
  { id: "2", prompt: "Compare Manus vs Genspark features", intent: "Comparative" },
  { id: "3", prompt: "How to build autonomous AI agents?", intent: "Informational" },
  { id: "4", prompt: "Best tools for AI automation workflows", intent: "Informational" },
  { id: "5", prompt: "Manus AI pricing and plans", intent: "Transactional" },
  { id: "6", prompt: "AI agent platforms for enterprise", intent: "Comparative" },
  { id: "7", prompt: "How does Manus AI work?", intent: "Informational" },
  { id: "8", prompt: "Alternatives to Manus AI", intent: "Comparative" },
]

// Topic Clusters for visualization
const topicClusters = [
  { id: "1", name: "AI Agents", contribution: 40 },
  { id: "2", name: "Automation", contribution: 30 },
  { id: "3", name: "Enterprise", contribution: 30 },
]

type Step = 1 | 2 | 3 | 4

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = React.useState<Step>(1)

  // Step 1 state
  const [website, setWebsite] = React.useState("")
  const [websiteOpen, setWebsiteOpen] = React.useState(false)
  const [selectedIndustries, setSelectedIndustries] = React.useState<string[]>([])
  const [industryOpen, setIndustryOpen] = React.useState(false)
  const [isAnalyzing, setIsAnalyzing] = React.useState(false)

  // Step 2 state
  const [brandName, setBrandName] = React.useState("")

  // Step 3 state
  const [competitors, setCompetitors] = React.useState<Array<{ name: string; domain: string }>>([])
  const [competitorInputOpen, setCompetitorInputOpen] = React.useState(false)
  const [newCompetitorName, setNewCompetitorName] = React.useState("")
  const [newCompetitorDomain, setNewCompetitorDomain] = React.useState("")

  // Step 4 state
  const [selectedPrompts, setSelectedPrompts] = React.useState<Set<string>>(new Set())

  // Initialize competitors from suggested when entering step 3
  React.useEffect(() => {
    if (currentStep === 3 && competitors.length === 0) {
      setCompetitors(assetsCompetitors.slice(0, 3))
    }
  }, [currentStep, competitors.length])

  const handleAnalyze = () => {
    if (!website || selectedIndustries.length === 0) return
    setIsAnalyzing(true)
    // Simulate analysis and extract brand name from website
    setTimeout(() => {
      setIsAnalyzing(false)
      // Auto-generate brand name from website
      const domain = website.split('.')[0]
      setBrandName(domain.charAt(0).toUpperCase() + domain.slice(1))
      setCurrentStep(2)
    }, 2000)
  }

  const handleAddCompetitor = () => {
    if (newCompetitorName && newCompetitorDomain) {
      setCompetitors([...competitors, { name: newCompetitorName, domain: newCompetitorDomain }])
      setNewCompetitorName("")
      setNewCompetitorDomain("")
    }
  }

  const handleRemoveCompetitor = (index: number) => {
    setCompetitors(competitors.filter((_, i) => i !== index))
  }

  const handleToggleIndustry = (industry: string) => {
    setSelectedIndustries(prev =>
      prev.includes(industry)
        ? prev.filter(i => i !== industry)
        : [...prev, industry]
    )
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

  const handleSelectAllPrompts = () => {
    if (selectedPrompts.size === suggestedPrompts.length) {
      setSelectedPrompts(new Set())
    } else {
      setSelectedPrompts(new Set(suggestedPrompts.map(p => p.id)))
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step)
    }
  }

  const handleLaunch = () => {
    // Save onboarding data to localStorage
    localStorage.setItem("aeo_onboarding_complete", "true")
    localStorage.setItem("aeo_brand", JSON.stringify({ brandName, website, industries: selectedIndustries }))
    localStorage.setItem("aeo_competitors", JSON.stringify(competitors))
    localStorage.setItem("aeo_selected_prompts", JSON.stringify(Array.from(selectedPrompts)))

    // Navigate to prompts page with guide
    router.push("/analytics/prompts?guide=true")
  }

  const isStep1Valid = website && selectedIndustries.length > 0
  const isStep2Valid = brandName.trim() !== ""
  const isStep3Valid = competitors.length > 0
  const isStep4Valid = selectedPrompts.size > 0

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="text-center pt-12 pb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to AEO</h1>
        <p className="text-muted-foreground">Let's set up your brand monitoring.</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-center gap-0 mb-12 px-8">
        {/* Step 1 */}
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep > 1
              ? "bg-primary text-primary-foreground"
              : currentStep === 1
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
          }`}>
            {currentStep > 1 ? <Check className="h-4 w-4" /> : "1"}
          </div>
          <span className={`ml-2 text-sm font-medium ${currentStep >= 1 ? "text-foreground" : "text-muted-foreground"}`}>
            Analyze
          </span>
        </div>

        <div className={`w-24 h-0.5 mx-4 ${currentStep > 1 ? "bg-primary" : "bg-border"}`} />

        {/* Step 2 */}
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep > 2
              ? "bg-primary text-primary-foreground"
              : currentStep === 2
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
          }`}>
            {currentStep > 2 ? <Check className="h-4 w-4" /> : "2"}
          </div>
          <span className={`ml-2 text-sm font-medium ${currentStep >= 2 ? "text-foreground" : "text-muted-foreground"}`}>
            Topics
          </span>
        </div>

        <div className={`w-24 h-0.5 mx-4 ${currentStep > 2 ? "bg-primary" : "bg-border"}`} />

        {/* Step 3 */}
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep > 3
              ? "bg-primary text-primary-foreground"
              : currentStep === 3
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
          }`}>
            {currentStep > 3 ? <Check className="h-4 w-4" /> : "3"}
          </div>
          <span className={`ml-2 text-sm font-medium ${currentStep >= 3 ? "text-foreground" : "text-muted-foreground"}`}>
            Competitors
          </span>
        </div>

        <div className={`w-24 h-0.5 mx-4 ${currentStep > 3 ? "bg-primary" : "bg-border"}`} />

        {/* Step 4 */}
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep === 4
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}>
            4
          </div>
          <span className={`ml-2 text-sm font-medium ${currentStep === 4 ? "text-foreground" : "text-muted-foreground"}`}>
            Prompts
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center px-8">
        <div className="w-full max-w-4xl">
          {/* Step 1: Analyze Domain */}
          {currentStep === 1 && (
            <div className="max-w-md mx-auto space-y-8">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-foreground mb-2">Analyze your domain</h2>
                <p className="text-sm text-muted-foreground">
                  Select your website to discover topic clusters and optimize your AI visibility
                </p>
              </div>

              <div className="space-y-4">
                {/* Website input with dropdown suggestions */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Website</label>
                  <div className="relative">
                    <Input
                      placeholder="e.g. example.com"
                      value={website}
                      onChange={(e) => {
                        setWebsite(e.target.value)
                        setWebsiteOpen(e.target.value.length > 0)
                      }}
                      onFocus={() => setWebsiteOpen(website.length > 0)}
                      onBlur={() => setTimeout(() => setWebsiteOpen(false), 200)}
                    />
                    {websiteOpen && assetsWebsites.filter(site =>
                      site.value.toLowerCase().includes(website.toLowerCase())
                    ).length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-md z-50">
                        {assetsWebsites
                          .filter(site => site.value.toLowerCase().includes(website.toLowerCase()))
                          .map((site) => (
                            <div
                              key={site.value}
                              className="px-3 py-2 text-sm cursor-pointer hover:bg-muted"
                              onMouseDown={() => {
                                setWebsite(site.value)
                                setWebsiteOpen(false)
                              }}
                            >
                              {site.label}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Industry multi-select */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Industries</label>
                  <Popover open={industryOpen} onOpenChange={setIndustryOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={industryOpen}
                        className="w-full justify-between font-normal h-auto min-h-10"
                      >
                        <div className="flex flex-wrap gap-1">
                          {selectedIndustries.length > 0 ? (
                            selectedIndustries.map((ind) => (
                              <Badge key={ind} variant="secondary" className="text-xs">
                                {ind}
                                <button
                                  className="ml-1 hover:text-destructive"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleToggleIndustry(ind)
                                  }}
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))
                          ) : (
                            <span className="text-muted-foreground">Select industries...</span>
                          )}
                        </div>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Search industries..." />
                        <CommandList>
                          <CommandEmpty>No industry found.</CommandEmpty>
                          <CommandGroup>
                            {industries.map((ind) => (
                              <CommandItem
                                key={ind}
                                value={ind}
                                onSelect={() => handleToggleIndustry(ind)}
                              >
                                <div className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border ${
                                  selectedIndustries.includes(ind)
                                    ? "bg-primary border-primary text-primary-foreground"
                                    : "border-muted"
                                }`}>
                                  {selectedIndustries.includes(ind) && <Check className="h-3 w-3" />}
                                </div>
                                {ind}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={!isStep1Valid || isAnalyzing}
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze"
                )}
              </Button>
            </div>
          )}

          {/* Step 2: Topic Clusters */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-foreground mb-2">Topic Clusters Identified</h2>
                <p className="text-sm text-muted-foreground">
                  We've analyzed your domain and identified key topic areas
                </p>
              </div>

              <div className="flex gap-8">
                {/* Left: Brand Info */}
                <div className="w-1/3 space-y-4">
                  <h3 className="text-sm font-medium text-foreground mb-3">Your Brand</h3>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg border border-border bg-card">
                      <div className="text-xs text-muted-foreground mb-1">Brand Name</div>
                      <Input
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        className="h-8 text-sm"
                        placeholder="Enter brand name"
                      />
                    </div>
                    <div className="p-3 rounded-lg border border-border bg-card">
                      <div className="text-xs text-muted-foreground mb-1">Website</div>
                      <div className="text-sm font-medium text-foreground">{website}</div>
                    </div>
                    <div className="p-3 rounded-lg border border-border bg-card">
                      <div className="text-xs text-muted-foreground mb-1">Industries</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedIndustries.map((ind) => (
                          <Badge key={ind} variant="secondary" className="text-xs">
                            {ind}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Topic Clusters Visualization */}
                <div className="w-2/3 flex items-center justify-center">
                  <div className="relative w-72 h-72">
                    {/* Center node */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                      <span className="text-[10px] font-medium text-foreground text-center px-1">{website}</span>
                    </div>

                    {/* Cluster nodes */}
                    {topicClusters.map((cluster, index) => {
                      const angle = (index * 360) / topicClusters.length - 90
                      const radius = 90
                      const x = Math.cos((angle * Math.PI) / 180) * radius
                      const y = Math.sin((angle * Math.PI) / 180) * radius

                      return (
                        <React.Fragment key={cluster.id}>
                          <svg
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
                          >
                            <line
                              x1="144"
                              y1="144"
                              x2={144 + x}
                              y2={144 + y}
                              stroke="currentColor"
                              strokeWidth="1"
                              className="text-primary/30"
                            />
                          </svg>
                          <div
                            className="absolute w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center"
                            style={{
                              top: `calc(50% + ${y}px - 32px)`,
                              left: `calc(50% + ${x}px - 32px)`,
                            }}
                          >
                            <div className="text-center">
                              <div className="text-[9px] font-medium text-foreground">{cluster.name}</div>
                              <div className="text-[8px] text-muted-foreground">{cluster.contribution}%</div>
                            </div>
                          </div>
                        </React.Fragment>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Competitors */}
          {currentStep === 3 && (
            <div className="max-w-xl mx-auto space-y-8">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-foreground mb-2">Add your competitors</h2>
                <p className="text-sm text-muted-foreground">
                  Track your competitive landscape for better insights
                </p>
              </div>

              <div className="space-y-4">
                {competitors.map((competitor, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                      <span className="text-sm font-medium text-muted-foreground">
                        {competitor.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">{competitor.name}</div>
                      <div className="text-xs text-muted-foreground">{competitor.domain}</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveCompetitor(index)}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                {/* Add competitor with input + dropdown suggestions */}
                <div className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-border">
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Competitor name"
                      value={newCompetitorName}
                      onChange={(e) => {
                        setNewCompetitorName(e.target.value)
                        setCompetitorInputOpen(e.target.value.length > 0)
                      }}
                      onFocus={() => setCompetitorInputOpen(newCompetitorName.length > 0)}
                      onBlur={() => setTimeout(() => setCompetitorInputOpen(false), 200)}
                    />
                    {competitorInputOpen && assetsCompetitors
                      .filter(c =>
                        !competitors.find(existing => existing.domain === c.domain) &&
                        (c.name.toLowerCase().includes(newCompetitorName.toLowerCase()) ||
                         c.domain.toLowerCase().includes(newCompetitorName.toLowerCase()))
                      ).length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-md z-50">
                        {assetsCompetitors
                          .filter(c =>
                            !competitors.find(existing => existing.domain === c.domain) &&
                            (c.name.toLowerCase().includes(newCompetitorName.toLowerCase()) ||
                             c.domain.toLowerCase().includes(newCompetitorName.toLowerCase()))
                          )
                          .map((competitor) => (
                            <div
                              key={competitor.domain}
                              className="px-3 py-2 text-sm cursor-pointer hover:bg-muted"
                              onMouseDown={() => {
                                setNewCompetitorName(competitor.name)
                                setNewCompetitorDomain(competitor.domain)
                                setCompetitorInputOpen(false)
                              }}
                            >
                              <span className="font-medium">{competitor.name}</span>
                              <span className="text-xs text-muted-foreground ml-2">{competitor.domain}</span>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                  <Input
                    placeholder="domain.com"
                    value={newCompetitorDomain}
                    onChange={(e) => setNewCompetitorDomain(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddCompetitor}
                    disabled={!newCompetitorName || !newCompetitorDomain}
                    className="h-10 w-10 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  {competitors.length} competitor{competitors.length !== 1 ? "s" : ""} added
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Prompts */}
          {currentStep === 4 && (
            <div className="max-w-xl mx-auto space-y-8">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-foreground mb-2">Choose prompts to monitor</h2>
                <p className="text-sm text-muted-foreground">
                  We'll track how your brand appears in AI answers for these prompts
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {selectedPrompts.size} of {suggestedPrompts.length} selected
                  </span>
                  <Button variant="ghost" size="sm" onClick={handleSelectAllPrompts}>
                    {selectedPrompts.size === suggestedPrompts.length ? "Deselect All" : "Select All"}
                  </Button>
                </div>

                <div className="space-y-2 max-h-80 overflow-auto">
                  {suggestedPrompts.map((prompt) => (
                    <div
                      key={prompt.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedPrompts.has(prompt.id)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-muted/50"
                      }`}
                      onClick={() => handleTogglePrompt(prompt.id)}
                    >
                      <Checkbox
                        checked={selectedPrompts.has(prompt.id)}
                        onCheckedChange={() => handleTogglePrompt(prompt.id)}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{prompt.prompt}</p>
                        <span className="text-xs text-muted-foreground">{prompt.intent}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-8 flex items-center justify-center gap-4">
        {currentStep > 1 && (
          <Button variant="ghost" onClick={handleBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        )}

        {currentStep === 2 && (
          <Button
            onClick={() => setCurrentStep(3)}
            disabled={!isStep2Valid}
            className="w-80 gap-2"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}

        {currentStep === 3 && (
          <Button
            onClick={() => {
              setCurrentStep(4)
              // Auto-select all prompts when entering step 4
              setSelectedPrompts(new Set(suggestedPrompts.map(p => p.id)))
            }}
            disabled={!isStep3Valid}
            className="w-80 gap-2"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}

        {currentStep === 4 && (
          <Button
            onClick={handleLaunch}
            disabled={!isStep4Valid}
            className="w-80 gap-2"
          >
            Launch
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
