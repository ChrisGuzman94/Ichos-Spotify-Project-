import React, { Component } from "react";

class Delete extends Component {
  state = {};
  render() {
    return <button onClick={this.props.handleDelete}>Delete</button>;
  }
}

export default Delete;
