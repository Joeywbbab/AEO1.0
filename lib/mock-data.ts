export type Prompt = {
  id: string
  prompt: string
  stage: "Awareness" | "Consideration" | "Decision"
  type: "Informational" | "Comparative" | "Transactional"
  mentionsMe: number
  mentionsCompetitors: number
  brandMentions: { brand: string; icon: string; color: string }[]
  visibilityScore: number
  sentiment: "Positive" | "Neutral" | "Negative"
  sentimentScore: number // Added sentiment score for display
  position: string
  positionRank: number // Added numeric position for display
  modelsCovered: string[]
  lastUpdated: string
  status: "Active" | "Suggested" | "Inactive" // Added status field
  volume: number[] // Added volume data for bar chart
  tags: string[] // Added tags field
  intent: string // Intent of the prompt
  country: string // Country associated with the prompt
  created: string // Creation timestamp
}

export type Citation = {
  id: string
  domain: string
  pageTitle: string
  url: string
  prompt: string
  mentionsMe: boolean
  mentionsCompetitor: boolean
  brandMentions: { brand: string; icon: string; color: string }[]
  visibilityRank: number
  sentiment: "Positive" | "Neutral" | "Negative"
  model: "GPT" | "Perplexity" | "AI Overview"
  capturedAt: string
  snippet: string
  type:
    | "blog post"
    | "ultimate guide"
    | "how-to guide"
    | "listicle"
    | "comparison post"
    | "product listing"
    | "reddit"
    | "linkedin"
  mentioned: boolean
  usedTotal: number
  avgCitations: number
  updated: string
}

export type Opportunity = {
  id: string
  title: string
  type: "Creation" | "Optimization" | "Refresh" | "Suggestion"
  sourcePrompts: string[]
  evidence: string[]
  suggestedContentType: string
  estimatedImpact: "High" | "Medium" | "Low"
  stage: "Awareness" | "Consideration" | "Decision"
}

export type ContentBrief = {
  id: string
  title: string
  contentType: "Blog Post" | "Comparison Post" | "Listicle" | "Product Listing" | "Social Post"
  stage: "Awareness" | "Consideration" | "Decision"
  targetKeyword: string
  priority: "High" | "Medium" | "Low"
  status: "Draft" | "In Progress" | "Review" | "Published"
  dueDate: string
  opportunitySource?: string // Added opportunity source field
}

export type PromptDetail = {
  id: string
  prompt: string
  stage: "Awareness" | "Consideration" | "Decision"
  type: "Informational" | "Comparative" | "Transactional"
  sentiment: "Positive" | "Neutral" | "Negative"
  lastUpdated: string
  visibilityTrend: { date: string; score: number }[]
  competitorMentions: { competitor: string; visibility: number; avgRank: number }[] // Changed mentions to visibility
  topSources: {
    domain: string
    pageUrl: string
    avgCitations: number // Added avgCitations
    usage: number // Added usage percentage
  }[]
  chatHistory: {
    id: string
    model: "GPT" | "Perplexity" | "AI Overview"
    modelIcon: string
    response: string
    brandMentions: { brand: string; icon: string; color: string }[]
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
  }[]
}

export type DashboardVisibilityTrend = {
  date: string
  yourBrand: number
  competitorA: number
  competitorB: number
}

export type DashboardCompetitiveRanking = {
  brand: string
  rank: number
  rankChange: number // Added rank change field
  visibilityScore: number
}

export type DashboardOpportunity = {
  id: string
  name: string
  actionType: "Creation" | "Refresh" | "Optimization"
  status: "Pending" | "In Progress" | "Evaluated"
  baselineScore: number
  baselineRank: number
  currentScore: number
  currentRank: number
  change: number
  attributionStrength: "Strong" | "Medium" | "Weak"
}

export type SuggestedCompetitor = {
  id: string
  name: string
  url: string
  shareOfVoice: number
  sentiment: "Positive" | "Neutral" | "Negative"
  description: string
  reason: string
}

export type RecentChat = {
  id: string
  model: "GPT" | "Perplexity" | "AI Overview"
  modelIcon: string
  title: string
  mentions: { brand: string; icon: string; color: string }[]
  created: string
}

export type ChatDetail = {
  id: string
  query: string
  response: string
  model: "ChatGPT" | "Perplexity" | "Gemini" | "Claude"
  modelIcon: string
  lastRun: string
  promptLength: number
  responseLength: number
  competitorMentions: {
    name: string
    domain: string
    mentions: number
    score: number
  }[]
  sources: {
    id: string
    title: string
    url: string
    favicon?: string
  }[]
}

export type SourceRanking = {
  rank: number
  domain: string
  count: number
  percentage: number
}

export type AuditIntent = {
  id: string
  intent: string
  category: "Technical" | "Content" | "Images" | "Social" | "Sitewide"
  urlCount: number
  urls: {
    url: string
    issue: string
    detected: string
  }[]
  details: string
  detected: string
}

export type Competitor = {
  id: string
  name: string
  domain: string
  addedDate: string
}

export type AuditIssue = {
  id: string
  criticalIssue: string
  category: "Technical" | "Content" | "Images" | "Social" | "Sitewide"
  url: string
  details: string
  detected: string
}

