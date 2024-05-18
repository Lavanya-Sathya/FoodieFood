// Restaurant categories heading are displayed here
import { useState } from "react";
import ItemList from "./ItemList";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const RestaurantCategory = (props) => {
  const [isShow, setIsShow] = useState(false);
  const { title, itemCards } = props?.items;
  return (
    <div>
      {itemCards.length > 0 && (
        <div className="border-b-8">
          <div
            className=" cursor-pointer font-bold text-xl py-4 flex justify-between items-center"
            onClick={() => setIsShow(!isShow)}
          >
            <h1>
              {title} ({itemCards.length})
            </h1>
            <p className="pr-2 font-bold">
              {isShow ? (
                <FiChevronUp
                  size={30}
                  className="opacity-70 hover:opacity-100"
                />
              ) : (
                <FiChevronDown
                  size={30}
                  className="opacity-70 hover:opacity-100"
                />
              )}
            </p>
          </div>
          {/* Displays all the items in the category on basis of isShow */}
          <div>{isShow && <ItemList data={itemCards} />}</div>
        </div>
      )}
    </div>
  );
};
export default RestaurantCategory;
