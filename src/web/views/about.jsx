import React from 'react';

import Layout from './Layout/Default';


const About = props => {
  const { title } = props;

  return (
    <Layout activeSidebarIndex={3} title={title}>
      <h1> About </h1>
    </Layout>
  );
};

export default About;
