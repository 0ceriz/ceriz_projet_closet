
import { useState } from "react";
import "./App.css";

// ----- TYPE DEFINITIONS -----

interface ClothingItem {
  id: number;
  name: string;
  type: {
    category: "top" | "bottom" | "shoes" | "accessory";
    subcategory: string;
  };
  style: "sportswear" | "chic" | "classic" | "casual";
  color: string;
  isFavorite: boolean;
  comment?: string;
}

interface Closet {
  isOpen: boolean;
  clothes: ClothingItem[];
}

function App() {
  // ----- STATE MANAGEMENT
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [closet, setCloset] = useState<Closet>({
    isOpen: false,
    clothes: [],
  });

  // ----- FUNCTIONS TO MANAGE CLOSET STATE -----
  const openCloset = () => {
    setCloset((prevCloset) => ({ ...prevCloset, isOpen: true }));
  };
  const closeCloset = () => {
    setCloset((prevCloset) => ({ ...prevCloset, isOpen: false }));
  };
  const addClothingItem = (item: ClothingItem) => {
    setCloset((prevCloset) => ({
      ...prevCloset,
      clothes: [...prevCloset.clothes, item],
    }));
  };
  const removeClothingItem = (id: number) => {
    setCloset((prevCloset) => ({
      ...prevCloset,
      clothes: prevCloset.clothes.filter((item) => item.id !== id),
    }));
  };

  // ----- EVENT HANDLERS -----
  const handleOpenCloset = () => {
    openCloset();
    setInfoMessage("Closet is now open !");
  };

  const handleCloseCloset = () => {
    closeCloset();
    setInfoMessage("Closet is now closed !");
  };

  const handleAddItem = () => {
    const newItem: ClothingItem = {
      id: Date.now(),
      name: "New T-Shirt",
      type: { category: "top", subcategory: "t-shirt" },
      style: "casual",
      color: "blue",
      isFavorite: false,
    };
    addClothingItem(newItem);
    setInfoMessage("Added a new clothing item !");
  };

  const handleRemoveItem = (id: number) => {
    removeClothingItem(id);
    setInfoMessage("Removed a clothing item !");
  };

  return (
    <>
      {/* TITLE */}
      <h1>Closet Manager</h1>
      {/* INFO SECTION */}
      <div>
        <p>{infoMessage ? infoMessage : "Let's manage your closet!"}</p>
      </div>
      {/* CLOSET CONTROLS */}
      <div>
        {closet.isOpen ? (
          <>
            <button onClick={handleAddItem}>Add Clothing Item</button>
            <button onClick={handleCloseCloset}>Close Closet</button>
          </>
        ) : (
          <button onClick={handleOpenCloset}>Open Closet</button>
        )}
      </div>

      {/* CLOTHING ITEMS LIST */}
      {closet.isOpen && (
        <div>
          <h2>Clothing Items:</h2>
          {closet.clothes.length === 0 ? (
            <p>No clothing items in the closet.</p>
          ) : (
            <ul>
              {closet.clothes.map((item) => (
                <li key={item.id}>
                  {item.name} - {item.type.category} ({item.style}, {item.color}
                  )
                  <button onClick={() => handleRemoveItem(item.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
}

export default App;
