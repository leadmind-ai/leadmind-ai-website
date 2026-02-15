import { render, screen } from "@testing-library/react";

function Smoke() {
  return <div>smoke</div>;
}

describe("test infrastructure", () => {
  it("renders a component", () => {
    render(<Smoke />);
    expect(screen.getByText("smoke")).toBeInTheDocument();
  });
});
