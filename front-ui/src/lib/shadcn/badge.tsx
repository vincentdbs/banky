import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./utils"

export enum BadgeVariant {
  DEFAULT = "default",
  SECONDARY = "secondary",
  DESTRUCTIVE = "destructive",
  OUTLINE = "outline",
  LIGHT_RED = "light-red",
  LIGHT_GREEN = "light-green",
  LIGHT_BLUE = "light-blue",
  DARK_GREEN = "dark-green",
}

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        [BadgeVariant.DEFAULT]:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
         [BadgeVariant.SECONDARY]:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        [BadgeVariant.DESTRUCTIVE]:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        [BadgeVariant.OUTLINE]: "text-foreground",
        [BadgeVariant.LIGHT_RED]: "bg-red-100 text-red-800 border-red-200",
        [BadgeVariant.LIGHT_GREEN]: "bg-green-100 text-green-800 border-green-200",
        [BadgeVariant.LIGHT_BLUE]: "bg-blue-100 text-blue-800 border-blue-200",
        [BadgeVariant.DARK_GREEN]: "bg-emerald-600 text-white border-emerald-600",
      },
    },
    defaultVariants: {
      variant: BadgeVariant.DEFAULT,
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
