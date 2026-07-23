import { useAuth } from "./hooks/useAuth";
import LoginPage from "./pages/LoginPage";
import ClosetPage from "./pages/ClosetPage";

function App() {

  const {
    user,
    loading,
  } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <LoginPage />;
  }

  return <ClosetPage />;

}


export default App;