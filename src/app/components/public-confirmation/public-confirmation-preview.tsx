'use client';

import * as React from "react";
import { IconClock, IconExternalLink, IconMapPin } from "./public-confirmation-icons";

type SpanishDateParts = {
  weekday: string;
  day: string;
  monthYear: string;
};

export function PublicConfirmationPreview({
  attendeeName,
  trainingName,
  dateParts,
  timeHours,
  location,
  mapsUrl,
  onBack,
}: {
  attendeeName: string;
  trainingName: string;
  dateParts: SpanishDateParts;
  timeHours: string;
  location: string;
  mapsUrl?: string | null;
  onBack: () => void;
}) {
  return (
    <div className="min-h-dvh bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200/70 bg-white/90 dark:bg-zinc-900/60 backdrop-blur p-6 shadow-sm">
        <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-1">
          Hola{" "}
          <span className="font-medium text-zinc-900 dark:text-zinc-50">{attendeeName}</span>, ya respondiste
          para:
        </p>
        <h1 className="text-xl font-bold tracking-tight mb-5">{trainingName}</h1>

        <div className="bg-indigo-600/5 dark:bg-indigo-500/10 rounded-2xl p-5 mb-5 text-center">
          <p className="text-xs uppercase font-medium text-indigo-700 dark:text-indigo-300 tracking-wide">{dateParts.weekday}</p>
          <p className="text-5xl font-bold tracking-tighter text-indigo-700 dark:text-indigo-300 tabular-nums leading-none mt-1">{dateParts.day}</p>
          <p className="text-sm font-medium text-indigo-700/70 dark:text-indigo-300/80">{dateParts.monthYear}</p>
        </div>

        <div className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-200 mb-2">
          <IconClock className="h-4 w-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
          <span>{timeHours} hrs</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-200 mb-4">
          <IconMapPin className="h-4 w-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
          <span className="truncate">{location}</span>
          {mapsUrl ? (
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-700 dark:text-indigo-300 hover:underline ml-auto"
            >
              <IconExternalLink className="h-4 w-4" />
            </a>
          ) : null}
        </div>

        <button
          type="button"
          onClick={onBack}
          className="w-full inline-flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          Volver
        </button>
      </div>
    </div>
  );
}

