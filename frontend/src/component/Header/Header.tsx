import { Button } from "@mui/material";

import { useAuth } from "../../hooks/useAuth";
import LogoutButton from "./LogoutButton";

interface HeaderProps {
  onProfile: () => void;
}

export default function Header({ onProfile }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header>
      <h1>Closet Manager</h1>

      <div>
        <span>{user?.pseudo}</span>

        <Button onClick={onProfile} color="inherit">
          Profile
        </Button>

        <LogoutButton />
      </div>
    </header>
  );
}
