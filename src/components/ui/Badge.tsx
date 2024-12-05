import { type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'blue' | 'yellow' | 'purple' | 'orange' | 'green';
}

export function Badge({ className, variant = 'blue', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
        {
          'bg-blue-100 text-blue-800': variant === 'blue',
          'bg-yellow-100 text-yellow-800': variant === 'yellow',
          'bg-purple-100 text-purple-800': variant === 'purple',
          'bg-orange-100 text-orange-800': variant === 'orange',
          'bg-green-100 text-green-800': variant === 'green',
        },
        className
      )}
      {...props}
    />
  );
}