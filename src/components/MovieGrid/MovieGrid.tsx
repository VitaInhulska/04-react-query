import css from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";

interface MovieGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}

export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
  const selectedMovie = (index: number) => {
    onSelect(movies[index]);
  };
  return (
    <ul className={css.grid}>
      {movies.map(({ id, title, poster_path }, i) => {
        return (
          <li key={id} onClick={() => selectedMovie(i)}>
            <div className={css.card}>
              <img
                className={css.image}
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt={title}
                loading="lazy"
              />
              <h2 className={css.title}>{title}</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
