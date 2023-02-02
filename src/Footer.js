import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import './Footer.css'

class Footer extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" fixed='bottom'>
        <Navbar.Brand>&copy; 2023 Brennan Ken Tyler Marco Rafael</Navbar.Brand>
      </Navbar>
    )
  }
}

export default Footer;
