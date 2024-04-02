import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
const Body = () => {
  const [RestaurantList, setRestaurantList] = useState([]);
  const [filteredRestaurantList, setFilteredRestaurantList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.96340&lng=77.58550&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const jsonData = await res.json();
    const resData =
      jsonData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    setFilteredRestaurantList(resData);
    setRestaurantList(resData);
  };

  return RestaurantList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body-container">
      <div className="filter">
        <button
          className="btn filterTopRated"
          onClick={() => {
            topRatedRes = RestaurantList.filter((cards) => {
              return cards?.info?.avgRatingString >= 4.5;
            });
            setFilteredRestaurantList(topRatedRes);
          }}
        >
          Top Rated Restaurant
        </button>
        <div className="search">
          <input
            type="text"
            className="searchInput"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="btn searchBtn"
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
            className="btn resetBtn"
            onClick={() => {
              setFilteredRestaurantList(RestaurantList);
              setSearch("");
              console.log("search: ", search);
            }}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="res-container">
        {filteredRestaurantList.map((cards) => {
          return <RestaurantCard resData={cards} key={cards.info.id} />;
        })}
      </div>
    </div>
  );
};
export default Body;
