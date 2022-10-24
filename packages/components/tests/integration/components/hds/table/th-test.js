import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/table/th', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Template block usage:
    await render(hbs`
      <Hds::Table::Th>template block text</Hds::Table::Th>`);

    assert.dom(this.element).hasText('template block text');
  });

  test('it has the scope attribute, and it is set to column', async function (assert) {
    await render(
      hbs`<Hds::Table::Th id="data-test-table-th">artist</Hds::Table::Th>`
    );

    assert.dom('#data-test-table-th').hasAttribute('scope', 'col');
  });
  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Table::Th id="test-th" />`);
    assert.dom('#test-th').hasClass('hds-table__th');
  });
});
