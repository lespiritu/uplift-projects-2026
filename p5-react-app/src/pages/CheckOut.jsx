import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import Footer from "../components/Footer";
import FoodTicker from "../components/FoodTicker";
import { AppContext } from "../contexts/AppContext";
import Button from "../components/Button";

const CheckOut = () => {
  const { cart, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (cart.length === 0) {
    return (
      <>
        <title>Restaurant Name - Checkout</title>

        <div className="min-h-screen px-8 py-32 text-center">
          <h1 className="text-4xl font-bold text-dark-leon-400">
            Your cart is empty
          </h1>
          <p className="mt-3 text-gray-500a pb-8">
            Add some food first before going to checkout.
          </p>

          <Link to="/menu">
            <Button version="solid" buttonName={"Back to Menu"} />
          </Link>
        </div>
        <FoodTicker background="light" />
        <Footer />
      </>
    );
  }

  const submitOrder = async () => {
    setIsSubmitting(true);

    try {
      const orderPayload = {
        ...formData,
        items: cart,
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create order");
      }

      const savedOrder = {
        ...orderPayload,
        totalAmount,
        createdAt: new Date().toISOString(),
        ...(data?.order ?? data),
      };

      dispatch({ type: "ADD_NEW_ORDER", payload: savedOrder });

      dispatch({ type: "CLEAR_CART" });
      setFormData({
        fullName: "",
        contactNumber: "",
        address: "",
      });
      setSubmitMessage("Your order has been placed successfully.");
      navigate("/orders");
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");
    setSubmitMessage("");
    await submitOrder();
  };

  return (
    <div className=" bg-brown-leon-100">
      <div className="min-h-screen max-w-6xl mx-auto px-4 py-16">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-dark-leon-400">Checkout</h1>
          <p className="mt-3 text-gray-500">
            Review your order and enter your delivery details.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-sm border border-amber-100 bg-white p-6 "
          >
            <h2 className="text-2xl font-semibold text-dark-leon-400">
              Delivery Information
            </h2>

            <div className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-sm border border-gray-300 px-4 py-3 outline-none transition-colors duration-300 focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="contactNumber"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Contact Number
                </label>
                <input
                  id="contactNumber"
                  name="contactNumber"
                  type="tel"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="Enter your contact number"
                  className="w-full rounded-sm border border-gray-300 px-4 py-3 outline-none transition-colors duration-300 focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows="5"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your complete delivery address"
                  className="w-full rounded-sm border border-gray-300 px-4 py-3 outline-none transition-colors duration-300 focus:border-amber-500"
                  required
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/cart">
                <Button buttonName={"Back To Cart"} version="outline" />
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer bg-amber-500 px-5 py-3 uppercase text-white transition-colors duration-300 hover:bg-amber-600"
              >
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </button>
            </div>

            {submitMessage ? (
              <p className="mt-4 text-sm font-medium text-green-600">
                {submitMessage}
              </p>
            ) : null}

            {submitError ? (
              <p className="mt-4 text-sm font-medium text-red-600">
                {submitError}
              </p>
            ) : null}
          </form>

          <div className="h-fit rounded-sm border border-amber-200 bg-brown-leon-600 p-6 text-brown-leon-100">
            <h2 className="text-2xl font-semibold ">Order Summary</h2>

            <div className="mt-6 space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between gap-4 border-b border-white/20 pb-4"
                >
                  <div>
                    <h3 className="font-semibold ">{item.name}</h3>
                    <p className="text-sm ">
                      Qty: {item.quantity} x ₱{item.price}
                    </p>
                  </div>
                  <p className="font-semibold ">
                    ₱{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between pt-4">
              <span className="text-lg font-medium ">Total</span>
              <span className="text-2xl font-bold ">₱{totalAmount}</span>
            </div>
          </div>
        </div>
      </div>

      <FoodTicker background="light" />
      <Footer />
    </div>
  );
};

export default CheckOut;
