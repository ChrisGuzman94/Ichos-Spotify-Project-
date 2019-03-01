import axios from "axios";
const SpotifyWebApi = require("spotify-web-api-js");
const SpotifyWebApiNode = require("spotify-web-api-node");

const spotifyApi = new SpotifyWebApi();
const spotifyApiNode = new SpotifyWebApiNode();

export default {
  getEvents: function() {
    axios({
      type: "GET",
      url:
        "https://app.ticketmaster.com/discovery/v2/events?apikey=woMueZEfZnQKLvy0XySwE4my1A4XKu3G&countryCode=US",
      async: true,
      dataType: "json",
      success: function(json) {
        JSON.parse(json);
        console.log(json);
        // Parse the response.
        // Do other things.
      },
      error: function(xhr, status, err) {
        // This time, we do not end up here!
      }
    });
  },
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
  saveTrack: function(id, token) {
    spotifyApiNode.setAccessToken(token);
    spotifyApiNode.addToMySavedTracks([id]).then(
      function(res) {
        console.log(res);
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
