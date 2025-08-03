import { useEffect, useRef, useState, useCallback, use } from "react";

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

//* ####################### useDebounce hook #############################

// Debouncing is used where user trigger fast changing state like a user input search bar. Stopping an action after certain delay 
// Means Delaying the execution of a function until a specified amount of time has passed since it was last called

export function useDebounce<T>(value: T, delay: number): T { // T here specifies that it can take any value from number to string to boolean any and also specify that function will return something 
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);  // if the user stopped changing the value for entire delay that is defined , we update the debouncedValue. EG updating search result after user stops typing 

    return () => {
      clearTimeout(handler); // if user starts typing again -> value being changed now we reset the value and update it with latest interaction 
    };
  }, [value, delay]);

  return debounceValue;
}

//* ####################### Local Storage Hook with SSR safety  #############################

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, storedValue]
  )

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}
