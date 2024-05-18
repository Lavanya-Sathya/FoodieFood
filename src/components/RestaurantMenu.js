// This component consist of the  structure for each restaurant

import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { FiChevronDown } from "react-icons/fi";
import { useEffect, useState } from "react";
const RestaurantMenu = () => {
  const { resId } = useParams();
  const resMenu = useRestaurantMenu(resId);

  const [isNonVeg, setIsNonVeg] = useState(false);
  const [isVeg, setIsVeg] = useState(false);
  const [isBestseller, setIsBestseller] = useState(false);

  const [restaurantInfo, setRestaurantInfo] = useState([]);
  const [resCategories, setResCategories] = useState([]);
  const [filteredResCategories, setFilteredResCategories] = useState([]);

  // res categories data fetched from useRestaurantMenu are updated to restaurantInfo,resCategories and filteredResCategories
  useEffect(() => {
    const restaurantInfo = resMenu?.data?.cards[2]?.card?.card?.info || {};
    const data =
      resMenu?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
    const resCategories = data?.filter((item) => item?.card?.card?.itemCards);
    setRestaurantInfo(restaurantInfo);
    setResCategories(resCategories);
    setFilteredResCategories(resCategories);
    console.log("resCategories: ", resCategories);
  }, [resMenu]);

  // function to filter by veg, non ved and bestseller cards
  const filterCategory = (isVeg, isNonVeg, isBestseller) => {
    return resCategories?.map((item) => {
      const data = item?.card?.card?.itemCards?.filter((cardData) => {
        if (isVeg && isBestseller) {
          return (
            cardData?.card?.info?.isVeg && cardData?.card?.info?.isBestseller
          );
        } else if (isNonVeg && isBestseller) {
          return (
            !cardData?.card?.info?.isVeg && cardData?.card?.info?.isBestseller
          );
        } else if (isVeg) {
          return cardData?.card?.info?.isVeg;
        } else if (isNonVeg) {
          return !cardData?.card?.info?.isVeg;
        } else if (isBestseller) {
          return cardData?.card?.info?.isBestseller;
        }
      });

      return {
        ...item,
        card: {
          ...item?.card,
          card: {
            ...item?.card?.card,
            itemCards: data,
          },
        },
      };
    });
  };

  // useEffect will be called when there is any changes made to isVeg, isNonVeg, isBestseller and resCategories
  useEffect(() => {
    if (isVeg || isNonVeg || isBestseller) {
      setFilteredResCategories(filterCategory(isVeg, isNonVeg, isBestseller));
    } else {
      setFilteredResCategories(resCategories);
    }
    console.log("filteredResCategories: ", filteredResCategories);
  }, [isVeg, isNonVeg, isBestseller, resCategories]);

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
    // Shimmer will be displayed while data is being fetched/ loaded
    <div className="w-10/12 md:w-8/12 mx-auto">
      <h1 className="border-[10px] w-5/12 mb-2"> </h1>
      <div className="shadow-xl ring-1 ring-slate-900/5 bg-white h-[150px] px-2 py-4 rounded-lg mb-12 "></div>
      <div className="border-b-8 cursor-pointer font-bold text-xl py-4 flex justify-between">
        <h1 className="border-[10px] w-5/12 mb-2"></h1>
        <FiChevronDown size={30} className="opacity-70 hover:opacity-100" />
      </div>
      <div className="border-b-8 cursor-pointer font-bold text-xl py-4 flex justify-between">
        <h1 className="border-[10px] w-5/12 mb-2"></h1>
        <FiChevronDown size={30} className="opacity-70 hover:opacity-100" />
      </div>
    </div>
  ) : (
    <div className="w-10/12 md:w-8/12 mx-auto">
      <h1 className="font-bold text-xl mb-2"> {name}</h1>
      {/* card containing the restaurant details */}
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
      {/* filter options are displayed here */}
      <div className="mt-20 flex gap-8 pb-8 border-b-2">
        <label className="flex cursor-pointer select-none items-center border-[1px] px-4 py-2 border-gray-500 rounded-full">
          <div className="relative">
            <input
              type="checkbox"
              checked={isVeg}
              onChange={() => {
                setIsVeg(!isVeg);
                setIsNonVeg(false);
              }}
              className="sr-only"
            />
            <div
              className={`block h-3 w-10 rounded-full ${
                isVeg ? "bg-green-800" : "bg-gray-300"
              } transition`}
            ></div>
            <div
              className={`dot absolute -left-1 -top-1 h-5 w-5 rounded-full  transition ${
                isVeg ? "transform translate-x-6 bg-green-600" : "bg-green-800"
              }`}
            ></div>
          </div>
        </label>
        <label
          className="flex cursor-pointer select-none items-center border-[1px] px-4
         py-2 border-gray-500 rounded-full"
        >
          <div className="relative">
            <input
              type="checkbox"
              checked={isNonVeg}
              onChange={() => {
                setIsNonVeg(!isNonVeg);
                setIsVeg(false);
              }}
              className="sr-only"
            />
            <div
              className={`block h-3 w-10 rounded-full ${
                isNonVeg ? "bg-red-800" : "bg-gray-300"
              } transition`}
            ></div>
            <div
              className={`dot absolute -left-1 -top-1 h-5 w-5 rounded-full  transition ${
                isNonVeg ? "transform translate-x-6 bg-red-600" : "bg-red-800"
              }`}
            ></div>
          </div>
        </label>
        <div
          className={`border-[1px] px-4
         py-2 border-gray-500 rounded-full text-xl cursor-pointer ${
           isBestseller ? "hover: bg-gray-400" : ""
         }`}
          onClick={() => {
            setIsBestseller(!isBestseller);
          }}
        >
          Bestseller
        </div>
      </div>
      {/* All the available categories in the restaurant are displayed here */}
      <div className="my-8">
        {filteredResCategories?.map((item, idx) => (
          <RestaurantCategory items={item?.card?.card} key={idx} />
        ))}
      </div>
    </div>
  );
};
export default RestaurantMenu;
