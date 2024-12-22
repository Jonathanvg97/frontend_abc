"use client";
import React, { useState } from "react";
import { LogoABC, IconMenu, IconLogin } from "@public/icons";
import ModalLogin from "../modalLogin/modalLogin";
import { useRouter } from "next/navigation";
import { useMovieStore } from "@/store/useMovieStore";

const SideNav: React.FC = () => {
  //Destructuring of router
  const router = useRouter();
  //Store
  const { currentRoute, setCurrentRoute } = useMovieStore();

  //Local State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Functions
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsModalOpen(false);
  };

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsMenuOpen(false);
  };

  // Función para navegar
  // Función para navegar
  const handleNavClick = (route: string) => {
    if (currentRoute !== route) {
      setCurrentRoute(route); // Solo actualizar si el route es diferente
    }
    router.push(route); // Navegar a la nueva ruta
  };

  // useEffect(() => {
  // }, [currentRoute]);

  //UI
  return (
    <section className="SideNav flex bg-black h-24 w-full items-center p-4">
      <article className="flex gap-20 items-center w-full ml-16">
        {/* Logo */}
        <LogoABC />

        {/* Desktop Menu */}
        <nav className="hidden sm:flex flex-row items-center gap-11 text-white font-normal">
          <ul className="flex gap-8 sm:gap-16 flex-wrap cursor-pointer">
            <li
              onClick={() => handleNavClick("/")}
              className="scale-95 hover:scale-100 hover:border-b-2 transition-transform duration-200 font-semibold"
            >
              Home
            </li>
            <li
              onClick={() => handleNavClick("/favoriteMovies")}
              className="scale-95 hover:scale-100 hover:border-b-2 transition-transform duration-200 font-semibold"
            >
              Favoritas
            </li>
          </ul>
        </nav>
        {/* logo login */}
        <div className="hidden sm:block ml-auto text-white  p-4 scale-95 hover:scale-125  transition-transform duration-200">
          <button onClick={handleToggleModal}>
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
        <nav className="absolute top-24 left-0 bg-black w-full text-white p-4  shadow-lg rounded-md block sm:hidden z-50">
          <ul className="flex flex-col gap-4 ">
            <li className="border-b-2 scale-95 hover:scale-100 transition-transform duration-200">
              Popular
            </li>
            <li className="border-b-2 scale-95 hover:scale-100 transition-transform duration-200">
              Favoritas
            </li>
            <li
              className="border-b-2 scale-95 hover:scale-100 transition-transform duration-200"
              onClick={handleToggleModal}
            >
              Iniciar Sesión
            </li>
          </ul>
        </nav>
      )}
      <ModalLogin
        isModalOpen={isModalOpen}
        handleToggleModal={handleToggleModal}
      />
    </section>
  );
};

export default SideNav;
