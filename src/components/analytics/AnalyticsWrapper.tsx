'use client'

import { Analytics } from '@vercel/analytics/react'

export default function AnalyticsWrapper() {
  return (
    <Analytics
      beforeSend={(event) => {
        if (process.env.NODE_ENV === 'development') {
          return null
        }
        return event
      }}
    />
  )
}
