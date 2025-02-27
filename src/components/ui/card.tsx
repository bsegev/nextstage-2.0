import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-lg border border-surface-200 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
} 