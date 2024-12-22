import { IconnBack } from "@public/icons";
import Image from "next/image";

type Props = {
  handleToggleModal: () => void;
  handleRegister: () => void;
  currentView: string;
  isModalOpen: boolean;
};
export default function BodyModalLogin({
  handleToggleModal,
  handleRegister,
  currentView,
  isModalOpen,
}: Props) {
  return (
    <article className="w-full flex flex-col lg:flex-row shadow-lg 2 rounded-lg overflow-hidden">
      {/* Left Section: Buttons and Form */}

      {isModalOpen && (
        <div className="fixed inset-y-0 left-4 right-4 bg-black bg-opacity-50 backdrop-blur-xl z-0 rounded-lg"></div>
      )}
      <div
        className={`relative w-full flex flex-col gap-8 p-4 lg:p-8 bg-transparent z-10`}
      >
        {/* Back Button */}
        <button
          onClick={handleToggleModal}
          className="text-white w-fit flex gap-3 mb-6 self-start p-4"
        >
          <IconnBack /> Back
        </button>

        {/* Centered Content */}
        <div className="flex justify-center mb-10 md:mb-16 lg:mb-24">
          <button
            onClick={handleRegister}
            className={`${
              currentView === "register" ? "bg-primary" : "bg-neutral"
            } bg-neutral text-white text-sm font-medium p-2 w-24 rounded-lg  scale-100 hover:scale-125`}
          >
            Sign up
          </button>
          <button
            className={`${
              currentView === "login" ? "bg-primary" : "bg-neutral"
            } text-white text-sm font-medium p-2 w-24 rounded-lg -ml-1 scale-100 hover:scale-125`}
          >
            Log in
          </button>
        </div>

        <div className="w-full flex flex-col items-center ">
          <p className="text-white text-xs text-center">
            We love having you back{" "}
          </p>
          <form className="flex flex-col gap-4 p-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full md:w-80 border border-neutral rounded-md p-2 text-sm"
              required
            />
            <input
              type="password"
              placeholder="password"
              className="w-full md:w-80 border border-neutral rounded-md p-2  text-sm"
              required
            />
            <button
              type="submit"
              className="flex items-center gap-2 justify-center bg-primary p-2 w-full md:w-80 rounded-md font-semibold text-xs mb-10 md:mb-16 lg:mb-32"
            >
              Continue
            </button>
          </form>
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
            🍿 Ready to dive into the world of unlimited entertainment? Enter
            your credentials and let the cinematic adventure begin!
          </p>
        </div>

        <Image
          className=" md:w-60 md:h-60 lg:w-[547px] lg:h-[547px] lg:-mt-26"
          src="/images/user.png"
          alt="User icon"
          width={547}
          height={546}
        />
      </div>
    </article>
  );
}
