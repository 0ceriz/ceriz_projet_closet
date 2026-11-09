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
  const { user } = useAuth();

  const [pseudo, setPseudo] = useState(user?.pseudo ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [pictureUrl, setPictureUrl] = useState(user?.pictureUrl ?? "");

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleUpdateAccount = () => {
    console.log("Mise à jour du compte", {
      pseudo,
      email,
      pictureUrl,
      password,
      newPassword,
      notifications,
      darkMode,
    });
  };

  const handleDeleteAccount = () => {
    console.log("Suppression du compte");
    setOpenDeleteDialog(false);
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
            sx={{ textAlign: "center", color: "text.secondary", mb: 4 }}
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
              sx={{ fontWeight: "bold", mb: 2, color: "#817CCC" }}
            >
              <PersonIcon sx={{ verticalAlign: "middle", mr: 1 }} />
              Informations personnelles
            </Typography>

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

            <TextField
              label="Adresse email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
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
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 2, color: "#817CCC" }}
            >
              <LockIcon sx={{ verticalAlign: "middle", mr: 1 }} />
              Sécurité
            </Typography>

            <TextField
              label="Mot de passe actuel"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
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
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Nouveau mot de passe"
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* OPTIONS */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 2, color: "#817CCC" }}
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

          {/* ENREGISTRER */}
          <Button
            variant="contained"
            fullWidth
            startIcon={<SaveIcon />}
            onClick={handleUpdateAccount}
            sx={{
              ...buttonStyle,
              height: 48,
              mb: 3,
              fontWeight: "bold",
            }}
          >
            Enregistrer les modifications
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
