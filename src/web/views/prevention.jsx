import React from 'react';

import Layout from './Layout/Default';


const Prevention = props => {
  const { title } = props;

  return (
    <Layout activeSidebarIndex={1} title={title}>
      <h1> Prevention </h1>
    </Layout>
  );
};

export default Prevention;
