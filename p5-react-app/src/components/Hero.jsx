import { useNavigate } from "react-router";
import Button from "./Button";
const Hero = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/menu");
  };

  return (
    <section className="sm:px-16 min-h-screen bg-[url('/images/banner-bg.svg')] bg-cover bg-center ">
      <div className="flex items-center justify-around p-4">
        <div className=" text-white">
          <h1 className="text-brown-leon-600 text-2xl px-4 py-2 font-bold  bg-gray-950/90 inline">
            Welcome Food Body
          </h1>
          <h2 className="font-bold text-3xl sm:text-6xl mt-4">New Zealand</h2>
          <h2 className="font-bold text-8xl z-auto pb-4">Pizza</h2>

          <Button onClick={handleNavigate} buttonName={"Order Now"} />
          <div className="sm:hidden">
            <img
              className="w-full"
              src="/images/pizza-banner.png"
              alt="New Zealand pizza hero banner"
            />
          </div>
        </div>

        <div className="w-1/2">
          <img
            className="hidden sm:block w-full"
            src="/images/pizza-banner.png"
            alt="New Zealand pizza hero banner"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
