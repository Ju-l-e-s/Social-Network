import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  it("renders the provided label", () => {
    render(<Button>Publier</Button>);
    expect(screen.getByRole("button", { name: /publier/i })).toBeInTheDocument();
  });
});
