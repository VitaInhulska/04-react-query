import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import css from "./App.module.css";
import toast, { Toaster } from "react-hot-toast";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data?.results.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [data]);

  const totalPages = data?.total_pages ?? 1;

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handleSelect = (movie: Movie) => {
    setCurrentMovie(movie);
  };

  const handleCloseModal = () => {
    setCurrentMovie(null);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {isSuccess && totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {isSuccess && data.results.length > 0 && (
        <MovieGrid movies={data.results} onSelect={handleSelect} />
      )}
      {currentMovie && (
        <MovieModal movie={currentMovie} onClose={handleCloseModal} />
      )}

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <Toaster />
    </div>
  );
}
