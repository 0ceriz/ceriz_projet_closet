import { useEffect, useState } from "react";

import Title from "../component/Title";
import CreateClosetForm from "../component/CreateClosetForm";
import ClosetCard from "../component/ClosetCard";

import { closetApi } from "../services/closetApi";

import type { Closet } from "../types/closet.types";

import ClosetDetail from "../component/ClosetDetail";


export default function ClosetPage() {


  const [closets, setClosets] =
    useState<Closet[]>([]);


  const [loadingClosets, setLoadingClosets] =
    useState(true);


  const [selectedCloset, setSelectedCloset] =
    useState<Closet | null>(null);



  const loadClosets = async () => {

    try {

      const data =
        await closetApi.getMyClosets();

      setClosets(data);


    } catch(error) {

      console.error(
        "Erreur chargement closets",
        error
      );


    } finally {

      setLoadingClosets(false);

    }

  };



  useEffect(() => {

    void loadClosets();

  }, []);




  return (
    <>

      <Title />


      <CreateClosetForm

        onCreated={() => {
          void loadClosets();
        }}

      />



      <h2>
        My closets
      </h2>



      {
        loadingClosets ? (

          <p>
            Loading closets...
          </p>


        ) : closets.length === 0 ? (

          <p>
            No closet yet
          </p>


        ) : (

          <div>

            {
              closets.map((closet) => (

                <ClosetCard

                  key={closet.id}

                  closet={closet}

                  onClick={setSelectedCloset}

                />

              ))
            }

          </div>

        )
      }




{
  selectedCloset && (

    <ClosetDetail
      closet={selectedCloset}
    />

  )
}


    </>
  );
}