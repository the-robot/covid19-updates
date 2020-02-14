import { FlexboxGrid } from 'rsuite';
import PropTypes from 'prop-types';
import React from 'react';

import DataTable from '../../Components/DataTable.jsx';


class CasesTable extends React.Component {
  render() {
    const { infectionsTableData, deathsTableData } = this.props;

    return (
      <FlexboxGrid justify="space-around">
        <FlexboxGrid.Item colspan={11}>
          <DataTable summaryColor='#FFA503' title='infections' data={infectionsTableData} />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={11}>
          <DataTable summaryColor='#C0392C' title='deaths' data={deathsTableData} />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    );
  }
}

CasesTable.propTypes = {
  infectionsTableData: PropTypes.array.isRequired,
  deathsTableData: PropTypes.array.isRequired,
}

export default CasesTable;
