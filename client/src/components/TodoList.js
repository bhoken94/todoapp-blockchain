import React, { Component } from 'react';
import Task from './Task';
import { toast } from 'react-toastify';

export class TodoList extends Component {
  //Controlled Component Style
  constructor(props) {
    super(props);
    this.state = { content: '', tasks: this.props.tasks };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.contract.methods
      .addTask(this.state.content)
      .send({ from: this.props.account })
      .then((result) => {
        this.setState({
          tasks: [
            ...this.state.tasks,
            {
              id: result.events.TaskCreated.returnValues[0],
              content: result.events.TaskCreated.returnValues[1],
              completed: result.events.TaskCreated.returnValues[2],
            },
          ],
          content: '',
        });
        toast.dark('😎 Task Creato!');
      });
  }

  handleChange(event) {
    this.setState({ content: event.target.value });
  }

  render() {
    return (
      <div className="my-3">
        <h1>What's the Plan for Today?</h1>
        <form className="todo-form" onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.content} onChange={this.handleChange} className="todo-input" placeholder="Add task..." required />
        </form>
        <ul>
          {this.state.tasks.map((task, key) => (
            <Task key={key} task={task} contract={this.props.contract} account={this.props.account}></Task>
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoList;
