import { Movie } from 'types/movie';
import './styles.css';

type Props = {
  movie: Movie;
};

const MovieCard = ({ movie }: Props) => {
  return (
    <div className="base-card card-container">
      <div className="card-top-container">
        <img src={movie.imgUrl} alt={movie.title} />
      </div>
      <div className="card-bottom-container">
        <h2>{movie.title}</h2>
        <h6>{movie.year}</h6>
        <p>{movie.subTitle ?? '-'}</p>
      </div>
    </div>
  );
};

export default MovieCard;
