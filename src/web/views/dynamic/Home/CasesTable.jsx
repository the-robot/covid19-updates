import { Col, Grid, Row } from 'rsuite';
import PropTypes from 'prop-types';
import React from 'react';

import DataTable from '../../Components/DataTable.jsx';


class CasesTable extends React.Component {
  render() {
    const { infectionsTableData, deathsTableData } = this.props;

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
  infectionsTableData: PropTypes.array.isRequired,
  deathsTableData: PropTypes.array.isRequired,
}

export default CasesTable;
