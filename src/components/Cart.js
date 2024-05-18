// This component provides the structure for the cart
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import cartImg from "../../images/cart.png";
import CartList from "./CartList";
const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const handleClear = () => {
    dispatch(clearCart());
  };
  return (
    <div className="w-10/12 md:w-8/12 mx-auto">
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
        <CartList data={cartItems} />
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
    </div>
  );
};
export default Cart;
