import React, { Component } from "react";

class Delete extends Component {
  state = {};
  render() {
    return (
      <button
        style={{
          backgroundColor: "palevioletred",
          color: "white",
          borderStyle: "none",
          margin: "20px 10px",
          borderRadius: "12px",
          padding: "10px"
        }}
        onClick={this.props.handleDelete}
      >
        Delete
      </button>
    );
  }
}

export default Delete;
