import React, { Component } from "react";
import SearchBar from "../components/SearchBar/index";
import Geocode from "react-geocode";

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

  render() {
    return (
      <React.Fragment>
        <SearchBar geolocate={this.geolocate} />
      </React.Fragment>
    );
  }
}

export default Geo;
