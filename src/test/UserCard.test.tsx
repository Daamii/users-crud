import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import { UserCard } from "../components/UserCard";
import i18n from "./i18n";

const mockUser = {
  id: "1",
  firstName: "Juan",
  lastName: "Pérez",
  email: "juan.perez@email.com",
  phone: "+34 612 345 678",
  avatar: "https://i.pravatar.cc/150?img=1",
  role: "Usuario",
  createdAt: "2024-01-15T10:30:00Z",
};

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>{component}</I18nextProvider>
    </BrowserRouter>,
  );
};

describe("UserCard", () => {
  it("should render user name", () => {
    renderWithProviders(<UserCard user={mockUser} />);
    expect(screen.getByText("Juan Pérez")).toBeDefined();
  });

  it("should render user email", () => {
    renderWithProviders(<UserCard user={mockUser} />);
    expect(screen.getByText("juan.perez@email.com")).toBeDefined();
  });

  it("should render user phone", () => {
    renderWithProviders(<UserCard user={mockUser} />);
    expect(screen.getByText("+34 612 345 678")).toBeDefined();
  });
});
