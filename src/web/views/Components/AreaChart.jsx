import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import PropTypes from 'prop-types';
import React from 'react';


const Chart = props => {
  const data = [
    {
      name: 'Page A', pv: 2400, amt: 2400,
    },
    {
      name: 'Page B', pv: 1398, amt: 2210,
    },
    {
      name: 'Page C', pv: 9800, amt: 2290,
    },
    {
      name: 'Page D', pv: 3908, amt: 2000,
    },
    {
      name: 'Page E', pv: 4800, amt: 2181,
    },
    {
      name: 'Page F', pv: 3800, amt: 2500,
    },
    {
      name: 'Page G', pv: 4300, amt: 2100,
    },
  ];

  return (
    <LineChart
        width={600}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
  );
};

Chart.propTypes = {};

export default Chart;
