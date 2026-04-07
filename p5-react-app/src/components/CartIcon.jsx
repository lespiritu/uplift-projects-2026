import { FaShoppingCart } from "react-icons/fa";

import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router";

const CartIcon = ({ handleShowMenu }) => {
  const { cart } = useContext(AppContext);
  const navigate = useNavigate();
  const handleNavigate = () => {
    handleShowMenu?.();
    navigate("/cart");
  };
  return (
    <span onClick={handleNavigate} className="px-2 relative cursor-pointer ">
      <span className="absolute -top-1 right-1 text-xs text-amber-50 flex items-center justify-center bg-amber-600 w-4 h-4 rounded-full">
        {cart.length}
      </span>
      <FaShoppingCart size={"24px"} />
    </span>
  );
};

export default CartIcon;
