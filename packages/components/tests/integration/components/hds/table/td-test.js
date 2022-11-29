import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/table/td', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <Hds::Table::Td>template block text</Hds::Table::Td>
    `);
    assert.dom(this.element).hasText('template block text');
  });

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Table::Td id="data-test-table-td"/>`);
    assert.dom('#data-test-table-td').hasClass('hds-table__td');
  });

  test('it should support splattributes', async function (assert) {
    await render(hbs`<Hds::Table::Td id="data-test-table-td" lang="es" />`);
    assert.dom('#data-test-table-td').hasAttribute('lang', 'es');
  });
});
