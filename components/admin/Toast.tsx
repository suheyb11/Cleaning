"use client";

import Icon from "@/components/ui/Icon";
import type { ToastState } from "@/lib/useToast";

export default function Toast({ toast }: { toast: ToastState }) {
  if (!toast) return null;
  const isSuccess = toast.type === "success";

  return (
    <div
      role="status"
      className={`fixed bottom-6 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2.5 rounded-2xl px-5 py-3.5 text-sm font-medium text-white shadow-lift sm:left-auto sm:right-6 sm:translate-x-0 ${
        isSuccess ? "bg-navy" : "bg-red-600"
      }`}
    >
      <Icon
        name={isSuccess ? "CheckCircle2" : "AlertCircle"}
        className="h-4 w-4 shrink-0"
      />
      {toast.text}
    </div>
  );
}
