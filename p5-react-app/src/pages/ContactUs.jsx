import { HiLocationMarker } from "react-icons/hi";
import CardContact from "../components/CardContact";
import { MdEmail } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdAccessTimeFilled } from "react-icons/md";
import { Link } from "react-router";
import FoodTicker from "../components/FoodTicker";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";

const ContactUs = () => {
  return (
    <div className="bg-brown-leon-100 ">
      <title>Restaurant Name - Contact Us</title>

      <div className=" grid sm:grid-cols-2 gap-8 mx-auto max-w-6xl sm:p-16 p-4">
        <CardContact>
          <div className="flex justify-between items-center">
            <HiLocationMarker className="text-dark-leon-400 leon-400 text-4xl mb-2" />
            <Link
              to="https://maps.app.goo.gl/Dn4ibJK1iSukkney6"
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer bg-amber-500 px-5 py-2 text-xs text-white transition-colors duration-300 hover:bg-amber-600"
            >
              Open Google Map
            </Link>
          </div>
          <h1 className="font-bold uppercase text-lg text-dark-leon-400">
            Our Address
          </h1>
          <p className="text-gray-500 mb-4">
            4517 Washington Ave. Manchester, Kentucky 39495
          </p>
        </CardContact>

        <CardContact>
          <MdEmail className="text-dark-leon-400 text-4xl mb-2" />
          <h1 className="font-bold uppercase text-lg text-dark-leon-400">
            Email Address
          </h1>
          <p className="text-gray-500">resrant@gmail.com</p>
        </CardContact>

        <CardContact>
          <FaPhoneFlip className="text-dark-leon-400 text-4xl mb-2" />
          <h1 className="font-bold uppercase text-lg text-dark-leon-400">
            Contact Number
          </h1>
          <p className="text-gray-500">+63-917-883-774</p>
        </CardContact>

        <CardContact>
          <MdAccessTimeFilled className="text-dark-leon-400 text-4xl mb-2" />
          <h1 className="font-bold uppercase text-lg text-dark-leon-400">
            Opening Hour
          </h1>
          <p className="text-gray-500">Sunday-Fri: 9AM-6PM Saturday: 9AM-4PM</p>
        </CardContact>
      </div>

      <ContactForm />

      <FoodTicker background="dark" />
      <Footer />
    </div>
  );
};

export default ContactUs;
