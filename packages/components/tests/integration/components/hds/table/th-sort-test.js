import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/table/th-sort', function (hooks) {
  setupRenderingTest(hooks);
  test('it renders', async function (assert) {
    await render(hbs`<Hds::Table::ThSort>Artist</Hds::Table::ThSort>`);

    assert.dom(this.element).hasText('Artist');
  });
  test('it has the scope attribute, and it is set to column', async function (assert) {
    await render(hbs`<Hds::Table::ThSort>Artist</Hds::Table::ThSort>`);

    assert.dom('.hds-table__th-sort').hasAttribute('scope', 'col');
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Table::ThSort>Artist</Hds::Table::ThSort>`);

    assert.dom('[data-test-table-th-sort]').hasClass('hds-table__th-sort');
  });

  test('if @sortOrder is not defined, the swap-vertical icon should be displayed', async function (assert) {
    await render(
      hbs`<Hds::Table::ThSort @sortBy='artist'>Artist</Hds::Table::ThSort>`
    );

    assert.dom('[data-test-icon="swap-vertical"]').exists();
  });

  test('if `@sortOrder` is set to asc, the arrow-up icon should be displayed', async function (assert) {
    await render(
      hbs`<Hds::Table::ThSort @sortBy='artist' @sortKey='artist' @sortOrder='asc' id="data-test-table-th-sort">Artist</Hds::Table::ThSort>`
    );

    assert.dom('[data-test-icon="arrow-up"]').exists();
  });
});
