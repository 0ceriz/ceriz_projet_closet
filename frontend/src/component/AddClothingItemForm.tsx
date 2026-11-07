import { useState } from "react";
import type { ClothingItem } from "../types/closet.types";

interface AddClothingItemFormProps {
  onAdd: (item: ClothingItem) => void;
}

function AddClothingItemForm({ onAdd }: AddClothingItemFormProps) {
  // ----- Form state
  const [name, setName] = useState<ClothingItem["name"]>("");
  const [category, setCategory] =
    useState<ClothingItem["type"]["category"]>("top");
  const [subcategory, setSubcategory] =
    useState<ClothingItem["type"]["subcategory"]>("");
  const [style, setStyle] = useState<ClothingItem["style"]>("casual");
  const [color, setColor] = useState<ClothingItem["color"]>("");
  const [isFavorite, setIsFavorite] =
    useState<ClothingItem["isFavorite"]>(false);
  const [comment, setComment] = useState<ClothingItem["comment"]>("");

  // ----- Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: ClothingItem = {
      id: Date.now(),
      name,
      type: { category, subcategory },
      style,
      color,
      isFavorite,
      comment,
    };
    onAdd(newItem);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* NAME */}
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      </div>

      {/* CATEGORY */}
      <div>
        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as typeof category)}
          >
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
            <option value="shoes">Shoes</option>
            <option value="accessory">Accessory</option>
          </select>
        </label>
      </div>

      {/* SUBCATEGORY */}
      <div>
        <label>
          Subcategory:
          <input
            type="text"
            placeholder="ex: T-shirt, Jeans..."
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            required
          />
        </label>
      </div>

      {/* STYLE */}
      <div>
        <label>
          Style:
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value as typeof style)}
          >
            <option value="sportswear">Sportswear</option>
            <option value="chic">Chic</option>
            <option value="classic">Classic</option>
            <option value="casual">Casual</option>
          </select>
        </label>
      </div>

      {/* COLOR */}
      <div>
        <label>
          Color:
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>
      </div>

      {/* FAVORITE */}
      <div>
        <label>
          Favorite:
          <input
            type="checkbox"
            checked={isFavorite}
            onChange={(e) => setIsFavorite(e.target.checked)}
          />
        </label>
      </div>

      {/* COMMENT */}
      <div>
        <label>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Add Item</button>
    </form>
  );
}

export default AddClothingItemForm;
