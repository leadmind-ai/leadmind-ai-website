"use client";

import Image from "next/image";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

type Highlight = {
  title: string;
  period: string;
  text: string;
};

type FounderProps = {
  title: string;
  name: string;
  role: string;
  intro: string;
  credentials: string[];
  highlights: Highlight[];
  conviction: string;
};

export default function Founder({
  title,
  name,
  role,
  intro,
  credentials,
  highlights,
  conviction,
}: FounderProps) {
  return (
    <section className="bg-surface py-20">
      <Container>
        <FadeIn>
          <h2 className="text-3xl font-semibold text-primary">{title}</h2>
        </FadeIn>

        <div className="mt-12 grid items-start gap-12 lg:grid-cols-5">
          {/* Photo + identite */}
          <FadeIn direction="left" className="lg:col-span-2">
            <div className="flex flex-col items-center text-center">
              <div className="relative h-56 w-56 overflow-hidden rounded-2xl shadow-lg md:h-64 md:w-64">
                <Image
                  src="/images/herman.png"
                  alt={name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-text">{name}</h3>
              <p className="text-sm font-medium text-accent">{role}</p>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {credentials.map((cred) => (
                  <Badge key={cred} variant="primary">
                    {cred}
                  </Badge>
                ))}
              </div>

              <blockquote className="mt-6 border-l-4 border-accent pl-4 text-left italic text-text-muted">
                &ldquo;{conviction}&rdquo;
              </blockquote>
            </div>
          </FadeIn>

          {/* Parcours */}
          <div className="lg:col-span-3">
            <FadeIn direction="right">
              <p className="text-lg leading-relaxed text-text-muted">{intro}</p>
            </FadeIn>

            <StaggerChildren className="mt-8 space-y-4">
              {highlights.map((h) => (
                <StaggerItem key={h.title}>
                  <div className="rounded-lg border-l-4 border-accent bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="font-semibold text-primary">{h.title}</h4>
                      <span className="text-sm font-medium text-accent">
                        {h.period}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                      {h.text}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </Container>
    </section>
  );
}
