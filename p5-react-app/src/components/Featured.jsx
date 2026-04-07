import { IoPlaySharp } from "react-icons/io5";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import Loading from "./Loading";
import ErrorFetch from "./ErrorFetch";
import Button from "./Button";

const FeaturedDish = () => {
  const { foodData, loadingFoods, errorFoods, dispatch } =
    useContext(AppContext);

  if (loadingFoods) {
    return <Loading />;
  }

  if (errorFoods) {
    return <ErrorFetch errorMessage={errorFoods} />;
  }

  const featured = foodData.find((food) => food.isFeatured);

  const handleCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: featured });
  };
  return (
    <div className=" flex flex-col sm:flex-row items-center justify-between bg-[url('/images/featured-bg.svg')] bg-cover bg-center text-white">
      <div className="sm:hidden text-center">
        <h1 className="pt-8 font-bold uppercase text-2xl">Featured Dish</h1>
        <h1 className="text-slate-400">Welcome Food Body</h1>
      </div>

      <div className="sm:hidden sm:bg-red-800 sm:featured-clip px-16">
        <img
          className="w-full"
          src={featured?.imageUrl[1]?.url}
          alt={featured.name}
        />
      </div>

      <div className="pb-16 pt-8 flex flex-col items-center sm:w-3/4 sm:items-start sm:pl-16 md:w-1/2 lg:pl-32">
        <h1 className="sm:block hidden pt-8 font-bold uppercase text-2xl lg:text-3xl">
          Featured Dish
        </h1>
        <h1 className="hidden sm:block text-slate-400 ">Welcome Food Body</h1>
        <h1 className="text-lg text-center font-bold sm:pt-6 text-amber-400">
          Today Special Food
        </h1>
        <h1 className="text-4xl font-bold lg:text-6xl pb-4">{featured.name}</h1>

        <Button onClick={handleCart} buttonName={"Add to Cart"} />
      </div>

      <div className="hidden sm:block sm:bg-red-800 sm:featured-clip sm:pl-32 px-16 pt-16 ">
        <img
          className="w-full"
          src={featured?.imageUrl[1]?.url}
          alt={featured.name}
        />
      </div>
    </div>
  );
};

export default FeaturedDish;
