import { useState, type FormEvent } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

interface LoginPageProps {
  onRegister: () => void;
}

export default function LoginPage({
  onRegister,
}: LoginPageProps) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    console.log("SUBMIT DÉCLENCHÉ");

    e.preventDefault();

    console.log("LOGIN PAGE : avant");

    setError(null);
    setLoading(true);

    try {
      console.log("[LOGIN] Tentative de connexion");

      await login(email, password);

      console.log("[LOGIN] Connexion réussie");
    } catch (error) {
      console.error("[LOGIN] Échec de la connexion");

      if (axios.isAxiosError(error)) {
        console.error("[LOGIN] Erreur Axios");
        console.error(
          "[LOGIN] Status :",
          error.response?.status
        );
        console.error(
          "[LOGIN] Data :",
          error.response?.data
        );

        if (error.response?.status === 401) {
          console.warn(
            "[LOGIN] Identifiants invalides"
          );

          setError(
            "Email ou mot de passe incorrect"
          );
        } else {
          console.error(
            "[LOGIN] Erreur serveur ou API"
          );

          setError(
            "Une erreur est survenue. Veuillez réessayer."
          );
        }
      } else {
        console.error(
          "[LOGIN] Erreur inattendue non-Axios :",
          error
        );

        setError(
          "Une erreur inattendue est survenue. Veuillez réessayer."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <div>
            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>

          {error && <p>{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
          >
            {isLoading
              ? "Connexion..."
              : "Login"}
          </button>
        </form>
      </div>

      <div>
        <span>Pas encore de compte ? </span>

        <button
          type="button"
          onClick={onRegister}
        >
          Créer un compte
        </button>
      </div>
    </>
  );
}