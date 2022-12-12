import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/pagination/nav/button-number',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders the component', async function (assert) {
      await render(hbs`
        <Hds::Pagination::Nav::ButtonNumber @page="1" />
    `);
      assert.dom(this.element).exists();
    });

    test('it should render with a CSS class that matches the component name', async function (assert) {
      await render(hbs`
        <Hds::Pagination::Nav::ButtonNumber @page="1" id="test-pagination-button-number" />
      `);
      assert
        .dom('#test-pagination-button-number')
        .hasClass('hds-pagination-nav__page-item');
    });

    // Test API:

    test('it displays the passed in page number', async function (assert) {
      await render(hbs`
        <Hds::Pagination::Nav::ButtonNumber @page="5" />
      `);
      assert.dom('.hds-pagination-nav__control').hasText('page 5');
      assert.dom('.hds-pagination-nav__control span').hasText('page');
    });

    test('it is selected if @isSelected is set to true', async function (assert) {
      await render(hbs`
        <Hds::Pagination::Nav::ButtonNumber @page="3" id="test-not-selected" />
        <Hds::Pagination::Nav::ButtonNumber @page="1" @isSelected={{true}} id="test-is-selected" />
      `);
      assert
        .dom('#test-is-selected')
        .hasClass('hds-pagination-nav__button-number--is-selected');
      assert
        .dom('#test-not-selected')
        .doesNotHaveClass('hds-pagination-nav__button-number--is-selected');
    });
  }
);
