import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';

export default class NavigationBar extends Component {
  render() {
    const account = this.props.account;
    return (
      <Navbar bg="dark" variant="dark" className="d-flex justify-content-between">
        <Navbar.Brand href="#home">
          <FontAwesomeIcon icon={faEthereum} className="mr-3" />
          Todo App
        </Navbar.Brand>
        <div className="text-white">{account}</div>
      </Navbar>
    );
  }
}
