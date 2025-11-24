import { useState, useEffect, useMemo } from "react";
import { useComponentContext } from "../context/componentContext";

interface FxState {
  fx: string;
  isFx: boolean;
  deps: string[];
  evaluatedAt?: number;
}

export function useFormulaResolver<T extends Record<string, any>>(
  baseProps: T,
  meta: Record<string, FxState> | undefined,
  context: Record<string, any>
): T {
  const [resolved, setResolved] = useState<T>(baseProps);
  const { evaluateFormula } = useComponentContext();

  // Memoize the meta keys to prevent unnecessary re-runs
  const metaKeys = useMemo(() => 
    meta ? Object.keys(meta).sort().join(',') : '', 
    [meta]
  );

  // Memoize baseProps serialization to detect actual changes
  const basePropsStr = useMemo(() => 
    JSON.stringify(baseProps), 
    [baseProps]
  );

  useEffect(() => {
    if (!meta) {
      setResolved(baseProps);
      return;
    }

    let hasChanged = false;
    const next: T = { ...baseProps };

    for (const key in meta) {
      const def = meta[key];
      if (def && def?.isFx && def.fx && def.deps && def.deps.length) {
        try {
          const value = evaluateFormula(def.fx);

          // Cast key to keyof T
          if (next[key as keyof T] !== value) {
            (next as Record<string, any>)[key] = value;
            hasChanged = true;
          }
        } catch (error) {
          console.warn(`Formula evaluation failed for ${key}:`, error);
        }
      }
    }

    if (hasChanged) {
      setResolved(next);
    }
  }, [basePropsStr, metaKeys, evaluateFormula]); // Use stable dependencies

  return resolved;
}
