import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
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
    });

    test('it is selected if @isSelected is set to true', async function (assert) {
      await render(hbs`
        <Hds::Pagination::Nav::ButtonNumber @page="1" @isSelected={{true}} id="test-is-selected" />
        <Hds::Pagination::Nav::ButtonNumber @page="3" id="test-not-selected" />
      `);
      assert
        .dom('#test-is-selected')
        .hasClass('hds-pagination-nav__button-number--is-selected');
      assert
        .dom('#test-is-selected .hds-pagination-nav__control')
        .hasAttribute('aria-current', 'page');
      assert
        .dom('#test-not-selected')
        .doesNotHaveClass('hds-pagination-nav__button-number--is-selected');
      assert
        .dom('#test-not-selected .hds-pagination-nav__control')
        .doesNotHaveAttribute('aria-current', 'page');
    });

    test('it should call the onClick handler with the value of the page number', async function (assert) {
      let pageNumber = '1';
      this.set('onClick', (pageNum) => (pageNumber = pageNum));
      await render(
        hbs`
          <Hds::Pagination::Nav::ButtonNumber @page="3" id="test-button" @onClick={{this.onClick}} />
        `
      );
      await click('#test-button .hds-pagination-nav__control');
      assert.strictEqual(pageNumber, '3');
    });
  }
);
