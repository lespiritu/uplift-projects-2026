import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import DishList from "../components/DishList";
import Footer from "../components/Footer";
import FoodTicker from "../components/FoodTicker";
import Loading from "../components/Loading";
import ErrorFetch from "../components/ErrorFetch";

const Menu = () => {
  const { foodData, loadingFoods, errorFoods } = useContext(AppContext);

  if (errorFoods) {
    return <ErrorFetch errorMessage={errorFoods} />;
  }
  return (
    <div>
      <title>Restaurant Name - Menu</title>

      <DishList
        listData={foodData}
        title={"Our very own"}
        subTitle={"Special Menu"}
      />

      {loadingFoods && <Loading />}

      <FoodTicker background="dark" />
      <Footer />
    </div>
  );
};

export default Menu;
