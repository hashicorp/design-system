import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/table/th-sort', function (hooks) {
  setupRenderingTest(hooks);
  // since we'd have to repeat this for each test, we'll set it up once to be used in all tests
  hooks.beforeEach(function () {
    this.set('setSortBy', function (sortBy) {
      return sortBy || 'artist';
    });
  });

  test('it renders', async function (assert) {
    await render(hbs`<Hds::Table::ThSort
  @setSortBy={{this.setSortBy}}
>artist</Hds::Table::ThSort>`);

    assert.dom(this.element).hasText('artist');
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Table::ThSort
  @setSortBy={{this.setSortBy}}
>artist</Hds::Table::ThSort>`);

    assert.dom('[data-test-table-th-sort]').hasClass('hds-table__th-sort');
  });
  test('if @sortOrder is not defined, the swap-vertical icon should be displayed', async function (assert) {
    await render(hbs`<Hds::Table::ThSort
  @sortBy='artist'
  @setSortBy={{this.setSortBy}}
>artist</Hds::Table::ThSort>`);

    assert.dom('[data-test-icon="swap-vertical"]').exists();
  });
  test('if `@sortOrder` is set to asc, the arrow-up icon should be displayed', async function (assert) {
    await render(hbs`<Hds::Table::ThSort
  @sortBy='artist'
  @sortKey='artist'
  @sortOrder='asc'
  @setSortBy={{this.setSortBy}}
>artist</Hds::Table::ThSort>`);

    assert.dom('[data-test-icon="arrow-up"]').exists();
  });
});
