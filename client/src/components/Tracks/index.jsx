import React, { Component } from "react";
import { Col } from "react-grid-system";

class Tracks extends Component {
  state = {};
  render() {
    return (
      <div>
        <Col>
          <button
            style={{
              backgroundColor: "palevioletred",
              color: "white",
              borderStyle: "none",
              margin: "20px 10px",
              borderRadius: "12px",
              padding: "10px"
            }}
            onClick={this.props.addTrack}
          >
            Add to playlist
          </button>
          <button
            style={{
              backgroundColor: "palevioletred",
              color: "white",
              borderStyle: "none",
              margin: "20px 10px",
              borderRadius: "12px",
              padding: "10px"
            }}
            onClick={this.props.saveTrack}
          >
            Save to spotify
          </button>

          <a style={{ color: "palevioletred", padding: "10px" }}>
            {this.props.name}
          </a>
        </Col>
      </div>
    );
  }
}

export default Tracks;
