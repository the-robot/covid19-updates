import React from 'react';

import Layout from './Layout/Default';


const News = props => {
  const { title } = props;

  return (
    <Layout activeSidebarIndex={1} title={title} childProps={props}>
      <h1> News </h1>
    </Layout>
  );
};

export default News;
