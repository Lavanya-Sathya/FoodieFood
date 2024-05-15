import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const BodyMiddle = (props) => {
  const { data, title } = props;
  const scrollLeftTopRes = () => {
    let slider = document.getElementById("sliderTopRes");
    slider.scrollLeft = slider.scrollLeft - 500;
    console.log("scrollLeft", slider);
  };
  const scrollRightTopRes = () => {
    let slider = document.getElementById("sliderTopRes");
    slider.scrollLeft = slider.scrollLeft + 500;
    console.log("scrollRight", slider);
  };

  return (
    <div className="my-4 border-b-4">
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl mb-6  ">{title}</h1>
        <div className="font-bold text-3xl flex gap-4">
          <MdChevronLeft
            size={40}
            onClick={scrollLeftTopRes}
            className="opacity-50 cursor-pointer hover:opacity-100 bg-slate-300 rounded-full"
          />
          <MdChevronRight
            size={40}
            onClick={scrollRightTopRes}
            className="opacity-50 cursor-pointer hover:opacity-100 bg-slate-300 rounded-full"
          />
        </div>
      </div>
      <div
        id="sliderTopRes"
        className="w-full h-full scroll scroll-smooth whitespace-nowrap overflow-x-scroll no-scrollbar"
      >
        {data?.map((cards) => (
          <Link
            to={`/restaurant/${cards?.info?.id}`}
            key={cards?.info?.id}
            className="inline-block mx-4 max-w-[280px] overflow-hidden overflow-ellipsis"
          >
            <RestaurantCard resData={cards?.info} />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default BodyMiddle;
