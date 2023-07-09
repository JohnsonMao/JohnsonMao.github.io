import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS className in JS without style conflicts.
 *
 * @example
 * import cn from '@/utils/cn';
 * 
 * cn('bg-blue-500 text-white/90', { 'bg-red-500': true });
 * // 'text-white/90 bg-red-500'
 */
function cn(...classValues: ClassValue[]) {
  return twMerge(clsx(classValues));
}

export default cn;
