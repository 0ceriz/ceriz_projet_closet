import type { Closet } from "../types/closet.types";


interface Props {
  closet: Closet;
}


export default function ClosetDetail({
  closet,
}: Props) {
  return (
    <div>

      <h2>
        Selected closet
      </h2>

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