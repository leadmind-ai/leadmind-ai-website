"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";

type Formation = {
  title: string;
  duration: string;
  audience: string;
  certification?: string;
};

type FormationsCatalogProps = {
  formations: {
    certifiantes_title: string;
    certifiantes: Formation[];
    metier_title: string;
    metier: Formation[];
    executive_title: string;
    executive: Formation;
    backoffice_title: string;
    backoffice: Formation;
    custom_title: string;
    custom_text: string;
  };
};

function FormationCard({ item }: { item: Formation }) {
  return (
    <Card className="flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-medium text-on-surface">{item.title}</h3>
        <span className="shrink-0 text-sm font-medium text-accent">
          {item.duration}
        </span>
      </div>
      <p className="mt-3 text-sm text-on-surface-muted">{item.audience}</p>
      {item.certification && (
        <Badge variant="accent" className="mt-3 w-fit text-xs">
          {item.certification}
        </Badge>
      )}
    </Card>
  );
}

export default function FormationsCatalog({ formations }: FormationsCatalogProps) {
  return (
    <section className="py-16 md:py-[var(--spacing-section)]">
      <Container>
        <FadeIn>
          <h2 className="text-xl font-medium text-on-surface">
            {formations.certifiantes_title}
          </h2>
        </FadeIn>
        <StaggerChildren className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {formations.certifiantes.map((item, i) => (
            <StaggerItem key={i} className="h-full">
              <FormationCard item={item} />
            </StaggerItem>
          ))}
        </StaggerChildren>

        <FadeIn>
          <h2 className="mt-16 text-xl font-medium text-on-surface">
            {formations.metier_title}
          </h2>
        </FadeIn>
        <StaggerChildren className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {formations.metier.map((item, i) => (
            <StaggerItem key={i} className="h-full">
              <FormationCard item={item} />
            </StaggerItem>
          ))}
        </StaggerChildren>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <FadeIn>
            <div>
              <h2 className="text-xl font-medium text-on-surface">
                {formations.executive_title}
              </h2>
              <div className="mt-4">
                <FormationCard item={formations.executive} />
              </div>
            </div>
          </FadeIn>
          <FadeIn>
            <div>
              <h2 className="text-xl font-medium text-on-surface">
                {formations.backoffice_title}
              </h2>
              <div className="mt-4">
                <FormationCard item={formations.backoffice} />
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn>
          <Card className="mt-16 p-8 text-center">
            <h2 className="text-xl text-on-surface">
              {formations.custom_title}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-on-surface-muted">
              {formations.custom_text}
            </p>
          </Card>
        </FadeIn>
      </Container>
    </section>
  );
}
