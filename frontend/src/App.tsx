import { useState } from "react";
import type { Closet, ClothingItem } from "./types/closet.types";

import Title from "./component/Title";
import InfoSection from "./component/InfoSection";
import ClosetControls from "./component/ClosetControls";
import Modal from "./component/Modal";
import AddClothingItemForm from "./component/AddClothingItemForm";

import { useAuth } from "./hooks/useAuth";
import LoginPage from "./pages/LoginPage";

import "./App.css";


function App() {

  const {
    user,
    logout,
    loading,
  } = useAuth();



  // ----- STATE MANAGEMENT

  const [infoMessage, setInfoMessage] =
    useState<string | null>(null);


  const [closet, setCloset] =
    useState<Closet>({
      isOpen: false,
      clothes: [],
    });


  const [isModalOpen, setIsModalOpen] =
    useState(false);



  // ----- AUTH LOADING

  if (loading) {
    return <p>Loading...</p>;
  }



  // ----- NOT AUTHENTICATED

  if (!user) {
    return <LoginPage />;
  }



  // ----- FUNCTIONS TO MANAGE CLOSET STATE


  const openCloset = () => {

    setCloset((prevCloset) => ({
      ...prevCloset,
      isOpen: true,
    }));

  };



  const closeCloset = () => {

    setCloset((prevCloset) => ({
      ...prevCloset,
      isOpen: false,
    }));

  };



  const addClothingItem = (
    item: ClothingItem
  ) => {

    setCloset((prevCloset) => ({
      ...prevCloset,
      clothes: [
        ...prevCloset.clothes,
        item,
      ],
    }));

  };



  const removeClothingItem = (
    id: number
  ) => {

    setCloset((prevCloset) => ({
      ...prevCloset,

      clothes:
        prevCloset.clothes.filter(
          (item) => item.id !== id
        ),
    }));

  };



  // ----- EVENT HANDLERS


  const handleOpenCloset = () => {

    openCloset();

    setInfoMessage(
      "Closet is now open !"
    );

  };



  const handleCloseCloset = () => {

    closeCloset();

    setInfoMessage(
      "Closet is now closed !"
    );

  };



  const handleAddItem = (
    newItem: ClothingItem
  ) => {

    addClothingItem(newItem);

    setIsModalOpen(false);

    setInfoMessage(
      "Added a new clothing item !"
    );

  };



  const handleRemoveItem = (
    id: number
  ) => {

    removeClothingItem(id);

    setInfoMessage(
      "Removed a clothing item !"
    );

  };



  // ----- RENDER


  return (
    <>

      <Title />


      <div>

        <p>
          Connected as {user.email}
        </p>


        <button
          onClick={() => void logout()}
        >
          Logout
        </button>

      </div>



      <InfoSection
        infoMessage={infoMessage}
      />



      <ClosetControls

        closetIsOpen={
          closet.isOpen
        }

        onOpen={
          handleOpenCloset
        }

        onClose={
          handleCloseCloset
        }

        onAddItem={() =>
          setIsModalOpen(true)
        }

      />




      {/* CLOTHING ITEMS LIST */}


      {closet.isOpen && (

        <div>

          <h2>
            Clothing Items:
          </h2>



          {
            closet.clothes.length === 0 ? (

              <p>
                No clothing items in the closet.
              </p>

            ) : (


              <ul>

                {
                  closet.clothes.map(
                    (item) => (

                      <li key={item.id}>

                        {item.name}


                        <button
                          onClick={() =>
                            handleRemoveItem(
                              item.id
                            )
                          }
                        >

                          Remove

                        </button>


                      </li>

                    )
                  )
                }


              </ul>


            )
          }


        </div>

      )}






      <Modal

        isOpen={
          isModalOpen
        }

        title="Add Clothing Item"

        onClose={() =>
          setIsModalOpen(false)
        }

      >


        <AddClothingItemForm

          onAdd={
            handleAddItem
          }

        />


      </Modal>



    </>
  );
}


export default App;