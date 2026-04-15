import { useState, useEffect } from "react";
export type ResponsiveValues<T> = [T, T, T?, T?, T?];

/**
 * @param values - Array of 2 to 5 values
 * @param breakpoints - Array of pixel values (should be values.length - 1)
 */
export function useResponsive<T>(
  values: ResponsiveValues<T>
): T {
  const breakpoints = [640];
  // Logic check: We need exactly one less breakpoint than we have values
  const activeValues = values.filter(
    (v) => v !== undefined
  );

  if (activeValues.length < 2) {
    throw new Error(
      "useResponsive: Minimum of 2 values required."
    );
  }

  if (breakpoints.length !== activeValues.length - 1) {
    throw new Error(
      `useResponsive: Expected ${
        activeValues.length - 1
      } breakpoints for ${activeValues.length} values.`
    );
  }

  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Generate the media queries from the passed numbers
    const mqls = breakpoints.map((bp) =>
      window.matchMedia(`(min-width: ${bp}px)`)
    );

    const handler = () => {
      let newIndex = 0;
      // If window matches breakpoint[i], we move to value[i+1]
      for (let i = 0; i < mqls.length; i++) {
        if (mqls[i].matches) newIndex = i + 1;
      }
      setIndex(newIndex);
    };

    handler(); // Run on mount

    mqls.forEach((mql) =>
      mql.addEventListener("change", handler)
    );
    return () =>
      mqls.forEach((mql) =>
        mql.removeEventListener("change", handler)
      );
  }, [values, breakpoints]);

  return values[index] as T;
}
