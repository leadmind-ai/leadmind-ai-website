"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";

type CredibilityProps = {
  credibility: {
    title: string;
    stats: { value: string; label: string }[];
    founder: {
      name: string;
      role: string;
      bio: string;
    };
    affiliations: string[];
  };
};

export default function CredibilityStats({
  credibility,
}: CredibilityProps) {
  return (
    <section className="py-16 md:py-[var(--spacing-section)]">
      <Container>
        <FadeIn>
          <h2 className="text-3xl text-on-surface md:text-4xl">
            {credibility.title}
          </h2>
        </FadeIn>

        {/* Stats grid */}
        <StaggerChildren className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {credibility.stats.map((stat, i) => (
            <StaggerItem key={i}>
              <Card className="text-center">
                <div className="text-3xl text-accent">
                  {stat.value}
                </div>
                <p className="mt-2 text-sm text-on-surface-muted">{stat.label}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Founder card */}
        <FadeIn>
          <Card
            hover={false}
            className="mt-12 border-t-4 border-t-accent"
          >
            <h3 className="text-xl text-on-surface">
              {credibility.founder.name}
            </h3>
            <p className="text-sm font-medium text-accent">
              {credibility.founder.role}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-on-surface-muted whitespace-pre-line">
              {credibility.founder.bio}
            </p>
          </Card>
        </FadeIn>

        {/* Affiliations */}
        <FadeIn>
          <div className="mt-8">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {credibility.affiliations.map((aff, i) => (
                <li
                  key={i}
                  className="text-sm text-on-surface-muted"
                >
                  {aff}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
