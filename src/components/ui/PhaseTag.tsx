type PhaseTagProps = {
  label: string;
  number: string;
};

export function PhaseTag({ label, number }: PhaseTagProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-accent px-3 py-1.5">
      <span className="text-sm font-semibold text-white">{label}</span>
      <span className="h-4 w-px bg-accent" />
      <span className="text-sm font-medium text-white/70">{number}</span>
    </span>
  );
}
