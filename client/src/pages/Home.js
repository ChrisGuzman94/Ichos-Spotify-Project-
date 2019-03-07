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
            API.trackPreview(item.track.id, this.state.token).then(res => {
              const trackInfo = {
                name: item.track.name,
                uri: item.track.uri,
                id: item.track.id,
                preview: res
              };
              allTracks.push(trackInfo);
              this.setState({ tracks: allTracks });
            });
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

  getEvents = () => {
    API.getEvents().then(res => this.setState({ events: res }));
  };
  saveEvent = (name, image, url) => {
    const data = {
      name: name,
      img: image,
      link: url
    };

    API.saveEvent(data).then(res => console.log(res));
  };

  handleFormSubmit = () => {
    API.create(
      this.state.playlistName,
      this.state.addTracks,
      this.state.token
    ).then(res => {
      this.setState({ addTracks: [] });
    });
  };

  remove = track => {
    const filteredOut = this.state.addTracks.filter(word => word !== track);
    this.setState({ addTracks: filteredOut });
  };

  render() {
    return (
      <div className="App">
        <a
          style={{
            color: "palevioletred",
            padding: "10px",
            alignContent: "right",
            textDecoration: "none",
            margin: "10px"
          }}
          className="nav-link"
          href="/"
        >
          {" "}
          Home
        </a>
        <a
          style={{
            color: "palevioletred",
            padding: "10px",
            alignContent: "right",
            textDecoration: "none",
            margin: "10px"
          }}
          href="https://authorizatio.herokuapp.com/"
        >
          {" "}
          Login to Spotify{" "}
        </a>
        <a
          style={{
            color: "palevioletred",
            padding: "10px",
            alignContent: "right",
            textDecoration: "none",
            margin: "10px"
          }}
          href="/saved"
        >
          {" "}
          Saved Events{" "}
        </a>
        <Row>
          <Col>
            {this.state.loggedIn && (
              <div>
                <button
                  style={{
                    backgroundColor: "palevioletred",
                    color: "white",
                    borderStyle: "none",
                    margin: "20px 10px",
                    borderRadius: "12px",
                    padding: "10px"
                  }}
                  onClick={() => this.getEvents()}
                >
                  Events
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
                  onClick={() => this.search()}
                >
                  Music
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
                  onClick={this.handleFormSubmit}
                >
                  Create Playlist
                </button>
                <input
                  value={this.state.playlistName}
                  name="playlistName"
                  onChange={this.handleInputChange}
                  type="text"
                  placeholder="Playlist Name"
                />
                {this.state.addTracks.map(track => {
                  return (
                    <ul>
                      <button
                        style={{
                          backgroundColor: "palevioletred",
                          fontSize: "16px",
                          color: "white",
                          borderStyle: "none",
                          borderRadius: "12px"
                        }}
                        onClick={() => this.remove(track)}
                      >
                        x{" "}
                      </button>
                      <a style={{ color: "palevioletred", padding: "0" }}>
                        {" "}
                        {track.trackName}{" "}
                      </a>
                    </ul>
                  );
                })}
              </div>
            )}
          </Col>
          <Col md={6}>
            {this.state.tracks.map(track => {
              return (
                <React.Fragment>
                  <Tracks
                    addTrack={() => this.addTrack(track.name, track.uri)}
                    saveTrack={() => this.saveTrack(track.id)}
                    name={track.name}
                    preview={track.preview}
                  />

                  <audio controls src={track.preview} />
                </React.Fragment>
              );
            })}
          </Col>
        </Row>

        <Row>
          {this.state.events.map(event => {
            return (
              <Col>
                <Events
                  name={event.name}
                  url={event.images[0].url}
                  link={event.url}
                />
                <button
                  style={{
                    backgroundColor: "palevioletred",
                    color: "white",
                    borderStyle: "none",
                    margin: "20px 10px",
                    borderRadius: "12px",
                    padding: "10px"
                  }}
                  onClick={() =>
                    this.saveEvent(event.name, event.images[0].url, event.url)
                  }
                >
                  Save
                </button>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}
