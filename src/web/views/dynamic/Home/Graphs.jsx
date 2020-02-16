import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';

import BarGraph from '../../Components/BarGraph.jsx';
import LineGraph from '../../Components/LineGraph.jsx';


class Graphs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,

      // graph data
      infectionsGraphData: [],
      deathsGraphData: [],
      recoveredGraphData: [],
      infectionsDeathsGraphData: [],
    };
    this.containerRef = React.createRef()
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleContainerResize);
    this.handleContainerResize();

    // format graph data
    const { overallRecords } = this.props;
    const infectionsGraphData = [];
    const deathsGraphData = [];
    const recoveredGraphData = [];
    const infectionsDeathsGraphData = [];

    for (let i=0; i<overallRecords.length; i++) {
      let record = overallRecords[i];
      let date = moment(record.added_date)
        .subtract(1, 'days')
        .format('DD-MM-YYYY');

      // build graph data
      infectionsGraphData.push({ name: date, count: record.cases });
      deathsGraphData.push({ name: date, count: record.deaths });
      recoveredGraphData.push({ name: date, count: record.cured || 0 });
      infectionsDeathsGraphData.push({
        name: date,
        infection: record.cases,
        death: record.deaths,
      });
    }

    this.setState({
      infectionsGraphData,
      deathsGraphData,
      recoveredGraphData,
      infectionsDeathsGraphData,
    });
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
    } = this.state;

    return (
      <div ref={this.containerRef} className='graphs-container'>
        <LineGraph
          data={infectionsGraphData}
          width={this.state.width * 0.85}
          height={this.state.width * 0.6}
          maxHeight={250}
          dataKey="count"
          xAxisKey="name"
          title="Infections"
          strokeColor="#ffa502"
        />

        <LineGraph
          data={deathsGraphData}
          width={this.state.width * 0.85}
          height={this.state.width * 0.6}
          maxHeight={250}
          dataKey="count"
          xAxisKey="name"
          title="Deaths"
          strokeColor="#eb4d4b"
        />

        <LineGraph
          data={recoveredGraphData}
          width={this.state.width * 0.85}
          height={this.state.width * 0.6}
          maxHeight={250}
          dataKey="count"
          xAxisKey="name"
          title="Recovered"
          strokeColor="#2ecc71"
        />

        <BarGraph
          data={infectionsDeathsGraphData}
          width={this.state.width * 0.85}
          height={this.state.width * 0.6}
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
  overallRecords: PropTypes.array,
};

Graphs.defaultProps = {
  overallRecords: [],
};

export default Graphs;
