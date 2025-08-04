"use client"

import { Button } from "@/app/components/ui/Button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/app/lib/utils"

type TestimonialControlsProps = {
  current: number
  total: number
  isTransitioning: boolean
  onNext: () => void
  onPrev: () => void
  onDotClick: (index: number) => void
  className?: string
}

export function TestimonialControls({
  current,
  total,
  isTransitioning,
  onNext,
  onPrev,
  onDotClick,
  className
}: TestimonialControlsProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {/* Previous Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrev}
        disabled={isTransitioning}
        className="rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background/90"
        aria-label="Previous testimonial"
      >
        <ArrowLeft size={20} />
      </Button>

      {/* Dots */}
      <div className="flex gap-2">
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            onClick={() => onDotClick(index)}
            disabled={isTransitioning}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              current === index 
                ? "w-8 bg-primary" 
                : "w-2 bg-muted hover:bg-muted-foreground/50"
            )}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Next Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onNext}
        disabled={isTransitioning}
        className="rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background/90"
        aria-label="Next testimonial"
      >
        <ArrowRight size={20} />
      </Button>
    </div>
  )
} 