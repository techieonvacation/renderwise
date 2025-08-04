"use client"

import { Card, CardContent } from "@/app/components/ui/Card"
import { cn } from "@/app/lib/utils"

type StatsCardProps = {
  value: string
  label: string
  className?: string
}

export function StatsCard({ value, label, className }: StatsCardProps) {
  return (
    <Card className={cn(
      "border-0 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm",
      "hover:from-primary/10 hover:to-accent/10 transition-all duration-300",
      className
    )}>
      <CardContent className="p-6 text-center">
        <div className="text-3xl font-bold text-foreground md:text-4xl font-urbanist">
          {value}
        </div>
        <div className="text-muted-foreground font-inter mt-2">
          {label}
        </div>
      </CardContent>
    </Card>
  )
} 