import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...classValues: ClassValue[]) {
  return twMerge(clsx(classValues));
}

export default cn;
