import { Table } from 'rsuite';
import PropTypes from 'prop-types';
import React from 'react';

const { Cell, Column, HeaderCell } = Table;


const thousands = value => `${value}`.replace(/(?=(?!(\b))(\d{3})+$)/g, '$1,');

const NumberCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props}>{thousands(rowData[dataKey])}</Cell>
);

const HeaderSummary = ({ title, summary, color }) => (
  <div>
    <label>{title}</label>
    <div
      style={{
        fontSize: 18,
        color: color,
      }}
    >
      {thousands(summary)}
    </div>
  </div>
);

class DataTable extends React.Component {
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

  getLevel = count => {
    if (count <= 0) {
      return (
        <div className='level' style={{ backgroundColor: '#2ecc71'}}>
          <p className='level-text'>None</p>
        </div>
      );
    } else if (count > 500) {
      return (
        <div className='level' style={{ backgroundColor: '#e74c3c'}}>
          <p className='level-text'>High</p>
        </div>
      );
    } else {
      return (
        <div className='level' style={{ backgroundColor: '#f39c12'}}>
          <p className='level-text'>Low</p>
        </div>
      );
    }
  };

  render() {
    const { data, title, summaryColor } = this.props;

    // get summary
    let totalCount = 0;
    data.forEach(item => {
      totalCount += item.count;
    });
    const containerWidth = this.state.width;

    // set color level
    for (let i=0; i<data.length; i++) {
      data[i].level = this.getLevel(data[i].count);
    };

    return (
      <div ref={this.containerRef} className='table-container'>
        <p className='title'>{title}</p>

        <Table height={420} headerHeight={80} data={data} align='center'>
          <Column width={containerWidth * 0.15}>
            <HeaderCell></HeaderCell>
            <Cell dataKey="level"/>
          </Column>

          <Column width={containerWidth * 0.4} align='left'>
            <HeaderCell style={{ fontSize: '16px'}}>Country</HeaderCell>
            <Cell dataKey="country"/>
          </Column>

          <Column width={containerWidth * 0.25} align='right'>
            <HeaderCell style={{ fontSize: '16px'}}>
              <HeaderSummary color={summaryColor} title="Total" summary={totalCount} />
            </HeaderCell>
            <NumberCell dataKey="count"/>
          </Column>
        </Table>
      </div>
    );
  };
}

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  summaryColor: PropTypes.string
};

DataTable.defaultProps = {
  data: [],
  summaryColor: '#000000',
};

export default DataTable;
