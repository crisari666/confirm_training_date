'use client';

import * as React from "react";
import { IconCheck } from "./public-confirmation-icons";

export function PublicConfirmationSubmitted({ isConfirmed }: { isConfirmed: boolean }) {
  return (
    <div className="min-h-dvh bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200/70 bg-white/90 dark:bg-zinc-900/60 backdrop-blur p-8 text-center shadow-sm">
        <div
          className={[
            "mx-auto mb-4 h-14 w-14 rounded-full flex items-center justify-center",
            isConfirmed ? "bg-emerald-600/10 text-emerald-600" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-200",
          ].join(" ")}
        >
          <IconCheck
            className={[
              "h-7 w-7",
              isConfirmed ? "text-emerald-600" : "text-zinc-600 dark:text-zinc-200",
            ].join(" ")}
          />
        </div>
        <h2 className="text-xl font-bold tracking-tight mb-2">{isConfirmed ? "¡Confirmado!" : "Entendido"}</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          {isConfirmed ? "Te esperamos en la capacitación. ¡No olvides llegar a tiempo!" : "Gracias por informarnos. Esperamos verte en una próxima oportunidad."}
        </p>
      </div>
    </div>
  );
}

