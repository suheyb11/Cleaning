"use client";

import { useCallback, useRef, useState } from "react";

export type ToastState = { type: "success" | "error"; text: string } | null;

/**
 * A tiny local toast — each admin component that needs one calls this and
 * renders <Toast toast={toast} />. No global store: every action already
 * knows exactly which component should show its own result.
 */
export function useToast() {
  const [toast, setToast] = useState<ToastState>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const showToast = useCallback((type: "success" | "error", text: string) => {
    clearTimeout(timeoutRef.current);
    setToast({ type, text });
    timeoutRef.current = setTimeout(() => setToast(null), 3500);
  }, []);

  return { toast, showToast };
}
