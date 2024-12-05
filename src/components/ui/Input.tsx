import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-md border border-gray-300 px-4 py-2",
        "focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500",
        className,
      )}
      {...props}
    />
  );
});
