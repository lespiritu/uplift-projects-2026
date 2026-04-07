import { FiMinus, FiPlus } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AppContext } from "../../contexts/AppContext";
import { useContext } from "react";

export default function CartItem({ item }) {
  const { dispatch } = useContext(AppContext);

  const handleRemoveItem = () => {
    dispatch({ type: "REMOVE_ITEM_TO_CART", payload: item });
  };

  const handleDecreaseQuantity = () => {
    dispatch({ type: "DECREASE_CART_QUANTITY", payload: item });
  };

  const handleIncreaseQuantity = () => {
    dispatch({ type: "INCREASE_CART_QUANTITY", payload: item });
  };

  return (
    <div className="sm:grid sm:grid-cols-[1fr_2fr_.5fr_2fr_.5fr_80px] sm:items-center sm:border-b border-gray-300/50 px-4 py-6 text-center text-gray-500">
      {/* Image */}
      <div className="flex justify-between items-center sm:justify-center sm:border-0  border-b border-gray-300/50 py-2">
        <h1 className="sm:hidden">Item Image</h1>
        <img
          src={item.imageUrl[0].url}
          alt={item.name}
          className="w-16 h-16 rounded-full object-cover"
        />
      </div>

      {/* Name */}
      <div className="flex justify-between items-center sm:justify-center sm:border-0  border-b border-gray-300/50 py-2">
        <h1 className="sm:hidden">Item Name</h1>

        {item.name}
      </div>

      {/* Price */}
      <div className="flex justify-between items-center sm:justify-center sm:border-0  border-b border-gray-300/50 py-2">
        <h1 className="sm:hidden">Price</h1>₱{item.price}
      </div>

      {/* Quantity */}
      <div className="flex justify-between items-center sm:justify-center sm:border-0  border-b border-gray-300/50 py-2">
        <h1 className="sm:hidden">Quantity</h1>

        <div className="flex justify-center items-center gap-2">
          <button
            onClick={handleDecreaseQuantity}
            disabled={item.quantity <= 1}
            className="flex h-8 w-8 items-center justify-center rounded border disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FiMinus className="cursor-pointer" />
          </button>

          <input
            value={item.quantity}
            readOnly
            className="w-12 h-8 border text-center rounded"
          />

          <button
            onClick={handleIncreaseQuantity}
            disabled={item.quantity >= 10}
            className="flex h-8 w-8 items-center justify-center rounded border disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FiPlus className="cursor-pointer" />
          </button>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center sm:justify-center sm:border-0  border-b border-gray-300/50 py-2">
        <h1 className="sm:hidden">Total</h1>₱{item.price * item.quantity}
      </div>

      {/* Remove */}
      <div className="flex justify-between items-center sm:justify-center sm:border-0  border-b border-gray-300/50 py-2">
        <h1 className="sm:hidden">Remove</h1>

        <button className="text-red-500 text-lg">
          <RiDeleteBin6Line
            onClick={handleRemoveItem}
            className="cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
}
