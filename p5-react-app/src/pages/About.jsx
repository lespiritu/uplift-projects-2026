import AboutUs from "../components/AboutUs";

import FoodTicker from "../components/FoodTicker";
import Footer from "../components/Footer";

import ListChef from "../components/ListChef";
import Testimonial from "../components/Testimonial";

const About = () => {
  return (
    <div className="bg-brown-leon-100 pt-16">
      <title>Restaurant Name - About</title>

      <AboutUs />
      <FoodTicker />
      <ListChef />
      <Testimonial />
      <FoodTicker background="dark" />
      <Footer />
    </div>
  );
};

export default About;
