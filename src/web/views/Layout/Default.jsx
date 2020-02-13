import { FlexboxGrid, Icon, Nav, Sidenav } from 'rsuite';
import PropTypes from 'prop-types';
import React from 'react';

// import route urls
import { routes } from '../../routes';

// import contants
import CONSTANTS from '../../constants';


const Default = props => {
  const { activeSidebarIndex, title } = props;
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
            <Nav.Item href={routes.prevention} eventKey="sidebar-1" icon={<Icon icon="heart" />}>
              Prevention
            </Nav.Item>
            <Nav.Item href={TELEGRAM_CHANNEL}  eventKey="sidebar-2" icon={<Icon icon="telegram" />}>
              Telegram
            </Nav.Item>
            <Nav.Item href={routes.about} eventKey="sidebar-3" icon={<Icon icon="group" />}>
              About
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );

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

        <FlexboxGrid.Item colspan={7} className='content-container'>
          {props.children}
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </React.Fragment>
   );
};

Default.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
};

export default Default;
