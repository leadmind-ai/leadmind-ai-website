"use client";

import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { Container } from "@/components/ui/Container";

type FounderProps = {
  title: string;
  name: string;
  bio: string;
};

export default function Founder({ title, name, bio }: FounderProps) {
  return (
    <section className="bg-surface py-20">
      <Container>
        <FadeIn>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-semibold text-primary">{title}</h2>
            <div className="mt-8 flex flex-col items-center gap-8 md:flex-row">
              <div className="relative h-48 w-48 flex-shrink-0 overflow-hidden rounded-full bg-gray-100">
                <Image
                  src="/images/herman.png"
                  alt="Herman Njouonang"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text">{name}</h3>
                <p className="mt-2 leading-relaxed text-text-muted">{bio}</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
