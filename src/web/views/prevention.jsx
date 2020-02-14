import React from 'react';

import Layout from './Layout/Default';


const Prevention = props => {
  const { title } = props;

  return (
    <Layout activeSidebarIndex={2} title={title} childProps={props}>
      <h1> Prevention </h1>
    </Layout>
  );
};

export default Prevention;
