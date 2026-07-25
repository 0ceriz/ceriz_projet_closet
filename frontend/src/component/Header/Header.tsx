import { useAuth } from "../../hooks/useAuth";
import LogoutButton from "./LogoutButton";

export default function Header() {
  const { user } = useAuth();

  return (
    <header>
      <h1>Closet Manager</h1>

      <div>
        <span>{user?.pseudo}</span>

        <button type="button">
          Profile
        </button>

        <LogoutButton />
      </div>
    </header>
  );
}