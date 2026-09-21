"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Hooks for values that only exist in the browser.
 *
 * These all use `useSyncExternalStore` rather than `useState` + `useEffect`.
 * The mount-flag pattern (`useEffect(() => setMounted(true), [])`) triggers a
 * second render pass on every mount; `useSyncExternalStore` expresses the same
 * "server value, then client value" idea in one pass, and gives React an
 * explicit server snapshot so hydration stays consistent.
 */

const noopSubscribe = () => () => {};

/** False during SSR and hydration, true afterwards. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/* -------------------------------------------------------------------------- */
/* Clock                                                                       */
/* -------------------------------------------------------------------------- */

/** Captured once, so it is a stable snapshot and never re-renders consumers. */
const MOUNT_TIME = Date.now();

/**
 * The time the page loaded — null on the server.
 *
 * Use this for anything that just needs "roughly now" (like splitting events
 * into past and upcoming). It never changes, so it causes no re-renders.
 */
export function useMountTime(): number | null {
  return useSyncExternalStore(
    noopSubscribe,
    () => MOUNT_TIME,
    () => null,
  );
}

/* A single shared 1s timer, so multiple consumers don't each start their own. */
let currentTime = MOUNT_TIME;
const clockListeners = new Set<() => void>();
let clockTimer: ReturnType<typeof setInterval> | null = null;

function subscribeToClock(listener: () => void) {
  clockListeners.add(listener);

  if (clockTimer === null) {
    clockTimer = setInterval(() => {
      currentTime = Date.now();
      clockListeners.forEach((l) => l());
    }, 1000);
  }

  return () => {
    clockListeners.delete(listener);
    if (clockListeners.size === 0 && clockTimer !== null) {
      clearInterval(clockTimer);
      clockTimer = null;
    }
  };
}

// Returns the cached value, not Date.now(), so repeated calls during a render
// are identical — React requires getSnapshot to be stable between ticks.
const getClockSnapshot = () => currentTime;
const getClockServerSnapshot = (): number | null => null;

/** Current time, updating once a second. Null on the server. */
export function useNow(): number | null {
  return useSyncExternalStore(
    subscribeToClock,
    getClockSnapshot,
    getClockServerSnapshot,
  );
}

/* -------------------------------------------------------------------------- */
/* Viewport                                                                    */
/* -------------------------------------------------------------------------- */

function subscribeToScroll(listener: () => void) {
  window.addEventListener("scroll", listener, { passive: true });
  return () => window.removeEventListener("scroll", listener);
}

/**
 * Whether the page is scrolled further than `threshold` pixels.
 *
 * Returns a boolean rather than the raw offset so the snapshot only changes
 * when the answer changes — consumers re-render on crossing, not on scroll.
 */
export function useScrolledPast(threshold: number): boolean {
  const getSnapshot = useCallback(
    () => window.scrollY > threshold,
    [threshold],
  );

  return useSyncExternalStore(subscribeToScroll, getSnapshot, () => false);
}

/** Subscribe to a CSS media query. Returns false during SSR. */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (listener: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", listener);
      return () => mql.removeEventListener("change", listener);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
