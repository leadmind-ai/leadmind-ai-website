"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/FadeIn";

type SolutionItem = {
  title: string;
  text: string;
};

type ProblemSolutionProps = {
  problemSolution: {
    headline: string;
    problem_title: string;
    problem_items: string[];
    solution_title: string;
    solution_items: SolutionItem[];
  };
};

export default function ProblemSolution({
  problemSolution,
}: ProblemSolutionProps) {
  return (
    <section className="py-20">
      <Container>
        <FadeIn>
          <h2 className="mx-auto max-w-4xl text-center text-3xl font-normal text-on-surface md:text-4xl">
            {problemSolution.headline}
          </h2>
        </FadeIn>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Problem column */}
          <FadeIn direction="left">
            <Card hover={false} className="h-full">
              <h3 className="text-xl font-normal text-on-surface">
                {problemSolution.problem_title}
              </h3>
              <ul className="mt-6 space-y-4">
                {problemSolution.problem_items.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-on-surface-muted">
                    <span className="mt-1 block h-2 w-2 flex-shrink-0 rounded-full bg-red-400/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </FadeIn>

          {/* Solution column */}
          <FadeIn direction="right">
            <Card hover={false} className="h-full border-accent/30">
              <h3 className="text-xl font-normal text-on-surface">
                {problemSolution.solution_title}
              </h3>
              <ul className="mt-6 space-y-4">
                {problemSolution.solution_items.map((item, i) => (
                  <li key={i} className="text-sm leading-relaxed text-on-surface-muted">
                    <span className="font-normal text-accent">
                      {item.title}
                    </span>{" "}
                    {item.text}
                  </li>
                ))}
              </ul>
            </Card>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
