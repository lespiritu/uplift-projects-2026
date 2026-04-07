const FoodTicker = ({ background = "light" }) => {
  const getClassName = () => {
    switch (background) {
      case "light":
        return "bg-zinc-300/20 py-16 text-brown-leon-600/10 overflow-hidden border-b-4 border-amber-300 ";

      case "dark":
        return "bg-dark-leon-900 py-16 text-brown-leon-600/10 overflow-hidden border-b-4 border-amber-300 ";

      default:
        return "bg-zinc-300/20 py-16 text-brown-leon-600/10 overflow-hidden border-b-4 border-amber-300 ";
    }
  };
  return (
    <div className={getClassName()}>
      <div className="food-ticker-track text-8xl font-semibold tracking-[0.25em] whitespace-nowrap">
        <span className="pr-4 font-extrabold hover:text-red-700 transition-colors duration-300">
          PASTA
        </span>
        <span className="pr-4 font-extrabold hover:text-red-700 transition-colors duration-300">
          BURGER
        </span>
        <span className="pr-4 font-extrabold hover:text-red-700 transition-colors duration-300">
          PIZZA
        </span>
        <span className="pr-4 font-extrabold hover:text-red-700 transition-colors duration-300">
          CHICKEN
        </span>
        <span className="pr-4 font-extrabold hover:text-red-700 transition-colors duration-300">
          PASTA
        </span>
        <span className="pr-4 font-extrabold hover:text-red-700 transition-colors duration-300">
          BURGER
        </span>
        <span className="pr-4 font-extrabold hover:text-red-700 transition-colors duration-300">
          PIZZA
        </span>
        <span className="pr-4 font-extrabold hover:text-red-700 transition-colors duration-300">
          CHICKEN
        </span>
        <span className="pr-4 font-extrabold hover:text-red-700 transition-colors duration-300">
          PASTA
        </span>
        <span className="pr-4 font-extrabold hover:text-red-700 transition-colors duration-300">
          BURGER
        </span>
        <span className="pr-4 font-extrabold hover:text-red-700 transition-colors duration-300">
          PIZZA
        </span>
        <span className="pr-4 font-extrabold hover:text-red-700 transition-colors duration-300">
          CHICKEN
        </span>
      </div>
    </div>
  );
};

export default FoodTicker;
