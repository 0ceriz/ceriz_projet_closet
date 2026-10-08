import { useState, type FormEvent } from "react";
import { useAuth } from "../hooks/useAuth";

interface RegisterPageProps {
  onBackToLogin: () => void;
}

export default function RegisterPage({
  onBackToLogin,
}: RegisterPageProps) {
  const { register } = useAuth();

  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log("[REGISTER PAGE] Submit déclenché");

    setError(null);
    setSuccess(null);

    /*
     * VALIDATION
     */

    const trimmedPseudo = pseudo.trim();
    const trimmedEmail = email.trim();
    const trimmedPictureUrl = pictureUrl.trim();

    // Pseudo
    if (
      trimmedPseudo.length < 3 ||
      trimmedPseudo.length > 255
    ) {
      console.error(
        "[REGISTER PAGE] Pseudo invalide"
      );

      setError(
        "Échec de la création du compte."
      );

      return;
    }

    // Email
    const emailIsValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        trimmedEmail
      );

    if (
      !emailIsValid ||
      trimmedEmail.length > 255
    ) {
      console.error(
        "[REGISTER PAGE] Email invalide"
      );

      setError(
        "Échec de la création du compte."
      );

      return;
    }

    // Password
    if (password.length < 8) {
      console.error(
        "[REGISTER PAGE] Mot de passe trop court"
      );

      setError(
        "Échec de la création du compte."
      );

      return;
    }

    // Picture URL (optionnelle)
    if (trimmedPictureUrl) {
  try {
  await register({
    pseudo: trimmedPseudo,
    email: trimmedEmail,
    password,
    pictureUrl: trimmedPictureUrl || null,
  });

  console.log(
    "[REGISTER PAGE] Inscription réussie"
  );

  setSuccess("Compte créé avec succès !");

  setPseudo("");
  setEmail("");
  setPassword("");
  setPictureUrl("");
} catch (error) {
  console.error(
    "[REGISTER PAGE] Échec :",
    error
  );

  setError(
    "Échec de la création du compte."
  );
} finally {
  setLoading(false);
}

  return (
    <div>
      <h1>Register</h1>

      <form
        onSubmit={handleSubmit}
        noValidate
      >
        <div>
          <label>Pseudo</label>

          <input
            type="text"
            value={pseudo}
            onChange={(e) =>
              setPseudo(e.target.value)
            }
          />
        </div>

        <div>
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
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
          />
        </div>

        <div>
          <label>Picture URL</label>

          <input
            type="url"
            value={pictureUrl}
            onChange={(e) =>
              setPictureUrl(e.target.value)
            }
          />
        </div>

        {error && (
          <p>{error}</p>
        )}

        {success && (
          <p>{success}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
        >
          {isLoading
            ? "Création..."
            : "Créer un compte"}
        </button>
      </form>

      <button
        type="button"
        onClick={onBackToLogin}
      >
        Retour à la connexion
      </button>
    </div>
  );
}}}