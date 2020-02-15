import { Dropdown, Nav, Navbar } from 'rsuite';
import PropTypes from 'prop-types';
import React from 'react';

// import contants
import CONSTANTS from '../../constants';


class Topbar extends React.Component {
  render() {
    const { activeNavIndex } = this.props;
    const { APP_TITLE: navbarTitle, TELEGRAM_CHANNEL, WHO_URL } = CONSTANTS;

    return (
      <div className='topbar-container'>
        <Navbar>
          <Navbar.Header>
            <div className='header'>
              <p className='text'>COVID-19</p>
            </div>
          </Navbar.Header>
          <Navbar.Body>
            <Nav pullRight>
              <Nav.Item>Home</Nav.Item>
              <Nav.Item>News</Nav.Item>
              <Dropdown title="More" placement='bottomEnd'>
                <Dropdown.Item>Telegram Bot</Dropdown.Item>
                <Dropdown.Item>About COVID-19</Dropdown.Item>
                <Dropdown.Item>About</Dropdown.Item>
              </Dropdown>
            </Nav>
          </Navbar.Body>
        </Navbar>
      </div>
    );
  }
}

Topbar.propTypes = {
  activeNavIndex: PropTypes.number.isRequired,
};

Topbar.defaultProps = {
  activeNavIndex: 0,
};

export default Topbar;
