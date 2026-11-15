import { useState, type FormEvent } from "react";
import { useAuth } from "../hooks/useAuth";

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

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import ImageIcon from "@mui/icons-material/Image";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    const trimmedPseudo = pseudo.trim();
    const trimmedEmail = email.trim();
    const trimmedPictureUrl = pictureUrl.trim();

    // Validation du pseudo
    if (trimmedPseudo.length < 3 || trimmedPseudo.length > 255) {
      setError("Le pseudo doit contenir entre 3 et 255 caractères.");
      return;
    }

    // Validation de l'email
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!emailIsValid || trimmedEmail.length > 255) {
      setError("Veuillez saisir une adresse email valide.");
      return;
    }

    // Validation du mot de passe
    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    setLoading(true);

    try {
      await register({
        pseudo: trimmedPseudo,
        email: trimmedEmail,
        password,
        pictureUrl: trimmedPictureUrl || null,
      });

      setSuccess("Compte créé avec succès !");

      setPseudo("");
      setEmail("");
      setPassword("");
      setPictureUrl("");

    } catch (error) {
      console.error("[REGISTER PAGE] Échec :", error);

      setError("Échec de la création du compte. Veuillez réessayer.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(135deg, #FFFE91, #FC94D5, #B82F98)",
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
          noValidate
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
          {/* Titre */}
          <Typography
            variant="h4"
            component="h1"
            sx={{ textAlign: "center", mb: 1 }}
          >
            Register
          </Typography>

          {/* Messages */}
          {error && (
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success">
              {success}
            </Alert>
          )}

          {/* Pseudo */}
          <Box>
            <Typography sx={{ mb: 1 }}>
              Pseudo
            </Typography>

            <TextField
              placeholder="Votre pseudo"
              type="text"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              required
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          {/* Email */}
          <Box>
            <Typography sx={{ mb: 1 }}>
              Email
            </Typography>

            <TextField
              placeholder="Votre adresse email"
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

          {/* Password */}
          <Box>
            <Typography sx={{ mb: 1 }}>
              Password
            </Typography>

            <TextField
              type={showPassword ? "text" : "password"}
              placeholder="Votre mot de passe"
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

          {/* Picture URL */}
          <Box>
            <Typography sx={{ mb: 1 }}>
              Picture URL (optionnel)
            </Typography>

            <TextField
              placeholder="URL de votre photo"
              type="url"
              value={pictureUrl}
              onChange={(e) => setPictureUrl(e.target.value)}
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <ImageIcon color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          {/* Bouton inscription */}
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            fullWidth
            sx={{
              height: "48px",
              mt: 1,
              backgroundColor: "#817CCC",
              "&:hover": {
                backgroundColor: "#6D67B5",
              },
            }}
          >
            {isLoading ? "Création..." : "Créer un compte"}
          </Button>

          {/* Retour Login */}
          <Box sx={{ textAlign: "center", mt: 1 }}>
            <Typography component="span">
              Déjà un compte ?
            </Typography>

            <Button
              type="button"
              variant="text"
              onClick={onBackToLogin}
              sx={{
                color: "#6D67B5",
                textTransform: "none",
              }}
            >
              Se connecter
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}