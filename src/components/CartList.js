// This omponent provides all the items added to the card from the redux
import { useDispatch } from "react-redux";
import { IMG_URL } from "../utils/constants";
import { addItems, removeItem } from "../utils/cartSlice";
import { BiMinus, BiPlus } from "react-icons/bi";
import { GiSolidLeaf } from "react-icons/gi";
import { FaDrumstickBite } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";
const CartList = (props) => {
  const { data } = props;
  const dispatch = useDispatch();
  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };
  const handleAdd = (item) => {
    dispatch(addItems(item));
  };
  return (
    <div>
      {data?.map((item) => {
        const {
          id,
          name,
          price,
          ratings,
          defaultPrice,
          isVeg,
          isBestseller,
          imageId,
        } = item?.card?.info;
        const counter = item?.counter;
        return (
          <div
            className="flex justify-between flex-col sm:flex-row mb-4 border-b-2 last:border-none pb-14 sm:pb-4  gap-2"
            key={id}
          >
            <div className=" text-gray-700  ">
              <div className="flex gap-4 items-center">
                {isVeg ? (
                  <GiSolidLeaf size={10} className="text-green-700 " />
                ) : (
                  <FaDrumstickBite size={10} className="text-red-600" />
                )}
                {isBestseller && (
                  <div className="flex items-center text-orange-600  font-semibold text-lg ">
                    <FaStarHalfStroke />
                    <h1>Bestseller</h1>
                  </div>
                )}
              </div>
              <h1 className="font-bold text-lg">{name}</h1>
              <h1 className=" text-lg">₹{price / 100 || defaultPrice / 100}</h1>
              {ratings?.aggregatedRating?.rating && (
                <p>
                  <span className="text-green-700">
                    ★{ratings?.aggregatedRating?.rating}
                  </span>
                  <span> ({ratings?.aggregatedRating?.ratingCountV2})</span>
                </p>
              )}
              <button className="bg-white px-4 py-2 mt-3 rounded-lg text-green-500 shadow-lg  sm:left-1/4  flex gap-4 justify-center items-center text-lg">
                <BiMinus
                  size={25}
                  className="opacity-70 hover:opacity-100"
                  onClick={() => handleRemove(item)}
                />
                {counter}
                <BiPlus
                  size={25}
                  className="opacity-70 hover:opacity-100"
                  onClick={() => handleAdd(item)}
                />
              </button>
            </div>
            <div className="flex flex-col gap-1 pb-8">
              <img
                src={IMG_URL + imageId}
                className="rounded-lg w-[100px] sm:w-[100px] sm:h-[100px]"
              />
              <h1 className="font-bold text-lg text-center">
                ₹{(price / 100 || defaultPrice / 100) * counter}
              </h1>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default CartList;
