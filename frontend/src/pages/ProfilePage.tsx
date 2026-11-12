import { useState } from "react";

import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  InputAdornment,
  Divider,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import SettingsIcon from "@mui/icons-material/Settings";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";

import { passwordApi } from "../services/passwordApi";
import { useAuth } from "../hooks/useAuth";

interface ProfilePageProps {
  onBack: () => void;
}

const cardStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 3,
  p: 3,
  mb: 3,
  boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
};

const buttonStyle = {
  backgroundColor: "#817CCC",
  "&:hover": {
    backgroundColor: "#6D67B5",
  },
  textTransform: "none" as const,
};

export default function ProfilePage({ onBack }: ProfilePageProps) {
  const { user, updateProfile, deleteAccount } = useAuth();

  // Informations personnelles
  const [pseudo, setPseudo] = useState(user?.pseudo ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [pictureUrl, setPictureUrl] = useState(user?.pictureUrl ?? "");

  // Mot de passe
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Préférences
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Suppression du compte
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // Mise à jour du profil
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Changement du mot de passe
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Validation de l'adresse email
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  // Mise à jour du profil
  const handleUpdateAccount = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    if (pseudo.trim().length < 3) {
      setErrorMessage("Le pseudo doit contenir au moins 3 caractères.");
      return;
    }

    if (!email.trim() || !isEmailValid) {
      setErrorMessage("Veuillez saisir une adresse email valide.");
      return;
    }

    setSaving(true);

    try {
      await updateProfile({
        pseudo: pseudo.trim(),
        email: email.trim(),
        pictureUrl: pictureUrl.trim() || null,
      });

      setSuccessMessage("Votre profil a été mis à jour avec succès !");
    } catch (error) {
      console.error(
        "[PROFILE] Erreur lors de la modification du profil :",
        error,
      );

      setErrorMessage(
        "Impossible de modifier votre profil. Cette adresse email est peut-être déjà utilisée.",
      );
    } finally {
      setSaving(false);
    }
  };

  // Changement du mot de passe
  const handleChangePassword = async () => {
    setPasswordSuccess("");
    setPasswordError("");

    if (!password || !newPassword) {
      setPasswordError("Veuillez remplir les deux champs.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError(
        "Le nouveau mot de passe doit contenir au moins 8 caractères.",
      );
      return;
    }

    if (password === newPassword) {
      setPasswordError(
        "Le nouveau mot de passe doit être différent de l'ancien.",
      );
      return;
    }

    setSavingPassword(true);

    try {
      await passwordApi.changePassword({
        currentPassword: password,
        newPassword: newPassword,
      });

      setPassword("");
      setNewPassword("");

      setPasswordSuccess("Votre mot de passe a été modifié avec succès !");
    } catch (error) {
      console.error("[PASSWORD] Échec du changement de mot de passe :", error);

      setPasswordError(
        "Impossible de modifier le mot de passe. Vérifiez votre mot de passe actuel.",
      );
    } finally {
      setSavingPassword(false);
    }
  };

  // Suppression du compte
  const handleDeleteAccount = async () => {
    try {
      console.log("[DELETE] Début de la suppression");

      await deleteAccount();

      console.log("[DELETE] Suppression terminée");
      setOpenDeleteDialog(false);

      console.log("[DELETE] Appel de onBack");
      onBack();
    } catch (error) {
      console.error("[DELETE] Erreur :", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(135deg, #FFFE91, #C46E41, #8C2C1F)",
        py: 4,
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        {/* RETOUR */}
        <Box sx={{ mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={onBack}
            sx={{
              color: "#FFFFFF",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.15)",
              },
            }}
          >
            Retour à mes dressings
          </Button>
        </Box>

        {/* CARTE PRINCIPALE */}
        <Box sx={cardStyle}>
          {/* TITRE */}
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mb: 1,
              color: "#333333",
            }}
          >
            Mon profil
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              color: "text.secondary",
              mb: 4,
            }}
          >
            Gérez vos informations personnelles
          </Typography>

          {/* PHOTO DE PROFIL */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Avatar
              src={pictureUrl || undefined}
              sx={{
                width: 110,
                height: 110,
                mb: 2,
                bgcolor: "#817CCC",
                fontSize: 40,
                border: "4px solid #E8E5FA",
              }}
            >
              {pseudo.charAt(0).toUpperCase()}
            </Avatar>

            <Typography sx={{ fontWeight: "bold", mb: 1 }}>
              {pseudo || "Mon compte"}
            </Typography>

            <TextField
              label="URL de ma photo"
              value={pictureUrl}
              onChange={(e) => setPictureUrl(e.target.value)}
              size="small"
              fullWidth
              sx={{ maxWidth: 300 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhotoCameraIcon color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* INFORMATIONS PERSONNELLES */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                mb: 2,
                color: "#817CCC",
              }}
            >
              <PersonIcon sx={{ verticalAlign: "middle", mr: 1 }} />
              Informations personnelles
            </Typography>

            {/* PSEUDO */}
            <TextField
              label="Pseudo"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              fullWidth
              margin="normal"
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

            {/* ADRESSE EMAIL */}
            <TextField
              label="Adresse email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              error={email.trim() !== "" && !isEmailValid}
              helperText={
                email.trim() !== "" && !isEmailValid
                  ? "Veuillez saisir une adresse email valide."
                  : "Vous pouvez modifier l'adresse email associée à votre compte."
              }
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

          <Divider sx={{ mb: 3 }} />

          {/* SÉCURITÉ */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                mb: 2,
                color: "#817CCC",
              }}
            >
              <LockIcon sx={{ verticalAlign: "middle", mr: 1 }} />
              Sécurité
            </Typography>

            {/* MOT DE PASSE ACTUEL */}
            <TextField
              label="Mot de passe actuel"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              autoComplete="current-password"
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
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        aria-label="Afficher ou masquer les mots de passe"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* NOUVEAU MOT DE PASSE */}
            <TextField
              label="Nouveau mot de passe"
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              margin="normal"
              autoComplete="new-password"
              helperText="8 caractères minimum"
            />
          </Box>

          {/* MESSAGES DU MOT DE PASSE */}
          {passwordSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {passwordSuccess}
            </Alert>
          )}

          {passwordError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {passwordError}
            </Alert>
          )}

          {/* BOUTON CHANGEMENT MOT DE PASSE */}
          <Button
            variant="contained"
            fullWidth
            onClick={handleChangePassword}
            disabled={savingPassword}
            sx={{
              ...buttonStyle,
              height: 45,
              mb: 3,
              fontWeight: "bold",
            }}
          >
            {savingPassword
              ? "Modification en cours..."
              : "Modifier mon mot de passe"}
          </Button>

          <Divider sx={{ mb: 3 }} />

          {/* OPTIONS */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                mb: 2,
                color: "#817CCC",
              }}
            >
              <SettingsIcon sx={{ verticalAlign: "middle", mr: 1 }} />
              Préférences
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  color="secondary"
                />
              }
              label="Recevoir des notifications"
            />

            <Divider sx={{ my: 1 }} />

            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  color="secondary"
                />
              }
              label="Mode sombre"
            />
          </Box>

          {/* MESSAGES DU PROFIL */}
          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}

          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          {/* ENREGISTRER LE PROFIL */}
          <Button
            variant="contained"
            fullWidth
            startIcon={<SaveIcon />}
            onClick={handleUpdateAccount}
            disabled={saving}
            sx={{
              ...buttonStyle,
              height: 48,
              mb: 3,
              fontWeight: "bold",
            }}
          >
            {saving ? "Enregistrement..." : "Enregistrer les modifications"}
          </Button>

          <Divider sx={{ mb: 3 }} />

          {/* SUPPRESSION DU COMPTE */}
          <Box
            sx={{
              backgroundColor: "#FFF5F5",
              borderRadius: 2,
              p: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "error",
                mb: 1,
              }}
            >
              Supprimer mon compte
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                mb: 2,
              }}
            >
              Cette action est définitive et entraînera la suppression de votre
              compte.
            </Typography>

            <Button
              variant="outlined"
              color="error"
              fullWidth
              startIcon={<DeleteIcon />}
              onClick={() => setOpenDeleteDialog(true)}
              sx={{ textTransform: "none" }}
            >
              Supprimer mon compte
            </Button>
          </Box>
        </Box>

        {/* DIALOG DE CONFIRMATION */}
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>Supprimer votre compte ?</DialogTitle>

          <DialogContent>
            <DialogContentText>
              Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est
              irréversible.
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>Annuler</Button>

            <Button color="error" onClick={handleDeleteAccount}>
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
