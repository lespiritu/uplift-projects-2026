import { NavLink } from "react-router";
import { IoMdHome } from "react-icons/io";
import { MdMenuBook } from "react-icons/md";
import { RiInfoCardFill } from "react-icons/ri";
import { RiMessage2Fill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

const Nav = ({ view, handleShowMenu }) => {
  const getNavClass = ({ isActive }) =>
    `transition-colors duration-200 ${
      isActive
        ? "text-yellow-400 flex item-center flex gap-1"
        : "text-taupe-400 hover:text-taupe-200 flex gap-1"
    }`;

  if (view === "desktop") {
    return (
      <ul className={"hidden sm:flex gap-6"}>
        <li>
          <NavLink to="/" className={getNavClass} end>
            <IoMdHome className="self-center" /> Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/menu" className={getNavClass}>
            <MdMenuBook className="self-center" />
            Menu
          </NavLink>
        </li>
        <li>
          <NavLink to="/aboutUs" className={getNavClass} end>
            <RiInfoCardFill className="self-center" />
            About Us
          </NavLink>
        </li>

        <li>
          <NavLink to="/contactUs" className={getNavClass} end>
            <RiMessage2Fill className="self-center" />
            Contact Us
          </NavLink>
        </li>

        <li>
          <NavLink to="/orders" className={getNavClass} end>
            <CgProfile className="self-center" />
            My Order
          </NavLink>
        </li>
      </ul>
    );
  }

  if (view === "mobile") {
    return (
      <ul className={"p-8 flex flex-col gap-3 "}>
        <li onClick={handleShowMenu} className="border-b border-taupe-200">
          <NavLink to="/" className={getNavClass} end>
            <IoMdHome className="self-center" /> Home
          </NavLink>
        </li>
        <li onClick={handleShowMenu} className="border-b border-taupe-200">
          <NavLink to="/menu" className={getNavClass}>
            <MdMenuBook className="self-center" />
            Menu
          </NavLink>
        </li>
        <li onClick={handleShowMenu} className="border-b border-taupe-200">
          <NavLink to="/aboutUs" className={getNavClass}>
            <RiInfoCardFill className="self-center" />
            About Us
          </NavLink>
        </li>

        <li onClick={handleShowMenu} className="border-b border-taupe-200">
          <NavLink to="/contactUs" className={getNavClass}>
            <RiMessage2Fill className="self-center" />
            Contact Us
          </NavLink>
        </li>

        <li onClick={handleShowMenu} className="border-b border-taupe-200">
          <NavLink to="/orders" className={getNavClass}>
            <CgProfile className="self-center" />
            My Order
          </NavLink>
        </li>
      </ul>
    );
  }
};

export default Nav;
