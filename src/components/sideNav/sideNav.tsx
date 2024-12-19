"use client";
import React, { useState } from "react";
import { LogoABC, IconMenu, IconLogin } from "@public/icons";

const SideNav = () => {
  //Local State
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //Functions
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  //UI
  return (
    <section className="SideNav flex bg-black h-24 w-full items-center p-4">
      <article className="flex gap-20 items-center w-full ml-16">
        {/* Logo */}
        <LogoABC />

        {/* Desktop Menu */}
        <nav className="hidden sm:flex flex-row items-center gap-11 text-white font-normal">
          <ul className="flex gap-8 sm:gap-16 flex-wrap cursor-pointer">
            <li className="scale-95 hover:scale-100 hover:border-b-2 transition-transform duration-200">
              Popular
            </li>
            <li className="scale-95 hover:scale-100 hover:border-b-2 transition-transform duration-200">
              Favoritas
            </li>
          </ul>
        </nav>
        <div className="hidden sm:block ml-auto text-white  p-4 scale-95 hover:scale-125  transition-transform duration-200">
          <button>
            <IconLogin />
          </button>
        </div>
        {/* Mobile Menu Icon */}
        <div className="block sm:hidden ">
          <button
            onClick={toggleMenu}
            className="text-white scale-95 hover:scale-110 transition-transform duration-200"
          >
            <IconMenu />
          </button>
        </div>
      </article>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="absolute top-24 left-0 bg-black w-full text-white p-4  shadow-lg rounded-md block sm:hidden">
          <ul className="flex flex-col gap-4 ">
            <li className="border-b-2 scale-95 hover:scale-100 transition-transform duration-200">
              Popular
            </li>
            <li className="border-b-2 scale-95 hover:scale-100 transition-transform duration-200">
              Favoritas
            </li>
            <li className="border-b-2 scale-95 hover:scale-100 transition-transform duration-200">
              Iniciar Sesión
            </li>
          </ul>
        </nav>
      )}
    </section>
  );
};

export default SideNav;
