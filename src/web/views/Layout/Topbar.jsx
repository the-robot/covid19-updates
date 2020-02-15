import { Dropdown, Nav, Navbar } from 'rsuite';
import React from 'react';

// import route urls
import routes from '../../routes/urls';

// import contants
import CONSTANTS from '../../constants';


class Topbar extends React.Component {
  render() {
    const { TELEGRAM_CHANNEL, WHO_URL } = CONSTANTS;

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
              <Nav.Item href={routes.index}>Home</Nav.Item>
              <Nav.Item href={routes.news}>News</Nav.Item>
              <Dropdown title="More" placement='bottomEnd'>
                <Dropdown.Item href={TELEGRAM_CHANNEL} >Telegram Bot</Dropdown.Item>
                <Dropdown.Item href={WHO_URL} >About COVID-19</Dropdown.Item>
                <Dropdown.Item href={routes.about}>About</Dropdown.Item>
              </Dropdown>
            </Nav>
          </Navbar.Body>
        </Navbar>
      </div>
    );
  }
}

export default Topbar;
