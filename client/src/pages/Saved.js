import React, { Component } from "react";
import Events from "../components/Events/index";
import { Col } from "react-grid-system";
import API from "../utils/API";

export default class Saved extends Component {
  state = {
    events: []
  };

  componentDidMount() {
    this.savedEvents();
  }

  savedEvents = () => {
    API.getPlaylist()
      .then(res => this.setState({ events: res.data }))
      .catch(err => console.log(err));
  };

  handleDelete = id => {
    console.log(id);
    API.removePlaylist(id)
      .then(res => this.savedEvents())
      .catch(err => console.log(err));
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
        {this.state.events.map(event => {
          return (
            <Col>
              <Events name={event.name} url={event.img} link={event.link} />
              <button
                style={{
                  backgroundColor: "palevioletred",
                  color: "white",
                  borderStyle: "none",
                  margin: "20px 10px",
                  borderRadius: "12px",
                  padding: "10px"
                }}
                onClick={() => this.handleDelete(event._id)}
              >
                Delete
              </button>
            </Col>
          );
        })}
      </div>
    );
  }
}
