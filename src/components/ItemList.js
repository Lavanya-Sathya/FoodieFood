// This component is to create a card for each items in the category (Restaurant page)
import { useDispatch } from "react-redux";
import { IMG_URL } from "../utils/constants";
import { addItems } from "../utils/cartSlice";
import { GiSolidLeaf } from "react-icons/gi";
import { FaDrumstickBite } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";

const ItemList = (props) => {
  const { data } = props;
  const dispatch = useDispatch();
  const handleAdd = (Item) => {
    dispatch(addItems(Item));
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
          description,
          imageId,
          isVeg,
          isBestseller,
          isGuiltfree,
        } = item?.card?.info;

        return (
          <div
            className="flex justify-between flex-col sm:flex-row mb-4 border-b-2 last:border-none pb-14 sm:pb-4  gap-2"
            key={id}
          >
            <div className=" text-gray-700 sm:w-8/12 ">
              <div className="flex gap-4 items-center">
                {isVeg ? (
                  <GiSolidLeaf size={20} className="text-green-700 " />
                ) : (
                  <FaDrumstickBite size={20} className="text-red-600" />
                )}
                {isBestseller && (
                  <div className="flex items-center text-orange-600  font-semibold text-lg ">
                    <FaStarHalfStroke />
                    <h1>Bestseller</h1>
                  </div>
                )}
              </div>
              <h1 className="font-bold text-lg">{name}</h1>
              <h1 className="font-bold text-lg">
                ₹{price / 100 || defaultPrice / 100}
              </h1>
              {ratings?.aggregatedRating?.rating && (
                <p>
                  <span className="text-green-700">
                    ★{ratings?.aggregatedRating?.rating}
                  </span>
                  <span> ({ratings?.aggregatedRating?.ratingCountV2})</span>
                </p>
              )}
              <p>{description}</p>
            </div>
            <div className="relative pb-8">
              <img
                src={IMG_URL + imageId}
                className="rounded-lg w-[100px] sm:w-[150px] sm:h-[150px]"
              />
              <button
                className="bg-white px-4 py-2 rounded-lg text-green-500 shadow-lg  absolute sm:left-1/4 hover:bg-slate-100"
                onClick={() => handleAdd(item)}
              >
                ADD
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ItemList;
