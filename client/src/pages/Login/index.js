import React, { Component } from "react";
import "./index.css";

export default class Login extends Component {
  state = {};

  /**
   * Generates a random string containing numbers and letters
   * @param  {number} length The length of the string
   * @return {string} The generated string
   */
  generateRandomString = length => {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  login = () => {
    var stateKey = "spotify_auth_state";
    var client_id = ""; // Your client id
    var redirect_uri = "http://localhost:3000/search"; // Your redirect uri
    var state = this.generateRandomString(16);
    localStorage.setItem(stateKey, state);
    var scope =
      "playlist-modify-private playlist-modify-public user-library-modify";
    var url = "https://accounts.spotify.com/authorize";
    url += "?response_type=token";
    url += "&client_id=" + encodeURIComponent(client_id);
    url += "&scope=" + encodeURIComponent(scope);
    url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
    url += "&state=" + encodeURIComponent(state);
    window.location = url;
  };

  render() {
    return (
      <React.Fragment>
        <div id="main">
          <div id="form">
            <label for="btn-toggle-1"></label>
            <button onClick={this.login} name="login" type="submit">
              Login
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
