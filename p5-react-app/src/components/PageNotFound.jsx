import { Link } from "react-router";
import FoodTicker from "./FoodTicker";
import Footer from "./Footer";

const PageNotFound = () => {
  return (
    <>
      <section className="relative overflow-hidden bg-brown-leon-100 px-4 py-20">
        <div className="absolute inset-0 " />

        <div className="relative mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center rounded-sm border border-amber-200 bg-white/90 px-6 py-16 text-center ">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-amber-600">
            Error 404
          </p>
          <h1 className="mt-4 text-5xl font-bold text-dark-leon-400 sm:text-7xl">
            Page Not Found
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            The page you are looking for may have been moved, deleted, or never
            existed. Let&apos;s get you back to something delicious.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className=" bg-amber-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-amber-600"
            >
              Back Home
            </Link>
            <Link
              to="/menu"
              className="border border-amber-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-amber-600 transition-colors duration-300 hover:bg-amber-50"
            >
              Browse Menu
            </Link>
          </div>
        </div>
      </section>
      <FoodTicker background="light" />
      <Footer />
    </>
  );
};

export default PageNotFound;
