import { FlexboxGrid } from 'rsuite';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { Card } from './Components';
import CasesTable from './dynamic/Home/CasesTable';
import Graphs from './dynamic/Home/Graphs';
import Layout from './Layout/Default';


const OverviewCounts = props => {
  const { cases, deaths, recovered } = props;
  return (
    <FlexboxGrid justify="space-around">
      <FlexboxGrid.Item colspan={7}>
        <Card color='#ffa502' count={cases} message={'confirmed infected'} title={'Infections'} />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={7}>
        <Card color='#c0392b' count={deaths} message={'confirmed dead'} title={'Deaths'} />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={7}>
        <Card color='#2ecc71' count={recovered} message={'people recovered'} title={'Recovered'} />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

OverviewCounts.propTypes = {
  cases: PropTypes.number.isRequired,
  deaths: PropTypes.number.isRequired,
  recovered: PropTypes.number.isRequired,
};


const Index = props => {
  const {
    title,
    overviewData,
  } = props;

  // Dynamic Components
  const graphsHtml = ReactDOMServer.renderToString(<Graphs />);
  const tablesHtml = ReactDOMServer.renderToString(<CasesTable />);

  return (
    <Layout activeSidebarIndex={0} title={title} childProps={props}>
      <OverviewCounts
        cases={overviewData.cases}
        deaths={overviewData.deaths}
        recovered={overviewData.recovered}
      />

      {/* Dynamic Contents */}
      <div id="home-graphs" dangerouslySetInnerHTML={{__html: graphsHtml}} />
      <div id="home-cases-tables" dangerouslySetInnerHTML={{__html: tablesHtml}} />
    </Layout>
  );
};

export default Index;