export const mockPrompts: Prompt[] = [
  {
    id: "1",
    prompt: "What are the best project management tools for remote teams?",
    stage: "Awareness",
    type: "Informational",
    mentionsMe: 3,
    mentionsCompetitors: 8,
    brandMentions: [
      { brand: "Asana", icon: "A", color: "#F06A6A" },
      { brand: "Monday", icon: "M", color: "#FF3D57" },
      { brand: "Trello", icon: "T", color: "#0079BF" },
      { brand: "ClickUp", icon: "C", color: "#7B68EE" },
    ],
    visibilityScore: 72,
    sentiment: "Positive",
    sentimentScore: 68,
    position: "Listed in top 5 alternatives",
    positionRank: 3.2,
    modelsCovered: ["GPT", "Perplexity"],
    lastUpdated: "2024-01-10",
    status: "Active",
    volume: [3, 5, 2, 4, 6, 3, 5],
    tags: ["remote", "collaboration"],
    intent: "Informational",
    country: "US",
    created: "2024-01-05",
  },
  {
    id: "2",
    prompt: "Asana vs Monday.com: which is better for agile teams?",
    stage: "Consideration",
    type: "Comparative",
    mentionsMe: 5,
    mentionsCompetitors: 5,
    brandMentions: [
      { brand: "Asana", icon: "A", color: "#F06A6A" },
      { brand: "Monday", icon: "M", color: "#FF3D57" },
    ],
    visibilityScore: 85,
    sentiment: "Positive",
    sentimentScore: 75,
    position: "Featured in direct comparison",
    positionRank: 1.8,
    modelsCovered: ["GPT", "Perplexity", "AI Overview"],
    lastUpdated: "2024-01-12",
    status: "Active",
    volume: [4, 6, 5, 7, 8, 6, 7],
    tags: ["comparison", "agile"],
    intent: "Comparative",
    country: "UK",
    created: "2024-01-08",
  },
  {
    id: "3",
    prompt: "How to set up automated workflows in project management software?",
    stage: "Decision",
    type: "Transactional",
    mentionsMe: 7,
    mentionsCompetitors: 2,
    brandMentions: [
      { brand: "Asana", icon: "A", color: "#F06A6A" },
      { brand: "Zapier", icon: "Z", color: "#FF4A00" },
    ],
    visibilityScore: 92,
    sentiment: "Positive",
    sentimentScore: 82,
    position: "Primary recommendation",
    positionRank: 1.2,
    modelsCovered: ["GPT", "AI Overview"],
    lastUpdated: "2024-01-11",
    status: "Active",
    volume: [5, 7, 6, 8, 9, 7, 8],
    tags: ["automation", "workflows"],
    intent: "Transactional",
    country: "US",
    created: "2024-01-07",
  },
  {
    id: "4",
    prompt: "What features should I look for in task management software?",
    stage: "Awareness",
    type: "Informational",
    mentionsMe: 2,
    mentionsCompetitors: 6,
    brandMentions: [
      { brand: "Asana", icon: "A", color: "#F06A6A" },
      { brand: "Notion", icon: "N", color: "#000000" },
      { brand: "Todoist", icon: "T", color: "#E44332" },
    ],
    visibilityScore: 58,
    sentiment: "Neutral",
    sentimentScore: 55,
    position: "Mentioned as example",
    positionRank: 5.1,
    modelsCovered: ["Perplexity"],
    lastUpdated: "2024-01-09",
    status: "Suggested",
    volume: [2, 3, 2, 3, 4, 2, 3],
    tags: ["features"],
    intent: "Informational",
    country: "CA",
    created: "2024-01-04",
  },
  {
    id: "5",
    prompt: "Best free project management tools for startups",
    stage: "Consideration",
    type: "Comparative",
    mentionsMe: 4,
    mentionsCompetitors: 9,
    brandMentions: [
      { brand: "Asana", icon: "A", color: "#F06A6A" },
      { brand: "Trello", icon: "T", color: "#0079BF" },
      { brand: "ClickUp", icon: "C", color: "#7B68EE" },
      { brand: "Notion", icon: "N", color: "#000000" },
    ],
    visibilityScore: 68,
    sentiment: "Positive",
    sentimentScore: 70,
    position: "Listed in free tier comparison",
    positionRank: 2.5,
    modelsCovered: ["GPT", "Perplexity"],
    lastUpdated: "2024-01-13",
    status: "Active",
    volume: [3, 5, 4, 5, 6, 4, 5],
    tags: ["pricing", "startups"],
    intent: "Comparative",
    country: "US",
    created: "2024-01-09",
  },
  {
    id: "6",
    prompt: "Tools for building AI companions that remember past interactions",
    stage: "Awareness",
    type: "Informational",
    mentionsMe: 4,
    mentionsCompetitors: 7,
    brandMentions: [
      { brand: "GitHub", icon: "G", color: "#181717" },
      { brand: "Replit", icon: "R", color: "#F26207" },
      { brand: "Upstash", icon: "U", color: "#00E9A3" },
      { brand: "LangChain", icon: "L", color: "#1C3C3C" },
      { brand: "Pinecone", icon: "P", color: "#000000" },
    ],
    visibilityScore: 83,
    sentiment: "Positive",
    sentimentScore: 72,
    position: "Listed in recommendations",
    positionRank: 2.3,
    modelsCovered: ["GPT", "Perplexity"],
    lastUpdated: "2024-01-14",
    status: "Active",
    volume: [4, 6, 5, 7, 8, 6, 7],
    tags: ["AI", "memory"],
    intent: "Informational",
    country: "UK",
    created: "2024-01-10",
  },
  {
    id: "7",
    prompt: "What architecture should I use for persistent memory in conversational AI?",
    stage: "Consideration",
    type: "Comparative",
    mentionsMe: 3,
    mentionsCompetitors: 5,
    brandMentions: [
      { brand: "GitHub", icon: "G", color: "#181717" },
      { brand: "Pinecone", icon: "P", color: "#000000" },
      { brand: "Replit", icon: "R", color: "#F26207" },
      { brand: "LangChain", icon: "L", color: "#1C3C3C" },
    ],
    visibilityScore: 67,
    sentiment: "Neutral",
    sentimentScore: 69,
    position: "Technical comparison",
    positionRank: 3.6,
    modelsCovered: ["GPT", "Perplexity"],
    lastUpdated: "2024-01-13",
    status: "Suggested",
    volume: [3, 4, 3, 5, 6, 4, 5],
    tags: ["architecture", "AI"],
    intent: "Comparative",
    country: "US",
    created: "2024-01-11",
  },
  {
    id: "8",
    prompt: "Best solutions for adding long-term memory to AI applications 2025",
    stage: "Decision",
    type: "Transactional",
    mentionsMe: 5,
    mentionsCompetitors: 6,
    brandMentions: [
      { brand: "GitHub", icon: "G", color: "#181717" },
      { brand: "Replit", icon: "R", color: "#F26207" },
      { brand: "Pinecone", icon: "P", color: "#000000" },
      { brand: "LangChain", icon: "L", color: "#1C3C3C" },
    ],
    visibilityScore: 58,
    sentiment: "Positive",
    sentimentScore: 70,
    position: "Solution provider",
    positionRank: 4.1,
    modelsCovered: ["GPT"],
    lastUpdated: "2024-01-12",
    status: "Inactive",
    volume: [2, 3, 2, 4, 5, 3, 4],
    tags: ["solutions", "2025"],
    intent: "Transactional",
    country: "AU",
    created: "2024-01-12",
  },
]

