// SSR-safe useLayoutEffect
import { useEffect, useLayoutEffect } from "react";
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
