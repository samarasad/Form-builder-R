export function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6">
      <main className="max-w-4xl mx-auto">{children}</main>
    </div>
  );
}
