import { render, screen } from "@testing-library/react";
import { Header } from "@/components/layout/Header";

const nav = {
  home: "Accueil",
  about: "À propos",
  services: "Formations & Services",
  contact: "Contact",
  cta: "Prendre rendez-vous",
};

describe("Header", () => {
  it("renders navigation links", () => {
    render(<Header nav={nav} locale="fr" />);
    expect(screen.getByText("À propos")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders language switcher", () => {
    render(<Header nav={nav} locale="fr" />);
    expect(screen.getByText("EN")).toBeInTheDocument();
  });

  it("renders CTA button", () => {
    render(<Header nav={nav} locale="fr" />);
    expect(screen.getByText("Prendre rendez-vous")).toBeInTheDocument();
  });
});
