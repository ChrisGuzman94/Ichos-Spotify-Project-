import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Song from "../components/Song";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";
import Nav from "../components/Nav";

class Saved extends Component {
  state = {
    songs: []
  };

  componentDidMount() {
    // this.getSavedBooks();
  }

  getSavedBooks = () => {};

  handleBookDelete = id => {
    API.deleteBook(id).then(res => this.getSavedBooks());
  };

  render() {
    return (
      <Container>
        <Nav />
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1 className="text-center">
                <strong>Ichos GeoPlaylist</strong>
              </h1>
              <h2 className="text-center">
                Save Some Songs You Can Jam To Later
              </h2>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Card title="Saved Songs" icon="download">
              {this.state.songs.length ? (
                <List>
                  {this.state.songs.map(song => (
                    <Song
                      key={song._id}
                      title={song.title}
                      subtitle={song.subtitle}
                      link={song.link}
                      authors={song.authors.join(", ")}
                      description={song.description}
                      image={song.image}
                      Button={() => (
                        <button
                          onClick={() => this.handleBookDelete(song._id)}
                          className="btn btn-danger ml-2"
                        >
                          Delete
                        </button>
                      )}
                    />
                  ))}
                </List>
              ) : (
                <h2 className="text-center">No Saved Songs</h2>
              )}
            </Card>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default Saved;
