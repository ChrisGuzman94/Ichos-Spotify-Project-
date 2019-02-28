import axios from "axios";
const SpotifyWebApi = require("spotify-web-api-js");
const SpotifyWebApiNode = require("spotify-web-api-node");

const spotifyApi = new SpotifyWebApi();
const spotifyApiNode = new SpotifyWebApiNode();

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
  search: function(string, token) {
    spotifyApi.setAccessToken(token);
    return spotifyApi.searchPlaylists(string, { limit: 5 }).then(
      res => {
        return res;
      },
      function(err) {
        console.log("Something went wrong!", err);
      }
    );
  },
  getTracks: function(playlist_id, token) {
    spotifyApi.setAccessToken(token);
    return spotifyApi.getPlaylistTracks(playlist_id).then(
      res => {
        return res;
      },
      function(err) {
        console.log("Something went wrong!", err);
      }
    );
  },
  saveTrack: function(uri, token) {
    spotifyApi.setAccessToken(token);
    spotifyApi.addToMySavedTracks(["3VNWq8rTnQG6fM1eldSpZ0"]).then(
      function(data) {
        console.log("Added track!");
      },
      function(err) {
        console.log("Something went wrong!", err);
      }
    );
  },
  create: function(playlist_name, tracks, token) {
    spotifyApiNode.setAccessToken(token);

    // get current user information
    spotifyApiNode.getMe().then(res => {
      const { id } = res.body;

      // create playlisyt from user input
      spotifyApiNode.createPlaylist(id, playlist_name).then(res => {
        tracks.map(track =>
          spotifyApiNode
            .addTracksToPlaylist(res.body.id, [track.trackUri])
            .then(
              function(data) {
                console.log("Added tracks to playlist!");
              },
              function(err) {
                console.log("Something went wrong!", err);
              }
            )
        );
      });
    });
  }
};
