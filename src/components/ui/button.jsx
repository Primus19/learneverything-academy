import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible-none focus-visible-1 focus-visible-ring disabled-events-none disabled-50 [&_svg]-events-none [&_svg]-4 [&_svg]-0",
  {
    variants,
      size,
    },
    defaultVariants,
  }
)

  
    VariantProps {
  asChild?
}

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
