import { type HTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

export interface NeonCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "green" | "purple"
}

const NeonCard = forwardRef<HTMLDivElement, NeonCardProps>(
  ({ className, variant = "green", children, ...props }, ref) => {
    const variantClasses = {
      green: "neon-card",
      purple: "neon-card-purple",
    }

    return (
      <div className={cn(variantClasses[variant], "p-6", className)} ref={ref} {...props}>
        {children}
      </div>
    )
  },
)

NeonCard.displayName = "NeonCard"

export { NeonCard }

