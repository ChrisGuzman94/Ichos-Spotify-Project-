import axios from "axios";
var SpotifyWebApi = require("spotify-web-api-js");
const spotifyApi = new SpotifyWebApi();

export default {
  getPlaylist: function() {
    return axios.get("/api/playlists");
  },

  removePlaylist: function(id) {
    return axios.delete("/api/playlists" + id);
  },

  savePlaylist: function(playlistData) {
    return axios.post("/api/playlists", playlistData);
  },
  follow: function(playlistId, token) {
    spotifyApi.setAccessToken(token);
    spotifyApi
      .followPlaylist(playlistId, {
        public: true
      })
      .then(data => {
        console.log("Playlist successfully followed");
        return data;
      })
      .catch(err => {
        console.log(err);
      });
  },

  search: function(token) {
    console.log(token);
    spotifyApi.setAccessToken(token);
    return spotifyApi.searchPlaylists("workout").then(
      res => {
        return res;
      },
      function(err) {
        console.log("Something went wrong!", err);
      }
    );
  }
};
