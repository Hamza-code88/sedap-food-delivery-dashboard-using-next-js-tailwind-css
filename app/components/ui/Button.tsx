import React, { ButtonHTMLAttributes } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function (agar utils.ts nahi bani to yahi use kar lo)
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  children,
  ...props 
}) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
        // Variants
        variant === 'primary' && "bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary-hover",
        variant === 'outline' && "border-2 border-primary text-primary hover:bg-primary-light",
        variant === 'ghost' && "bg-transparent text-text-secondary hover:bg-gray-100 hover:text-primary",
        // Sizes
        size === 'sm' && "px-4 py-2 text-xs",
        size === 'md' && "px-6 py-3 text-sm",
        size === 'lg' && "px-8 py-4 text-base",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};