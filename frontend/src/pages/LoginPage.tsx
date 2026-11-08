import { useState, type FormEvent } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

import {
  Container,
  Box,
  TextField,
  Typography,
  Button,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface LoginPageProps {
  onRegister: () => void;
  onForgotPassword: () => void;
}

export default function LoginPage({
  onRegister,
  onForgotPassword,
}: LoginPageProps) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      console.log("[LOGIN] Tentative de connexion");

      await login(email, password);

      console.log("[LOGIN] Connexion réussie");
    } catch (error) {
      console.error("[LOGIN] Échec de la connexion", error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setError("Email ou mot de passe incorrect");
        } else {
          setError("Une erreur est survenue. Veuillez réessayer.");
        }
      } else {
        setError("Une erreur inattendue est survenue.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(135deg, #FFFE91, #C46E41, #8C2C1F)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={handleSubmit}
          autoComplete="on"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            maxWidth: "400px",
            mx: "auto",
            p: 4,
            backgroundColor: "#FFFFFF",
            borderRadius: 3,
            boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
          }}
        >
          <Typography variant="h4" component="h1" sx={{ textAlign: "center" }}>
            Login
          </Typography>

          {error && (
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          <Box>
            <Typography sx={{ mb: 1 }}>Email</Typography>
            <TextField
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          <Box>
            <Typography sx={{ mb: 1 }}>Password</Typography>
            <TextField
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            fullWidth
            sx={{
              height: "48px",
              backgroundColor: "#817CCC",
              "&:hover": {
                backgroundColor: "#6D67B5",
              },
            }}
          >
            {isLoading ? "Connexion..." : "Login"}
          </Button>

          <Box sx={{ textAlign: "center", mt: 1 }}>
            <Button
              type="button"
              variant="text"
              onClick={onForgotPassword}
              sx={{
                color: "#6D67B5",
                textTransform: "none",
              }}
            >
              Mot de passe oublié ?
            </Button>
          </Box>

          <Box sx={{ textAlign: "center", mt: 1 }}>
            <Typography component="span">Pas encore de compte ?</Typography>
            <Button
              type="button"
              variant="text"
              onClick={onRegister}
              sx={{
                color: "#6D67B5",
              }}
            >
              Créer un compte
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
