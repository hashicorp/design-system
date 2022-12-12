import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/table/th', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <Hds::Table::Th>template block text</Hds::Table::Th>`);
    assert.dom(this.element).hasText('template block text');
  });

  test('it has the scope attribute set to column by default', async function (assert) {
    await render(
      hbs`<Hds::Table::Th id="data-test-table-th">artist</Hds::Table::Th>`
    );
    assert.dom('#data-test-table-th').hasAttribute('scope', 'col');
  });

  test('it has the scope attribute set to row if inside a tbody', async function (assert) {
    await render(
      hbs`<Hds::Table><:body as |B|><B.Tr><B.Th id="data-test-table-th">artist</B.Th></B.Tr></:body></Hds::Table>`
    );
    assert.dom('#data-test-table-th').hasAttribute('scope', 'row');
  });

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Table::Th id="data-test-table-th" />`);
    assert.dom('#data-test-table-th').hasClass('hds-table__th');
  });

  test('it should add inline styles if `@width` is declared', async function (assert) {
    await render(hbs`<Hds::Table::Th id="data-test-table-th" @width="10%" />`);
    assert.dom('#data-test-table-th').hasAttribute('style');
  });

  test('it should support splattributes', async function (assert) {
    await render(hbs`<Hds::Table::Th id="data-test-table-th" lang="es" />`);
    assert.dom('#data-test-table-th').hasAttribute('lang', 'es');
  });
});
