// This component provides the structure for the cart
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import cartImg from "../../images/cart.png";
import CartList from "./CartList";
import CartSummary from "./CartSummary";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { useEffect, useState } from "react";
const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const [resName, setResName] = useState("");
  const resId = cartItems?.length > 0 ? cartItems[0]?.restaurantId : 0;

  const resData = useRestaurantMenu(resId);

  useEffect(() => {
    if (resData !== undefined) {
      const title = resData?.data?.cards[2]?.card?.card?.info?.name;
      setResName(title);
    }
  }, [resData]);

  const dispatch = useDispatch();
  const handleClear = () => {
    dispatch(clearCart());
  };
  return (
    <div className="w-4/12 mx-auto">
      <div className="text-center mb-8">
        <h1 className="font-bold text-xl">Cart</h1>
        <button
          className="bg-blue-950 text-white px-4 py-2 rounded-lg my-4 hover:bg-blue-900"
          onClick={handleClear}
        >
          Clear Cart
        </button>
      </div>
      {cartItems.length > 0 ? (
        <CartList data={cartItems} title={resName} />
      ) : (
        <div className="flex justify-center items-center gap-6 mb-14">
          <img
            src={cartImg}
            className="pl-4 bg-white py-4 rounded-lg w-[100px] h-[100px] "
          />
          <div className="text-center font-bold text-green-700 text-xl ">
            <h1>Your Cart is Empty</h1>
            <h1>Shop Now</h1>
          </div>
        </div>
      )}

      {/* cart summary  */}
      <div className="my-10">
        <CartSummary />
      </div>
    </div>
  );
};
export default Cart;
