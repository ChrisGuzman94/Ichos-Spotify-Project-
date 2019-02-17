import React, { Component } from "react";
import API from "../utils/API";
import Playlist from "../components/Playlist/index";
import Geocode from "react-geocode";
export default class Home extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    this.state = {
      token: token,
      loggedIn: token ? true : false,
      playlists: [],
      lat: "",
      lon: "",
      address: ""
    };
  }

  componentDidMount = () => {
    if (!navigator.geolocation) {
      console.log("<p>Geolocation is not supported by your browser</p>");
      return;
    }

    const success = position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(
        "<p>Latitude is " +
          latitude +
          "° <br>Longitude is " +
          longitude +
          "°</p>"
      );
      this.setState({ lat: latitude, lon: longitude });
    };

    const error = () => {
      console.log("Unable to retrieve your location");
    };

    console.log("<p>Locating…</p>");

    navigator.geolocation.getCurrentPosition(success, error);
  };

  geolocate = () => {
    Geocode.fromLatLng(this.state.lat, this.state.lon).then(
      response => {
        const responseAddress =
          response.results[0].address_components[2].long_name;
        console.log(response.results[0].address_components[2].long_name);
        this.setState({ address: responseAddress });
      },
      error => {
        console.error(error);
      }
    );
  };

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
    API.search("paris", this.state.token).then(res =>
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
        <a href="/saved">Followed Playlist</a>

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
