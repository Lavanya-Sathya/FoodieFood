import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import HTMLParse from "html-react-parser";
const RestaurantMenu = () => {
  const { resId } = useParams();
  const resMenu = useRestaurantMenu(resId);
  const restaurantInfo = resMenu?.data?.cards[2]?.card?.card?.info || {};
  const {
    id = "",
    name = "",
    locality = "",
    cuisines = [],
    avgRatingString = "",
    totalRatingsString = "",
    costForTwoMessage = "",
    feeDetails = {},
  } = restaurantInfo;
  console.log("resMenu from res", resMenu);
  return (
    <div className="w-10/12 md:w-8/12 mx-auto">
      <h1 className="font-bold text-xl mb-2"> {name}</h1>
      <div className="shadow-xl ring-1 ring-slate-900/5 bg-white  px-2 py-4 rounded-lg ">
        <p className="font-bold pb-1">
          <span className="text-green-600">★</span> {avgRatingString} (
          {totalRatingsString}) • {costForTwoMessage}
        </p>
        <p className="text-orange-400 pb-2 ">
          <span className=" border-b-2 border-orange-400">
            {cuisines.join(", ")}
          </span>
        </p>
        <p className="border-b-2 pb-2">
          <span className="font-bold ">Outlet </span>
          {locality}
        </p>
        <p className="pt-2">
          {HTMLParse(feeDetails?.message || "Delivery fee will apply")}
        </p>
      </div>
    </div>
  );
};
export default RestaurantMenu;
