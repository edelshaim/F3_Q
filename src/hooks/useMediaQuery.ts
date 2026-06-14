import { useState, useEffect } from 'react';

export const tailwindMediaQueries = {
  // Tailwind v4 emits `lg` as @media (min-width: 64rem) in this app.
  lg: '(min-width: 64rem)',
} as const;

export function useTailwindBreakpoint(
  breakpoint: keyof typeof tailwindMediaQueries
): boolean {
  return useMediaQuery(tailwindMediaQueries[breakpoint]);
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);

    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern browsers use addEventListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, [query]);

  return matches;
}
