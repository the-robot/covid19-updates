import { FlexboxGrid } from 'rsuite';
import React from 'react';

import DataTable from '../../Components/DataTable.jsx';

const fakeData = [
  {
    "id": 1,
    "firstName": "Ernest",
    "count": 820,
    "level": <p>X</p>
  },
  {
    "id": 2,
    "firstName": "Ernest",
    "count": 820,
    "level": <p>X</p>
  },
];

class CasesTable extends React.Component {
  render() {
    return (
      <FlexboxGrid justify="space-around">
        <FlexboxGrid.Item colspan={11}>
          <DataTable summaryColor='#FFA503' title='infections' data={fakeData} />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={11}>
          <DataTable summaryColor='#C0392C' title='deaths' data={fakeData} />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    );
  };
}

export default CasesTable;