export const mockCitations: Citation[] = [
  {
    id: "1",
    domain: "techcrunch.com",
    pageTitle: "The Best Project Management Software for 2024",
    url: "https://techcrunch.com/best-pm-software",
    prompt: "What are the best project management tools for remote teams?",
    mentionsMe: true,
    mentionsCompetitor: true,
    brandMentions: [
      { brand: "Asana", icon: "A", color: "#F06A6A" },
      { brand: "Monday", icon: "M", color: "#FF3D57" },
      { brand: "Trello", icon: "T", color: "#0079BF" },
    ],
    visibilityRank: 3,
    sentiment: "Positive",
    model: "GPT",
    capturedAt: "2024-01-10",
    snippet: "Among the top contenders, Asana stands out for its intuitive interface and robust automation features...",
    type: "blog post",
    mentioned: true,
    usedTotal: 29,
    avgCitations: 1.7,
    updated: "3 days ago",
  },
  {
    id: "2",
    domain: "forbes.com",
    pageTitle: "Asana vs Monday: A Comprehensive Comparison",
    url: "https://forbes.com/asana-vs-monday",
    prompt: "Asana vs Monday.com: which is better for agile teams?",
    mentionsMe: true,
    mentionsCompetitor: true,
    brandMentions: [
      { brand: "Asana", icon: "A", color: "#F06A6A" },
      { brand: "Monday", icon: "M", color: "#FF3D57" },
    ],
    visibilityRank: 1,
    sentiment: "Positive",
    model: "Perplexity",
    capturedAt: "2024-01-12",
    snippet: "For agile teams, Asana offers superior sprint planning and backlog management capabilities...",
    type: "comparison post",
    mentioned: false,
    usedTotal: 45,
    avgCitations: 2.3,
    updated: "1 day ago",
  },
  {
    id: "3",
    domain: "pcmag.com",
    pageTitle: "Best Project Management Tools 2024",
    url: "https://pcmag.com/best-pm-tools",
    prompt: "What are the best project management tools for remote teams?",
    mentionsMe: true,
    mentionsCompetitor: true,
    brandMentions: [
      { brand: "Asana", icon: "A", color: "#F06A6A" },
      { brand: "ClickUp", icon: "C", color: "#7B68EE" },
      { brand: "Notion", icon: "N", color: "#000000" },
    ],
    visibilityRank: 2,
    sentiment: "Positive",
    model: "GPT",
    capturedAt: "2024-01-11",
    snippet: "PCMag's top picks include Asana for its comprehensive feature set...",
    type: "listicle",
    mentioned: true,
    usedTotal: 38,
    avgCitations: 1.9,
    updated: "2 days ago",
  },
  {
    id: "4",
    domain: "python.langchain.com",
    pageTitle: "How to add memory to chatbots | 🦜🔗 LangChain",
    url: "https://python.langchain.com/docs/how_to/chatbots_memory/",
    prompt: "Tools for building AI companions with memory",
    mentionsMe: false,
    mentionsCompetitor: true,
    brandMentions: [{ brand: "LangChain", icon: "L", color: "#1C3C3C" }],
    visibilityRank: 1,
    sentiment: "Positive",
    model: "GPT",
    capturedAt: "2024-01-13",
    snippet: "LangChain provides comprehensive memory management for chatbots...",
    type: "how-to guide",
    mentioned: false,
    usedTotal: 29,
    avgCitations: 1.7,
    updated: "3 days ago",
  },
]

export const mockOpportunities: Opportunity[] = [
  {
    id: "1",
    title: "Create guide on project management for healthcare teams",
    type: "Creation",
    sourcePrompts: ["Best PM tools for healthcare", "HIPAA-compliant task management"],
    evidence: ["Competitors mentioned 12 times", "Zero brand presence"],
    suggestedContentType: "Ultimate Guide",
    estimatedImpact: "High",
    stage: "Awareness",
  },
  {
    id: "2",
    title: "Optimize existing automation features page",
    type: "Optimization",
    sourcePrompts: ["How to automate workflows", "Best automation features"],
    evidence: ["Competitor ranks higher", "Missing key entities"],
    suggestedContentType: "Feature Page",
    estimatedImpact: "Medium",
    stage: "Decision",
  },
  {
    id: "3",
    title: "Refresh pricing comparison content",
    type: "Refresh",
    sourcePrompts: ["Project management software pricing", "Best value PM tools"],
    evidence: ["Content is 6 months old", "Competitor updated recently"],
    suggestedContentType: "Comparison Post",
    estimatedImpact: "High",
    stage: "Consideration",
  },
  {
    id: "4",
    title: "Create content for nonprofit organizations",
    type: "Suggestion",
    sourcePrompts: ["PM tools for nonprofits", "Volunteer management software"],
    evidence: ["Neither brand nor competitor mentioned", "High search volume"],
    suggestedContentType: "Blog Post",
    estimatedImpact: "Medium",
    stage: "Awareness",
  },
  {
    id: "5",
    title: "Optimize integration marketplace page",
    type: "Optimization",
    sourcePrompts: ["Best integrations for project management", "Connect PM tools with Slack"],
    evidence: ["Competitor has better structured data", "Missing integration examples"],
    suggestedContentType: "Feature Page",
    estimatedImpact: "High",
    stage: "Decision",
  },
  {
    id: "6",
    title: "Create mobile app comparison guide",
    type: "Creation",
    sourcePrompts: ["Best mobile PM apps", "Project management on the go"],
    evidence: ["Competitors dominate mobile queries", "No mobile-specific content"],
    suggestedContentType: "Comparison Post",
    estimatedImpact: "Medium",
    stage: "Consideration",
  },
]

