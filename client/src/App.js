import React, { Component } from 'react';
import TodoList from './contracts/TodoList.json';
import getWeb3 from './getWeb3';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  state = { web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TodoList.networks[networkId];
      const instance = new web3.eth.Contract(TodoList.abi, deployedNetwork && deployedNetwork.address);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      console.error(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <Navbar bg="dark" variant="dark" className="d-flex justify-content-between">
        <Navbar.Brand href="#home">
          <FontAwesomeIcon icon={faEthereum} />
          Todo App
        </Navbar.Brand>
        <div className="text-white">{this.state.accounts[0]}</div>
      </Navbar>
    );
  }
}

export default App;
