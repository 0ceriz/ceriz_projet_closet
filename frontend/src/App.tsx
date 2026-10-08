import { useState } from "react";

import { useAuth } from "./hooks/useAuth";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ClosetPage from "./pages/ClosetPage";

function App() {
  const {
    user,
    loading,
  } = useAuth();

  const [isRegistering, setIsRegistering] =
    useState(false);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    if (isRegistering) {
      return (
        <RegisterPage
          onBackToLogin={() =>
            setIsRegistering(false)
          }
        />
      );
    }

    return (
      <LoginPage
        onRegister={() =>
          setIsRegistering(true)
        }
      />
    );
  }

  return <ClosetPage />;
}

export default App;