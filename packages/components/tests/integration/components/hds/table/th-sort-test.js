import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/table/th-sort', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.set('setSortBy', function (text) {
      return text;
    });

    await render(hbs`<Hds::Table::ThSort
    @text="artist"
    @sortBy="artist"
    @sortOrder="asc"
    @setSortBy={{this.setSortBy}}
  />`);

    assert.dom(this.element).hasText('artist');
  });
});
