import { useEffect, useRef, useState } from "react";
//Intersection Observer Hook for the lazy loading
export function useIntersectionObserver( // Custom hook that takes the options like threshold, rootMargin
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false); // is the element currently visible or not
  const [hasIntersected, setHasIntersected] = useState(false); // has it ever become visible once? -> this state will be used for animation
  const elementRef = useRef<HTMLElement>(null); // Target the DOM element "WHAT TO OBSERVE"

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return; // wait until the element is present before observing

    //Intersection Observer API for native browser that watches visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: 0.1, // trigger when 10% of the element is visible
        rootMargin: "50px", // add space around the viewport like margin
        ...options,
      }
    );

    observer.observe(element); // start observing the element
    return () => observer.disconnect(); // clean up the observer on unmount
  }, [hasIntersected, options]);

  return { elementRef, isIntersecting, hasIntersected };
}
