import React from 'react';
import PropTypes from 'prop-types';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const StarRating = ({ count }) => {
  const maxStars = 5;
  const fullStars = Math.floor(count);
  const halfStars = count % 1 !== 0 ? 1 : 0;
  const emptyStars = maxStars - fullStars - halfStars;

  const stars = [...Array(fullStars).keys()]
    .map(key => <StarIcon key={key} style={{ fontSize: 28, color: 'gold' }} />)
    .concat(
      halfStars ? (
        <StarHalfIcon key={fullStars} style={{ fontSize: 28, color: 'gold' }} />
      ) : (
        []
      ),
    )
    .concat(
      [...Array(emptyStars).keys()].map(key => (
        <StarOutlineIcon
          key={key + fullStars + halfStars}
          style={{ fontSize: 28, color: 'gold' }}
        />
      )),
    );

  return <div>{stars}</div>;
};

StarRating.propTypes = {
  count: PropTypes.number.isRequired,
};

export default StarRating;
