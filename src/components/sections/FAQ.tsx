"use client";

import { useState, useRef, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  faq: {
    title: string;
    items: FAQItem[];
  };
};

function FAQAccordion({ item, isOpen, onToggle, index }: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div className="border-b border-surface-elevated">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-accent"
      >
        <span className="pr-4 text-white">{item.question}</span>
        <span className="flex-shrink-0 text-accent">
          {isOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </span>
      </button>
      <div
        style={{
          height,
          opacity: isOpen ? 1 : 0,
          overflow: "hidden",
          transition: "height 0.3s ease-in-out, opacity 0.3s ease-in-out",
        }}
      >
        <div
          ref={contentRef}
          id={`faq-answer-${index}`}
          role="region"
          className="pb-5 text-base leading-[1.45] text-[#818181] whitespace-pre-line"
        >
          {item.answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQ({ faq }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-[var(--spacing-section)]">
      <Container>
        <FadeIn>
          <h2 className="text-3xl text-white md:text-4xl lg:text-[48px]">
            {faq.title}
          </h2>
        </FadeIn>
        <div className="mx-auto mt-12 max-w-3xl">
          {faq.items.map((item, i) => (
            <FAQAccordion
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              index={i}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
