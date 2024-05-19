// This component is the shimmer for restaurant card
const ShimmerCard = () => {
  const cards = [];
  for (let i = 0; i < 10; i++) {
    cards.push(
      <div className="cursor-pointer mb-4 w-[270px]" key={i}>
        <div className="mb-4">
          <div className="w-[270px] h-[200px] mb-2 rounded-tl-lg rounded-tr-lg shadow-xl ring-1 ring-slate-900/5"></div>
        </div>
        <div className="pl-1 pb-2 ">
          <h3 className="border-gray-400 border-4 w-10/12 rounded-lg"></h3>
          <div className="border-[24px] mt-4 rounded-lg"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-10/12 xl:w-9/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-2">
      {cards}
    </div>
  );
};
export default ShimmerCard;
