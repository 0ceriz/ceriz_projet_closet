import { useCallback, useEffect, useState } from "react";

import Title from "../component/Title";
import CreateClosetForm from "../component/CreateClosetForm";
import ClosetCard from "../component/ClosetCard";
import ClosetDetail from "../component/ClosetDetail";
import Header from "../component/Header/Header";

import { closetApi } from "../services/closetApi";
import type { Closet } from "../types/closet.types";

interface ClosetPageProps {
  onProfile: () => void;
}

export default function ClosetPage({ onProfile }: ClosetPageProps) {
  const [closets, setClosets] = useState<Closet[]>([]);
  const [loadingClosets, setLoadingClosets] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCloset, setSelectedCloset] = useState<Closet | null>(null);

  const loadClosets = useCallback(async () => {
    setLoadingClosets(true);
    setError(null);

    try {
      const data = await closetApi.getMyClosets();
      setClosets(data);
    } catch (error) {
      console.error("Erreur chargement closets :", error);

      setError(
        "Impossible de charger vos placards. Vérifiez votre connexion et réessayez.",
      );
    } finally {
      setLoadingClosets(false);
    }
  }, []);

  useEffect(() => {
    void loadClosets();
  }, [loadClosets]);

  return (
    <>
      <Header onProfile={onProfile} />

      <Title />

      <CreateClosetForm
        onCreated={() => {
          void loadClosets();
        }}
      />

      <h2>My closets</h2>

      {loadingClosets ? (
        <p>Loading closets...</p>
      ) : error ? (
        <div role="alert">
          <p>{error}</p>
          <button type="button" onClick={() => void loadClosets()}>
            Retry
          </button>
        </div>
      ) : closets.length === 0 ? (
        <p>No closet yet</p>
      ) : (
        <div>
          {closets.map((closet) => (
            <ClosetCard
              key={closet.id}
              closet={closet}
              onClick={setSelectedCloset}
            />
          ))}
        </div>
      )}

      {selectedCloset && <ClosetDetail closet={selectedCloset} />}
    </>
  );
}
