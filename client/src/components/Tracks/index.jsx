import React, { Component } from "react";
import { Col } from "react-grid-system";

class Tracks extends Component {
  state = {};
  render() {
    return (
      <div>
        <Col>
          <button onClick={this.props.addTrack}>Add to playlist</button>
          <button onClick={this.props.saveTrack}>Save to spotify</button>

          {this.props.name}
        </Col>
        <Col />
      </div>
    );
  }
}

export default Tracks;