export const mockContentBriefs: ContentBrief[] = [
  {
    id: "1",
    title: "Ultimate Guide to Project Management for Remote Teams",
    contentType: "Blog Post",
    stage: "Awareness",
    targetKeyword: "project management remote teams",
    priority: "High",
    status: "In Progress",
    dueDate: "2024-01-20",
    opportunitySource: "Create guide on project management for healthcare teams", // Added opportunity source
  },
  {
    id: "2",
    title: "Asana vs Competitors: Feature Comparison 2024",
    contentType: "Comparison Post",
    stage: "Consideration",
    targetKeyword: "asana vs competitors",
    priority: "Medium",
    status: "Draft",
    dueDate: "2024-01-25",
    opportunitySource: "Refresh pricing comparison content", // Added opportunity source
  },
]

export const mockPromptDetails: Record<string, PromptDetail> = {
  "1": {
    id: "1",
    prompt: "What are the best project management tools for remote teams?",
    stage: "Awareness",
    type: "Informational",
    sentiment: "Positive",
    lastUpdated: "2024-01-10",
    visibilityTrend: [
      { date: "2024-01-01", score: 65 },
      { date: "2024-01-02", score: 68 },
      { date: "2024-01-03", score: 67 },
      { date: "2024-01-04", score: 70 },
      { date: "2024-01-05", score: 72 },
      { date: "2024-01-06", score: 71 },
      { date: "2024-01-07", score: 74 },
      { date: "2024-01-08", score: 76 },
      { date: "2024-01-09", score: 75 },
      { date: "2024-01-10", score: 78 },
    ],
    competitorMentions: [
      { competitor: "Monday.com", visibility: 8, avgRank: 2.3 }, // Changed mentions to visibility
      { competitor: "Trello", visibility: 7, avgRank: 3.1 },
      { competitor: "Asana (Me)", visibility: 3, avgRank: 4.5 },
      { competitor: "ClickUp", visibility: 6, avgRank: 3.8 },
      { competitor: "Notion", visibility: 5, avgRank: 5.2 },
    ],
    topSources: [
      {
        domain: "techcrunch.com",
        pageUrl: "https://techcrunch.com/2024/best-pm-tools-remote",
        avgCitations: 2.3,
        usage: 18.5,
      },
      {
        domain: "forbes.com",
        pageUrl: "https://forbes.com/advisor/business/software/best-project-management-software",
        avgCitations: 1.9,
        usage: 15.2,
      },
      {
        domain: "pcmag.com",
        pageUrl: "https://pcmag.com/picks/best-project-management-software",
        avgCitations: 1.7,
        usage: 12.8,
      },
      {
        domain: "capterra.com",
        pageUrl: "https://capterra.com/project-management-software",
        avgCitations: 1.5,
        usage: 11.3,
      },
      {
        domain: "g2.com",
        pageUrl: "https://g2.com/categories/project-management",
        avgCitations: 1.4,
        usage: 9.7,
      },
    ],
    chatHistory: [
      {
        id: "1",
        model: "Perplexity",
        modelIcon: "🔮",
        response:
          "The best tools for building AI companions with memory combine long-term conversation storage, semantic recall, and seamless integration with large language mod...",
        brandMentions: [
          { brand: "GitHub", icon: "G", color: "#181717" },
          { brand: "Upstash", icon: "U", color: "#00E9A3" },
          { brand: "Replit", icon: "R", color: "#F26207" },
        ],
        timestamp: "2024-01-15T10:30:00Z",
        createdAt: "9 hr. ago",
        citations: [
          {
            domain: "github.com",
            pageUrl: "https://github.com/langchain-ai/langchain",
            pageTitle: "LangChain - Building applications with LLMs",
            icon: "G",
          },
          {
            domain: "upstash.com",
            pageUrl: "https://upstash.com/docs/redis/features/vector",
            pageTitle: "Vector Database for AI Memory",
            icon: "U",
          },
        ],
        fullConversation: {
          query: "What are the best tools for building AI companions with memory?",
          response:
            "The best tools for building AI companions with memory combine long-term conversation storage, semantic recall, and seamless integration with large language models. Key solutions include:\n\n1. **LangChain** - Provides memory management abstractions and conversation chains\n2. **Upstash Vector** - Redis-based vector database for semantic memory\n3. **Pinecone** - Managed vector database for storing embeddings\n4. **Mem0** - Purpose-built memory layer for AI applications\n\nThese tools enable persistent context across conversations, allowing AI companions to remember user preferences, past interactions, and build more personalized experiences.",
        },
      },
      {
        id: "2",
        model: "AI Overview",
        modelIcon: "🤖",
        response:
          "Building AI companions that remember past interactions involves utilizing both technical and design strategies. The key tools to consider for this are a combination o...",
        brandMentions: [
          { brand: "Replit", icon: "R", color: "#F26207" },
          { brand: "Replit", icon: "R", color: "#F26207" },
        ],
        timestamp: "2024-01-15T10:15:00Z",
        createdAt: "9 hr. ago",
        citations: [
          {
            domain: "replit.com",
            pageUrl: "https://replit.com/ai",
            pageTitle: "Build AI Apps with Replit",
            icon: "R",
          },
        ],
        fullConversation: {
          query: "How do I build AI companions that remember conversations?",
          response:
            "Building AI companions that remember past interactions involves utilizing both technical and design strategies. The key tools to consider for this are a combination of vector databases, conversation management frameworks, and LLM integration platforms. Replit provides an excellent development environment for prototyping these applications quickly.",
        },
      },
      {
        id: "3",
        model: "GPT",
        modelIcon: "G",
        response:
          "Tools for building AI companions with memory include semantic memory management systems like Mem0 and Zep, which store and retrieve conversational context ...",
        brandMentions: [
          { brand: "GitHub", icon: "G", color: "#181717" },
          { brand: "LangChain", icon: "L", color: "#1C3C3C" },
          { brand: "Replit", icon: "R", color: "#F26207" },
        ],
        timestamp: "2024-01-14T16:20:00Z",
        createdAt: "1 day ago",
        citations: [
          {
            domain: "github.com",
            pageUrl: "https://github.com/mem0ai/mem0",
            pageTitle: "Mem0 - Memory Layer for AI",
            icon: "G",
          },
          {
            domain: "langchain.com",
            pageUrl: "https://langchain.com/memory",
            pageTitle: "Memory in LangChain",
            icon: "L",
          },
        ],
        fullConversation: {
          query: "What tools help AI companions remember past interactions?",
          response:
            "Tools for building AI companions with memory include memory frameworks like MemU and Agno, and semantic memory management systems like mem0, which en...",
        },
      },
      {
        id: "4",
        model: "Perplexity",
        modelIcon: "🔮",
        response:
          "Here are a bunch of tools, research, and design-patterns for building AI companions that *remember* — including ways to structure memory, open source framewor...",
        brandMentions: [
          { brand: "GitHub", icon: "G", color: "#181717" },
          { brand: "Upstash", icon: "U", color: "#00E9A3" },
          { brand: "Replit", icon: "R", color: "#F26207" },
        ],
        timestamp: "2024-01-14T09:45:00Z",
        createdAt: "1 day ago",
        citations: [
          {
            domain: "github.com",
            pageUrl: "https://github.com/patterns/ai-memory",
            pageTitle: "AI Memory Design Patterns",
            icon: "G",
          },
        ],
        fullConversation: {
          query: "Show me tools and patterns for AI memory",
          response:
            "Here are a bunch of tools, research, and design-patterns for building AI companions that *remember* — including ways to structure memory, open source frameworks, and best practices for maintaining conversation context across sessions.",
        },
      },
      {
        id: "5",
        model: "GPT",
        modelIcon: "G",
        response:
          "Tools for building AI companions with memory include memory frameworks like MemU and Agno, and semantic memory management systems like mem0, which en...",
        brandMentions: [
          { brand: "Upstash", icon: "U", color: "#00E9A3" },
          { brand: "GitHub", icon: "G", color: "#181717" },
          { brand: "Replit", icon: "R", color: "#F26207" },
        ],
        timestamp: "2024-01-14T08:30:00Z",
        createdAt: "1 day ago",
        citations: [
          {
            domain: "upstash.com",
            pageUrl: "https://upstash.com/blog/ai-memory",
            pageTitle: "Building AI Memory with Upstash",
            icon: "U",
          },
        ],
        fullConversation: {
          query: "What are the best memory frameworks for AI?",
          response:
            "Tools for building AI companions with memory include memory frameworks like MemU and Agno, and semantic memory management systems like mem0, which enable persistent context. Upstash provides vector storage, GitHub hosts open-source implementations, and Replit offers a development environment for rapid prototyping.",
        },
      },
      {
        id: "6",
        model: "Perplexity",
        modelIcon: "🔮",
        response:
          "The best tools for building AI companions that remember past interactions use specialized memory architectures to maintain conversation history and context, allowi...",
        brandMentions: [
          { brand: "GitHub", icon: "G", color: "#181717" },
          { brand: "Upstash", icon: "U", color: "#00E9A3" },
          { brand: "Replit", icon: "R", color: "#F26207" },
        ],
        timestamp: "2024-01-14T07:15:00Z",
        createdAt: "1 day ago",
        citations: [
          {
            domain: "github.com",
            pageUrl: "https://github.com/ai-memory-systems",
            pageTitle: "AI Memory Systems Repository",
            icon: "G",
          },
        ],
        fullConversation: {
          query: "How do AI companions maintain memory?",
          response:
            "The best tools for building AI companions that remember past interactions use specialized memory architectures to maintain conversation history and context, allowing for more personalized and coherent interactions over time.",
        },
      },
      {
        id: "7",
        model: "AI Overview",
        modelIcon: "🤖",
        response:
          "If you're building an AI companion that *remembers* past interactions (and not just what was said a few minutes ago), there are a number of useful tools, framework...",
        brandMentions: [
          { brand: "GitHub", icon: "G", color: "#181717" },
          { brand: "Pinecone", icon: "P", color: "#000000" },
          { brand: "Replit", icon: "R", color: "#F26207" },
        ],
        timestamp: "2024-01-13T14:20:00Z",
        createdAt: "2 days ago",
        citations: [
          {
            domain: "pinecone.io",
            pageUrl: "https://pinecone.io/learn/ai-memory",
            pageTitle: "AI Memory with Vector Databases",
            icon: "P",
          },
        ],
        fullConversation: {
          query: "Tools for long-term AI memory?",
          response:
            "If you're building an AI companion that *remembers* past interactions (and not just what was said a few minutes ago), there are a number of useful tools, frameworks, and design patterns to consider. Vector databases like Pinecone enable semantic search, while GitHub provides open-source implementations.",
        },
      },
    ],
  },
}

