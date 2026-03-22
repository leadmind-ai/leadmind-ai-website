"use client";

import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

type TargetProfilesProps = {
  title: string;
  profiles: string[];
};

export default function TargetProfiles({ title, profiles }: TargetProfilesProps) {
  return (
    <section className="py-16 md:py-[var(--spacing-section)]">
      <Container>
        <FadeIn>
          <h2 className="mb-10 text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <ul className="mx-auto max-w-2xl space-y-4">
            {profiles.map((profile) => (
              <li key={profile} className="flex items-start gap-3">
                <svg
                  className="mt-1 h-5 w-5 flex-shrink-0 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-white/80">{profile}</span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </Container>
    </section>
  );
}
