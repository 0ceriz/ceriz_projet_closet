import type { Closet } from "../types/closet.types";


interface Props {
  closet: Closet;
  onClick: (closet: Closet) => void;
}


export default function ClosetCard({
  closet,
  onClick,
}: Props) {


  return (

    <div
      onClick={() => onClick(closet)}
      style={{
        border: "1px solid black",
        padding: "10px",
        margin: "10px",
        cursor: "pointer",
      }}
    >

      <h3>
        {closet.name}
      </h3>


      {
        closet.description && (

          <p>
            {closet.description}
          </p>

        )
      }


    </div>

  );
}