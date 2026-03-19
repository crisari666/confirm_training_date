import PublicConfirmation from "./components/public-confirmation/PublicConfirmation";
import { getPublicConfirmationData } from "@/lib/services/trainingService";

export default async function Home() {
  // Demo entrypoint for local development (optional).
  const demoAttendeeId =
    process.env.DEMO_ATTENDEE_ID ?? process.env.NEXT_PUBLIC_DEMO_ATTENDEE_ID;

  if (typeof demoAttendeeId === "string" && demoAttendeeId.trim()) {
    const data = await getPublicConfirmationData(demoAttendeeId.trim());
    if (data) return <PublicConfirmation initialData={data} />;
  }

  return (
    <div className="min-h-dvh bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200/70 bg-white/90 dark:bg-zinc-900/60 backdrop-blur p-8 text-center shadow-sm">
        <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4">
          Abre una confirmación con el formato: <code className="font-mono">/code/&lt;attendeeId&gt;</code>
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          El sistema normaliza URLs como <code className="font-mono">{"{{1}}<attendeeId>"}</code>.
        </p>
      </div>
    </div>
  );
}
