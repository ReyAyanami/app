import Ember from 'ember';

export default Ember.Route.extend({

  gapi: Ember.inject.service(),

  // model() {
  //   return this.get('gapi').getPlaylist();
  // },

  actions: {
    googleOauth(login) {
      if (login) {
        this.get('gapi').signIn();
      } else {
        this.get('gapi').signOut();
      }
    },
    nextPage() {
      // console.log(this.get('model'));
      // this.get('model').getNextPage();
      const playlist = this.get('gapi').getPlaylist('LLJgIXPt6cRcFuNjqY4xLsYg');
      playlist.getNextPage().then((...args) => {
        console.log(...args);
      });
    },

    createAndSave() {
      this.get('store').createRecord('playlist', {name: 'some'}).save();
    }
  }
});
