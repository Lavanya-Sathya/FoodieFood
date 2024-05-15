import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
const RestaurantMenu = () => {
  const { resId } = useParams();
  const resMenu = useRestaurantMenu(resId);

  const restaurantInfo = resMenu?.data?.cards[2]?.card?.card?.info || {};
  const resCategories =
    resMenu?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
  const {
    id,
    name,
    locality,
    cuisines,
    avgRatingString,
    totalRatingsString,
    costForTwoMessage,
    sla,
  } = restaurantInfo;

  return !resMenu ? (
    // Shimmer
    <div className="w-10/12 md:w-8/12 mx-auto">
      <h1 className="border-[10px] w-5/12 mb-2"> </h1>
      <div className="shadow-xl ring-1 ring-slate-900/5 bg-white h-[150px] px-2 py-4 rounded-lg mb-12 "></div>
      <div className="border-b-8 cursor-pointer font-bold text-xl py-4 flex justify-between">
        <h1 className="border-[10px] w-5/12 mb-2"></h1>
        <p className="pr-2">v</p>
      </div>
      <div className="border-b-8 cursor-pointer font-bold text-xl py-4 flex justify-between">
        <h1 className="border-[10px] w-5/12 mb-2"></h1>
        <p className="pr-2">v</p>
      </div>
    </div>
  ) : (
    <div className="w-10/12 md:w-8/12 mx-auto">
      <h1 className="font-bold text-xl mb-2"> {name}</h1>
      <div className="shadow-xl ring-1 ring-slate-900/5 bg-white  px-2 py-4 rounded-lg ">
        <p className="font-bold pb-1">
          <span className="text-green-600">★</span> {avgRatingString} (
          {totalRatingsString}) • {costForTwoMessage}
        </p>
        <h3 className="text-orange-500 underline pb-1">
          {cuisines?.join(",  ")}
        </h3>
        <p className="border-b-2 pb-2">
          <span className="font-bold ">Outlet </span>
          {locality}
        </p>
        <p className="pt-2">
          {` Far ${sla?.lastMileTravelString} |  Delivery fee will apply`}
        </p>
      </div>
      <div className="my-10">
        {resCategories?.map((item, idx) => (
          <RestaurantCategory items={item?.card?.card} key={idx} />
        ))}
      </div>
    </div>
  );
};
export default RestaurantMenu;
