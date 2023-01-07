import { Movie } from 'types/movie';
import './styles.css';

type Props = {
  movie: Movie;
  showSynopsis: boolean;
};

const MovieCard = ({ movie, showSynopsis }: Props) => {
  return (
    <div className={showSynopsis ? "base-card card-container-synopsis" : "base-card card-container"}>
      <div className={showSynopsis ? "card-top-container-synopsis": "card-top-container"}>
        <img src={movie.imgUrl} alt={movie.title} />
      </div>
      <div className={showSynopsis ? "card-bottom-container-synopsis": "card-bottom-container"}>
        <h2>{movie.title}</h2>
        <h6>{movie.year}</h6>
        <p>{movie.subTitle ?? '-'}</p>
        {showSynopsis ? (
          <div className="movie-details-synopsis">{movie.synopsis}</div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default MovieCard;
