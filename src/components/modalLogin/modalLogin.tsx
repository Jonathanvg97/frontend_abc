"use client";
import { useState } from "react";
import BodyModalRegister from "../bodyModalRegister/bodyModalRegister";
import BodyModalLogin from "../bodyModalLogin/bodyModalLogin";

type props = {
  isModalOpen: boolean;
  handleToggleModal: () => string;
};

const ModalLogin: React.FC<props> = ({ isModalOpen, handleToggleModal }) => {
  //Local State
  const [isLogin, setIsLogin] = useState<string>("isRegister");

  //Functions
  const handleToggleLogin = (): void => {
    setIsLogin("isLogin");
  };

  const handleRegister = (): void => {
    setIsLogin("isRegister");
  };

  //UI
  return (
    <section className="ModalLogin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[90%] lg:w-[100%] bg-opacity-50 flex items-center justify-center z-50 p-4">
      {isModalOpen && !isLogin ? (
        <BodyModalRegister
          handleToggleModal={handleToggleModal}
          handleToggleLogin={handleToggleLogin}
        />
      ) : isModalOpen && isLogin ? (
        <BodyModalLogin
          handleToggleModal={handleToggleModal}
          handleRegister={handleRegister}
        />
      ) : null}
    </section>
  );
};

export default ModalLogin;
