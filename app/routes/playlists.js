import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').findAll('playlist');
  },
  actions: {
    reload() {
      this.refresh();
    }
  }
});
