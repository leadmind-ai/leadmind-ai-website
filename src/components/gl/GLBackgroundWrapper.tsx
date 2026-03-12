"use client";
import { lazy, Suspense, useSyncExternalStore } from "react";

const GLBackground = lazy(() => import("@/components/gl/GLBackground"));

const mediaQuery = "(min-width: 768px)";

function subscribe(callback: () => void) {
  const mq = window.matchMedia(mediaQuery);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(mediaQuery).matches;
}

function getServerSnapshot() {
  return false;
}

export default function GLBackgroundWrapper() {
  const isDesktop = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!isDesktop) return null;

  return (
    <Suspense fallback={null}>
      <div className="fixed inset-0 -z-10">
        <GLBackground bgColor="#000000" />
      </div>
    </Suspense>
  );
}
