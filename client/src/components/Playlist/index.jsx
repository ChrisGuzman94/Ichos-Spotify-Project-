import React, { Component } from "react";

class Playlist extends Component {
  state = {
    style: {
      height: 200,
      width: 200
    }
  };
  render() {
    return (
      <div>
        <img style={this.state.style} src={this.props.img} alt="" />

        <h2>Playlist: {this.props.name}</h2>
      </div>
    );
  }
}

export default Playlist;
