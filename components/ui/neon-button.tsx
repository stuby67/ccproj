import { type ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

export interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "green" | "purple"
  size?: "default" | "sm" | "lg"
  isLoading?: boolean
}

const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, variant = "green", size = "default", isLoading, children, ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none"

    const variantClasses = {
      green: "neon-button",
      purple: "neon-button-purple",
    }

    const sizeClasses = {
      default: "h-10 py-2 px-4",
      sm: "h-8 px-3 text-sm",
      lg: "h-12 px-6 text-lg",
    }

    return (
      <button
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </div>
        ) : (
          children
        )}
      </button>
    )
  },
)

NeonButton.displayName = "NeonButton"

export { NeonButton }

