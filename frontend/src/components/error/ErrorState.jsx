import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export function ErrorState({ retry }) {
  return (
    <div className="flex flex-col items-center py-20 space-y-6">
      <div className="text-[var(--error)] text-5xl">⚠️</div>

      <Alert className="max-w-md w-full bg-[var(--bg-card)] border border-[var(--error)]/30">
        <AlertTitle className="text-[var(--error)] font-semibold">
          Failed to load Schema
        </AlertTitle>

        <AlertDescription className="text-[var(--text-muted)]">
          An error occurred while fetching the form details.  
          Please check your connection and try again.
        </AlertDescription>
      </Alert>

      <button
        onClick={retry}
        className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white px-6 py-2 rounded-lg"
      >
        Retry
      </button>
    </div>
  );
}
