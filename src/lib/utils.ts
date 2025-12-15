import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return `₹${price.toFixed(0)}`
}

export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

export function formatDeliveryTime(time: number): string {
  return `${time} mins`
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function simulateApiDelay(ms: number = 1000): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}