import { Link } from "react-router-dom";
import { IMG_URL } from "../utils/constants";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
const FoodItemList = (props) => {
  const { data } = props;
  const foodList =
    data?.imageGridCards?.info || data?.gridElements?.infoWithStyle?.info;
  const slideLeft = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 250;
  };
  const slideRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 250;
  };

  return (
    <div className="my-8 py-10 border-b-4">
      <h1 className="font-bold text-2xl mb-4">{data?.header?.title}</h1>
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
          {foodList?.map((item) => {
            const { id, imageId, action, entityId } = item;
            const collectionData = entityId?.split("?")[1]?.split("&") || "";
            const collectionId = collectionData[0]?.split("=")[1] || "";
            const collectionTag = collectionData[1]?.split("=")[1] || "";

            return (
              <Link
                key={id}
                to={`/restaurant/collection/${collectionId}/${collectionTag}`}
              >
                <img
                  src={IMG_URL + imageId}
                  alt="foodItems"
                  className=" w-[150px] h-[150px] md:w-[200px] md:h-[200px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
                />
              </Link>
            );
          })}
        </div>
        <MdChevronRight
          size={40}
          className="opacity-50 cursor-pointer hover:opacity-100"
          onClick={slideRight}
        />
      </div>
    </div>
  );
};
export default FoodItemList;
