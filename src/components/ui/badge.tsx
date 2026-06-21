import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest transition-colors",
  {
    variants: {
      variant: {
        default: "border-black bg-black text-white",
        outline: "border-[#e5e5e5] bg-transparent text-[#888]",
        secondary: "border-[#1a1a1a] bg-[#1a1a1a] text-white",
        muted: "border-[#e5e5e5] bg-[#fafafa] text-[#888]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
