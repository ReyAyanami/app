import Ember from 'ember';

export default Ember.Controller.extend({

  loader: Ember.inject.service(),
  store: Ember.inject.service(),

  actions: {
    create(playlistId) {
      this.get('loader').showLoader();

      this.get('store').createRecord('playlist', {
        url: playlistId
      }).save();

      this.get('loader').hideLoader();

      this.send('reload');
    }
  }
});
