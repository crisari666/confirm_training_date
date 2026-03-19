export default function NotFound() {
  return (
    <div className="min-h-[100dvh] bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200/70 bg-white/90 dark:bg-zinc-900/60 backdrop-blur p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 h-14 w-14 rounded-full flex items-center justify-center bg-zinc-200/70 dark:bg-zinc-800/70 text-zinc-700 dark:text-zinc-200 font-semibold">
          404
        </div>
        <h1 className="text-xl font-bold tracking-tight mb-2">Enlace no válido</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          El código de la capacitación no existe o ha expirado.
        </p>
      </div>
    </div>
  );
}

