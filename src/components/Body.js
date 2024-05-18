// Body of home page
import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShimmerCard from "./ShimmerCard";
import useRestaurant from "../utils/useRestaurant";
import FoodItemList from "./FoodItemList";
import BodyMiddle from "./BodyMiddle";

const Body = () => {
  const resData = useRestaurant();
  const [RestaurantList, setRestaurantList] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const [resTitle, setResTitle] = useState("");
  const [title, setTitle] = useState("");
  const [resList, setResList] = useState([]);
  useEffect(() => {
    if (resData) {
      const data =
        resData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants ||
        resData?.data?.cards[2]?.card?.card?.imageGridCards?.infoWithStyle
          ?.restaurants;
      const resTitle = resData?.data?.cards[1]?.card?.card?.header?.title;
      const title = resData?.data?.cards[2]?.card?.card?.title;
      const data2 =
        resData?.data?.cards[0]?.card?.card ||
        resData?.data?.cards[0]?.card?.card;

      const resAddCards =
        resData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;
      setResList(resAddCards);
      setRestaurantList(data);
      setResTitle(resTitle);
      setFoodList(data2);
      setTitle(title);
    }
  }, [resData]);
  // fetch all card Id's into relistId
  const resListIds = resList.map((card) => card?.info.id);
  // filter RestaurantList to obtain the repeated cards from reList and RestaurantList
  const repeatedCard = RestaurantList.filter((card) =>
    resListIds.includes(card?.info?.id)
  );

  return RestaurantList?.length === 0 ? (
    // Shimmer
    <div>
      <div className="mb-4 w-10/12 xl:w-9/12 mx-auto ">
        <h1 className=" mb-4 border-[15px] w-3/12"></h1>
        <div className=" h-[150px] md:h-[200px] bg-white"></div>
        <h1 className=" mb-2 border-[15px] w-4/12 mt-8"></h1>
      </div>
      <div className="mb-4 w-10/12 xl:w-9/12 mx-auto ">
        <h1 className=" mb-4 border-[15px] w-3/12"></h1>
        <div className=" h-[150px] md:h-[200px] bg-white"></div>
        <h1 className=" mb-2 border-[15px] w-4/12 mt-8"></h1>
      </div>
      <ShimmerCard />
    </div>
  ) : (
    <div className="mb-4 w-10/12 xl:w-9/12 mx-auto ">
      <div>
        <FoodItemList data={foodList} />
      </div>
      <div className="mt-14 mb-8">
        <BodyMiddle data={RestaurantList} title={resTitle} />
      </div>
      <div>
        <h1 className="font-bold text-2xl mb-4 ">{title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-2">
          {/* Display only cards that is not present in the Restaurant List */}
          {resList?.map((cards) => {
            return (
              !repeatedCard.includes(cards?.info?.id) && (
                <Link
                  to={`/restaurant/${cards?.info?.id}`}
                  key={cards?.info?.id}
                >
                  <RestaurantCard resData={cards?.info} />
                </Link>
              )
            );
          })}
          {/* Display all the cards from the restaurant List */}

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
