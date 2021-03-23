import React, { Component } from 'react';
import Task from './Task';

export class TodoList extends Component {
  //Controlled Component Style
  constructor(props) {
    super(props);
    this.state = { content: '', tasks: [] };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = async () => {
    try {
      await this.getTaskList();
      console.log(this.state.tasks);
    } catch (error) {
      alert("Can't render task");
    }
  };

  async handleSubmit(event) {
    event.preventDefault();
    this.props.contract.methods
      .addTask(this.state.content)
      .send({ from: this.props.account })
      .then((result) => this.getTaskList().then(this.setState({ content: '' })));
  }

  handleChange(event) {
    this.setState({ content: event.target.value });
  }

  async getTaskList() {
    this.setState({ tasks: [] });
    const taskCount = await this.props.contract.methods.taskCount().call();
    for (var i = 1; i <= taskCount; i++) {
      // Fetch the task data from the blockchain
      const task = await this.props.contract.methods.taskList(i).call();
      this.setState({ tasks: [...this.state.tasks, task] });
    }
  }

  render() {
    return (
      <div className="my-2">
        <h1>What's the Plan for Today?</h1>
        <form className="todo-form" onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.content} onChange={this.handleChange} className="todo-input" placeholder="Add task..." required />
        </form>
        <ul id="taskList" className="list-unstyled">
          {this.state.tasks.map((task, key) => (
            <Task key={key} task={task}></Task>
          ))}
        </ul>
        <ul id="completedTaskList" className="list-unstyled"></ul>
      </div>
    );
  }
}

export default TodoList;
