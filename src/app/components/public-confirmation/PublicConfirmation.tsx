'use client';

import * as React from "react";
import type { PublicConfirmationData } from "@/lib/services/trainingService";
import { PublicConfirmationAlreadyResponded } from "./public-confirmation-already-responded";
import { PublicConfirmationSubmitted } from "./public-confirmation-submitted";
import { PublicConfirmationPreview } from "./public-confirmation-preview";
import { IconClock, IconExternalLink, IconMapPin } from "./public-confirmation-icons";

type Action = "confirmed" | "declined";

const DECLINE_REASONS = ["Cruce de horario", "Enfermedad / Emergencia", "Ubicación lejana", "Otro"] as const;

function formatSpanishDate(date: Date) {
  // Force UTC to avoid SSR/client time zone differences during hydration.
  const weekday = new Intl.DateTimeFormat("es-ES", { weekday: "long", timeZone: "UTC" }).format(date);
  const day = new Intl.DateTimeFormat("es-ES", { day: "2-digit", timeZone: "UTC" }).format(date);
  const monthYear = new Intl.DateTimeFormat("es-ES", { month: "long", year: "numeric", timeZone: "UTC" }).format(date);
  return { weekday, day, monthYear };
}

export default function PublicConfirmation({
  initialData,
}: {
  initialData: PublicConfirmationData;
}) {
  const [previewMode, setPreviewMode] = React.useState(false);

  const [showDeclineReasons, setShowDeclineReasons] = React.useState(false);
  const [selectedReason, setSelectedReason] = React.useState("");
  const [customReason, setCustomReason] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [action, setAction] = React.useState<Action | null>(null);
  const training = initialData.training;
  const attendee = initialData.attendee;

  const dateParts = React.useMemo(() => {
    const date = new Date(training.dateISO);
    return formatSpanishDate(date);
  }, [training.dateISO]);

  const slotsAvailable = training.maxSlots - training.confirmedSlots;

  if (submitted) {
    const isConfirmed = action === "confirmed";
    return (
      <PublicConfirmationSubmitted isConfirmed={isConfirmed} />
    );
  }

  if (attendee.status !== "pending" && !previewMode) {
    return (
      <PublicConfirmationAlreadyResponded onPreview={() => setPreviewMode(true)} />
    );
  }

  if (previewMode && attendee.status !== "pending") {
    // Preview-only screen for already-responded attendees.
    return (
      <PublicConfirmationPreview
        attendeeName={attendee.name}
        trainingName={training.name}
        dateParts={dateParts}
        timeHours={training.timeHours}
        location={training.location}
        mapsUrl={training.mapsUrl}
        onBack={() => setPreviewMode(false)}
      />
    );
  }

  const handleConfirm = () => {
    setAction("confirmed");
    setSubmitted(true);
  };

  const handleDecline = () => {
    const reason = selectedReason === "Otro" ? customReason.trim() : selectedReason;
    if (!reason) return;
    setAction("declined");
    setSubmitted(true);
  };

  return (
    <div className="min-h-dvh bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200/70 bg-white/90 dark:bg-zinc-900/60 backdrop-blur p-6 shadow-sm">
        <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-1">
          Hola <span className="font-medium text-zinc-900 dark:text-zinc-50">{attendee.name}</span>, confirma tu lugar para:
        </p>

        <h1 className="text-xl font-bold tracking-tight mb-5">{training.name}</h1>

        <div className="bg-indigo-600/5 dark:bg-indigo-500/10 rounded-2xl p-5 mb-5 text-center">
          <p className="text-xs uppercase font-medium text-indigo-700 dark:text-indigo-300 tracking-wide">{dateParts.weekday}</p>
          <p className="text-5xl font-bold tracking-tighter text-indigo-700 dark:text-indigo-300 tabular-nums leading-none mt-1">{dateParts.day}</p>
          <p className="text-sm font-medium text-indigo-700/70 dark:text-indigo-300/80">{dateParts.monthYear}</p>
        </div>

        <div className="space-y-2.5 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <IconClock className="h-4 w-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
            <span>{training.timeHours} hrs</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <IconMapPin className="h-4 w-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
            <span className="truncate">{training.location}</span>
            {training.mapsUrl ? (
              <a href={training.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-700 dark:text-indigo-300 hover:underline ml-auto">
                <IconExternalLink className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </div>

        <p className="text-xs text-zinc-600 dark:text-zinc-300 mb-5">
          Quedan{" "}
          <span className="font-semibold text-zinc-900 dark:text-zinc-50 tabular-nums">{7}</span> cupos disponibles.
        </p>

        {!showDeclineReasons ? (
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={handleConfirm}
              className="w-full py-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base transition-colors"
            >
              Sí, asistiré
            </button>
            <button
              type="button"
              onClick={() => setShowDeclineReasons(true)}
              className="w-full py-6 rounded-xl bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-base font-semibold text-zinc-600 dark:text-zinc-200 border border-zinc-200/70 dark:border-zinc-800 transition-colors"
            >
              No puedo ir
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            <p className="text-sm font-medium">¿Cuál es el motivo?</p>

            <div className="space-y-2">
              {DECLINE_REASONS.map((reason) => {
                const isSelected = selectedReason === reason;
                return (
                  <button
                    key={reason}
                    type="button"
                    onClick={() => setSelectedReason(reason)}
                    className={[
                      "w-full text-left px-4 py-3 rounded-xl border text-sm transition-all",
                      isSelected
                        ? "border-indigo-600 bg-indigo-600/10 text-indigo-900 dark:text-indigo-100"
                        : "border-zinc-200/70 hover:border-indigo-400/60 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300",
                    ].join(" ")}
                  >
                    {reason}
                  </button>
                );
              })}
            </div>

            {selectedReason === "Otro" ? (
              <textarea
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="Cuéntanos el motivo..."
                rows={3}
                className="mt-2 w-full resize-none rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            ) : null}

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowDeclineReasons(false);
                  setSelectedReason("");
                  setCustomReason("");
                }}
                className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Volver
              </button>
              <button
                type="button"
                onClick={handleDecline}
                disabled={!selectedReason || (selectedReason === "Otro" && !customReason.trim())}
                className={[
                  "flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
                  !selectedReason || (selectedReason === "Otro" && !customReason.trim())
                    ? "bg-zinc-300 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 cursor-not-allowed"
                    : "bg-rose-600 hover:bg-rose-700 text-white",
                ].join(" ")}
              >
                Confirmar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

