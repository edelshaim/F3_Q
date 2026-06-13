import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  // Synchronous lazy initialization to prevent initial layout shifts and double-rendering
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQueryList = window.matchMedia(query);

    // Check again in case it changed between initial render and effect execution
    if (mediaQueryList.matches !== matches) {
        setMatches(mediaQueryList.matches);
    }

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener('change', listener);
    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, [query, matches]);

  return matches;
}
