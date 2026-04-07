import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import CartItem from "../components/Cart/CartItem";
import { Link } from "react-router";
import Footer from "../components/Footer";
import FoodTicker from "../components/FoodTicker";
import Button from "../components/Button";

const Cart = () => {
  const { cart } = useContext(AppContext);

  if (cart.length === 0) {
    return (
      <>
        <div
          className="text-center px-8 py-32
       min-h-screen"
        >
          <h1 className=" text-4xl font-bold text-dark-leon-400 pb-8">
            You don’t have any items in your cart
          </h1>

          <Link to={"/menu"}>
            <Button buttonName={"Shop Now"} />
          </Link>
        </div>
        <FoodTicker background="light" />
        <Footer />
      </>
    );
  }
  return (
    <>
      <title>Restaurant Name - Cart</title>

      {cart.length > 0 && (
        <div className="px-4 py-16 max-w-6xl mx-auto min-h-screen">
          <div className="w-full bg-white overflow-hidden ">
            {/* HEADER */}
            <div className="hidden sm:grid sm:grid-cols-[1fr_2fr_.5fr_2fr_.5fr_80px] bg-gray-200 font-semibold text-center py-4 px-4 uppercase">
              <div>Image</div>
              <div>Item Name</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Total</div>
              <div>Remove</div>
            </div>

            {/* ITEMS */}
            {cart.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>

          <div className=" px-4 py-4 flex flex-col items-end">
            <div className="pb-4">
              <h1 className="text-gray-500">Order Summary</h1>
              <p className="text-lg font-semibold text-dark-leon-400">
                Total: ₱
                {cart.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0,
                )}
              </p>
            </div>

            <div className="flex gap-1">
              <Link to={"/menu"}>
                <Button buttonName={"Continue Shopping"} version="outline" />
              </Link>
              <Link to={"/checkout"}>
                <Button buttonName={"Checkout"} version="solid" />
              </Link>
            </div>
          </div>
        </div>
      )}

      <FoodTicker background="light" />
      <Footer />
    </>
  );
};

export default Cart;
