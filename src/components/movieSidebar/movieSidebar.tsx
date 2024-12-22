"use client";
import useMovies from "@/hooks/useMovies";
import { useMovieStore } from "@/store/useMovieStore";
import { useState, useEffect } from "react";

export default function MovieSidebar() {
  //Store
  const { searchValue, setSearchValue } = useMovieStore();
  //Hook
  const { getAllGenres, genres } = useMovies();

  //Local states
  const [isOpen, setIsOpen] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  //Effects
  // Cerrar el menú móvil cuando se redimensiona la pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    getAllGenres();
  }, [getAllGenres]);

  //Functions
  const handleGenreClick = (genre: string) => {
    setSelectedGenre(genre);
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setSearchValue(searchQuery);
  };
  //UI
  return (
    <>
      {/* Botón de menú móvil */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`fixed z-50 p-2 bg-zinc-800 rounded-md md:hidden ${
          isMobileMenuOpen ? "top-4 left-2" : "mt-2 left-2"
        }`}
      >
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isMobileMenuOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay para móvil */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed md:static inset-y-0 left-0 z-40
        w-64 min-h-screen bg-[#262626] p-4
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
      >
        <div className="space-y-6 pt-14 md:pt-0">
          {/* Search Section */}
          <div className="space-y-2">
            <h2 className="text-white text-sm font-medium">Search</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title"
                value={searchValue}
                onChange={handleSearch}
                className="w-full p-2 pr-8 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-white placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-700"
              />
              <svg
                className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
          </div>

          {/* Genres Section */}
          <div className="space-y-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full px-4 py-2 flex justify-between items-center text-white hover:bg-zinc-900 rounded-md transition-colors"
            >
              <span>Genres</span>
              <span
                className={`text-xs transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>
            <div className="h-px bg-zinc-800 w-full" />

            <div
              className={`space-y-1 scrollbar  transition-all duration-200 ${
                isOpen ? "max-h-96 overflow-y-auto" : "max-h-0"
              }`}
            >
              {genres?.map((gen) => (
                <button
                  key={gen.id}
                  onClick={() => handleGenreClick(gen.name)}
                  className={`w-full px-4 py-2 text-left rounded-md transition-colors
      ${
        selectedGenre === gen.name
          ? "bg-[#1C1C1C] text-white"
          : "text-zinc-400 hover:text-white hover:bg-zinc-900"
      }`}
                >
                  {gen.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
