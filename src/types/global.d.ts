declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

// This ensures the file is treated as a module (prevents duplicate identifiers)
export {}
