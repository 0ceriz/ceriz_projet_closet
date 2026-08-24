import { useState } from "react";
import { useAuth } from "../hooks/useAuth";


export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
      console.log("SUBMIT DÉCLENCHÉ");
          
  e.preventDefault();

  console.log("LOGIN PAGE : avant");

    setError(null);
    setLoading(true);

    try {
try {
  console.log("LOGIN PAGE : avant");

  await login(email, password);

  console.log("LOGIN PAGE : succès");
} catch (error) {
  console.log("LOGIN PAGE : catch", error);

  setError("Email ou mot de passe incorrect");
} finally {
  setLoading(false);
}

    } catch {

      setError(
        "Email ou mot de passe incorrect"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div>
      <h1>
        Login
      </h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label>
            Email
          </label>

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
          <label>
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />
        </div>

        {error && (
          <p>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
        >
          {isLoading
            ? "Connexion..."
            : "Login"
          }

        </button>
      </form>
    </div>
  );
}