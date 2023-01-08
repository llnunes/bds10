import { AxiosRequestConfig } from 'axios';
import ReviewForm from 'components/ReviewForm';
import ReviewListing from 'components/ReviewListing';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Movie } from 'types/movie';
import { Review } from 'types/review';
import { hasAnyRoles } from 'util/auth';
import { requestBackend } from 'util/requests';
import MovieCard from '../MovieCard';
import './styles.css';
import CardLoader from 'components/CardLoader';

type UrlParams = {
  movieId: string;
};

const MovieDetails = () => {
  const { movieId } = useParams<UrlParams>();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [movie, setMovie] = useState<Movie>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${movieId}`,
      withCredentials: true,
    };
    setIsLoading(true);
    requestBackend(params)
      .then((response) => {
        console.log(response.data);
        setMovie(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [movieId]);

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setReviews(response.data);
    });
  }, [movieId]);

  const handleInsertReview = (review: Review) => {
    const clone = [...reviews];
    clone.push(review);
    setReviews(clone);
  };

  return (
    <>
      <div className="container">
        <div className="movie-details-container">
          {isLoading ? (
            <CardLoader />
          ) : movie ? (
            <MovieCard movie={movie} showSynopsis={true} />
          ) : (
            ''
          )}
        </div>

        {hasAnyRoles(['ROLE_MEMBER']) && (
          <ReviewForm onInsertReview={handleInsertReview} movieId={movieId} />
        )}

        <ReviewListing reviews={reviews} />
      </div>
    </>
  );
};

export default MovieDetails;
