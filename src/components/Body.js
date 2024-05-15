// Body of home page
import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShimmerCard from "./ShimmerCard";
import useRestaurant from "../utils/useRestaurant";
import FoodItemList from "./FoodItemList";

const Body = () => {
  const resData = useRestaurant();
  const [RestaurantList, setRestaurantList] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const [resTitle, setResTitle] = useState("");

  useEffect(() => {
    if (resData) {
      const data =
        resData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants ||
        resData?.data?.cards[2]?.card?.card?.imageGridCards?.infoWithStyle
          ?.restaurants;
      const resTitle =
        resData?.data?.cards[1]?.card?.card?.header?.title ||
        resData?.data?.cards[2]?.card?.card?.header?.title;
      const data2 =
        resData?.data?.cards[0]?.card?.card ||
        resData?.data?.cards[0]?.card?.card;
      setRestaurantList(data);
      setResTitle(resTitle);
      setFoodList(data2);
    }
  }, [resData]);
  console.log("FOODLIST: ", foodList);
  console.log("RestaurantList: ", RestaurantList);
  console.log("resTitle: ", resTitle);

  return RestaurantList?.length === 0 ? (
    <ShimmerCard />
  ) : (
    <div className="mb-4 w-10/12 xl:w-9/12 mx-auto ">
      <div>
        <FoodItemList data={foodList} />
      </div>
      <div>
        <h1 className="font-bold text-2xl mb-4 text-center md:text-left ">
          {resTitle}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-2">
          {RestaurantList?.map((cards) => (
            <Link to={`/restaurant/${cards?.info?.id}`} key={cards?.info?.id}>
              <RestaurantCard resData={cards?.info} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Body;
