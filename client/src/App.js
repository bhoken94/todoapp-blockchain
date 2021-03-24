import React, { Component } from 'react';
import TodoListContract from './contracts/TodoList.json';
import getWeb3 from './adapters/getWeb3';
import Spinner from 'react-bootstrap/Spinner';
import NavigationBar from './components/NavigationBar';
import TodoList from './components/TodoList';
import { ToastContainer, toast } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { web3: null, accounts: null, contract: null, tasks: [] };
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
      const taskCount = await instance.methods.taskCount().call();
      for (var i = 1; i <= taskCount; i++) {
        // Fetch the task data from the blockchain
        const task = await instance.methods.taskList(i).call();
        this.setState({ tasks: [...this.state.tasks, task] });
      }
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      toast.error("🦊 Scarica MetaMask per usare l'app!");
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
        <ToastContainer />
        <NavigationBar account={this.state.accounts[0]} />
        <div className="todo-app">
          <TodoList tasks={this.state.tasks} contract={this.state.contract} account={this.state.accounts[0]} />
        </div>
      </>
    );
  }
}
export default App;
