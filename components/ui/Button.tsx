'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize    = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  loading?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:   'bg-mulberry text-white border border-mulberry hover:bg-mulberry-light hover:border-mulberry-light focus-visible:ring-2 focus-visible:ring-mulberry',
  secondary: 'bg-transparent text-mulberry border border-mulberry hover:bg-mulberry hover:text-white focus-visible:ring-2 focus-visible:ring-mulberry',
  ghost:     'bg-transparent text-aubergine border border-transparent hover:border-aubergine focus-visible:ring-2 focus-visible:ring-aubergine',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', href, loading, children, className, disabled, ...props }, ref) => {
    const base = cn(
      'inline-flex items-center justify-center gap-2 rounded-full font-body font-medium',
      'transition-all duration-fast ease-standard',
      'hover:-translate-y-0.5 hover:shadow-md',
      'active:translate-y-0 active:shadow-sm',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0',
      variantClasses[variant],
      sizeClasses[size],
      className,
    );

    if (href) {
      return (
        <a href={href} className={base} aria-disabled={disabled}>
          {loading ? <Spinner /> : children}
        </a>
      );
    }

    return (
      <button ref={ref} className={base} disabled={disabled || loading} {...props}>
        {loading ? <Spinner /> : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}
