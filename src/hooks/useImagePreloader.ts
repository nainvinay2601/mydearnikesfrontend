import { useEffect,  useState } from "react";
export function useImagePreloader(imageSources: string[]) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (imageSources.length === 0) {
      setIsLoading(false)
      return
    }

    const imagePromises = imageSources.map((src) => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(src)
        img.onerror = () => reject(src)
        img.src = src
      })
    })

    Promise.allSettled(imagePromises)
      .then((results) => {
        const loaded = new Set<string>()
        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            loaded.add(imageSources[index])
          }
        })
        setLoadedImages(loaded)
        setIsLoading(false)
      })
  }, [imageSources])

  return { loadedImages, isLoading }
}