import * as React from "react"
import { cva, } from "class-variance-authority"

import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus-none focus-2 focus-ring focus-offset-2",
  {
    variants,
    },
    defaultVariants,
  }
)

  extends React.HTMLAttributes,
    VariantProps {}

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
