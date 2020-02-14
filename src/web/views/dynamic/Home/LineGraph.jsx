import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import PropTypes from 'prop-types';
import React from 'react';


const LineGraph = props => {
  const {
    data,
    dataKey,
    height,
    margin,
    maxHeight,
    strokeColor,
    title,
    width,
    xAxisKey
  } = props;

  return (
    <div className='graph'>
      <p className='title'>{title}</p>
      <LineChart
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
        <Line type="monotone" dataKey={dataKey} stroke={strokeColor} activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

LineGraph.propTypes = {
  data: PropTypes.array.isRequired,
  dataKey: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  xAxisKey: PropTypes.string.isRequired,

  margin: PropTypes.object,
  maxHeight: PropTypes.number,
  strokeColor: PropTypes.string,
};

LineGraph.defaultProps = {
  margin: {
    top: 20, right: 120, left: 0, bottom: 10,
  },
  maxHeight: -1,
  strokeColor: '#000000',
};

export default LineGraph;
