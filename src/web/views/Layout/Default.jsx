import { FlexboxGrid, Icon, Nav, Sidenav } from 'rsuite';
import PropTypes from 'prop-types';
import React from 'react';

// import route urls
import { routes } from '../../routes';

// import contants
import CONSTANTS from '../../constants';


const Default = props => {
  const { activeSidebarIndex, title, childProps } = props;
  const { APP_TITLE: sidebarTitle, TELEGRAM_CHANNEL } = CONSTANTS;

  const sidebar = (
    <div className="sidebar-container">
      <Sidenav activeKey={`sidebar-${activeSidebarIndex || 0}`} appearance="default" className="sidebar-nav">
        <Sidenav.Body>
          <p className="title">{sidebarTitle}</p>
          <Nav>
            <Nav.Item href={routes.index} eventKey="sidebar-0" icon={<Icon icon="dashboard" />}>
              Dashboard
            </Nav.Item>
            <Nav.Item href={routes.news} eventKey="sidebar-1" icon={<Icon icon="heart" />}>
              News
            </Nav.Item>
            <Nav.Item href={routes.prevention} eventKey="sidebar-2" icon={<Icon icon="heart" />}>
              Prevention
            </Nav.Item>
            <Nav.Item href={TELEGRAM_CHANNEL}  eventKey="sidebar-3" icon={<Icon icon="telegram" />}>
              Telegram
            </Nav.Item>
            <Nav.Item href={routes.about} eventKey="sidebar-4" icon={<Icon icon="group" />}>
              About
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );

  // Dynamic React Views
  const initScript = 'main(' + JSON.stringify(childProps).replace(/script/g, 'scr"+"ipt') + ')';

  return (
    <React.Fragment>
      <head>
        <title>{title}</title>
        <link rel="stylesheet" href="/stylesheets/style.css" />
      </head>

      <FlexboxGrid className='home-container'>
        <FlexboxGrid.Item colspan={5} className='sidebar' style={{ height: '100%', maxWidth: '250px' }}>
          {sidebar}
        </FlexboxGrid.Item>

        <FlexboxGrid.Item colspan={19} className='content-container'>
          {props.children}
        </FlexboxGrid.Item>
      </FlexboxGrid>

      <script src="/main.js" />
      <script dangerouslySetInnerHTML={{__html: initScript}} />
    </React.Fragment>
   );
};

Default.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  componentProps: PropTypes.object,
};

Default.defaultProps = {
  componentProps: {},
};

export default Default;
