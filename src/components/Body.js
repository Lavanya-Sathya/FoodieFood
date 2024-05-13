// Body of home page
import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShimmerCard from "./ShimmerCard";
import useRestaurant from "../utils/useRestaurant";
import { IMG_URL } from "../utils/constants";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
const Body = () => {
  const resData = useRestaurant();
  const [RestaurantList, setRestaurantList] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const [filteredRestaurantList, setFilteredRestaurantList] = useState([]);
  const [search, setSearch] = useState("");

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  useEffect(() => {
    if (resData) {
      const data =
        resData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants ||
        resData?.data?.cards[2]?.card?.card?.imageGridCards?.infoWithStyle
          ?.restaurants;
      const data2 =
        resData?.data?.cards[0]?.card?.card?.imageGridCards?.info ||
        resData?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info;
      setRestaurantList(data);
      setFilteredRestaurantList(data);
      setFoodList(data2);
      console.log("data2: ", data2);
      console.log("FOODLIST: ", foodList);
      console.log("RestaurantList: ", RestaurantList);
    }
  }, [resData]);

  return RestaurantList?.length === 0 ? (
    <ShimmerCard />
  ) : (
    <div className="mb-4 w-10/12 xl:w-9/12 mx-auto ">
      <h1 className="font-bold text-2xl ">
        {resData?.data?.cards[0]?.card?.card?.header?.title}
      </h1>
      <div className="relative flex items-center bg-white">
        <MdChevronLeft
          size={40}
          className="opacity-50 cursor-pointer hover:opacity-100"
          onClick={slideLeft}
        />
        <div
          id="slider"
          className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth no-scrollbar"
        >
          {foodList?.map((item) => (
            <img
              src={IMG_URL + item?.imageId}
              alt="foodItems"
              key={item?.id}
              className="w-[200px] h-[200px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
            />
          ))}
        </div>
        <MdChevronRight
          size={40}
          className="opacity-50 cursor-pointer hover:opacity-100"
          onClick={slideRight}
        />
      </div>
      <div className="text-center">
        <button
          className="bg-orange-500 mb-4 px-4 py-2 rounded-lg hover:bg-orange-400"
          onClick={() => {
            topRatedRes = RestaurantList.filter((cards) => {
              return cards?.info?.avgRatingString >= 4.5;
            });
            setFilteredRestaurantList(topRatedRes);
          }}
        >
          Top Rated Restaurant
        </button>
        <div className="mb-4 flex justify-center gap-2">
          <input
            type="text"
            className="border-2 rounded-lg focus:outline-none px-2"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="bg-blue-950 text-white px-4 rounded-lg py-2 hover:bg-blue-900"
            onClick={() => {
              let filteredData = RestaurantList.filter((card) => {
                return card?.info?.name
                  .toLowerCase()
                  .includes(search.toLowerCase());
              });
              if (filteredData.length === 0 || search.length === 0) {
                setFilteredRestaurantList(RestaurantList);
              } else {
                setFilteredRestaurantList(filteredData);
              }
            }}
          >
            Search
          </button>
          <button
            className="bg-blue-950 text-white px-4 rounded-lg py-2 hover:bg-blue-900"
            onClick={() => {
              setFilteredRestaurantList(RestaurantList);
              setSearch("");
            }}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-2">
        {filteredRestaurantList?.map((cards) => (
          <Link to={`/restaurant/${cards?.info?.id}`} key={cards?.info?.id}>
            <RestaurantCard resData={cards?.info} />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Body;
