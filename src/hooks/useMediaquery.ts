
import { useEffect,  useState} from "react";
//* Media Query Hook -> dynamic UI Adjustment and the , component adaps their rendering based on the screen size, orientation and other factors, can do the conditional rendering as well so we dont have to load something that is unnecessary

export function useMediaquery(query: string): boolean {
  const [matches, setMatches] = useState(false); // media query matches rn or not

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);

    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}