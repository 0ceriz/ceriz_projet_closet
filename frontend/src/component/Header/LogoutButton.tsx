import { useAuth } from "../../hooks/useAuth";

export default function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button
      type="button"
      onClick={() => void logout()}
    >
      Logout
    </button>
  );
}