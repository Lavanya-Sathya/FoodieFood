const ShimmerCard = () => {
  const cards = [];
  for (let i = 0; i < 10; i++) {
    cards.push(
      <div className="cursor-pointer mb-4 w-[280px]">
        <div className="mb-4">
          <div className="w-[280px] h-[280px] mb-2 rounded-tl-lg rounded-tr-lg shadow-xl ring-1 ring-slate-900/5"></div>
        </div>
        <div className="pl-1 pb-2 ">
          <h3 className="border-gray-400 border-4 w-10/12 rounded-lg"></h3>
          <div className="border-[24px] mt-4 rounded-lg"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="mb-4">
      <div className="text-center">
        <button className="bg-orange-500 mb-4 px-4 py-2 rounded-lg hover:bg-orange-400">
          Top Rated Restaurant
        </button>
        <div className="mb-4 flex justify-center gap-2">
          <input
            type="text"
            className="border-2 rounded-lg focus:outline-none px-2"
          />
          <button className="bg-blue-950 text-white px-4 rounded-lg py-2 hover:bg-blue-900">
            Search
          </button>
          <button className="bg-blue-950 text-white px-4 rounded-lg py-2 hover:bg-blue-900">
            Reset
          </button>
        </div>
      </div>
      <div className="w-10/12 xl:w-8/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-2">
        {cards}
      </div>
    </div>
  );
};
export default ShimmerCard;
