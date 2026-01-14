
import { useState } from "react";
import "./App.css";
import type { Closet } from "./types/closet.types";
import Title from "./component/Title";
import InfoSection from "./component/InfoSection";
import ClosetControls from "./component/ClosetControls";
import Modal from "./component/Modal";



function App() {
  // ----- STATE MANAGEMENT
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [closet, setCloset] = useState<Closet>({
    isOpen: false,
    clothes: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // ----- FUNCTIONS TO MANAGE CLOSET STATE -----
  const openCloset = () => {
    setCloset((prevCloset) => ({ ...prevCloset, isOpen: true }));
  };
  const closeCloset = () => {
    setCloset((prevCloset) => ({ ...prevCloset, isOpen: false }));
  };
   // const addClothingItem = (item: ClothingItem) => {
  //   setCloset((prevCloset) => ({
  //     ...prevCloset,
  //     clothes: [...prevCloset.clothes, item],
  //   }));
  // };
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
  // const handleAddItem = () => {
  //   const newItem: ClothingItem = {
  //     id: Date.now(),
  //     name: "New T-Shirt",
  //     type: { category: "top", subcategory: "t-shirt" },
  //     style: "casual",
  //     color: "blue",
  //     isFavorite: false,
  //   };
  //   addClothingItem(newItem);
  //   setInfoMessage("Added a new clothing item !");
  // };

  const handleRemoveItem = (id: number) => {
    removeClothingItem(id);
    setInfoMessage("Removed a clothing item !");
  };

  return (
    <>
      <Title/>
     <InfoSection infoMessage={infoMessage}/>
    <ClosetControls closetIsOpen={closet.isOpen}
        onOpen={handleOpenCloset}
        onClose={handleCloseCloset}
        onAddItem={() => setIsModalOpen(true)} 
        />
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

      <Modal
        isOpen={isModalOpen}
        title="Add Clothing Item"
        onClose={() => setIsModalOpen(false)} 
      >
        <p>Here you can add a new clothing item...</p>
      </Modal>
    </>
  );
}

export default App;
