import { Col, Grid, Row } from 'rsuite';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Layout from './Layout/Default';
import NewsFeed from './dynamic/News/NewsFeed';
import Reddit from './dynamic/News/Reddit';
import Tweets from './dynamic/News/Tweets';


const News = props => {
  const { title } = props;
  
  // Dynamic Components
  const newsFeedHtml = ReactDOMServer.renderToString(<NewsFeed />);
  const redditHtml = ReactDOMServer.renderToString(<Reddit />);
  const tweetsHtml = ReactDOMServer.renderToString(<Tweets />);

  return (
    <Layout activeSidebarIndex={1} title={title} childProps={props}>
      {/* Dynamic Contents */}
      <Grid fluid className='news-container'>
        <Row>
          <Col colspan={24} className='newsfeed-container'>
            <div id="news-newsfeed" dangerouslySetInnerHTML={{__html: newsFeedHtml}} />
          </Col>
        </Row>

        <Row>
          <Col xs={24} sm={11} className='redditfeed-container'>
            <div id="news-reddit" dangerouslySetInnerHTML={{__html: redditHtml}} />
          </Col>
          <Col xs={24} sm={2} style={{width: '2%' }} />
          <Col xs={24} sm={11} className='tweetsfeed-container'>
          <div id="news-tweets" dangerouslySetInnerHTML={{__html: tweetsHtml}} />
          </Col>
        </Row>
      </Grid>
    </Layout>
  );
};

export default News;
