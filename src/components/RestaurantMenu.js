import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { useEffect, useState } from "react";
import HTMLParse from "html-react-parser";
import RestaurantCategory from "./RestaurantCategory";
import { MENU_API } from "../utils/constants";
const RestaurantMenu = () => {
  const { resId } = useParams();
  // const resMenu = useRestaurantMenu(resId);
  const [resMenu, setMenu] = useState();
  useEffect(() => {
    fetchMenu();
  }, []);
  const fetchMenu = async () => {
    try {
      const fetchData = await fetch(MENU_API + resId);
      const jsonData = await fetchData.json();
      setMenu(jsonData);
      // console.log(" data: ", jsonData);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
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
    feeDetails,
  } = restaurantInfo;
  console.log("restaurantInfo:", restaurantInfo);
  console.log("resMenu from res", resMenu);
  console.log("resCategories from res", resCategories);

  return !restaurantInfo ? (
    <div>Loading....</div>
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
          {HTMLParse(feeDetails?.message || "Delivery fee will apply")}
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
