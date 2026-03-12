"use client";

import { useState, useSyncExternalStore, useCallback } from "react";

type CookieBannerProps = {
  locale: string;
};

function getConsentSnapshot(): string | null {
  return localStorage.getItem("cookie-consent");
}

function getConsentServerSnapshot(): string | null {
  return "unknown";
}

function subscribeToConsent(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function CookieBanner({ locale }: CookieBannerProps) {
  const consent = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );
  const [dismissed, setDismissed] = useState(false);

  const visible = !dismissed && !consent;

  const accept = useCallback(() => {
    localStorage.setItem("cookie-consent", "accepted");
    setDismissed(true);
  }, []);

  const decline = useCallback(() => {
    localStorage.setItem("cookie-consent", "declined");
    setDismissed(true);
  }, []);

  if (!visible) return null;

  const isFr = locale === "fr";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-surface-elevated bg-surface-container p-4 shadow-lg">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-on-surface-muted">
          {isFr
            ? "Ce site utilise des cookies analytiques (Vercel Analytics) pour am\u00e9liorer votre exp\u00e9rience. "
            : "This site uses analytics cookies (Vercel Analytics) to improve your experience. "}
          <a
            href={`/${locale}/politique-confidentialite`}
            className="text-accent underline hover:text-accent/80"
          >
            {isFr ? "En savoir plus" : "Learn more"}
          </a>
        </p>
        <div className="flex gap-3">
          <button
            onClick={decline}
            className="rounded-lg border border-surface-elevated px-4 py-2 text-sm text-on-surface-muted transition-colors hover:text-on-surface"
          >
            {isFr ? "Refuser" : "Decline"}
          </button>
          <button
            onClick={accept}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90"
          >
            {isFr ? "Accepter" : "Accept"}
          </button>
        </div>
      </div>
    </div>
  );
}
