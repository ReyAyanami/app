import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('playlist-create', 'Integration | Component | playlist create', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{playlist-create}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#playlist-create}}
      template block text
    {{/playlist-create}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
