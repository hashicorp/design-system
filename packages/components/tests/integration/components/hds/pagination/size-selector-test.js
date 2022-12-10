import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/pagination/size-selector',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders the component', async function (assert) {
      await render(hbs`
      <Hds::Pagination::SizeSelector @sizes={{array 10 30 50}} />
    `);
      assert.dom(this.element).exists();
    });

    test('it should render with a CSS class that matches the component name', async function (assert) {
      await render(hbs`
      <Hds::Pagination::SizeSelector @sizes={{array 10 30 50}} id="test-pagination-size-selector" />
    `);
      assert
        .dom('#test-pagination-size-selector')
        .hasClass('hds-pagination-size-selector');
    });

    // Test API:

    test('it should display options for the passed in page sizes', async function (assert) {
      await render(hbs`
      <Hds::Pagination::SizeSelector @sizes={{array 10 30 50}} />
    `);
      assert
        .dom('.hds-pagination-size-selector option[value="10"]')
        .hasText('10');
      assert
        .dom('.hds-pagination-size-selector option[value="30"]')
        .hasText('30');
      assert
        .dom('.hds-pagination-size-selector option[value="50"]')
        .hasText('50');
    });

    test('it should display the passed in itemsPerPage initially instead of first option', async function (assert) {
      await render(hbs`
        <Hds::Pagination::SizeSelector @sizes={{array 10 30 50}} @itemsPerPage={{30}} />
      `);
      assert
        .dom('.hds-pagination-size-selector .hds-form-select')
        .hasValue('30');
    });
  }
);
