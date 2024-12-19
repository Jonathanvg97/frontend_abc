import { IconnBack } from "@public/icons";
import Image from "next/image";

type props = {
  isModalOpen: boolean;
  handleToggleModal: () => void;
};

const ModalLogin: React.FC<props> = ({ isModalOpen, handleToggleModal }) => {
  return (
    <>
      {isModalOpen && (
        <section className="ModalLogin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[90%] lg:w-[100%] bg-opacity-50 flex items-center justify-center z-50 p-4">
          <article className="w-full flex flex-col lg:flex-row shadow-lg border-blue-950 border-2 rounded-lg overflow-hidden">
            {/* Left Section: Buttons and Form */}
            <div className="w-full flex flex-col gap-8 bg-transparent p-4 lg:p-8">
              {/* Back Button */}
              <button
                onClick={handleToggleModal}
                className="text-white w-fit flex gap-3 mb-6 self-start p-4"
              >
                <IconnBack /> Back
              </button>

              {/* Centered Content */}
              <div className="flex justify-center mb-10 md:mb-16 lg:mb-24">
                <button className="bg-primary text-white text-sm font-medium p-2 w-24 rounded-lg z-10">
                  Sign up
                </button>
                <button className="bg-neutral text-white text-sm font-medium p-2 w-24 rounded-lg -ml-1">
                  Log in
                </button>
              </div>

              <div className="w-full flex flex-col items-center ">
                <button className="bg-primary p-2 w-full md:w-80 rounded-md font-semibold text-xs mb-10 md:mb-16 lg:mb-32">
                  Register with your Email
                </button>
                <p className="text-white text-xs text-center">
                  For any questions, reach out to support@Quickbetdmovies.com
                </p>
              </div>
            </div>

            {/* Right Section: Welcome Message and Image */}
            <div className="flex flex-col w-full  items-center text-white bg-neutral relative">
              <div className="flex flex-col items-center text-center ">
                <h2 className="text-xl md:text-2xl  mb-10 md:mb-16 lg:mb-16 font-bold mt-4">
                  Welcome to Quickbet <br /> Movies!
                </h2>
                <p className="text-sm md:text-base w-[90%] lg:w-[50%]">
                  🎬 Ready to unlock a universe of cinematic delights? Sign up
                  now and start your journey with us!
                </p>
              </div>

              <Image
                className=" md:w-60 md:h-60 lg:w-[547px] lg:h-[547px] lg:-mt-28"
                src="/images/user.png"
                alt="User icon"
                width={547}
                height={546}
              />
            </div>
          </article>
        </section>
      )}
    </>
  );
};

export default ModalLogin;
