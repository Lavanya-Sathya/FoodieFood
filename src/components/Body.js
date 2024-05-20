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
  const [FilterRestaurantList, setFilterRestaurantList] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const [resTitle, setResTitle] = useState("");
  const [title, setTitle] = useState("");
  const [resList, setResList] = useState([]);
  const [search, setSearch] = useState("");
  const [isRating, setIsRating] = useState(false);
  const [isLessThan, setIsLessThan] = useState(false);
  const [isBetween, setIsBetween] = useState(false);

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
        resData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;

      const resFoodCard =
        resData?.data?.cards[0]?.card?.card ||
        resData?.data?.cards[0]?.card?.card;

      // fetch all card Id's into relistId
      const resListIds = data2.map((card) => card?.info.id);
      // filter RestaurantList to obtain the  cards that are not repeated from reList and RestaurantList
      const filterRepeatedCard = data.filter(
        (card) => !resListIds.includes(card?.info?.id)
      );
      const mergeResList = [...filterRepeatedCard, ...data2];
      setRestaurantList(mergeResList);
      setFilterRestaurantList(mergeResList);
      setResList(data2);
      setResTitle(resTitle);
      setFoodList(resFoodCard);
      setTitle(title);
    }
  }, [resData]);

  // function to filter the data, multiple filter at once
  const filterData = (isRating, isLessThan, isBetween) => {
    setSearch("");
    const filter = RestaurantList.filter((item) => {
      if (isRating && isLessThan) {
        const rating = item?.info?.avgRating > 4;
        const lessthanData = item?.info?.costForTwo
          ?.split(" ")[0]
          ?.split("₹")[1];
        return rating && lessthanData < 300;
      }
      if (isRating && isBetween) {
        const rating = item?.info?.avgRating > 4;
        const inBetween = item?.info?.costForTwo?.split(" ")[0]?.split("₹")[1];
        return rating && inBetween >= 300 && inBetween <= 600;
      }
      if (isRating) {
        return item?.info?.avgRating > 4;
      }
      if (isLessThan) {
        const lessthanData = item?.info?.costForTwo
          ?.split(" ")[0]
          ?.split("₹")[1];
        return lessthanData < 300;
      }
      if (isBetween) {
        const inBetween = item?.info?.costForTwo?.split(" ")[0]?.split("₹")[1];
        return inBetween >= 300 && inBetween <= 600;
      }
    });
    console.log("filter: ", filter);
    return filter;
  };
  useEffect(() => {
    if (isRating || isLessThan || isBetween) {
      setFilterRestaurantList(filterData(isRating, isLessThan, isBetween));
    } else {
      setFilterRestaurantList(RestaurantList);
    }
  }, [isRating, isLessThan, isBetween]);
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
        <BodyMiddle data={resList} title={resTitle} />
      </div>
      <div>
        <h1 className="font-bold text-2xl mb-4 ">{title}</h1>
        {/* Filter section */}
        <div className="flex gap-4 mb-9 mt-6 ml-6 flex-col md:flex-row ">
          <div className="flex gap-2 flex-col sm:flex-row">
            <input
              type="text"
              className=" border-[1px] border-gray-500 rounded-full px-4 py-2 focus:outline-none"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="border-[1px] rounded-full px-4 py-2 cursor-pointer hover:bg-gray-300"
              onClick={() => {
                let list = [];
                if (isRating || isBetween || isLessThan) {
                  list = [...FilterRestaurantList];
                } else {
                  list = [...RestaurantList];
                }
                const filterSearch = list.filter((item) => {
                  const nameMatch = item?.info?.name
                    ?.toLowerCase()
                    ?.includes(search.toLowerCase());
                  const cusiniesMatch = item?.info?.cuisines
                    .join(",")
                    ?.toLowerCase()
                    .includes(search.toLowerCase());

                  return nameMatch || cusiniesMatch;
                });
                if (filterSearch.length !== 0 || search !== "") {
                  setFilterRestaurantList(filterSearch);
                } else if (isRating || isBetween || isLessThan) {
                  setFilterRestaurantList(FilterRestaurantList);
                } else {
                  setFilterRestaurantList(RestaurantList);
                }
              }}
            >
              Search
            </button>
            <button
              className="border-[1px] rounded-full px-4 py-2 cursor-pointer hover:bg-gray-300"
              onClick={() => {
                setFilterRestaurantList(RestaurantList);
                setSearch("");
                setIsBetween(false);
                setIsLessThan(false);
                setIsRating(false);
              }}
            >
              Reset
            </button>
          </div>
          <div
            className={`border-[1px] rounded-full px-4 py-2 cursor-pointer ${
              isRating ? "hover:bg-gray-400 bg-slate-400" : "bg-slate-50"
            }`}
            onClick={() => {
              setIsRating(!isRating);
            }}
          >
            Ratings 4.0+
          </div>
          <div
            className={`border-[1px] rounded-full px-4 py-2 cursor-pointer ${
              isBetween ? "hover:bg-gray-400 bg-slate-400" : "bg-slate-50"
            }`}
            onClick={() => {
              setIsBetween(!isBetween);
              setIsLessThan(false);
            }}
          >
            Rs.300-Rs.600
          </div>
          <div
            className={`border-[1px] rounded-full px-4 py-2 cursor-pointer ${
              isLessThan ? "hover:bg-gray-400 bg-slate-400" : "bg-slate-50"
            }`}
            onClick={() => {
              setIsLessThan(!isLessThan);
              setIsBetween(false);
            }}
          >
            Less than Rs.300
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-2">
          {/* Display all the cards from the restaurant List */}
          {FilterRestaurantList?.map((cards) => (
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
