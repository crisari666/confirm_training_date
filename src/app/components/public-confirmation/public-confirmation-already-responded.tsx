'use client';

import * as React from "react";

export function PublicConfirmationAlreadyResponded({
  onPreview,
}: {
  onPreview: () => void;
}) {
  return (
    <div className="min-h-dvh bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200/70 bg-white/90 dark:bg-zinc-900/60 backdrop-blur p-8 text-center shadow-sm">
        <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4">Ya has respondido a esta invitación.</p>
        <button
          type="button"
          onClick={onPreview}
          className="w-full inline-flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          Ver experiencia del asistente
        </button>
      </div>
    </div>
  );
}

