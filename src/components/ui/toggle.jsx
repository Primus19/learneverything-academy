"use client"

import * as React from "react"
import * as RadixToggle from "@radix-ui/react-toggle"
import { cva, } from "class-variance-authority"

import { cn } from "../../lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover-muted hover-muted-foreground focus-visible-none focus-visible-1 focus-visible-ring disabled-events-none disabled-50 data-[state=on]-accent data-[state=on]-accent-foreground [&_svg]-events-none [&_svg]-4 [&_svg]-0",
  {
    variants,
      size,
    },
    defaultVariants,
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
