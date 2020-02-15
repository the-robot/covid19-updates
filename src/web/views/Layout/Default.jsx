import { Col, Grid, Row } from 'rsuite';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Sidebar from './Sidebar';
import Topbar from './Topbar';


const Layout = props => {
  const { activeNavIndex, title, childProps } = props;

  // Dynamic React Views
  const initScript = 'main(' + JSON.stringify(childProps).replace(/script/g, 'scr"+"ipt') + ')';
  const mobileNavbar = ReactDOMServer.renderToString(<Topbar />);

  return (
    <React.Fragment>
      <head>
        <title>{title}</title>
        <link rel="stylesheet" href="/stylesheets/style.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>

      <Grid fluid className='home-container'>
        <Row className='row'>
          {/* Desktop */}
          <Col sm={8} md={5} className='sidebar' style={{ height: '100%', maxWidth: '250px', padding: 0 }}>
            <Sidebar activeNavIndex={activeNavIndex}/>
          </Col>

          {/* Mobile (dynamic content) */}
          <Col colspan={24} className='topbar'>
            <div id="layout-mobile-navbar" dangerouslySetInnerHTML={{__html: mobileNavbar}} />
          </Col>

          <Col className='content-container'>
            {props.children}
          </Col>
        </Row>
      </Grid>

      <script src="/main.js" />
      <script dangerouslySetInnerHTML={{__html: initScript}} />
    </React.Fragment>
   );
};

Layout.propTypes = {
  activeNavIndex: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  componentProps: PropTypes.object,
};

Layout.defaultProps = {
  componentProps: {},
};

export default Layout;
