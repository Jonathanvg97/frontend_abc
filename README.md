# Prueba Técnica Frontend - Aplicación de Películas con Next.js

Este proyecto es una aplicación de películas construida con **Next.js**, **TypeScript** y estilizada utilizando **Tailwind CSS** y **CSS Modules**. La aplicación obtiene los datos de películas desde la API [TheTVDB](https://api4.thetvdb.com/v4) y permite a los usuarios ver detalles de las películas, agregar películas a su lista de favoritas, y persistir los datos utilizando IndexedDB con **Dexie.js**. La app implementa **Server-Side Rendering (SSR)** para obtener todas las películas desde el servidor, mejorando el rendimiento especialmente cuando se trata de grandes volúmenes de datos.

Adicionalmente, el manejo del estado se realiza con **Zustand**, siguiendo una arquitectura limpia donde la lógica de negocio está bien separada.

---

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Características](#características)
- [Arquitectura](#arquitectura)
- [Tecnologías Usadas](#tecnologías-usadas)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Variables de Entorno](#variables-de-entorno)
- [Despliegue](#despliegue)
- [Licencia](#licencia)

---

## Instalación

Para comenzar con el proyecto, sigue estos pasos:

1. **Clonar el repositorio**:
   ```bash
   git clone <url_del_repositorio>
   cd <carpeta_del_proyecto>
   ```
2. **npm install**:
   ```bash
    npm install
   ```
3. **Configurar las variables de entorno: Crea un archivo .env en la raíz del proyecto y agrega las variables necesarias. tomar de guia el .env.example**:
   ```bash
   .env
   ```
4. **Ejecutar el servidor de desarrollo: Para ejecutar la aplicación de manera local**:
   ```bash
    npm run dev
   ```
5. **Visita en tu navegador el puerto**:

   ```bash
    http://localhost:3000
   ```

## Uso

1. **Ver Películas**:
   ```bash
   La página principal muestra una cuadrícula de películas obtenidas desde la API de TheTVDB. Puedes navegar entre las diferentes páginas usando paginación.
   ```
2. **Detalles de la Película**:
   ```bash
   Al hacer clic en una tarjeta de película, serás redirigido a una página de detalles con más información sobre la película seleccionada.
   ```
3. **Películas Favoritas**:
   ```bash
   Puedes agregar películas a tu lista de favoritas, que se almacenarán de manera persistente en IndexedDB usando Dexie.js. Puedes ver todas tus películas favoritas en la página "Películas Favoritas".
   ```
4. **Funcionalidad de Búsqueda**:
   ```bash
   Hay una barra de búsqueda que permite filtrar las películas por título".
   ```

## Características

1. **Lista de Películas**:
   ```bash
   Muestra una cuadrícula de películas con información básica.
   ```
2. **Detalles de Película**:
   ```bash
    Muestra información detallada sobre una película seleccionada.
   ```
3. **Películas Favoritas**:
   ```bash
   Permite a los usuarios marcar películas como favoritas y persiste la información en IndexedDB.
   ```
4. **Funcionalidad de Búsqueda**:
   ```bash
   Barra de búsqueda para filtrar películas por título.
   ```
5. **Renderizado del Lado del Servidor (SSR)**:
   ```bash
   Las películas se obtienen desde el servidor para mejorar el rendimiento.
   ```
6. **Arquitectura Limpia**:
   ```bash
   La lógica de negocio y el manejo del estado están separados en módulos bien organizados.
   ```
7. **Diseño Responsivo**:
   ```bash
   La aplicación es completamente responsiva y se adapta a diferentes tamaños de pantalla..
   ```

## Arquitectura

La aplicación sigue un enfoque de arquitectura limpia, donde:

1. **La lógica de negocio está separada en hooks, servicios y tiendas.**
2. **Los componentes de UI se encuentran en la carpeta components.**
3. **El manejo del estado se realiza con Zustand, que gestiona el estado global de la aplicación.**
4. **La persistencia se maneja con Dexie.js para almacenar las películas favoritas en IndexedDB.**

## Tecnologías Usadas

1. **Next.js: Framework de React para la construcción de la aplicación con SSR.**
2. **TypeScript: JavaScript con tipado estático para una mejor experiencia de desarrollo.**
3. **Tailwind CSS: Framework de CSS utilitario para el desarrollo rápido de interfaces.**
4. **CSS Modules: Para estilos modulares y con alcance limitado.**
5. **Dexie.js: Una capa para IndexedDB que facilita la persistencia de datos en el navegador.**
6. **Zustand: Una librería pequeña y rápida para la gestión de estado.**
7. **TheTVDB API: API para obtener datos de películas.**
8. **React: Para la construcción de la interfaz de usuario.**

## Estructura de Carpetas

Aquí tienes un resumen de la estructura de carpetas del proyecto:

└── 📁src
└── 📁app
└── 📁[movieId]
└── page.tsx
└── 📁favoriteMovies
└── page.tsx
└── globals.css
└── layout.tsx
└── 📁layouts
└── MainLayout.tsx
└── loading.tsx
└── page.tsx
└── 📁components
└── 📁banner
└── banner.module.css
└── banner.tsx
└── 📁bodyModalLogin
└── bodyModalLogin.tsx
└── 📁bodyModalRegister
└── bodyModalRegister.tsx
└── 📁cardMovie
└── cardMovie.tsx
└── movieGrid.tsx
└── 📁modalLogin
└── modalLogin.tsx
└── 📁movieDetail
└── movie-detail.module.css
└── movieDetail.tsx
└── 📁moviePaginate
└── moviePaginate.tsx
└── 📁movieSidebar
└── movieSidebar.tsx
└── 📁moviesNotFound
└── moviesNotFound.tsx
└── 📁sideNav
└── sideNav.tsx
└── 📁UI
└── movieSkeleton.tsx
└── 📁config
└── db.ts
└── envs.ts
└── paths.ts
└── 📁hooks
└── useMovies.ts
└── 📁services
└── movies.service.ts
└── 📁store
└── useMovieStore.ts
└── 📁utils
└── 📁adapters
└── adaptMovieResponse.ts
└── 📁loaders
└── 📁types
└── movieTypes.ts
└── typesModal.ts

## Variables de Entorno

Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables:

1. **NEXT_PUBLIC_BASE_API_URL=**
2. **NEXT_PUBLIC_API_CLIENT**
3. **NEXT_PUBLIC_TOKEN_ACCESS**
4. **NEXT_PUBLIC_NODE_ENV**

# Despliegue
**https://frontend-abc.vercel.app/**

## Licencia

**by Jonathan Vanegas**

Este README proporciona todos los detalles relevantes del proyecto, incluyendo la instalación, uso, características, arquitectura y más, todo en español.
