import { useContext } from "react";
import DishList from "../components/DishList";
import FeaturedDish from "../components/Featured";
import FoodTicker from "../components/FoodTicker";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

import { AppContext } from "../contexts/AppContext";
import Loading from "../components/Loading";

const Home = () => {
  const { foodData, loadingFoods } = useContext(AppContext);

  const popularDishList = foodData.filter((food) => food.isPopular);

  return (
    <div>
      <title>Restaurant Name - Home</title>

      <Hero />

      <DishList
        listData={popularDishList}
        title={"POPULAR DISHES"}
        subTitle={"Our Best Selling Dishes"}
      />
      {loadingFoods && <Loading />}
      <FeaturedDish />
      <FoodTicker />
      <Footer />
    </div>
  );
};

export default Home;
