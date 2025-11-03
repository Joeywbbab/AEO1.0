// Common types
export type Sentiment = "Positive" | "Neutral" | "Negative"
export type Stage = "Awareness" | "Consideration" | "Decision"
export type Model = "GPT" | "Perplexity" | "AI Overview"
export type Priority = "High" | "Medium" | "Low"

export type BrandMention = {
  brand: string
  icon: string
  color: string
}

// Prompt types
export type PromptStatus = "Active" | "Suggested" | "Inactive"
export type PromptType = "Informational" | "Comparative" | "Transactional"

export type Prompt = {
  id: string
  prompt: string
  stage: Stage
  type: PromptType
  mentionsMe: number
  mentionsCompetitors: number
  brandMentions: BrandMention[]
  visibilityScore: number
  sentiment: Sentiment
  sentimentScore: number
  position: string
  positionRank: number
  modelsCovered: string[]
  lastUpdated: string
  status: PromptStatus
  volume: number[]
  tags: string[]
  intent: string
  country: string
  created: string
}

export type PromptDetail = {
  id: string
  prompt: string
  stage: Stage
  type: PromptType
  sentiment: Sentiment
  lastUpdated: string
  visibilityTrend: { date: string; score: number }[]
  competitorMentions: { competitor: string; visibility: number; avgRank: number }[]
  topSources: {
    domain: string
    pageUrl: string
    avgCitations: number
    usage: number
  }[]
  chatHistory: ChatHistoryItem[]
}

export type ChatHistoryItem = {
  id: string
  model: Model
  modelIcon: string
  response: string
  brandMentions: BrandMention[]
  timestamp: string
  createdAt: string
  citations: {
    domain: string
    pageUrl: string
    pageTitle: string
    icon: string
  }[]
  fullConversation?: {
    query: string
    response: string
  }
}

// Citation types
export type CitationType =
  | "blog post"
  | "ultimate guide"
  | "how-to guide"
  | "listicle"
  | "comparison post"
  | "product listing"
  | "reddit"
  | "linkedin"

export type Citation = {
  id: string
  domain: string
  pageTitle: string
  url: string
  prompt: string
  mentionsMe: boolean
  mentionsCompetitor: boolean
  brandMentions: BrandMention[]
  visibilityRank: number
  sentiment: Sentiment
  model: Model
  capturedAt: string
  snippet: string
  type: CitationType
  mentioned: boolean
  usedTotal: number
  avgCitations: number
  updated: string
}

// Opportunity types
export type OpportunityType = "Creation" | "Optimization" | "Refresh" | "Suggestion"

export type Opportunity = {
  id: string
  title: string
  type: OpportunityType
  sourcePrompts: string[]
  evidence: string[]
  suggestedContentType: string
  estimatedImpact: Priority
  stage: Stage
}

// Content types
export type ContentType = "Blog Post" | "Comparison Post" | "Listicle" | "Product Listing" | "Social Post"
export type ContentStatus = "Draft" | "In Progress" | "Review" | "Published"

export type ContentBrief = {
  id: string
  title: string
  contentType: ContentType
  stage: Stage
  targetKeyword: string
  priority: Priority
  status: ContentStatus
  dueDate: string
  opportunitySource?: string
}

// Dashboard types
export type DashboardVisibilityTrend = {
  date: string
  yourBrand: number
  competitorA: number
  competitorB: number
}

export type DashboardCompetitiveRanking = {
  brand: string
  rank: number
  rankChange: number
  visibilityScore: number
}

export type AttributionStrength = "Strong" | "Medium" | "Weak"
export type OpportunityStatus = "Pending" | "In Progress" | "Evaluated"

export type DashboardOpportunity = {
  id: string
  name: string
  actionType: OpportunityType
  status: OpportunityStatus
  baselineScore: number
  baselineRank: number
  currentScore: number
  currentRank: number
  change: number
  attributionStrength: AttributionStrength
}

// Competitor types
export type SuggestedCompetitor = {
  id: string
  name: string
  url: string
  shareOfVoice: number
  sentiment: Sentiment
  description: string
  reason: string
}

export type Competitor = {
  id: string
  name: string
  domain: string
  url: string
}

// Chat types
export type RecentChat = {
  id: string
  title: string
  modelIcon: string
  mentions: BrandMention[]
  created: string
}

// Source types
export type TopSource = {
  rank: number
  domain: string
  count: number
  percentage: number
}

// Audit types
export type AuditScore = {
  category: string
  score: number
  maxScore: number
  status: "good" | "warning" | "poor"
}

export type AuditIntent = {
  id: string
  intent: string
  category: string
  issueType: "Missing" | "Underperforming" | "Opportunity"
  currentRank: number | string
  competitorRank: number | string
  gap: string
  priority: Priority
}

// Filter types
export type FilterOptions = {
  dateRange?: string
  model?: string
  tags?: string[]
  intent?: string
  mentions?: string
}
