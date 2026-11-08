import { useState } from "react";

import { useAuth } from "./hooks/useAuth";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ClosetPage from "./pages/ClosetPage";

type Page = "login" | "register" | "forgotPassword";

const handleForgotPassword = async (email: string) => {
  console.log("Email renseigné :", email);
}; //mesure temporaire pour tester le formulaire de mot de passe oublié

function App() {
  const { user, loading } = useAuth();

  const [currentPage, setCurrentPage] = useState<Page>("login");

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    switch (currentPage) {
      case "login":
        return (
          <LoginPage
            onRegister={() => setCurrentPage("register")}
            onForgotPassword={() => setCurrentPage("forgotPassword")}
          />
        );

      case "register":
        return <RegisterPage onBackToLogin={() => setCurrentPage("login")} />;

      case "forgotPassword":
        return (
          <ForgotPasswordPage
            onBackToLogin={() => setCurrentPage("login")}
            onSubmitEmail={handleForgotPassword}
          />
        );
    }
  }

  return <ClosetPage />;
}

export default App;
