import { MdFormatQuote } from "react-icons/md";
import { useContext, useState } from "react";
import CarrouselCard from "./CarrouselCard";
import { AppContext } from "../contexts/AppContext";

import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

const SlideList = () => {
  const { reviewsData } = useContext(AppContext);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviewsData.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reviewsData.length - 1 ? 0 : prevIndex + 1,
    );
  };

  if (!reviewsData.length) {
    return null;
  }

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col items-center gap-2 px-6 pb-14">
      <div className="w-full overflow-hidden rounded-sm relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {reviewsData.map((review) => (
            <CarrouselCard key={review.id} review={review} />
          ))}
        </div>

        <MdFormatQuote className="text-8xl text-brown-leon-600 absolute top-0 right-0" />
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={handlePrevious}
          className="rounded-full cursor-pointer flex items-center justify-center border-2 border-amber-600 text-amber-500 transition-colors duration-300 hover:bg-amber-50 w-12 h-12 text-sm font-semibold   "
        >
          <FaAngleLeft size={"24px"} />
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="rounded-full cursor-pointer flex items-center justify-center  border-2 border-amber-600 text-white transition-colors duration-300 bg-amber-500 w-12 h-12 text-sm font-semibold  hover:bg-amber-600"
        >
          <FaAngleRight size={"24px"} />
        </button>
      </div>
    </section>
  );
};

export default SlideList;
