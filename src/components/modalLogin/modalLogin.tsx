"use client";
import { useState } from "react";
import BodyModalRegister from "../bodyModalRegister/bodyModalRegister";
import BodyModalLogin from "../bodyModalLogin/bodyModalLogin";
import { ModalView } from "@/utils/types/typesModal";

type Props = {
  isModalOpen: boolean;
  handleToggleModal: () => void;
};

const ModalLogin: React.FC<Props> = ({ isModalOpen, handleToggleModal }) => {
  // Local State
  const [currentView, setCurrentView] = useState<ModalView>("register");

  // Functions
  const handleToggleLogin = (): void => {
    setCurrentView("login");
  };

  const handleToggleRegister = (): void => {
    setCurrentView("register");
  };

  // UI
  return (
    <>
      {isModalOpen && (
        <section className="ModalLogin fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[90%] lg:w-[100%] bg-opacity-50 flex items-center justify-center z-50 p-4">
          {currentView === "register" ? (
            <BodyModalRegister
              handleToggleModal={handleToggleModal}
              handleToggleLogin={handleToggleLogin}
              currentView={currentView}
              isModalOpen={isModalOpen}
            />
          ) : currentView === "login" ? (
            <BodyModalLogin
              handleToggleModal={handleToggleModal}
              handleRegister={handleToggleRegister}
              currentView={currentView}
              isModalOpen={isModalOpen}
            />
          ) : null}
        </section>
      )}
    </>
  );
};

export default ModalLogin;
