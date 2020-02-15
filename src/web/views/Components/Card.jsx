import PropTypes from 'prop-types';
import React from 'react';

import { formatNumber } from '../utils';

const Card = props => {
  const { color, count, message, title } = props;
  return (
    <div className='card' style={{ backgroundColor: color }}>
      <p className='title'>{title}</p>
      <p className='number'>{formatNumber(count)}</p>
      <p className='message'>{message}</p>
    </div>
  );
};

Card.propTypes = {
  color: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};


export default Card;
