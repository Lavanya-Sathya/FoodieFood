import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import { RES_API } from "../utils/constants";
import { Link } from "react-router-dom";
import ShimmerCard from "./ShimmerCard";
const Body = () => {
  const [RestaurantList, setRestaurantList] = useState([]);
  const [filteredRestaurantList, setFilteredRestaurantList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(RES_API);
      const jsonData = await res.json();
      console.log(jsonData);
      const resData =
        jsonData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants ||
        jsonData?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;
      setFilteredRestaurantList(resData);
      setRestaurantList(resData);
      console.log(filteredRestaurantList);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return RestaurantList?.length === 0 ? (
    <ShimmerCard />
  ) : (
    <div className="mb-4">
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
      <div className="w-10/12 xl:w-8/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-2">
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
