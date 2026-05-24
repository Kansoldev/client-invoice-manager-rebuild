import { useState, useEffect } from "react";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  const controller = new AbortController();

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    if (mediaQuery.matches) {
      setMatches(true);
    } else {
      setMatches(false);
    }

    mediaQuery.addEventListener(
      "change",
      () => setMatches(mediaQuery.matches),
      {
        signal: controller.signal,
      },
    );

    return () => controller.abort();
  }, [matches, query]);

  return matches;
}

export default useMediaQuery;
