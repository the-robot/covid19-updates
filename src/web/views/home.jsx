import { FlexboxGrid } from 'rsuite';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { Card } from './Components';
import Graphs from './dynamic/Home/Graphs';
import Layout from './Layout/Default';


const OverviewCounts = props => {
  const { cases, deaths, recovered } = props;
  return (
    <FlexboxGrid justify="space-around">
      <FlexboxGrid.Item colspan={7}>
        <Card color='#c0392b' count={cases} message={'people confirmed infected'} title={'Infections'} />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={7}>
        <Card color='#424242' count={deaths} message={'people confirmed dead'} title={'Deaths'} />
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

    // overview data
    cases,
    deaths,
    recovered,
  } = props;

  const graphsHtml = ReactDOMServer.renderToString(<Graphs />);
  const initScript = 'xx(' + JSON.stringify(props).replace(/script/g, 'scr"+"ipt') + ')';

  return (
    <Layout activeSidebarIndex={0} title={title}>
      <OverviewCounts cases={cases} deaths={deaths} recovered={recovered} />

      <div id="graphs" dangerouslySetInnerHTML={{__html: graphsHtml}} />

      <script src="/dynamic/home.js" />
      <script dangerouslySetInnerHTML={{__html: initScript}} />
    </Layout>
  );
};

export default Index;
