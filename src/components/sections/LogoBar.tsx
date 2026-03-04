import { Container } from "@/components/ui/Container";

const logos = [
  "Assureur A",
  "Mutuelle B",
  "Banque C",
  "Réassureur D",
  "Groupe E",
  "Institution F",
];

export default function LogoBar() {
  return (
    <section className="border-b border-gray-100 bg-surface py-8">
      <Container>
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll gap-12">
            {[...logos, ...logos].map((logo, i) => (
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