export const mockDashboardVisibilityTrend: DashboardVisibilityTrend[] = [
  { date: "Jan 1", yourBrand: 65, competitorA: 72, competitorB: 68 },
  { date: "Jan 5", yourBrand: 68, competitorA: 74, competitorB: 70 },
  { date: "Jan 10", yourBrand: 72, competitorA: 76, competitorB: 71 },
  { date: "Jan 15", yourBrand: 75, competitorA: 78, competitorB: 73 },
  { date: "Jan 20", yourBrand: 78, competitorA: 80, competitorB: 75 },
  { date: "Jan 25", yourBrand: 82, competitorA: 81, competitorB: 76 },
  { date: "Jan 30", yourBrand: 85, competitorA: 82, competitorB: 78 },
]

export const mockDashboardCompetitiveRanking: DashboardCompetitiveRanking[] = [
  {
    brand: "Your Brand (Asana)",
    rank: 1,
    rankChange: 2, // Added rank change values
    visibilityScore: 85,
  },
  {
    brand: "Monday.com",
    rank: 2,
    rankChange: 0,
    visibilityScore: 82,
  },
  {
    brand: "Trello",
    rank: 3,
    rankChange: -1,
    visibilityScore: 78,
  },
  {
    brand: "ClickUp",
    rank: 4,
    rankChange: 1,
    visibilityScore: 76,
  },
  {
    brand: "Notion",
    rank: 5,
    rankChange: 0,
    visibilityScore: 72,
  },
]

