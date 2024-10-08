import React from 'react';
import ReactStars from 'react-rating-stars-component';

const RatingComponent = () => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  return (
    <ReactStars
      count={5}
      onChange={ratingChanged}
      size={12}
      activeColor="#ffd700"
    />
  );
};

export default RatingComponent;
