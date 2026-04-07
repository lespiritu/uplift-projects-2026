const CarrouselCard = ({ review }) => {
  return (
    <div className="bg-white min-w-full px-8 py-16 text-dark-leon-400 ">
      <div>
        <div>
          <div>
            <h2 className="text-2xl font-bold">{review.name}</h2>
            <p className="text-sm uppercase tracking-[0.3em] text-brown-leon-600">
              {review.professional}
            </p>

            <p className="text-lg font-semibold text-amber-300">
              {"★".repeat(review.rating)}
            </p>
          </div>
        </div>
      </div>

      <p className="text-gray-500 py-4">{review.comment}</p>
    </div>
  );
};

export default CarrouselCard;