export const mockDashboardOpportunities: DashboardOpportunity[] = [
  {
    id: "1",
    name: "Create a blog post due to low market awareness",
    actionType: "Creation",
    status: "In Progress",
    baselineScore: 62,
    baselineRank: 5,
    currentScore: 80,
    currentRank: 2,
    change: 18,
    attributionStrength: "Strong",
  },
  {
    id: "2",
    name: "Refresh pricing comparison content",
    actionType: "Refresh",
    status: "Evaluated",
    baselineScore: 68,
    baselineRank: 4,
    currentScore: 85,
    currentRank: 1,
    change: 17,
    attributionStrength: "Strong",
  },
  {
    id: "3",
    name: "Optimize automation features page",
    actionType: "Optimization",
    status: "In Progress",
    baselineScore: 72,
    baselineRank: 3,
    currentScore: 78,
    currentRank: 2,
    change: 6,
    attributionStrength: "Medium",
  },
  {
    id: "4",
    name: "Create guide on project management for healthcare teams",
    actionType: "Creation",
    status: "Pending",
    baselineScore: 45,
    baselineRank: 8,
    currentScore: 45,
    currentRank: 8,
    change: 0,
    attributionStrength: "Weak",
  },
  {
    id: "5",
    name: "Optimize integration marketplace page",
    actionType: "Optimization",
    status: "Evaluated",
    baselineScore: 70,
    baselineRank: 4,
    currentScore: 88,
    currentRank: 1,
    change: 18,
    attributionStrength: "Strong",
  },
  {
    id: "6",
    name: "Create mobile app comparison guide",
    actionType: "Creation",
    status: "Pending",
    baselineScore: 52,
    baselineRank: 6,
    currentScore: 52,
    currentRank: 6,
    change: 0,
    attributionStrength: "Weak",
  },
]

export const mockSuggestedCompetitors: SuggestedCompetitor[] = [
  {
    id: "s1",
    name: "Notion",
    url: "https://notion.so",
    shareOfVoice: 24,
    sentiment: "Positive",
    description: "All-in-one workspace for notes, docs, and project management",
    reason: "Frequently mentioned alongside your brand in awareness stage prompts",
  },
  {
    id: "s2",
    name: "Jira",
    url: "https://atlassian.com/jira",
    shareOfVoice: 26,
    sentiment: "Neutral",
    description: "Issue tracking and agile project management for software teams",
    reason: "Strong competitor in technical project management queries",
  },
  {
    id: "s3",
    name: "Basecamp",
    url: "https://basecamp.com",
    shareOfVoice: 15,
    sentiment: "Positive",
    description: "Simple project management and team communication tool",
    reason: "Emerging in small business and startup-focused prompts",
  },
  {
    id: "s4",
    name: "Wrike",
    url: "https://wrike.com",
    shareOfVoice: 12,
    sentiment: "Neutral",
    description: "Enterprise-grade work management platform",
    reason: "Competing in enterprise and large team segments",
  },
]

export const mockRecentChats: RecentChat[] = [
  {
    id: "1",
    model: "GPT",
    modelIcon: "G",
    title: "What are the best project management tools for remote teams?",
    mentions: [
      { brand: "Asana", icon: "A", color: "#F06A6A" },
      { brand: "Monday", icon: "M", color: "#FF3D57" },
      { brand: "Trello", icon: "T", color: "#0079BF" },
    ],
    created: "2 hours ago",
  },
  {
    id: "2",
    model: "Perplexity",
    modelIcon: "🔮",
    title: "Asana vs Monday.com: which is better for agile teams?",
    mentions: [
      { brand: "Asana", icon: "A", color: "#F06A6A" },
      { brand: "Monday", icon: "M", color: "#FF3D57" },
    ],
    created: "5 hours ago",
  },
  {
    id: "3",
    model: "AI Overview",
    modelIcon: "🤖",
    title: "How to set up automated workflows in project management software?",
    mentions: [
      { brand: "Asana", icon: "A", color: "#F06A6A" },
      { brand: "Zapier", icon: "Z", color: "#FF4A00" },
    ],
    created: "8 hours ago",
  },
  {
    id: "4",
    model: "GPT",
    modelIcon: "G",
    title: "Best free project management tools for startups",
    mentions: [
      { brand: "Asana", icon: "A", color: "#F06A6A" },
      { brand: "Trello", icon: "T", color: "#0079BF" },
      { brand: "ClickUp", icon: "C", color: "#7B68EE" },
    ],
    created: "12 hours ago",
  },
  {
    id: "5",
    model: "Perplexity",
    modelIcon: "🔮",
    title: "Tools for building AI companions that remember past interactions",
    mentions: [
      { brand: "GitHub", icon: "G", color: "#181717" },
      { brand: "Upstash", icon: "U", color: "#00E9A3" },
      { brand: "Replit", icon: "R", color: "#F26207" },
    ],
    created: "1 day ago",
  },
  {
    id: "6",
    model: "AI Overview",
    modelIcon: "🤖",
    title: "What features should I look for in task management software?",
    mentions: [
      { brand: "Asana", icon: "A", color: "#F06A6A" },
      { brand: "Notion", icon: "N", color: "#000000" },
    ],
    created: "1 day ago",
  },
  {
    id: "7",
    model: "GPT",
    modelIcon: "G",
    title: "Best solutions for adding long-term memory to AI applications 2025",
    mentions: [
      { brand: "GitHub", icon: "G", color: "#181717" },
      { brand: "Pinecone", icon: "P", color: "#000000" },
    ],
    created: "2 days ago",
  },
]

