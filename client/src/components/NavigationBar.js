import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = { account: this.props.account };
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark" className="d-flex justify-content-between">
        <Navbar.Brand href="#home">
          <img className="mr-3" width="20px" height="30px" src={process.env.PUBLIC_URL + 'logo.png'} alt="Logo"></img>
          Todo App
        </Navbar.Brand>
        <div className="text-white">{this.state.account}</div>
      </Navbar>
    );
  }
}
