import React, { Component } from "react";
import API from "../utils/API";
import Delete from "../components/Buttons/Delete";
import Playlist from "../components/Playlist";

export default class Saved extends Component {
  state = {
    playlist: []
  };

  componentDidMount() {
    this.savedPlaylist();
    console.log(this.state.playlist);
  }

  savedPlaylist = () => {
    API.getPlaylist()
      .then(res => this.setState({ playlist: res.data }))
      .catch(err => console.log(err));
  };

  handleDelete = id => {
    console.log("clicked");
    API.deleteBook(id)
      .then(res => this.savedBooks())
      .catch(err => console.log(err));
  };

  render() {
    const { playlist } = this.state;
    return (
      <div className="App">
        {this.state.playlist.map(playlist => {
          return (
            <div>
              <Playlist
                key={playlist.id}
                id={playlist.id}
                name={playlist.name}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