export const mockTopSources: SourceRanking[] = [
  { rank: 1, domain: "techcrunch.com", count: 45, percentage: 18.2 },
  { rank: 2, domain: "forbes.com", count: 38, percentage: 15.4 },
  { rank: 3, domain: "pcmag.com", count: 32, percentage: 13.0 },
  { rank: 4, domain: "capterra.com", count: 28, percentage: 11.3 },
  { rank: 5, domain: "g2.com", count: 24, percentage: 9.7 },
  { rank: 6, domain: "github.com", count: 22, percentage: 8.9 },
  { rank: 7, domain: "reddit.com", count: 18, percentage: 7.3 },
  { rank: 8, domain: "medium.com", count: 15, percentage: 6.1 },
  { rank: 9, domain: "dev.to", count: 13, percentage: 5.3 },
  { rank: 10, domain: "hackernews.com", count: 12, percentage: 4.9 },
]

export const mockAuditIntents: AuditIntent[] = [
  {
    id: "1",
    intent: "Informational",
    category: "Technical",
    urlCount: 3,
    urls: [
      {
        url: "/blog/remote-work-guide",
        issue: "Missing meta description tag",
        detected: "2024-01-15",
      },
      {
        url: "/blog/productivity-tips",
        issue: "Slow page load time (4.2s)",
        detected: "2024-01-14",
      },
      {
        url: "/resources/templates",
        issue: "Missing structured data markup",
        detected: "2024-01-13",
      },
    ],
    details: "3 pages with technical SEO issues",
    detected: "2024-01-15",
  },
  {
    id: "2",
    intent: "Comparative",
    category: "Content",
    urlCount: 4,
    urls: [
      {
        url: "/compare/asana-vs-monday",
        issue: "Thin content - only 280 words",
        detected: "2024-01-14",
      },
      {
        url: "/compare/pricing",
        issue: "Outdated competitor pricing information",
        detected: "2024-01-13",
      },
      {
        url: "/alternatives/trello",
        issue: "Missing key comparison points",
        detected: "2024-01-12",
      },
      {
        url: "/vs/clickup",
        issue: "Duplicate content with /compare page",
        detected: "2024-01-11",
      },
    ],
    details: "4 pages need content optimization",
    detected: "2024-01-14",
  },
  {
    id: "3",
    intent: "Transactional",
    category: "Content",
    urlCount: 2,
    urls: [
      {
        url: "/guides/automation-workflows",
        issue: "Missing step-by-step instructions",
        detected: "2024-01-13",
      },
      {
        url: "/tutorials/getting-started",
        issue: "Outdated screenshots and UI references",
        detected: "2024-01-12",
      },
    ],
    details: "2 tutorial pages need updates",
    detected: "2024-01-13",
  },
  {
    id: "4",
    intent: "Transactional",
    category: "Technical",
    urlCount: 2,
    urls: [
      {
        url: "/pricing",
        issue: "Broken CTA button on mobile",
        detected: "2024-01-12",
      },
      {
        url: "/signup",
        issue: "Form validation errors not displaying",
        detected: "2024-01-11",
      },
    ],
    details: "2 conversion pages with critical issues",
    detected: "2024-01-12",
  },
  {
    id: "5",
    intent: "Informational",
    category: "Images",
    urlCount: 3,
    urls: [
      {
        url: "/features/overview",
        issue: "5 images missing alt text",
        detected: "2024-01-11",
      },
      {
        url: "/blog/best-practices",
        issue: "Images not optimized (avg 2.3MB)",
        detected: "2024-01-10",
      },
      {
        url: "/resources/infographics",
        issue: "Missing image captions for accessibility",
        detected: "2024-01-09",
      },
    ],
    details: "3 pages with image optimization issues",
    detected: "2024-01-11",
  },
]

export const mockCompetitors: Competitor[] = [
  { id: "1", name: "Monday.com", domain: "monday.com", addedDate: "2024-01-01" },
  { id: "2", name: "Trello", domain: "trello.com", addedDate: "2024-01-02" },
  { id: "3", name: "ClickUp", domain: "clickup.com", addedDate: "2024-01-03" },
  { id: "4", name: "Notion", domain: "notion.so", addedDate: "2024-01-04" },
]

