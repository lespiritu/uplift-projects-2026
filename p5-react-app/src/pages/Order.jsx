import { useContext } from "react";
import { Link } from "react-router";
import Button from "../components/Button";
import Footer from "../components/Footer";
import FoodTicker from "../components/FoodTicker";
import { AppContext } from "../contexts/AppContext";

const Order = () => {
  const { myOrderLocalStorage } = useContext(AppContext);

  if (myOrderLocalStorage.length === 0) {
    return (
      <>
        <div className="min-h-screen bg-brown-leon-100 px-4 py-24 text-center">
          <h1 className="text-4xl font-bold text-dark-leon-400">My Orders</h1>
          <p className="mt-4 text-gray-500">
            You do not have any saved orders yet.
          </p>
          <div className="mt-8">
            <Link to="/menu">
              <Button buttonName={"Back to Menu"} version="solid" />
            </Link>
          </div>
        </div>
        <FoodTicker background="light" />
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-brown-leon-100 ">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-center text-4xl font-bold text-dark-leon-400">
          My Orders
        </h1>
        <p className="mt-3 text-center text-gray-500">
          Your recent orders are saved here after checkout.
        </p>

        <div className="mt-10 space-y-6">
          {[...myOrderLocalStorage].reverse().map((order, index) => (
            <div
              key={order._id || order.createdAt || index}
              className="rounded-sm border border-amber-200 bg-white p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-amber-100 pb-4">
                <div>
                  <h2 className="text-xl font-semibold text-dark-leon-400">
                    {order.fullName}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Contact: {order.contactNumber}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Address: {order.address}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : "Recent order"}
                  </p>
                  <p className="mt-2 text-lg font-bold text-amber-600">
                    Total: {order.totalAmount}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {order.items?.map((item, itemIndex) => (
                  <div
                    key={item._id || item.foodId || itemIndex}
                    className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3 text-sm text-gray-600"
                  >
                    <div>
                      <h3 className="font-semibold text-dark-leon-400">
                        {item.name}
                      </h3>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <p>{item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/menu">
            <Button buttonName={"Order More"} version="solid" />
          </Link>
        </div>
      </div>

      <div className="mt-16">
        <FoodTicker background="light" />
        <Footer />
      </div>
    </div>
  );
};

export default Order;
