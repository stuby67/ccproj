import { type InputHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

export interface NeonInputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "green" | "purple"
}

const NeonInput = forwardRef<HTMLInputElement, NeonInputProps>(({ className, variant = "green", ...props }, ref) => {
  const variantClasses = {
    green: "neon-input",
    purple: "neon-input-purple",
  }

  return <input className={cn(variantClasses[variant], className)} ref={ref} {...props} />
})

NeonInput.displayName = "NeonInput"

export { NeonInput }

