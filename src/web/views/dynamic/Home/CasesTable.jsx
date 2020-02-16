import { Col, Grid, Row } from 'rsuite';
import PropTypes from 'prop-types';
import React from 'react';

import DataTable from '../../Components/DataTable.jsx';


class CasesTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      infectionsTableData: [],
      deathsTableData: [],
    };
  }

  componentDidMount() {
    const { countriesCasesData } = this.props;
    const sortByCount = (a, b) => {
      if (a.count > b.count) {
        return -1;
      }
      if (b.count > a.count) {
          return 1;
      }
      return 0;
    }
    const infectionsTableData = [];
    const deathsTableData = [];

    // format data
    for (let i=0; i<countriesCasesData.length; i++) {
      let data = countriesCasesData[i];
      infectionsTableData.push({
        "id": i + 1,
        "country": data.country,
        "count": data.cases,
      });
      deathsTableData.push({
        "id": i + 1,
        "country": data.country,
        "count": data.deaths,
      });
    }

    // sort by count
    infectionsTableData.sort(sortByCount);
    deathsTableData.sort(sortByCount);

    this.setState({
      infectionsTableData,
      deathsTableData
    });
  }

  render() {
    const { infectionsTableData, deathsTableData } = this.state;

    return (
      <Grid fluid>
        <Row>
          <Col xs={24} sm={12}>
            <DataTable summaryColor='#FFA503' title='infections' data={infectionsTableData} />
          </Col>
          <Col xs={24} sm={12}>
            <DataTable summaryColor='#C0392C' title='deaths' data={deathsTableData} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

CasesTable.propTypes = {
  countriesCasesData: PropTypes.array,
}

CasesTable.defaultProps = {
  countriesCasesData: [],
}

export default CasesTable;
