import { Container } from "@/components/ui/Container";

type LogoBarProps = {
  title?: string;
  logos?: string[];
};

export default function LogoBar({ title, logos }: LogoBarProps) {
  const displayLogos = logos ?? [
    "MACSF",
    "Credit Agricole Assurances",
    "Generali",
    "Paris Dauphine-PSL",
    "CFA Institute",
    "ISUP Sorbonne",
  ];

  return (
    <section className="border-b border-white/5 py-8">
      <Container>
        {title && (
          <p className="mb-4 text-center text-sm font-medium text-text-muted">
            {title}
          </p>
        )}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll gap-12">
            {[...displayLogos, ...displayLogos].map((logo, i) => (
              <div
                key={i}
                className="flex-shrink-0 text-sm font-medium text-text-muted"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
