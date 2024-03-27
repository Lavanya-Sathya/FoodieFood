import RestaurantCard from "./RestaurantCard";
import cardData from "../utils/mockData";
import { useState } from "react";
const Body = () => {
  const [topRated, setTopRated] = useState(false);
  const [search, setSearch] = useState("");

  let topRatedRes = cardData.filter((cards) => {
    return cards.info.avgRatingString >= 4.5;
  });

  const handleTopRated = () => {
    setTopRated(true);
    console.log(topRatedRes);
  };
  const handleAllRes = () => {
    setTopRated(false);
    console.log(topRatedRes);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    const searchData = e.target.value.toLowerCase();
    const filterData = cardData.filter((cards) => {
      return cards.info.name.toLowerCase().includes(searchData);
    });
    
  };
  return (
    <div className="body-container">
      <div className="filter">
        <button className="filterTopRated" onClick={handleTopRated}>
          Top Rated Restaurant
        </button>
        <button className="filterTopRated" onClick={handleAllRes}>
          Show All Restaurant
        </button>
      </div>
      <div className="search">
        <input
          type="text"
          className="searchInput"
          onKeyUp={(e) => handleSearch(e)}
        />
      </div>
      <div className="res-container">
        {topRated
          ? topRatedRes.map((cards) => {
              return <RestaurantCard resData={cards} key={cards.info.id} />;
            })
          : cardData.map((cards) => {
              return <RestaurantCard resData={cards} key={cards.info.id} />;
            })}
      </div>
    </div>
  );
};
export default Body;
