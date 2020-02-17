import React from 'react';
import ReactDOMServer from 'react-dom/server';

import CasesTable from './dynamic/Home/CasesTable';
import Graphs from './dynamic/Home/Graphs';
import Layout from './Layout/Default';
import Overviews from './dynamic/Home/Overviews';


const Index = props => {
  const {
    title,
  } = props;

  // Dynamic Components
  const overviewsHtml = ReactDOMServer.renderToString(<Overviews />);
  const graphsHtml = ReactDOMServer.renderToString(<Graphs />);
  const tablesHtml = ReactDOMServer.renderToString(<CasesTable />);

  return (
    <Layout activeNavIndex={0} title={title} childProps={props}>
      {/* Dynamic Contents */}
      <div id="home-overviews" dangerouslySetInnerHTML={{__html: overviewsHtml}} />
      <div id="home-graphs" dangerouslySetInnerHTML={{__html: graphsHtml}} />
      <div id="home-cases-tables" dangerouslySetInnerHTML={{__html: tablesHtml}} />
    </Layout>
  );
};

export default Index;
