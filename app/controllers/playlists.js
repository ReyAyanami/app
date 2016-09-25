import Ember from 'ember';

export default Ember.Controller.extend({

  loader: Ember.inject.service(),
  store: Ember.inject.service(),
  gapi: Ember.inject.service(),

  queryParams: ['page'],

  page: 1,

  actions: {
    create(playlistId) {
      this.get('loader').showLoader();

      const playlist = this.get('store').createRecord('playlist', {
        url: playlistId
      });

      const playlistFetcher = this.get('gapi').getPlaylist(playlistId);

      playlistFetcher.getInfo().then((info) => {

        console.log(info);

        const playlistInfo = info.result.items.shift();

        playlist.set('youtubeId', playlistInfo.id);

        const snippetInfo = playlistInfo.snippet;

        playlist.set('title', snippetInfo.title);
        playlist.set('channelId', snippetInfo.channelId);
        playlist.set('channelTitle', snippetInfo.channelTitle);
        playlist.set('publishedAt', snippetInfo.publishedAt);
        playlist.set('thumbnail', snippetInfo.thumbnails.high.url);

        playlist.save();

        this.get('loader').hideLoader();

        this.send('reload');
      });
    }
  }
});
