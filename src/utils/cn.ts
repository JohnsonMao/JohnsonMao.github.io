import type { ClassValue } from 'clsx';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...classValues: ClassValue[]) {
  return twMerge(clsx(classValues));
}

export default cn;
