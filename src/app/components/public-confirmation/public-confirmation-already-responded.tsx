'use client';

import * as React from "react";

export function PublicConfirmationAlreadyResponded() {
  return (
    <div className="min-h-dvh bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200/70 bg-white/90 dark:bg-zinc-900/60 backdrop-blur p-8 text-center shadow-sm">
        <p className="text-sm text-zinc-600 dark:text-zinc-300">Ya has respondido a esta invitación.</p>
      </div>
    </div>
  );
}

