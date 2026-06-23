import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-red-aura md:text-sm dark:bg-input dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 text-primary font-bold",
  {
    variants: {
      variant: {
        primary: "border-glaucous/25 rounded py-6 px-4",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

function Input({
  className,
  variant = "primary",
  type,
  ...props
}: React.ComponentProps<"input"> &
  VariantProps<typeof inputVariants> & {
    asChild?: boolean;
  }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Input };
