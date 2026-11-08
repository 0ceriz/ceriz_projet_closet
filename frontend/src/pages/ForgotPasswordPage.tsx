import { useState, type FormEvent } from "react";

import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";

interface ForgotPasswordPageProps {
  onBackToLogin: () => void;
  onSubmitEmail: (email: string) => Promise<void>;
}

export default function ForgotPasswordPage({
  onBackToLogin,
  onSubmitEmail,
}: ForgotPasswordPageProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      await onSubmitEmail(email);
      setSuccess(true);
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
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
            Mot de passe oublié ?
          </Typography>

          <Typography sx={{ textAlign: "center", color: "text.secondary" }}>
            Saisissez votre adresse email. Vous recevrez un lien pour
            réinitialiser votre mot de passe.
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          {success && (
            <Alert severity="success">
              Si cette adresse correspond à un compte, un email de
              réinitialisation va vous être envoyé.
            </Alert>
          )}

          <TextField
            label="Adresse email"
            placeholder="exemple@email.com"
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
            {isLoading ? "Envoi..." : "Envoyer le lien"}
          </Button>

          <Button
            type="button"
            variant="text"
            onClick={onBackToLogin}
            sx={{
              color: "#6D67B5",
              textTransform: "none",
            }}
          >
            Retour à la connexion
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
