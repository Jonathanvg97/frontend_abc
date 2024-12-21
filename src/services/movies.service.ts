import envs from "@/config/envs";
import pathsAPIS from "@/config/paths";
import { MoviesResponse } from "@/utils/types/movieTypes";
import axios, { AxiosError } from "axios";

const API_URL = envs.BASE_API_URL || "";

export const getAllMovies = async (
  page?: number
): Promise<MoviesResponse | null> => {
  try {
    const response = await axios.get(`${API_URL}${pathsAPIS.ALL_MOVIES}`, {
      headers: {
        Authorization: envs.TOKEN_ACCESS,
      },
      params: {
        page: page || 1, // Si no se pasa página, toma la 1
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(
        "Error fetching movies:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
    return null;
  }
};