import { HiMenuAlt2 } from "react-icons/hi";
import CartIcon from "./CartIcon";
import Nav from "./Nav";

const NavMobile = ({ showMenu, handleShowMenu }) => {
  return (
    <div
      onClick={handleShowMenu}
      className={`fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-xs transition-opacity duration-600 sm:hidden ${
        showMenu
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={`h-screen w-4/5 bg-white transition-transform duration-600 ease-in-out ${
          showMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-8 py-4 bg-taupe-600">
          <img src="/LOGO.svg" alt="Food Body logo" className="w-30" />
          <div className="flex">
            <CartIcon handleShowMenu={handleShowMenu} />
            <span onClick={handleShowMenu}>
              <HiMenuAlt2
                className="sm:hidden color-amber-950"
                size={"24px"}
                cursor={"pointer"}
              />
            </span>
          </div>
        </div>

        <Nav view={"mobile"} handleShowMenu={handleShowMenu} />
      </div>
    </div>
  );
};

export default NavMobile;
