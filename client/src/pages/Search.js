import React, { Component } from "react";
import SearchBar from "../components/SearchBar/index";

import { search } from "../utils/API";

Geocode.setApiKey("AIzaSyAP-ebktertPkIo8aeeBLjqpGkwbbOrvno");

class Geo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lon: "",
      address: ""
    };
  }

  render() {
    return (
      <React.Fragment>
        <SearchBar geolocate={this.geolocate} />
      </React.Fragment>
    );
  }
}

export default Geo;
