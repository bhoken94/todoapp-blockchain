import React, { Component } from 'react';
import TodoListContract from './contracts/TodoList.json';
import getWeb3 from './adapters/getWeb3';
import Spinner from 'react-bootstrap/Spinner';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar';
import TodoList from './components/TodoList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { web3: null, accounts: null, contract: null };
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TodoListContract.networks[networkId];
      const instance = new web3.eth.Contract(TodoListContract.abi, deployedNetwork && deployedNetwork.address);
      // Set web3, accounts, and contract to the state
      //Get List of tasks from blockChain and set in the component state
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      console.error(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return (
        <div className="text-center mt-3">
          <Spinner animation="border" variant="primary" />
        </div>
      );
    }
    return (
      <>
        <NavigationBar account={this.state.accounts[0]}></NavigationBar>
        <div className="todo-app">
          <TodoList contract={this.state.contract} account={this.state.accounts[0]}></TodoList>
        </div>
      </>
    );
  }
}
export default App;
