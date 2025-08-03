'use client'

import Image from 'next/image'
import { useState, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { ImageIcon } from 'lucide-react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  sizes?: string
  fill?: boolean
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape'
  objectFit?: 'cover' | 'contain' | 'fill'
  rounded?: boolean
  fallback?: React.ReactNode
}

const OptimizedImage = forwardRef<HTMLDivElement, OptimizedImageProps>(
  ({
    src,
    alt,
    width,
    height,
    className,
    priority = false,
    quality = 85,
    sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    fill = false,
    placeholder = 'empty',
    blurDataURL,
    aspectRatio,
    objectFit = 'cover',
    rounded = false,
    fallback,
    ...props
  }, ref) => {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    const handleLoad = () => {
      setIsLoading(false)
    }

    const handleError = () => {
      setIsLoading(false)
      setHasError(true)
    }

    const aspectRatioClasses = {
      square: 'aspect-square',
      video: 'aspect-video',
      portrait: 'aspect-[3/4]',
      landscape: 'aspect-[4/3]',
    }

    const containerClasses = cn(
      'relative overflow-hidden bg-muted',
      aspectRatio && aspectRatioClasses[aspectRatio],
      rounded && 'rounded-md',
      className
    )

    if (hasError) {
      return (
        <div
          ref={ref}
          className={cn(
            containerClasses,
            'flex items-center justify-center'
          )}
          style={fill ? undefined : { width, height }}
          {...props}
        >
          {fallback || (
            <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
              <ImageIcon className="h-8 w-8" />
              <span className="text-sm">Image unavailable</span>
            </div>
          )}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={containerClasses}
        style={fill ? undefined : { width, height }}
        {...props}
      >
        {isLoading && (
          <Skeleton
            className={cn(
              'absolute inset-0 z-10',
              aspectRatio && 'w-full h-full'
            )}
          />
        )}
        
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          priority={priority}
          quality={quality}
          sizes={sizes}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'transition-all duration-300 ease-in-out',
            isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100',
            fill ? `object-${objectFit}` : '',
            rounded && 'rounded-md'
          )}
        />
      </div>
    )
  }
)

OptimizedImage.displayName = 'OptimizedImage'

export { OptimizedImage }