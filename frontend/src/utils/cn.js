import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Resolve the conflict using twMerge
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
