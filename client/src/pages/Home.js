import React, { Component } from "react";
import Geocode from "react-geocode";
import API from "../utils/API";
import { Row, Col } from "react-grid-system";
import Tracks from "../components/Tracks/index";
import Events from "../components/Events/index";

Geocode.setApiKey("AIzaSyAP-ebktertPkIo8aeeBLjqpGkwbbOrvno");
export default class Home extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    this.state = {
      token: token,
      loggedIn: token ? true : false,
      hideTracks: true,
      tracks: [],
      playlistName: "",
      addTracks: [],
      events: [],
      address: "",
      lat: "",
      lon: ""
    };
  }

  componentDidMount = () => {
    if (!navigator.geolocation) {
      console.log("<p>Geolocation is not supported by your browser</p>");
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
      API.getEvents().then(res => this.setState({ events: res }));
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
        this.search(responseAddress);
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
  search(address) {
    const allTracks = [];
    API.search(address, this.state.token).then(res =>
      res.playlists.items.map(playlist => {
        API.getTracks(playlist.id, this.state.token).then(res => {
          res.items.map(item => {
            const trackInfo = {
              name: item.track.name,
              uri: item.track.uri,
              id: item.track.id
            };
            allTracks.push(trackInfo);
            this.setState({ tracks: allTracks });
          });
        });
      })
    );
  }
  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const playlistName = event.target.name;

    this.setState({
      [playlistName]: value
    });
  };
  addTrack = (name, uri) => {
    const trackInfo = {
      trackName: name,
      trackUri: uri
    };

    const add = this.state.addTracks;
    add.push(trackInfo);

    this.setState({ addTracks: add });
  };
  saveTrack = id => {
    console.log(id);
    API.saveTrack(id, this.state.token);
  };
  saveEvent = event => {
    API;
  };

  handleFormSubmit = () => {
    API.create(this.state.playlistName, this.state.addTracks, this.state.token);
  };

  remove = track => {
    const filteredOut = this.state.addTracks.filter(word => word !== track);
    this.setState({ addTracks: filteredOut });
  };

  render() {
    return (
      <div className="App">
        <a href="http://localhost:8888"> Login to Spotify </a>
        <a href="/saved">Followed Playlist</a>
        <Row>
          <Col md={6}>
            {this.state.tracks.map(track => {
              return (
                <Tracks
                  addTrack={() => this.addTrack(track.name, track.uri)}
                  saveTrack={() => this.saveTrack(track.id)}
                  name={track.name}
                />
              );
            })}
          </Col>

          <Col md={6}>
            <div>
              <p>Create your own playlist</p>
              <form className="form">
                <input
                  value={this.state.playlistName}
                  name="playlistName"
                  onChange={this.handleInputChange}
                  type="text"
                  placeholder="Playlist Name"
                />
              </form>
              <button onClick={this.handleFormSubmit}>Create Playlist</button>
              {this.state.addTracks.map(track => {
                return (
                  <ul>
                    <button onClick={() => this.remove(track)}>x </button>
                    {track.trackName}
                  </ul>
                );
              })}
            </div>
          </Col>
        </Row>

        {this.state.loggedIn && (
          <div>
            <button onClick={() => this.geolocate()}>search</button>
          </div>
        )}

        <Row>
          {this.state.events.map(event => {
            return (
              <Col>
                <Events
                  saveEvent={this.saveEvent(event.name, event.images[0].url)}
                  name={event.name}
                  url={event.images[0].url}
                  link={event.url}
                />
                ;
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}
