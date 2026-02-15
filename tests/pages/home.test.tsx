import { render, screen } from "@testing-library/react";
import Hero from "@/components/sections/Hero";

const heroDict = {
  title: "L'IA au service de l'assurance et de la finance",
  subtitle: "Formation et solutions IA",
  cta_primary: "Prendre rendez-vous",
  cta_secondary: "Nos formations",
};

describe("Home page Hero", () => {
  it("renders headline and CTAs", () => {
    render(<Hero hero={heroDict} locale="fr" />);
    expect(screen.getByText(heroDict.title)).toBeInTheDocument();
    expect(screen.getByText(heroDict.cta_primary)).toBeInTheDocument();
    expect(screen.getByText(heroDict.cta_secondary)).toBeInTheDocument();
  });
});
