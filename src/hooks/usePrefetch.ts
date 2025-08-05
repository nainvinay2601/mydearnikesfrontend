import {  useRef,  useCallback } from "react";
// * Prefetching Hook for optimising navigation - silently fetches the resources in the background without blocking the main thread, once fetched it stores in the cache memory
export function usePrefetch() {
  const prefetchUrls = useRef(new Set<string>()); // as set only allows the unique value, this avoids the duplicates

  const prefetch = useCallback((url: string) => {
    // usecallback is used to memoise the function and to avoid the unnecessary recreation of the function  -> avoid re-creation of the function on every reload and also takes the url as input , url is the one that needs to be fetched basically
    if (prefetchUrls.current.has(url)) return; // check if the url is already fetched or not

    const link = document.createElement("link"); // creates an HTML element, used to define the relationship between the current and external resources
    link.rel = "prefetch"; // set relation to prefetch -> tells the browser that link present in the href needs to be prefetched
    link.href = url; // specifies the resource the browser should fetch asap

    document.head.appendChild(link); // the line appends the link to head of the html basically , saving up resources and the time

    prefetchUrls.current.add(url); // adds the prefetched resource to the set just to keep the track of all the already existing prefetched resources basically

    //Clean up after 30 seconds -> removes the link element from the head after the 30 seconds if it's still present and also remove the prefetchURL from the set.
    setTimeout(() => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }

      prefetchUrls.current.delete(url);
    }, 3000);
  }, []); // prefetch function is only created during the mount of the component.

  return { prefetch };
}