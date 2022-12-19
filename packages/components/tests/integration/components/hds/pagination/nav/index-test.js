import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/pagination/nav/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the component', async function (assert) {
    await render(hbs`
      <Hds::Pagination::Nav @totalPages={{10}} @currentPage={{1}} />
    `);
    assert.dom(this.element).exists();
  });

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`
      <Hds::Pagination::Nav @totalPages={{10}} @currentPage={{1}} id="test-pagination-nav" />
    `);
    assert.dom('#test-pagination-nav').hasClass('hds-pagination-nav');
  });

  // Test API:

  test('it has the same number of pages displayed as are passed in for the "numbereed" type', async function (assert) {
    await render(hbs`
      <Hds::Pagination::Nav @totalPages={{10}} @currentPage={{1}} @type="numbered" />
    `);
    assert.dom('.hds-pagination-nav__page-item:nth-child(10)').exists();
  });

  test('it displays a truncated list of page numbers for the "truncated" type', async function (assert) {
    await render(hbs`
      <Hds::Pagination::Nav @totalPages={{1000}} @currentPage={{1}} @type="truncated" />
    `);
    // displays 7 items (the max number displayed)
    assert.dom('.hds-pagination-nav__page-item').exists({ count: 7 });
    // It displays an ellipses for the 5th item
    assert.dom('.hds-pagination-nav__page-item:nth-child(5)').hasText('...');
  });

  test('it selects the 1st page by default', async function (assert) {
    await render(hbs`
      <Hds::Pagination::Nav @totalPages={{10}} @type="numbered" />
    `);
    assert
      .dom('.hds-pagination-nav__page-item:nth-child(1)')
      .hasClass('hds-pagination-nav__button-number--is-selected');
  });

  test('it selects the passed in current page', async function (assert) {
    await render(hbs`
      <Hds::Pagination::Nav @totalPages={{10}} @currentPage={{3}} @type="numbered" />
    `);
    assert
      .dom('.hds-pagination-nav__page-item:nth-child(3)')
      .hasClass('hds-pagination-nav__button-number--is-selected');
  });
});