export const mockAuditIssues: AuditIssue[] = [
  {
    id: "1",
    criticalIssue: "Missing meta description",
    category: "Technical",
    url: "/blog/remote-work-guide",
    details: "Meta description tag is missing, affecting search result display",
    detected: "2024-01-15",
  },
  {
    id: "2",
    criticalIssue: "Slow page load time",
    category: "Technical",
    url: "/blog/productivity-tips",
    details: "Page load time is 4.2s, exceeding recommended 3s threshold",
    detected: "2024-01-14",
  },
  {
    id: "3",
    criticalIssue: "Missing structured data",
    category: "Technical",
    url: "/resources/templates",
    details: "Structured data markup missing for better AI understanding",
    detected: "2024-01-13",
  },
  {
    id: "4",
    criticalIssue: "Thin content",
    category: "Content",
    url: "/compare/asana-vs-monday",
    details: "Content is only 280 words, needs expansion to 800+ words",
    detected: "2024-01-14",
  },
  {
    id: "5",
    criticalIssue: "Outdated information",
    category: "Content",
    url: "/compare/pricing",
    details: "Competitor pricing information is outdated by 6 months",
    detected: "2024-01-13",
  },
  {
    id: "6",
    criticalIssue: "Missing comparison points",
    category: "Content",
    url: "/alternatives/trello",
    details: "Key feature comparisons are incomplete",
    detected: "2024-01-12",
  },
  {
    id: "7",
    criticalIssue: "Duplicate content",
    category: "Content",
    url: "/vs/clickup",
    details: "Content duplicates /compare page, needs unique angle",
    detected: "2024-01-11",
  },
  {
    id: "8",
    criticalIssue: "Missing instructions",
    category: "Content",
    url: "/guides/automation-workflows",
    details: "Step-by-step instructions are incomplete",
    detected: "2024-01-13",
  },
  {
    id: "9",
    criticalIssue: "Outdated screenshots",
    category: "Content",
    url: "/tutorials/getting-started",
    details: "Screenshots show old UI, need updating to current version",
    detected: "2024-01-12",
  },
  {
    id: "10",
    criticalIssue: "Broken CTA button",
    category: "Technical",
    url: "/pricing",
    details: "Call-to-action button not functioning on mobile devices",
    detected: "2024-01-12",
  },
  {
    id: "11",
    criticalIssue: "Form validation errors",
    category: "Technical",
    url: "/signup",
    details: "Validation error messages not displaying to users",
    detected: "2024-01-11",
  },
  {
    id: "12",
    criticalIssue: "Missing alt text",
    category: "Images",
    url: "/features/overview",
    details: "5 images missing alt text for accessibility",
    detected: "2024-01-11",
  },
  {
    id: "13",
    criticalIssue: "Unoptimized images",
    category: "Images",
    url: "/blog/best-practices",
    details: "Images average 2.3MB, need compression to under 200KB",
    detected: "2024-01-10",
  },
  {
    id: "14",
    criticalIssue: "Missing image captions",
    category: "Images",
    url: "/resources/infographics",
    details: "Image captions missing for accessibility compliance",
    detected: "2024-01-09",
  },
]

export const mockChatDetails: Record<string, ChatDetail> = {
  "1": {
    id: "1",
    query: "What are the main differences between Manus and Genspark features?",
    response:
      "Manus AI and Genspark are both advanced AI agents designed to automate complex tasks, but they differ significantly in their features, performance, and ideal use cases.\n\n**Core Functionality:**\n\nManus AI: Operates as a fully autonomous agent capable of executing complex tasks such as content creation, analysis, and automation. It utilizes multiple AI models, including Claude 3.5 and Qwen, along with sub-agents to perform end-to-end tasks. (allaboutai.com)\n\nGenspark: Employs a mixture-of-agents system optimized for tasks like search, summaries, and decision support. It integrates multiple models and tools to provide fast responses, making it suitable for real-time summaries and tasks. (allaboutai.com)\n\n**Performance and Speed:**\n\nManus AI: Demonstrates high performance with a GAIA benchmark score of 86.5%. However, it may experience slower response times under heavy load due to its complex task execution capabilities. (allaboutai.com)\n\nGenspark: Optimized for speed, Genspark delivers quick, real-time summaries and tasks, making it more efficient under load compared to Manus AI.",
    model: "ChatGPT",
    modelIcon: "💬",
    lastRun: "16 Nov 2025, 23:05",
    promptLength: 66,
    responseLength: 3731,
    competitorMentions: [
      {
        name: "manus",
        domain: "manus.im",
        mentions: 16,
        score: 50,
      },
      {
        name: "Genspark",
        domain: "genspark.com",
        mentions: 16,
        score: 50,
      },
    ],
    sources: [
      {
        id: "1",
        title: "Manus AI Review 2025: Only Bold Promises Or Actual Results?",
        url: "https://www.allaboutai.com/ai-reviews/manus-ai/",
      },
      {
        id: "2",
        title: "Comparison Genspark Vs Manus AI",
        url: "https://www.allaboutai.com/comparison/genspark-vs-manus-ai/",
      },
      {
        id: "3",
        title: "Comparaison Genspark Vs Manus AI",
        url: "https://www.allaboutai.com/fr-fr/comparaison/genspark-vs-manus-ai/",
      },
    ],
  },
  "2": {
    id: "2",
    query: "Asana vs Monday.com: which is better for agile teams?",
    response:
      "For agile teams, both Asana and Monday.com offer robust project management features, but they excel in different areas.\n\n**Asana** is particularly strong in:\n- Sprint planning and backlog management with dedicated views\n- Advanced automation rules for agile workflows\n- Native integrations with development tools like GitHub and GitLab\n- Customizable dashboards for tracking sprint metrics\n\n**Monday.com** excels at:\n- Visual workflow customization with drag-and-drop interface\n- Team collaboration features and communication tools\n- Template library for various agile methodologies\n- Time tracking and resource management\n\nFor teams prioritizing sprint management and developer integrations, Asana is often the better choice. For teams wanting more visual customization and broader collaboration features, Monday.com may be preferable.",
    model: "Perplexity",
    modelIcon: "🔮",
    lastRun: "16 Nov 2025, 20:30",
    promptLength: 54,
    responseLength: 1024,
    competitorMentions: [
      {
        name: "Asana",
        domain: "asana.com",
        mentions: 12,
        score: 55,
      },
      {
        name: "Monday.com",
        domain: "monday.com",
        mentions: 10,
        score: 45,
      },
    ],
    sources: [
      {
        id: "1",
        title: "Asana vs Monday: A Comprehensive Comparison",
        url: "https://forbes.com/asana-vs-monday",
      },
      {
        id: "2",
        title: "Best Project Management Tools 2024",
        url: "https://techcrunch.com/best-pm-software",
      },
    ],
  },
}
