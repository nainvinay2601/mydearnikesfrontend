import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type {Metric} from "web-vitals"

// Enhanced utility function for combining Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Web Vitals reporting with enhanced metrics
export function reportWebVitals(metric: Metric ) {
  // Enhanced metrics collection
  const vitals = {
    id: metric.id,
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    navigationType: metric.navigationType,
    timestamp: Date.now(),
  }

  // Send to multiple analytics providers
  if (typeof window !== 'undefined') {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true,
        custom_map: { metric_rating: metric.rating },
      })
    }

    // Send to your custom analytics endpoint
    if (process.env.NODE_ENV === 'production') {
      fetch('/api/analytics/vitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vitals),
      }).catch(console.error)
    }
  }
}

// Enhanced image optimization utilities
export function generateBlurDataURL(width: number = 10, height: number = 10): string {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''
  
  // Create a subtle gradient for better blur effect
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#f8fafc')
  gradient.addColorStop(1, '#e2e8f0')
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)
  
  return canvas.toDataURL()
}

// Get optimized image URL with transformations
export function getOptimizedImageUrl(
  src: string,
  width?: number,
  height?: number,
  quality: number = 85
): string {
  if (!src) return ''

  try {
    const url = new URL(src, typeof window !== 'undefined' ? window.location.origin : 'https://example.com')

    if (width) url.searchParams.set('w', width.toString())
    if (height) url.searchParams.set('h', height.toString())
    if (quality) url.searchParams.set('q', quality.toString())

    return url.toString()
  } catch (error) {
    console.log("Invalid Image URL error occured", error)
    console.error('Invalid image URL:', src)
    return src // fallback to original URL if parsing fails
  }
}
