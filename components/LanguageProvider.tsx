"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Bilingual, Lang } from "@/data/content";

const STORAGE_KEY = "bilic-lang";

type LanguageValue = {
  lang: Lang;
  setLang: (next: Lang) => void;
  /** Picks the right half of a { en, so } pair. */
  t: (value: Bilingual) => string;
};

const LanguageContext = createContext<LanguageValue | null>(null);

/**
 * Very small two-language store — no i18n library.
 *
 * Server and first client render are always English so the markup matches and
 * React never reports a hydration mismatch. If the visitor previously chose
 * Somali we switch straight after mount.
 */
export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "so" || saved === "en") setLangState(saved);
  }, []);

  // Keep <html lang> honest for screen readers and search engines.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo<LanguageValue>(
    () => ({ lang, setLang, t: (pair) => pair[lang] }),
    [lang, setLang],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

/**
 * Read the current language.
 * Falls back to English when used outside the provider, so a component can
 * never crash just because it was rendered somewhere unexpected.
 */
export function useLang(): LanguageValue {
  const context = useContext(LanguageContext);
  if (context) return context;
  return { lang: "en", setLang: () => {}, t: (pair) => pair.en };
}

/** The EN / SO switch shown in the navbar. */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();

  return (
    <div
      className={`inline-flex items-center rounded-xl border border-white/20 bg-white/5 p-0.5 ${className}`}
      role="group"
      aria-label="Language / Luqadda"
    >
      {(["en", "so"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLang(option)}
          aria-pressed={lang === option}
          className={`rounded-[0.6rem] px-2.5 py-1 font-heading text-xs font-semibold uppercase tracking-wide transition-colors duration-200 ${
            lang === option
              ? "bg-sky text-white"
              : "text-white/70 hover:text-white"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
