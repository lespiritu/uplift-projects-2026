import profile from "@/data/profile";
import { useState } from "react";
import logo from "/leo_logo_green.png";
import { MdOutlineHome } from "react-icons/md";
import { RiQuestionAnswerLine } from "react-icons/ri";

import { GoProjectSymlink } from "react-icons/go";
import { RiContactsFill } from "react-icons/ri";
import { CiPen } from "react-icons/ci";

const navItems = [
  { label: "Home", href: "#home", navIcon: MdOutlineHome },
  { label: "About", href: "#about", navIcon: RiQuestionAnswerLine },
  { label: "Projects", href: "#projects", navIcon: GoProjectSymlink },
  { label: "Skills", href: "#skills", navIcon: CiPen },
  { label: "Contact", href: "#contact", navIcon: RiContactsFill },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-surface/40 backdrop-blur-2xl border-b border-secondary/10">
        <nav className="mx-auto w-full max-w-6xl px-4 py-2 md:py-8 sm:px-6 lg:px-8 ">
          <div className="flex items-center justify-between">
            <a href="#home">
              <img src={logo} className="w-10 md:w-16" alt="my logo" />
            </a>

            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((open) => !open)}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-text-light transition-colors md:hidden"
            >
              <span
                className={`absolute h-0.5 w-5 rounded bg-current transition-transform duration-300 ${
                  isOpen ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute h-0.5 w-5 rounded bg-current transition-opacity duration-300 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute h-0.5 w-5 rounded bg-current transition-transform duration-300 ${
                  isOpen ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>

            <ul className="hidden items-center gap-3 text-primary md:flex md:gap-5">
              {navItems.map((item) => {
                const Icon = item.navIcon;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="transition-colors hover:text-text flex items-center gap-1"
                    >
                      <Icon />
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-2xl  transition-opacity duration-300 md:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed top-0 right-0 z-50 flex h-screen w-72 max-w-[85vw] flex-col  bg-background/70 backdrop-blur-3xl px-6 py-6 shadow-2xl transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center  justify-between">
          <h2 className="my-name-footer pt-4 text-4xl text-text ">
            {profile.name}
          </h2>

          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setIsOpen(false)}
            className="border border-border ml-auto relative inline-flex h-10 w-10 items-center justify-center rounded-full  text-text transition-colors hover:border-primary hover:text-accent"
          >
            <span className="absolute h-0.5 w-5 rotate-45 rounded bg-current" />
            <span className="absolute h-0.5 w-5 -rotate-45 rounded bg-current" />
          </button>
        </div>

        <ul className="grid gap-2  text-text-light">
          {navItems.map((item) => {
            const Icon = item.navIcon;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block  px-3 py-3 transition-colors hover:bg-surface-alt/20 border-b border-border/30"
                >
                  <span className="flex gap-2 items-center">
                    <Icon />
                    {item.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
};

export default Navigation;
