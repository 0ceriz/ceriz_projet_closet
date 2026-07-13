import { useState } from "react";
import { useAuth } from "../hooks/useAuth";


export default function LoginPage() {

  const { login } = useAuth();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);



  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setError(null);
    setLoading(true);


    try {

      await login(
        email,
        password
      );

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
          disabled={loading}
        >

          {loading
            ? "Connexion..."
            : "Login"
          }

        </button>


      </form>


    </div>
  );
}