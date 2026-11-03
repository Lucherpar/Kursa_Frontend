import * as React from "react";

export const useMedia = (query: string): boolean => {
  const mediaQuery = React.useMemo(
    () => (typeof window === "undefined" ? null : window.matchMedia(query)),
    [query]
  );
  const [matches, setMatches] = React.useState(mediaQuery?.matches ?? false);

  React.useEffect(() => {
    if (!mediaQuery) return;
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [mediaQuery]);

  return matches;
};

export const useReducedMotion = (): boolean => useMedia("(prefers-reduced-motion: reduce)");
