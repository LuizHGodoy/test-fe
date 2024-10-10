import { cn } from "@/lib/utils";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showerror?: boolean;
  errormessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, showerror, errormessage, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            showerror ? "border-red-500" : "",
            className,
          )}
          ref={ref}
          {...props}
        />
        {showerror && errormessage && (
          <p className="text-red-500 text-xs mt-1">{errormessage}</p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
