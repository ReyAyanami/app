/* global gapi */

import Ember from 'ember';
import config from '../config/environment';

const scopes = 'https://www.googleapis.com/auth/youtube';

let auth2;

const scopeHandler = {};

function initAuth() {
  gapi.client.setApiKey(config.gapi.apiKey);
  return gapi.auth2.init({
    client_id: config.gapi.clientId,
    scope: scopes
  }).then(() => {
    auth2 = gapi.auth2.getAuthInstance();
    // Listen for sign-in state changes.
    auth2.isSignedIn.listen(updateSignInStatus);
    // Handle the initial sign-in state.
    updateSignInStatus(auth2.isSignedIn.get());
  });
}

function updateSignInStatus(isSignedIn) {
  if (isSignedIn) {
    prepareApis();
  }
}

function prepareApis() {
  if (scopeHandler.loaded) {
    return;
  }
  gapi.client.load('youtube', 'v3', function () {
    scopeHandler.youtube = true;
  });
  scopeHandler.loaded = true;
  // console.log(auth2.currentUser.get().getBasicProfile().getGivenName());
}

function handleAPILoaded() {
  var request = gapi.client.youtube.playlistItems.list({
    playlistId: 'LLJgIXPt6cRcFuNjqY4xLsYg',
    part: 'contentDetails'
  });
  request.execute(function (response) {
    console.log(response);
  });
}

//wrwaKaxF_WE
function getVideo(videoId) {
  gapi.client.youtube.videos.list({
    id: videoId,
    part: 'snippet'
  }).execute(function (response) {
    console.log(response);
  });
}

class Playlist {
  constructor(playlistId) {
    this.playlistId = playlistId;
  }

  getPage(pageToken) {
    const options = {
      id: this.playlistId,
      part: 'snippet'
    };

    if (pageToken) {
      options.pageToken = pageToken;
    }

    const request = gapi.client.youtube.playlists.list(options);

    return new Promise((resolve) => {
      request.execute((response) => {
        this.nextPageToken = response.nextPageToken;
        this.items = response.items;
        resolve(response);
      });
    });
  }

  getNextPage() {
    return this.getPage(this.nextPageToken);
  }
}

const playlists = new Map();

export default Ember.Service.extend({

  init(...args) {
    this._super(...args);
    gapi.load('client:auth2', initAuth);
  },

  signIn() {
    auth2.signIn();
  },

  signOut() {
    auth2.signOut();
  },

  getPlaylist(playlistId) {
    if (playlists.has(playlistId)) {
      return playlists.get(playlistId);
    } else {
      const playlist = new Playlist(playlistId);
      playlists.set(playlistId, playlist);
      return playlist;
    }
  }

});
