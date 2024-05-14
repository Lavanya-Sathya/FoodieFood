import { IMG_URL } from "../utils/constants";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
const FoodItemList = (props) => {
  const { data, title } = props;
  // const data2 =
  //   resData?.data?.cards[0]?.card?.card?.imageGridCards?.info ||
  //   resData?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info;
  const foodList =
    data?.imageGridCards?.info || data?.gridElements?.infoWithStyle?.info;
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  return (
    <div className="my-8">
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
    </div>
  );
};
export default FoodItemList;
