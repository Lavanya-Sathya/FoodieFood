import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  return (
    <div className="resCard">
      <img src={CDN_URL + resData.info.cloudinaryImageId} alt="" />
      <div className="cardBody">
        <h3>{resData.info.name}</h3>
        <div className="rateTime">
          <h4 className="rating">
            <span> ☆ </span>
            {resData.info.avgRatingString}
          </h4>
          <h4 className="avgTime">
            <span> ‧ </span>
            {resData.info.sla.slaString}
          </h4>
        </div>
        <p>{resData.info.cuisines.join(", ")}</p>
        <p>{resData.info.locality}</p>
      </div>
    </div>
  );
};
export default RestaurantCard;
