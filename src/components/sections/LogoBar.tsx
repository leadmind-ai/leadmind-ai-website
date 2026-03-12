import { Container } from "@/components/ui/Container";

type LogoBarProps = {
  title?: string;
  logos?: string[];
};

const logoStyles: Record<string, string> = {
  "MACSF": "text-lg font-bold tracking-[0.2em] uppercase",
  "Crédit Agricole Assurances": "text-base font-semibold tracking-wide",
  "Credit Agricole Assurances": "text-base font-semibold tracking-wide",
  "Generali": "text-lg font-bold italic tracking-tight",
  "Paris Dauphine-PSL": "text-base font-medium tracking-wide",
  "CFA Institute": "text-base font-bold tracking-[0.15em] uppercase",
  "ISUP Sorbonne": "text-base font-semibold tracking-wider uppercase",
};

function LogoItem({ name }: { name: string }) {
  const style = logoStyles[name] || "text-base font-semibold";

  return (
    <div className={`flex-shrink-0 select-none text-on-surface/40 transition-opacity hover:text-on-surface/60 ${style}`}>
      {name}
    </div>
  );
}

export default function LogoBar({ title, logos }: LogoBarProps) {
  const displayLogos = logos ?? [
    "MACSF",
    "Crédit Agricole Assurances",
    "Generali",
    "Paris Dauphine-PSL",
    "CFA Institute",
    "ISUP Sorbonne",
  ];

  return (
    <section className="border-b border-surface-elevated py-10">
      <Container>
        {title && (
          <p className="mb-6 text-center text-sm font-medium text-on-surface-muted">
            {title}
          </p>
        )}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface to-transparent" />
          <div className="flex animate-scroll items-center gap-16">
            {[...displayLogos, ...displayLogos].map((logo, i) => (
              <LogoItem key={i} name={logo} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
