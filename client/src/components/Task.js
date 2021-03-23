import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default class Task extends Component {
  render() {
    return (
      <div className={this.props.task.completed ? 'todo-row complete' : 'todo-row'}>
        <div key={this.props.task.id}>{this.props.task.content}</div>
        <div className="icons">
          <FontAwesomeIcon icon={faPencilAlt} className="delete-icon" />
          <FontAwesomeIcon icon={faTrash} className="edit-icon" />
        </div>
      </div>
    );
  }
}
