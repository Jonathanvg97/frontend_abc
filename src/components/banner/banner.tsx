"use client";
import { IconHeart } from "@public/icons";
import React from "react";
import styles from "./banner.module.css";
import { useMovieStore } from "@/store/useMovieStore";
import useMovies from "@/hooks/useMovies";

const Banner = () => {
  //Store
  const { defaultDataBanner, favoriteMovies } = useMovieStore();
  //Hook
  const { handleToggleFavorite, getDetailMovie, loadingDetail } = useMovies();
  const { id, title, posterUrl, description } = defaultDataBanner || {};

  return (
    <section className={styles.Banner}>
      <article className={styles.Banner__article}>
        {/* Imagen de fondo */}
        <div
          className={styles.Banner__backgroundImage}
          style={{ backgroundImage: `url(${posterUrl})` }}
        />

        {/* Degradado */}
        <div className={styles.Banner__gradient} />

        {/* Contenido del texto */}
        <div className={styles.Banner__content}>
          <h1 className="text-4xl font-bold" style={{ margin: 0 }}>
            {title}
          </h1>
          <p className="text-lg font-medium" style={{ margin: 0 }}>
            {description}
          </p>
        </div>
      </article>

      {/* Barra negra estilo footer */}
      <div className={styles.Banner__footer}>
        {/* Contenedor del porcentaje en la parte inferior derecha */}
        <div className={styles.Banner__footerContent}>
          <button
            onClick={() => handleToggleFavorite(id as string)}
            className=" cursor-pointer"
          >
            <IconHeart
              isFavorite={favoriteMovies.some((movie) => movie.id === id)}
              className={`h-5 w-5 transition-colors ${
                favoriteMovies.some((movie) => movie.id === id)
                  ? "text-red-500"
                  : "text-white group-hover/fav:text-red-500"
              }`}
            />
          </button>
          <button
            className="bg-primary rounded-lg p-2"
            onClick={() => getDetailMovie(id as string)}
            disabled={loadingDetail}
          >
            {loadingDetail ? "Loading..." : "More info"}
          </button>
          <div className={styles.Banner__percentage}>97%</div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
