"use client";

import Image from "next/image";
import styles from "./movie-detail.module.css";
import { useMovieStore } from "@/store/useMovieStore";
import useMovies from "@/hooks/useMovies";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const MovieDetail = () => {
  // Store
  const { movieDetail } = useMovieStore();
  const { handleBack } = useMovies();
  const router = useRouter();

  // Redirigir a la ruta principal si no hay movieDetail
  useEffect(() => {
    if (!movieDetail) {
      router.push("/"); // Redirige a la página principal
    }
  }, [movieDetail, router]);

  if (!movieDetail) {
    return null;
  }

  //Functions
  // Get background image
  const backgroundImage =
    movieDetail?.artworks?.find((art) => art.type === 15)?.image ||
    movieDetail.image;

  // Get trailer URL
  const trailerUrl =
    movieDetail.trailers && movieDetail.trailers.length > 0
      ? movieDetail.trailers[0].url
      : null;
  const videoId = trailerUrl ? new URL(trailerUrl).searchParams.get("v") : null;

  // Get main cast
  const mainCast = movieDetail.characters
    ?.filter((char) => char.peopleType === "Actor")
    .slice(0, 6);

  //UI
  return (
    <div className={`MovieDetail ${styles.container}`}>
      {/* Back Button */}
      <button className={styles.backButton} onClick={handleBack}>
        Volver
      </button>
      {/* Hero Section */}
      <div className={styles.hero}>
        <Image
          src={backgroundImage}
          alt={movieDetail.name}
          fill
          className={styles.heroImage}
          priority
        />
        <div className={styles.gradient} />
        <div className={styles.heroContent}>
          <h1 className={styles.title}>{movieDetail.name}</h1>
          <div className={styles.metadata}>
            <span className={styles.badge}>{movieDetail.year}</span>
            <span className={styles.badge}>{movieDetail.runtime} minutes</span>
            {movieDetail.genres?.map((genre) => (
              <span key={genre.id} className={styles.badge}>
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Trailer Section */}
        {videoId && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m7 4 10 8-10 8V4Z" />
              </svg>
              Trailer
            </h2>
            <div className={styles.trailerContainer}>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.trailer}
                title={`${movieDetail.name} trailer`}
              />
            </div>
          </section>
        )}

        {/* Cast Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Main Cast</h2>
          <div className={styles.castGrid}>
            {mainCast?.map((actor, index) => (
              <div key={index} className={styles.castCard}>
                <div className={styles.castImage}>
                  {actor.personImgURL ? (
                    <Image
                      src={actor.personImgURL}
                      alt={actor.personName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className={`${styles.placeholder} bg-gray-400 flex items-center justify-center`}
                    >
                      <span className="text-white">image not available</span>
                    </div>
                  )}
                </div>
                <h3 className={styles.actorName}>{actor.personName}</h3>
                <p className={styles.characterName}>{actor.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Movie Details Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Movie Details</h2>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <h3>Release Year</h3>
              <p>{movieDetail.year}</p>
            </div>
            <div className={styles.detailItem}>
              <h3>Runtime</h3>
              <p>{movieDetail.runtime} minutes</p>
            </div>
            <div className={styles.detailItem}>
              <h3>Genres</h3>
              <div className={styles.genreList}>
                {movieDetail.genres?.map((genre) => (
                  <span key={genre.id} className={styles.badge}>
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
