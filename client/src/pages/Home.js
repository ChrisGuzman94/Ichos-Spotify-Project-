import React, { Component } from "react";
import API from "../utils/API";
import Playlist from "../components/Playlist/index";
export default class Home extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    this.state = {
      token: token,
      loggedIn: token ? true : false,
      playlists: []
    };
  }
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }
  search() {
    API.search(this.state.token).then(res =>
      this.setState({ playlists: res.playlists.items })
    );
  }
  follow(playlist) {
    const { id, name, images } = playlist;
    API.follow(id, this.state.token);
    API.savePlaylist({
      id: id,
      name: name,
      imageUrl: images[0].url
    });
  }
  render() {
    return (
      <div className="App">
        <a href="http://localhost:8888"> Login to Spotify </a>
        {this.state.playlists.map(playlist => {
          return (
            <div>
              <Playlist
                key={playlist.id}
                img={playlist.images[0].url}
                name={playlist.name}
              />

              <button onClick={() => this.follow(playlist)}>follow</button>
            </div>
          );
        })}

        {this.state.loggedIn && (
          <div>
            <button onClick={() => this.search()}>search</button>
          </div>
        )}
      </div>
    );
  }
}
