import { IMG_URL } from "../utils/constants";

const ItemList = (props) => {
  const { name, price, ratings, defaultPrice, description, imageId } =
    props?.data?.card?.info;
  return (
    <div className="flex justify-between flex-col sm:flex-row mb-4 border-b-2 last:border-none pb-14 sm:pb-4  gap-2">
      <div className=" text-gray-700 sm:w-8/12 ">
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
        <button className="bg-white px-4 py-2 rounded-lg text-green-500 shadow-lg  absolute sm:left-1/4 hover:bg-slate-100">
          ADD
        </button>
      </div>
    </div>
  );
};
export default ItemList;
