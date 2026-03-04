import { render, screen } from "@testing-library/react";
import { ContactForm } from "@/components/forms/ContactForm";

const formDict = {
  name: "Nom complet",
  email: "Email professionnel",
  company: "Entreprise",
  subject: "Objet",
  subject_options: ["Formation", "Projet IA", "Conseil", "Autre"],
  message: "Votre message",
  submit: "Envoyer",
  success: "Message envoyé !",
  error: "Erreur lors de l'envoi.",
};

// Mock @formspree/react
jest.mock("@formspree/react", () => ({
  useForm: () => [
    { succeeded: false, submitting: false, errors: [] },
    jest.fn(),
  ],
}));

describe("ContactForm", () => {
  it("renders all form fields", () => {
    render(<ContactForm form={formDict} />);
    expect(screen.getByLabelText("Nom complet")).toBeInTheDocument();
    expect(screen.getByLabelText("Email professionnel")).toBeInTheDocument();
    expect(screen.getByLabelText("Entreprise")).toBeInTheDocument();
    expect(screen.getByLabelText("Objet")).toBeInTheDocument();
    expect(screen.getByLabelText("Votre message")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Envoyer" })
    ).toBeInTheDocument();
  });
});
