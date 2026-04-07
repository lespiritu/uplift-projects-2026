import { useState } from "react";

import Card from "./Card";
import ProductModal from "./ProductModal";

const DishList = ({ listData, title, subTitle }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleExit = () => setSelectedProduct(null);

  return (
    <div className="p-2 sm:pt-2 pb-16 bg-brown-leon-100 ">
      <div className=" mx-auto xl:max-w-7xl">
        <div className="sm:p-16 p-2 text-center ">
          <h1 className="font-bold text-brown-leon-600 text-lg sm:text-2xl">
            {title}
          </h1>
          <h1 className="sm:text-4xl text-2xl font-bold pt-4 text-dark-leon-400">
            {subTitle}
          </h1>
        </div>

        <div className="grid  md:grid-cols-2 lg:grid-cols-3 p-2 pt-4 xl:grid-cols-4 2xl:px-32 sm:px-16 xl:px-4 gap-6 ">
          {listData.map((food) => (
            <Card key={food._id} food={food} onView={setSelectedProduct} />
          ))}
        </div>
      </div>

      <ProductModal product={selectedProduct} handleExit={handleExit} />
    </div>
  );
};

export default DishList;
