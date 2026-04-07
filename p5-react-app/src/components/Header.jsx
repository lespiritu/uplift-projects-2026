import Nav from "./Nav";
import { HiMenuAlt2 } from "react-icons/hi";

import { useState } from "react";
import NavMobile from "./NavMobile";
import CartIcon from "./CartIcon";
import { Link } from "react-router";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };
  return (
    <>
      <div className="bg-dark-leon-900 sticky z-50 top-0 flex text-amber-50 justify-between items-center lg:px-24 px-4 py-4">
        <Link to={"/"}>
          <img
            src="/LOGO.svg"
            alt="Food Body logo"
            className="w-40 cursor-pointer"
          />
        </Link>
        <div className="flex ">
          <Nav view={"desktop"} />
          <CartIcon />
          <span onClick={handleShowMenu}>
            <HiMenuAlt2
              className="sm:hidden text-taupe-400 "
              size={"24px"}
              cursor={"pointer"}
            />
          </span>
        </div>
      </div>

      <NavMobile showMenu={showMenu} handleShowMenu={handleShowMenu} />
    </>
  );
};

export default Header;
