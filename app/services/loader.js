import Ember from 'ember';

export default Ember.Service.extend({

  loaders: 0,

  showLoader() {
    this.incrementProperty('loaders');
    Ember.$('.loading-spinner').fadeIn();
  },

  hideLoader() {
    if (this.get('loaders') > 0) {
      this.decrementProperty('loaders');
    }
    if (this.get('loaders') === 0) {
      Ember.$('.loading-spinner').fadeOut();
    }
  }

});
