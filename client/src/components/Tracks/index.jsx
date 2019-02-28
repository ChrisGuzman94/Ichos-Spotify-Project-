import React, { Component } from "react";
import { Row } from "react-grid-system";

class Tracks extends Component {
  state = {};
  render() {
    return (
      <div>
        <li>
          <button onClick={this.props.addTrack}>Add to playlist</button>
          <button onClick={this.props.saveTrack}>Save to spotify</button>
          <button>preview</button>
          {this.props.name}
        </li>
      </div>
    );
  }
}

export default Tracks;
