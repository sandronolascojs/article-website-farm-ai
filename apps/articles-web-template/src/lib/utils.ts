import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseOrderBy(value?: string): 'newest' | 'oldest' | undefined {
  if (value === 'newest' || value === 'oldest') return value;
  return undefined;
}
