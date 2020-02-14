import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import PropTypes from 'prop-types';
import React from 'react';


const BarGraph = props => {
  const {
    data,
    dataKey1,
    dataKey2,
    height,
    margin,
    maxHeight,
    strokeColor1,
    strokeColor2,
    title,
    width,
    xAxisKey
  } = props;

  return (
    <div className='graph'>
      <p className='title'>{title}</p>
      <BarChart
        width={width}
        height={maxHeight > 0 ? (
          height <= maxHeight ? height : maxHeight
        ) : height}
        data={data}
        margin={margin}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={dataKey1} fill={strokeColor1} />
        <Bar dataKey={dataKey2} fill={strokeColor2} />
      </BarChart>
    </div>
  );
};

BarGraph.propTypes = {
  data: PropTypes.array.isRequired,
  dataKey1: PropTypes.string.isRequired,
  dataKey2: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  xAxisKey: PropTypes.string.isRequired,

  margin: PropTypes.object,
  maxHeight: PropTypes.number,
  strokeColor1: PropTypes.string,
  strokeColor2: PropTypes.string,
};

BarGraph.defaultProps = {
  margin: {
    top: 20, right: 120, left: 0, bottom: 10,
  },
  maxHeight: -1,
  strokeColor1: '#000000',
  strokeColor2: '#4d4d4d',
};

export default BarGraph;
