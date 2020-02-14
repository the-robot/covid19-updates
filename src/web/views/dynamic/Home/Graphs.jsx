import PropTypes from 'prop-types';
import React from 'react';

import BarGraph from '../../Components/BarGraph.jsx';
import LineGraph from '../../Components/LineGraph.jsx';


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
    const {
      infectionsGraphData,
      deathsGraphData,
      recoveredGraphData,
      infectionsDeathsGraphData,
    } = this.props;

    return (
      <div ref={this.containerRef} className='graphs-container'>
        <LineGraph
          data={infectionsGraphData}
          width={this.state.width}
          height={this.state.width / 2.5}
          maxHeight={250}
          dataKey="number"
          xAxisKey="name"
          title="Infections"
          strokeColor="#ffa502"
        />

        <LineGraph
          data={deathsGraphData}
          width={this.state.width}
          height={this.state.width / 2.5}
          maxHeight={250}
          dataKey="number"
          xAxisKey="name"
          title="Deaths"
          strokeColor="#eb4d4b"
        />

        <LineGraph
          data={recoveredGraphData}
          width={this.state.width}
          height={this.state.width / 2.5}
          maxHeight={250}
          dataKey="number"
          xAxisKey="name"
          title="Recovered"
          strokeColor="#2ecc71"
        />

        <BarGraph
          data={infectionsDeathsGraphData}
          width={this.state.width}
          height={this.state.width / 2.5}
          maxHeight={250}
          dataKey1="infection"
          dataKey2="death"
          xAxisKey="name"
          title="Infections &amp; Deaths Comparison"
          strokeColor1="#ffa502"
          strokeColor2="#eb4d4b"
        />
      </div>
    );
  };
};

Graphs.propTypes = {
  infectionsGraphData: PropTypes.array.isRequired,
  deathsGraphData: PropTypes.array.isRequired,
  recoveredGraphData: PropTypes.array.isRequired,
  infectionsDeathsGraphData: PropTypes.array.isRequired,
};

export default Graphs;
