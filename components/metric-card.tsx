"use client"

import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { TrendingUp, TrendingDown, Minus, Info, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export type TrendDirection = "up" | "down" | "neutral"

export type MetricCardProps = {
  title: string
  value: string | number
  change?: string | number
  changeDirection?: TrendDirection
  description?: string
  icon?: LucideIcon
  className?: string
  valueClassName?: string
  trend?: {
    value: string | number
    direction: TrendDirection
  }
}

const getTrendIcon = (direction: TrendDirection) => {
  switch (direction) {
    case "up":
      return TrendingUp
    case "down":
      return TrendingDown
    case "neutral":
      return Minus
  }
}

const getTrendColor = (direction: TrendDirection) => {
  switch (direction) {
    case "up":
      return "text-chart-3"
    case "down":
      return "text-destructive"
    case "neutral":
      return "text-muted-foreground"
  }
}

export function MetricCard({
  title,
  value,
  change,
  changeDirection = "neutral",
  description,
  icon: Icon,
  className,
  valueClassName,
  trend,
}: MetricCardProps) {
  const TrendIcon = getTrendIcon(trend?.direction || changeDirection)
  const trendColor = getTrendColor(trend?.direction || changeDirection)
  const displayChange = trend?.value || change

  return (
    <TooltipProvider>
      <Card className={cn("bg-secondary/50 rounded-lg border border-border", className)}>
        <CardHeader className="pb-2">
          <CardDescription className="text-xs text-muted-foreground flex items-center gap-1.5">
            {title}
            {description && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3.5 w-3.5 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{description}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
            <span className={cn("text-3xl font-bold text-foreground", valueClassName)}>{value}</span>
            {displayChange !== undefined && (
              <div className={cn("flex items-center gap-1", trendColor)}>
                <TrendIcon className="h-4 w-4" />
                <span className="text-sm font-medium">{displayChange}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}
