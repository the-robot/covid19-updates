import PropTypes from 'prop-types';
import React from 'react';

const Default = props => {
  const title = '2019-nCoV Updates'

  return (
    <React.Fragment>
      <head>
        <title>{props.title}</title>
        <link rel="stylesheet" href="/stylesheets/style.css" />
      </head>

      <div className='header'>
      <p className='title'>{title}</p>
      </div>

      <div className='container'>
        {props.children}
      </div>
    </React.Fragment>
   );
};

Default.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Default;