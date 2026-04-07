import SlideList from "./SlideList";

const Testimonial = () => {
  return (
    <div className="bg-leon-img md:flex md:justify-center items-start sm:px-16 lg:py-16">
      <div className="p-8">
        <div className="sm:px-6 text-center lg:text-left ">
          <h1 className="font-bold text-brown-leon-600 text-lg sm:text-2xl uppercase">
            Testimonial
          </h1>
          <h1 className="sm:text-4xl text-2xl font-bold py-4 lg:pb-8 text-white">
            What our Clients Say
          </h1>

          <img
            src="/images/testimonial-client.jpg"
            className="rounded-full border-2 my-8 border-amber-100 lg:hidden"
            alt="Portrait of a restaurant client"
          />
        </div>
        <SlideList />
      </div>

      <div>
        <img
          src="/images/testimonial-client.jpg"
          alt="Portrait of a restaurant client"
          className="hidden lg:block max-w-sm rounded-md pt-8"
        />
      </div>
    </div>
  );
};

export default Testimonial;
