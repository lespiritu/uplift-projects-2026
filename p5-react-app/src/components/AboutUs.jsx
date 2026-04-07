const AboutUs = () => {
  return (
    <div className="flex flex-col  lg:flex-row lg:justify-center xl:px-32  gap-8 px-6 md:px-16 py-8">
      <img
        className="rounded-md max-w-lg object-cover"
        src="/images/aboutUs/aboutimg.jpg"
        alt="Selection of restaurant dishes on a table"
      />

      <div>
        <h1 className="text-brown-leon-600 font-bold text-2xl uppercase">
          About Us
        </h1>
        <h2 className="text-dark-leon-400 font-bold text-4xl py-4 ">
          Variety Of Flavours From American Cuisine
        </h2>
        <p className="text-gray-500">
          Every dish is not just prepared it's a crafted with a savor the a
          utmost precision and a deep understanding sdf of flavor harmony. The
          experienced hands of our chefs
        </p>

        <div className="sm:flex border-t border-brown-leon-600/30 mt-6 py-8">
          <div className="flex gap-2 py-8 border-b border-brown-leon-600/30 sm:pr-4 sm:border-r sm:border-brown-leon-600/30">
            <div>
              <img
                src="/images/aboutUs/about-qualified-chef.svg"
                alt="Qualified chef icon"
              />
            </div>
            <div>
              <h2 className="text-dark-leon-400 font-bold text-lg">
                Super Quality Food
              </h2>

              <p className="text-gray-500">
                our Testy Food & good food by friendly
              </p>
            </div>
          </div>

          <div className="flex gap-2 py-8 border-b border-brown-leon-600/30 sm:pl-4 ">
            <div>
              <img
                src="/images/aboutUs/about-quality-food.svg"
                alt="Quality food icon"
              />
            </div>
            <div>
              <h2 className="text-dark-leon-400 font-bold text-lg">
                Qualified Chef
              </h2>

              <p className="text-gray-500">
                Served our Testy Food & good food by friendly
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
