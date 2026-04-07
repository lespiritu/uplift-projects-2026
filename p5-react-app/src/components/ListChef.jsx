import CardChef from "./CardChef";
import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";

const ListChef = () => {
  const { chefsData } = useContext(AppContext);

  return (
    <div className="py-16 px-8">
      <div className="text-center py-8">
        <h1 className="font-bold text-brown-leon-600 text-lg sm:text-2xl uppercase">
          Our Chefs
        </h1>
        <h1 className="sm:text-4xl text-2xl font-bold pt-2 text-dark-leon-400">
          Meet Our Expert Chef
        </h1>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:px-32 justify-center max-w-6xl mx-auto">
        {chefsData.map((chef) => (
          <CardChef key={chef.id} chef={chef} />
        ))}
      </div>
    </div>
  );
};

export default ListChef;
