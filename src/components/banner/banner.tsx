import { IconHeart } from "@public/icons";
import React from "react";
import styles from "./banner.module.css";
type BannerProps = {
  backgroundImage?: string;
};

const Banner = ({ backgroundImage }: BannerProps) => {
  backgroundImage = "images/banner.jpeg";

  return (
    <section className={styles.Banner}>
      <article className={styles.Banner__article}>
        {/* Imagen de fondo */}
        <div
          className={styles.Banner__backgroundImage}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />

        {/* Degradado */}
        <div className={styles.Banner__gradient} />

        {/* Contenido del texto */}
        <div className={styles.Banner__content}>
          <h1 className="text-4xl font-bold" style={{ margin: 0 }}>
            Kung Fu Panda 4
          </h1>
          <p className="text-lg font-medium" style={{ margin: 0 }}>
            Join Po and the Furious Five on a new epic adventure! Discover the
            power of friendship and the strength within! Get ready to unleash
            your inner warrior! 🥋✨
          </p>
        </div>
      </article>

      {/* Barra negra estilo footer */}
      <div className={styles.Banner__footer}>
        {/* Contenedor del porcentaje en la parte inferior derecha */}
        <div className={styles.Banner__footerContent}>
          <IconHeart />
          <div className={styles.Banner__percentage}>97%</div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
