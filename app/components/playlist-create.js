import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    cancel() {
      this.sendAction('cancel');
    },
    create() {
      this.sendAction('create', this.get('url').split('playlist?list=').pop());
    }
  }
});
