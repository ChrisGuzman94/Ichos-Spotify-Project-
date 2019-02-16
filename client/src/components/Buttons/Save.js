import React, { Component } from "react";

class Save extends Component {
  state = {};
  render() {
    return <button onClick={this.props.handleSave}>Save</button>;
  }
}

export default Save;
