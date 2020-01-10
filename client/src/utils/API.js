import axios from "axios";
const SpotifyWebApi = require("spotify-web-api-js");
const SpotifyWebApiNode = require("spotify-web-api-node");
const GetLocation = require("location-by-ip");
const SPOTT_API_KEY = "hmuh6g1gh2mshFxd3xzReVIcYmKPp1IhBw8jsnaw0p7YjCPAqJ";
const client_id = process.env.CLIENT;

const spotifyApi = new SpotifyWebApi();
const spotifyApiNode = new SpotifyWebApiNode();
const getLocation = new GetLocation(SPOTT_API_KEY);

export default {
  getPlaylist: function() {
    return axios.get("/api/playlists");
  },

  removePlaylist: function(id) {
    console.log(id);
    return axios.delete("/api/playlists/" + id);
  },
  search: function(string, token) {
    spotifyApi.setAccessToken(token);
    return spotifyApi.searchPlaylists(string, { limit: 10 }).then(
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
  trackPreview: function(trackId, token) {
    spotifyApiNode.setAccessToken(token);
    return spotifyApiNode.getTrack(trackId).then(res => {
      return res.body.preview_url;
    });
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
  },
  getLocation: async function() {
    const options = {
      language: "en"
    };

    const location = await getLocation.byMyIp(options);
    return location.country.name;
  }
};
