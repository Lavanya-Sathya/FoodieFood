import { useDispatch, useSelector } from "react-redux";
import { IMG_URL } from "../utils/constants";
import { addItems, removeItem } from "../utils/cartSlice";
import { GiSolidLeaf } from "react-icons/gi";
import { FaDrumstickBite } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useEffect, useState } from "react";
import Modal from "./Modal";

const ItemList = (props) => {
  const { data, handleAdd } = props;
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);
  // const handleAdd = (item) => {
  //   dispatch(addItems(item));
  // };
  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  return (
    <div>
      {data?.map((item) => {
        const [count, setCount] = useState(0);
        const [open, setOpen] = useState(false);

        const {
          id,
          name,
          price,
          ratings,
          defaultPrice,
          description,
          imageId,
          isVeg,
          isBestseller,
          variantsV2,
        } = item?.card?.info;
        const addOns = variantsV2?.variantGroups;
        // console.log("addOns: ", addOns);
        const [selectedValue, setSelectedValue] = useState(0);
        useEffect(() => {
          if (addOns?.length > 0) {
            setSelectedValue(addOns[0]?.variations[0]?.id);
          }
        }, [addOns]);
        const handleRadioChange = (value) => {
          setSelectedValue(value);
          console.log("selectedValue : ", selectedValue);
        };
        // Find the item in the cartItems array and update the counter
        useEffect(() => {
          const cartItem = cartItems.find(
            (cartItem) => cartItem?.card?.info?.id === id
          );
          const counter = cartItem ? cartItem?.counter : 0;
          setCount(counter);
        }, [cartItems]);

        return (
          <div key={id} className={`relative  `}>
            <div className="flex justify-between flex-col sm:flex-row mb-4 border-b-2 last:border-none pb-14 sm:pb-4 gap-2">
              <div className="text-gray-700 sm:w-8/12">
                <div className="flex gap-4 items-center">
                  {isVeg ? (
                    <GiSolidLeaf size={20} className="text-green-700" />
                  ) : (
                    <FaDrumstickBite size={20} className="text-red-600" />
                  )}
                  {isBestseller && (
                    <div className="flex items-center text-orange-600 font-semibold text-lg">
                      <FaStarHalfStroke />
                      <h1>Bestseller</h1>
                    </div>
                  )}
                </div>
                <h1 className="font-bold text-lg">{name}</h1>
                <h1 className="font-bold text-lg">
                  ₹{price / 100 || defaultPrice / 100}
                </h1>
                {ratings?.aggregatedRating?.rating && (
                  <p>
                    <span className="text-green-700">
                      ★{ratings?.aggregatedRating?.rating}
                    </span>
                    <span> ({ratings?.aggregatedRating?.ratingCountV2})</span>
                  </p>
                )}
                <p>{description}</p>
              </div>
              <div className="relative pb-8">
                <img
                  src={IMG_URL + imageId}
                  className="rounded-lg w-[150px] h-[150px]"
                />
                {count > 0 ? (
                  <div className="w-[150px] bg-white px-6 py-2 rounded-lg text-green-500 shadow-lg absolute  ">
                    <button className="flex gap-4 justify-center items-center text-lg">
                      <BiMinus
                        size={25}
                        className="opacity-70 hover:opacity-100"
                        onClick={() => handleRemove(item)}
                      />
                      {count}
                      <BiPlus
                        size={25}
                        className="opacity-70 hover:opacity-100"
                        onClick={() => {
                          setOpen(true);
                          handleAdd(item);
                        }}
                      />
                    </button>
                  </div>
                ) : (
                  <button
                    className="bg-white px-4 py-2 rounded-lg text-green-500 shadow-lg absolute sm:left-1/4 hover:bg-slate-100"
                    onClick={() => {
                      setOpen(true);
                      handleAdd(item);
                    }}
                  >
                    ADD
                  </button>
                )}
                <p className="mt-12 text-center  text-gray-500">
                  {addOns?.length > 0 && "Customisable"}
                </p>
              </div>
            </div>
            <div>
              {addOns?.length > 0 && (
                <Modal open={open} onClose={() => setOpen(false)}>
                  <div className="mx-auto w-96 h-72 ">
                    <div className=" py-2 mb-4 border-b-2">
                      <h5 className="text-base">{name}</h5>
                      <h1 className="font-bold text-lg">
                        Customise as per your taste
                      </h1>
                    </div>
                    <div>
                      <h5 className="text-gray-400 mb-2">{addOns[0]?.name}</h5>
                      <div className="bg-gray-100 py-2 px-3 rounded-lg h-[150px]  overflow-y-scroll  no-scrollbar">
                        {addOns[0]?.variations?.map((item) => {
                          const { id, name, isVeg, price } = item;
                          // console.log("item", item);
                          return (
                            <div
                              key={id}
                              className="flex justify-between py-1 "
                            >
                              <div className="flex gap-2 items-center">
                                {isVeg ? (
                                  <h1 className="bg-green-700 h-[10px] w-[10px] border-2 border-green-700 rounded-full"></h1>
                                ) : (
                                  <h1 className="bg-red-700 h-[10px] w-[10px] border-2 border-red-700 rounded-full"></h1>
                                )}
                                <h1 className="w-[300px]">{name}</h1>
                              </div>

                              <input
                                type="radio"
                                id={id}
                                value={id}
                                checked={selectedValue === id}
                                onChange={() => handleRadioChange(id)}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div></div>
                  </div>
                </Modal>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
