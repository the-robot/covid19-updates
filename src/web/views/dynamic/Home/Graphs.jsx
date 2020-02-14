import React from 'react';

import BarGraph from '../../Components/BarGraph.jsx';
import LineGraph from '../../Components/LineGraph.jsx';


const lineData = [
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

const barData = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];


class Graphs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
    };
    this.containerRef = React.createRef()
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleContainerResize);
    this.handleContainerResize();
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleContainerResize);
  };

  handleContainerResize = e => {
    const width = this.containerRef.current.offsetWidth;
    this.setState({ width });
  };

  render() {
    return (
      <div ref={this.containerRef} className='graphs-container'>
        <LineGraph
          data={lineData}
          width={this.state.width}
          height={this.state.width / 2.5}
          maxHeight={250}
          dataKey="pv"
          xAxisKey="name"
          title="Infections"
          strokeColor="#ffa502"
        />

        <LineGraph
          data={lineData}
          width={this.state.width}
          height={this.state.width / 2.5}
          maxHeight={250}
          dataKey="pv"
          xAxisKey="name"
          title="Deaths"
          strokeColor="#eb4d4b"
        />

        <LineGraph
          data={lineData}
          width={this.state.width}
          height={this.state.width / 2.5}
          maxHeight={250}
          dataKey="pv"
          xAxisKey="name"
          title="Recovered"
          strokeColor="#2ecc71"
        />

        <BarGraph
          data={barData}
          width={this.state.width}
          height={this.state.width / 2.5}
          maxHeight={250}
          dataKey1="pv"
          dataKey2="uv"
          xAxisKey="name"
          title="Infections &amp; Deaths Comparison"
          strokeColor1="#ffa502"
          strokeColor2="#eb4d4b"
        />
      </div>
    );
  };
};

export default Graphs;
