interface MoviesNotFoundProps {
  title: string;
  description: string;
  actionText: string;
  onAction: () => void;
}

const MoviesNotFound = ({
  title,
  description,
  actionText,
  onAction,
}: MoviesNotFoundProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <h1 className="text-4xl font-semibold text-primary">{title}</h1>
      <div className="w-full max-w-xs md:max-w-md">
        <img
          src="/images/user.png"
          alt="User icon"
          className="w-full h-auto object-contain"
        />
      </div>{" "}
      <p className="text-white ">{description}</p>
      <button
        onClick={onAction}
        className="px-4 py-2 bg-primary text-black font-semibold rounded hover:bg-blue-600 transition"
      >
        {actionText}
      </button>
    </div>
  );
};

export default MoviesNotFound;
