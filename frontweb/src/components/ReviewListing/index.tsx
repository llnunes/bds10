import ReviewMovie from 'components/ReviewMovie';
import { Review } from 'types/review';

import './styles.css';

type Props = {
  reviews: Review[];
}

const ReviewListing = ({reviews} : Props) => {

  return (
    <div className="base-card review-listing-card">
      <div className="row">
        {reviews && reviews?.map((review) => (
            <div className="col-sm-12 col-lg-12 col-xl-12" key={review.id}>
              <ReviewMovie review={review} /> 
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default ReviewListing;
