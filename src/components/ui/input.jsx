import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  console.log();
  return (
    <input
      type={type}
      className={cn(
        props.errors == "true"
          ? "flex h-10 my-2 w-full rounded-md border border-destructive bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:outline-destructive focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          : "flex dark:text-white text-gray-900 h-10 my-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      style={{ height: "55px" }}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
