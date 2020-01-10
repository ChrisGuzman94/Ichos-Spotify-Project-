import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Song from "../components/Song/index";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";
import Nav from "../components/Nav";

class Home extends Component {
  state = {
    songs: [],
    q: "",
    token: "",
    message: "Make Sure You Enable Your Location"
  };
  getHashParams = () => {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  };

  shuffle = a => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  UNSAFE_componentWillMount = async () => {
    // Get spotify token to make api calls
    const stateKey = "spotify_auth_state";
    const params = await this.getHashParams();
    const token = params.access_token,
      state = params.state,
      storedState = localStorage.getItem(stateKey);
    if (token && (state == null || state !== storedState)) {
      alert("There was an error during the authentication");
    } else {
      this.setState({ token: token });

      // Get location based on IP
      await API.getLocation().then(res => {
        this.setState({ location: res });
      });

      // Start api calls to Spotify
      this.search();
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.getBooks();
  };

  handleBookSave = id => {};

  search = () => {
    const { token, location } = this.state;

    const allTracks = [];
    // Get playlists based on location
    API.search(location, token).then(res =>
      res.playlists.items.map(playlist => {
        // Get tracks for each playlist
        API.getTracks(playlist.id, token).then(res => {
          res.items.map(item => {
            console.log(item);
            if (item.track.id) {
              // Return tracks that have previews
              API.trackPreview(item.track.id, token).then(res => {
                if (res) {
                  const trackInfo = {
                    name: item.track.name,
                    arist: item.track.artists[0].name,
                    uri: item.track.uri,
                    preview: res,
                    image: item.track.album.images[1].url
                  };
                  allTracks.push(trackInfo);
                  this.shuffle(allTracks);
                }
              });

              this.setState({ songs: allTracks });
            }
          });
        });
      })
    );
  };

  render() {
    const { songs } = this.state;

    return (
      <Container>
        <Nav />
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1 className="text-center">
                <strong>Ichos GeoPlaylist</strong>
              </h1>
              <h2 className="text-center">Here Are Popular Songs Around You</h2>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Card title="Results">
              <List>
                {songs.map((song, index) => (
                  <Song
                    key={index}
                    title={song.name}
                    link={song.preview}
                    artist={song.artist}
                    image={song.image}
                    Button={() => (
                      <button
                        onClick={() => this.handleBookSave(song.id)}
                        className="btn btn-primary ml-2"
                      >
                        Save
                      </button>
                    )}
                  />
                ))}
              </List>
            </Card>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default Home;
