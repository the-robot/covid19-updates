import React from 'react';

import Layout from './Layout/Default';


const Index = props => {
  const { title } = props;

  return (
    <Layout title={title}>
      <h1> Hello World </h1>
    </Layout>
  );
};

export default Index;
