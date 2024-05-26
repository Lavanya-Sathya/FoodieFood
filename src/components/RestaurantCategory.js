// Restaurant categories heading are displayed here
import { useState } from "react";
import ItemList from "./ItemList";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { addItems } from "../utils/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const RestaurantCategory = (props) => {
  const [isShow, setIsShow] = useState(false);
  const { restaurantId } = props;
  const { title, itemCards } = props?.items;
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);
  const handleAdd = (item) => {
    let isSameRestaurant = 0;
    // At one time we can book from only one restaurant, so if
    // there is an item we check whether the next item is from same restaurant or not
    if (cartItems.length > 0) {
      isSameRestaurant = cartItems.findIndex(
        (item) => item.restaurantId === restaurantId
      );
    }
    // If same restaurant we store the item
    if (isSameRestaurant !== -1) {
      dispatch(addItems({ item, restaurantId }));
    } else {
    }
  };
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
          <div>
            {isShow && (
              <ItemList
                data={itemCards}
                handleAdd={(item) => handleAdd(item)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default RestaurantCategory;
