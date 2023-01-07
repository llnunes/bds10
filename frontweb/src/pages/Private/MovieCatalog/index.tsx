import { AxiosRequestConfig } from 'axios';
import CardLoader from 'components/CardLoader';
import MovieFilter from 'components/MovieFilter';
import Pagination from 'components/Pagination';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Movie } from 'types/movie';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import MovieCard from '../MovieCard';
import './styles.css';

const MovieCatalog = () => {

  const [page, setPage] = useState<SpringPage<Movie>>();
  const [isLoading, setIsLoading] = useState(false);

  const getMovies = (pageNumber: number) => {

    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies?genreId=0',
      params: {
        page: pageNumber,
        size: 6,
      },
    };

    setIsLoading(true);
    requestBackend(params)
      .then((response) => {
        console.log(response.data)
        setPage(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
     ;
  }

  useEffect(() => {
    getMovies(0);
  }, []);

  return (
    <div className="container movie-catalog-container">

    <div className="row movie-filter-container">
      <MovieFilter onSubmitFilter={ () => {}} />
    </div>

    <div className="row">
        {isLoading ? (
          <CardLoader />
        ) : (
          page?.content.map((movie) => (
            <div className="col-sm-6 col-lg-4 col-xl-3" key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <MovieCard movie={movie} />
              </Link>
            </div>
          ))
        )}
      </div>


      <div className="row">
        <Pagination
          pageCount={page ? page.totalPages : 0}
          range={3}
          onChange={getMovies}
        />
      </div>
    </div>
  );
};

export default MovieCatalog;
