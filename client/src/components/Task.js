import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [], edit: false, id: this.props.task.id, completed: this.props.task.completed, content: this.props.task.content, contract: this.props.contract, account: this.props.account };
    this.renderEditMode = this.renderEditMode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCompletedTask = this.handleCompletedTask.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCompletedTask(event) {
    this.state.contract.methods
      .toggleCompleted(this.state.id)
      .send({ from: this.state.account })
      .then((recipe) => this.setState({ completed: !this.state.completed }));
  }

  renderEditMode(event) {
    this.setState({ edit: !this.state.edit });
  }

  handleChange(event) {
    this.setState({ content: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.state.contract.methods
      .editTask(this.state.id, this.state.content)
      .send({ from: this.state.account })
      .then((receipe) => {
        console.log(receipe);
        this.setState({ edit: false });
      });
  }

  render() {
    return (
      <div className={this.state.completed ? 'todo-row complete' : 'todo-row'}>
        <div onClick={!this.state.edit ? this.handleCompletedTask : null} key={this.state.id}>
          {this.state.edit ? (
            <form className="todo-form" onSubmit={this.handleSubmit}>
              <input value={this.state.content} onChange={this.handleChange} />
            </form>
          ) : (
            this.state.content
          )}
        </div>
        <div className="icons">
          <button onClick={this.renderEditMode} className="btn btn-warning edit-icon">
            <FontAwesomeIcon icon={faPencilAlt} />
          </button>
          <button className="btn btn-danger delete-icon">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    );
  }
}
