import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import Loading from "../components/Loading";
import ErrorFetch from "../components/ErrorFetch";

const Admin = () => {
  const { ordersData, loadingOrders, errorOrders } = useContext(AppContext);

  if (loadingOrders) {
    return <Loading />;
  }

  if (errorOrders) {
    return <ErrorFetch errorMessage={errorOrders} />;
  }

  const displayOrders = ordersData.map((order, index) => (
    <div
      key={order._id}
      className="bg-white border-b-2 border-amber-600 p-4 text-gray-500 mb-8 relative"
    >
      <span className="text-lg font-bold text-white flex items-center justify-center bg-amber-500 h-12 w-12 absolute top-0 right-0 rounded-full">
        {index + 1}
      </span>
      <div className=" py-4 bg-dark-leon-400/5 p-4 text-xs ">
        <h1 className="py-1 font-bold text-base">Curtomers Details</h1>
        <h1 className="py-1">Name: {order.fullName}</h1>
        <p className="py-1">Contact Number: {order.contactNumber}</p>
        <p className="py-1">Address: {order.address}</p>
      </div>

      <div className="px-4">
        {order.items.map((item) => (
          <div key={item.foodId} className="border-b border-gray-500/20 py-4">
            <h1>Item: {item.name}</h1>
            <p>Price: {item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))}

        <p className="font-bold text-dark-leon-400 pt-4">
          Total Amount: {order.totalAmount}
        </p>
      </div>
    </div>
  ));
  return (
    <div className="px-4 py-8 bg-brown-leon-100 ">
      <h1 className=" py-8 text-4xl font-bold text-dark-leon-400 text-center">
        Order List
      </h1>
      <div>{displayOrders}</div>
    </div>
  );
};

export default Admin;
