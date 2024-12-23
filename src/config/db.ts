import Dexie, { type EntityTable } from "dexie";
import { Movie } from "../utils/types/movieTypes";

const db = new Dexie("ABC_DB") as Dexie & {
  favoriteMovies: EntityTable<Movie, "id">;
};

db.version(1).stores({
  favoriteMovies: "id",
});

export default db;
