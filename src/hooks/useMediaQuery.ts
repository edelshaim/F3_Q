import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const documentChangeHandler = (e: MediaQueryListEvent) => setMatches(e.matches);

    mediaQueryList.addEventListener('change', documentChangeHandler);

    // Check again to make sure it wasn't changed between initial state and effect
    setMatches(mediaQueryList.matches);

    return () => {
      mediaQueryList.removeEventListener('change', documentChangeHandler);
    };
  }, [query]);

  return matches;
}
