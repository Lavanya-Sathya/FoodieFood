// This components consist of reusable restaurant cards

import { useState } from "react";
import { IMG_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const {
    name,
    avgRating,
    avgRatingString,
    sla,
    cloudinaryImageId,
    cuisines,
    locality,
  } = props?.resData;
  return (
    <div
      className={`${
        isHovered ? "hover:scale-90" : ""
      } cursor-pointer mb-4 w-[280px]`}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        {avgRating > 4.5 && (
          <label className="absolute bg-black text-white px-2 py-1 rounded-tl-lg rounded-br-lg">
            Promoted
          </label>
        )}

        <img
          src={IMG_URL + cloudinaryImageId}
          alt="img"
          className="w-[270px] h-[200px] mb-2 rounded-tl-lg rounded-tr-lg shadow-xl ring-1 ring-slate-900/5"
        />
      </div>

      <div className="pl-1 pb-2">
        <h3 className="font-bold text-lg">{name}</h3>
        <div className="flex gap-2 font-bold text-md">
          <h3>★ {avgRatingString}</h3>
          <h3>• {sla?.slaString}</h3>
        </div>
        <p>{cuisines.join(", ")}</p>
        <p>{locality}</p>
      </div>
    </div>
  );
};
export default RestaurantCard;
