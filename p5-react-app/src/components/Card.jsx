import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import Button from "./Button";
const Card = ({ food, onView }) => {
  const { dispatch } = useContext(AppContext);

  const handdleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: food });
  };

  return (
    <div className="bg-white px-8 py-12 rounded-2xl border border-brown-leon-600/20 text-center hover:bg-card  hover:text-white transition-all duration-300 ease-in-out">
      <div>
        <img
          className="mx-auto hover:scale-110 w-full transition duration-700 ease-in-out border-2 rounded-full p-2 border-dashed border-amber-400 bg-amber-50"
          src={food.imageUrl[0].url}
          alt={food.name}
        />
      </div>

      <div className="pt-3 flex flex-col">
        <h1 className="font-bold">{food.name}</h1>
        <span className="text-gray-500">{food.category}</span>
        <span className="font-bold text-amber-600 text-lg">P{food.price}</span>
      </div>

      <div className="flex justify-center gap-0.5 pt-4 text-xs text-white hover:bg">
        <Button
          onClick={handdleAddToCart}
          buttonName={"Add To Cart"}
          className="px-4! py-2!"
          version="outline"
        />

        <Button
          onClick={() => onView(food)}
          buttonName={"View"}
          className="px-4! py-2!"
          version="solid"
        />
      </div>
    </div>
  );
};

export default Card;
