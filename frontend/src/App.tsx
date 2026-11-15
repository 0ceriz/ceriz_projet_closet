
import { useState } from "react";

import { useAuth } from "./hooks/useAuth";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ClosetPage from "./pages/ClosetPage";
import ProfilePage from "./pages/ProfilePage";

import { authApi } from "./services/authApi";

type Page = "login" | "register" | "forgotPassword" | "profile";

function App() {
  const { user, loading } = useAuth();

  const [currentPage, setCurrentPage] = useState<Page>("login");

  const handleForgotPassword = async (email: string) => {
    await authApi.forgotPassword(email);
  };

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
        return (
          <RegisterPage
            onBackToLogin={() => setCurrentPage("login")}
          />
        );

      case "forgotPassword":
        return (
          <ForgotPasswordPage
            onBackToLogin={() => setCurrentPage("login")}
            onSubmitEmail={handleForgotPassword}
          />
        );

      default:
        return (
          <LoginPage
            onRegister={() => setCurrentPage("register")}
            onForgotPassword={() => setCurrentPage("forgotPassword")}
          />
        );
    }
  }

  if (currentPage === "profile") {
    return (
      <ProfilePage
        onBack={() => setCurrentPage("login")}
      />
    );
  }

  return (
    <ClosetPage
      onProfile={() => setCurrentPage("profile")}
    />
  );
}

export default App;
