import React, { Component } from "react";

class Events extends Component {
  state = {
    style: {
      height: 150,
      width: 200
    }
  };
  render() {
    return (
      <React.Fragment>
        <img style={this.state.style} src={this.props.url} alt="" />
        <p
          style={{
            color: "palevioletred",
            padding: "10px",
            alignContent: "right",
            textDecoration: "none",
            marginBottom: "10px"
          }}
        >
          Event:{this.props.name}
        </p>
        <p>
          <a
            style={{
              color: "palevioletred",
              padding: "10px",
              alignContent: "right",
              textDecoration: "none",
              marginBottom: "10px"
            }}
            href={this.props.link}
          >
            See Event
          </a>
        </p>
      </React.Fragment>
    );
  }
}

export default Events;
