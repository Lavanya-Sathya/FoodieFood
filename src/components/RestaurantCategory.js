import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = (props) => {
  const [isShow, setIsShow] = useState(false);
  const { title, itemCards, categories } = props?.items;

  return (
    <div>
      {itemCards && (
        <div className="border-b-8">
          <div
            className=" cursor-pointer font-bold text-xl py-4 flex justify-between"
            onClick={() => setIsShow(!isShow)}
          >
            <h1>
              {title} ({itemCards.length})
            </h1>
            <p className="pr-2">v</p>
          </div>
          <div>{isShow && <ItemList data={itemCards} action="ADD" />}</div>
        </div>
      )}
    </div>
  );
};
export default RestaurantCategory;
