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
          <a href={this.props.url}>See Event</a>
        </p>
        <button onClick={this.props.saveEvent}>Save</button>
      </React.Fragment>
    );
  }
}

export default Events;
