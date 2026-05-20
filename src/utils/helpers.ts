import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseSkills(skillsString: string): string[] {
  return skillsString
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export function parseList(listString: string): string[] {
  // Split by comma or newline
  return listString
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export function getMatchQualityColor(quality: string) {
  switch (quality.toLowerCase()) {
    case 'excellent':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'good':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'partial':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'poor':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}
