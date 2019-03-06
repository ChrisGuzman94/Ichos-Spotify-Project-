import React, { Component } from "react";

class Events extends Component {
  state = {
    style: {
      height: 200,
      width: 200
    }
  };
  render() {
    return (
      <React.Fragment>
        <img style={this.state.style} src={this.props.url} alt="" />
        <p>Event:{this.props.name}</p>
        <p>
          <a href={this.props.link}>See Event</a>
        </p>
      </React.Fragment>
    );
  }
}

export default Events;
