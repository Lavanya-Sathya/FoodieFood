import { useSelector } from "react-redux";

const CartSummary = () => {
  const cartItems = useSelector((store) => store?.cart?.items);

  const totalAmt = cartItems.reduce((acc, curr) => {
    acc += (curr?.card?.info?.price / 100) * curr?.counter;
    return acc;
  }, 0);
  const cartLength = cartItems.length;
  const deliveryCharge = cartLength > 3 ? cartLength * 5 : cartLength * 20;
  return (
    cartLength > 0 && (
      <div className="">
        <div className="bg-orange-600 text-center py-4 text-lg font-bold text-white">
          CART AMOUNT
        </div>
        <div className="font-semibold text-lg py-4">
          <div className="flex py-2 justify-between px-2">
            <h1>Sub total</h1>
            <h1>₹{totalAmt}</h1>
          </div>
          <div className="flex py-2 justify-between px-2">
            <h1>Delivery Charges</h1>
            <h1>₹{deliveryCharge}</h1>
          </div>
          <div className="flex py-2 justify-between px-2 border-y-2 ">
            <h1>Grand Total</h1>
            <h1>₹{totalAmt + deliveryCharge}</h1>
          </div>
        </div>
      </div>
    )
  );
};
export default CartSummary;
