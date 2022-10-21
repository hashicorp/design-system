import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/table/th-sort', function (hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function () {
    this.set('sortBy', 'artist');
    this.set('sortOrder', 'asc');
    this.set('sortedMessageText', 'Sorted by artist in ascending order');
    this.set('setSortBy', function (sortBy) {
      return sortBy || 'artist';
    });
  });

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Hds::Table::ThSort
  @sortBy='artist'
  @sortOrder='asc'
  @setSortBy={{this.setSortBy}}
>artist</Hds::Table::ThSort>`);

    assert.dom(this.element).hasText('artist');
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Table::ThSort
  @sortBy='artist'
  @sortOrder='asc'
  @setSortBy={{this.setSortBy}}
>artist</Hds::Table::ThSort>`);

    assert.dom('[data-test-table-th-sort]').hasClass('hds-table__th-sort');
  });
});
