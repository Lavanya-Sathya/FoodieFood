import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";

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
          className="bg-blue-950 text-white px-4 py-2 rounded-lg my-4"
          onClick={handleClear}
        >
          Clear Cart
        </button>
      </div>
      {cartItems.length > 0 ? (
        <ItemList data={cartItems} action={"Remove"} />
      ) : (
        <h1 className="text-center font-bold text-green-700 text-2xl">
          Your Cart is Empty
        </h1>
      )}
    </div>
  );
};
export default Cart;
