import { Container } from "@/components/ui/Container";

type MissionProps = {
  title: string;
  text: string;
};

export default function Mission({ title, text }: MissionProps) {
  return (
    <section className="relative overflow-hidden pt-40 pb-20 md:pt-52 md:pb-28">
      {/* Blue radial glow from bottom — CodeWiki style */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(0,122,244,0.15) 0%, transparent 70%)",
        }}
      />
      <Container className="relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="hero-animate-title font-heading whitespace-pre-line text-[2.75rem] leading-[1] tracking-[-0.04em] text-white md:text-[4rem] lg:text-[6rem]">
            {title}
          </h1>
          <div className="hero-animate-subtitle relative mt-8">
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[200px] pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(0,122,244,0.12) 0%, transparent 70%)",
              }}
            />
            <p className="gradient-subtitle-text relative mx-auto max-w-[600px] whitespace-pre-line text-lg leading-[1.4] md:text-2xl">
              {text}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
