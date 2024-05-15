import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useResCollection from "../utils/useResCollection";
import RestaurantCard from "./RestaurantCard";
import ShimmerCard from "./ShimmerCard";

const ResCollection = () => {
  const { collectionId, tag } = useParams();
  const [collection, setCollection] = useState([]);
  const data = useResCollection({ collectionId, tag });
  useEffect(() => {
    const card = data?.data?.cards;
    setCollection(card);
  }, [data]);
  console.log("data collection: ", collection);
  console.log("data : ", data);

  return collection ? (
    <div className="mb-8 w-10/12 xl:w-9/12 mx-auto ">
      <div className="">
        <h1 className="font-bold text-4xl mb-2">
          {collection[0]?.card?.card?.title}
        </h1>
        <h4 className="text-xl my-4">
          {collection[0]?.card?.card?.description}
        </h4>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-2">
          {collection.map((item) => {
            const { info } = item?.card?.card;
            console.log("collection: ", info);
            return (
              info && (
                <Link to={`/restaurant/${info?.id}`} key={info?.id}>
                  <RestaurantCard resData={info} />
                </Link>
              )
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <div className="mb-4">
      <div className="w-10/12 xl:w-9/12 mx-auto">
        <h1 className=" mb-2 border-[30px] w-2/12"></h1>
        <h4 className="border-[10px] w-6/12 my-4"></h4>
      </div>
      <ShimmerCard />
    </div>
  );
};
export default ResCollection;
