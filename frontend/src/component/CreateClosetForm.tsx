import { useState } from "react";
import { closetApi } from "../services/closetApi";


interface Props {
  onCreated: () => void;
}


export default function CreateClosetForm({
  onCreated,
}: Props) {


  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState<string | null>(null);


  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      console.log("Create closet", {
  name,
  description,
});

      await closetApi.create({
        name,
        description,
      });

      setName("");
      setDescription("");
      setError(null);

      onCreated();

    } catch(error) {

      console.error(error);

      setError(
        "Impossible de créer le closet"
      );

    }

  };


  return (
    <form onSubmit={handleSubmit}>

      <h3>
        Create a closet
      </h3>

      {error && (
        <p>{error}</p>
      )}

      <input
        type="text"
        placeholder="Closet name"
        value={name}
        onChange={(e)=>
          setName(e.target.value)
        }
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e)=>
          setDescription(e.target.value)
        }
      />

      <button type="submit">
        Create
      </button>

    </form>
  );
}