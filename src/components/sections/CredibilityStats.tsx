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
          <h2 className="mx-auto max-w-4xl text-center text-3xl text-white md:text-4xl lg:text-[48px] lg:leading-tight">
            {credibility.title}
          </h2>
        </FadeIn>

        {/* Stats grid */}
        <StaggerChildren className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 auto-rows-fr">
          {credibility.stats.map((stat, i) => (
            <StaggerItem key={i} className="h-full">
              <Card className="text-center h-full">
                <div className="text-3xl text-accent">
                  {stat.value}
                </div>
                <p className="mt-2 text-base text-[#818181]">{stat.label}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Founder card */}
        <FadeIn>
          <Card hover={false} className="mt-12">
            <h3 className="text-xl text-white">
              {credibility.founder.name}
            </h3>
            <p className="text-base font-medium text-accent">
              {credibility.founder.role}
            </p>
            <p className="mt-4 text-base leading-[1.45] text-[#818181] whitespace-pre-line">
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
                  className="text-base text-[#818181]"
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
