import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3/search/movie";

interface MovieResponse {
  page: number;
  total_pages: number;
  results: Movie[];
  total_results: number;
}

export async function fetchMovies(
  query: string,
  page: number
): Promise<MovieResponse> {
  const response = await axios.get<MovieResponse>(BASE_URL, {
    params: { query, page },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });

  return response.data;
}
