"use client";

import { Container } from "@/components/ui/Container";

type Project = {
  name: string;
  description: string;
  stars: string;
  icon: React.ReactNode;
};

const projects: Project[] = [
  {
    name: "gemini-cli",
    description:
      "An open-source AI agent that brings the power of Gemini directly into your terminal.",
    stars: "92.7k",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="6" fill="#4285F4" />
        <text
          x="14"
          y="19"
          textAnchor="middle"
          fill="white"
          fontSize="16"
          fontWeight="700"
          fontFamily="sans-serif"
        >
          G
        </text>
      </svg>
    ),
  },
  {
    name: "go",
    description: "The Go programming language",
    stars: "132.1k",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M14 4C8.477 4 4 8.477 4 14s4.477 10 10 10 10-4.477 10-10S19.523 4 14 4zm-1 14.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
          fill="white"
          opacity="0.9"
        />
      </svg>
    ),
  },
  {
    name: "flutter",
    description:
      "Flutter makes it easy and fast to build beautiful apps for mobile and beyond",
    stars: "174.8k",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M16 4L6 14l3.5 3.5L24 4H16z" fill="#54C5F8" />
        <path d="M16 16L9.5 22.5 13 26h7l-4-4 4-4-4-2z" fill="#54C5F8" />
      </svg>
    ),
  },
  {
    name: "kubernetes",
    description: "Production-Grade Container Scheduling and Management",
    stars: "120.1k",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="#326CE5" strokeWidth="1.5" fill="none" />
        <circle cx="14" cy="14" r="3" fill="#326CE5" />
        <line x1="14" y1="4" x2="14" y2="8" stroke="#326CE5" strokeWidth="1.5" />
        <line x1="14" y1="20" x2="14" y2="24" stroke="#326CE5" strokeWidth="1.5" />
        <line x1="4.5" y1="11" x2="8.2" y2="12.5" stroke="#326CE5" strokeWidth="1.5" />
        <line x1="19.8" y1="15.5" x2="23.5" y2="17" stroke="#326CE5" strokeWidth="1.5" />
        <line x1="4.5" y1="17" x2="8.2" y2="15.5" stroke="#326CE5" strokeWidth="1.5" />
        <line x1="19.8" y1="12.5" x2="23.5" y2="11" stroke="#326CE5" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: "react",
    description: "The library for web and native user interfaces.",
    stars: "242.5k",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="2.5" fill="#61DAFB" />
        <ellipse cx="14" cy="14" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none" />
        <ellipse
          cx="14"
          cy="14"
          rx="10"
          ry="4"
          stroke="#61DAFB"
          strokeWidth="1"
          fill="none"
          transform="rotate(60 14 14)"
        />
        <ellipse
          cx="14"
          cy="14"
          rx="10"
          ry="4"
          stroke="#61DAFB"
          strokeWidth="1"
          fill="none"
          transform="rotate(120 14 14)"
        />
      </svg>
    ),
  },
  {
    name: "python-sdk",
    description:
      "The official Python SDK for Model Context Protocol servers and clients",
    stars: "21.4k",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M10 6h8a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-8a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h8"
          stroke="#a0aec0"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="12" cy="9" r="1" fill="#a0aec0" />
        <circle cx="16" cy="19" r="1" fill="#a0aec0" />
      </svg>
    ),
  },
];

function StarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="text-[#818181]"
    >
      <path
        d="M8 1.5l1.85 3.75L14 5.9l-3 2.92.71 4.13L8 10.94l-3.71 2.01.71-4.13-3-2.92 4.15-.65L8 1.5z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

export default function ProjectCards() {
  return (
    <section className="py-[var(--spacing-section)]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
          {projects.map((project) => (
            <div
              key={project.name}
              className="shine group relative overflow-hidden rounded-[20px] bg-[#1a2230] p-px transition-colors duration-200 hover:bg-[#003d7a] cursor-pointer shadow-[0_34px_84px_-30px_rgba(66,133,244,0.09)]"
            >
              {/* Inner content — acts as the card face */}
              <div className="relative z-10 flex flex-col rounded-[19px] bg-[rgba(0,0,0,0.85)] group-hover:bg-[rgba(0,0,0,0.75)] backdrop-blur-[60px] px-11 py-9 h-full leading-[1.45] transition-colors duration-200">
                {/* Header: name + icon */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-medium text-white font-heading">
                    {project.name}
                  </h3>
                  <div className="flex-shrink-0 ml-4">{project.icon}</div>
                </div>

                {/* Description */}
                <p className="text-[#818181] text-base leading-[1.45] mb-auto min-h-[3rem]">
                  {project.description}
                </p>

                {/* Stars */}
                <div className="flex items-center gap-1.5 text-[#818181] text-base mt-6">
                  <StarIcon />
                  <span>{project.stars}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
