import { Icon, Nav, Sidenav } from 'rsuite';
import PropTypes from 'prop-types';
import React from 'react';

// import route urls
import { routes } from '../../routes';

// import contants
import CONSTANTS from '../../constants';


const Sidebar = props => {
  const { activeNavIndex } = props;
  const { APP_TITLE: navbarTitle, TELEGRAM_CHANNEL, WHO_URL } = CONSTANTS;

  return (
    <div className="sidebar-container">
      <Sidenav activeKey={`sidebar-${activeNavIndex}`} appearance="default" className="sidebar-nav">
        <Sidenav.Body>
          <p className="title">{navbarTitle}</p>
          <Nav>
            <Nav.Item href={routes.index} eventKey="sidebar-0" icon={<Icon icon="dashboard" />}>
              Home
            </Nav.Item>
            <Nav.Item href={routes.news} eventKey="sidebar-1" icon={<Icon icon="newspaper-o" />}>
              News
            </Nav.Item>
            <Nav.Item href={TELEGRAM_CHANNEL} eventKey="sidebar-3" icon={<Icon icon="telegram" />}>
              Telegram Channel
            </Nav.Item>
            <Nav.Item href={WHO_URL} eventKey="sidebar-2" icon={<Icon icon="heartbeat" />}>
              About COVID-19
            </Nav.Item>
            <Nav.Item href={routes.about} eventKey="sidebar-4" icon={<Icon icon="group" />}>
              About
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

Sidebar.propTypes = {
  activeNavIndex: PropTypes.number,
};

Sidebar.defaultProps = {
  activeNavIndex: 0,
};

export default Sidebar;
