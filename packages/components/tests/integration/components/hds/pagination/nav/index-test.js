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

  test('it has the same number of pages displayed as are passed in for the "numbered" type', async function (assert) {
    await render(hbs`
      <Hds::Pagination::Nav @totalPages={{10}} @currentPage={{1}} @type="numbered" />
    `);
    assert.dom('.hds-pagination-nav__page-item:nth-child(10)').exists();
  });

  test('it displays a truncated list of page numbers for the "truncated" type', async function (assert) {
    await render(hbs`
      <Hds::Pagination::Nav @totalPages={{100}} @currentPage={{1}} @type="truncated" />
    `);
    // displays 7 items (the max number displayed)
    assert.dom('.hds-pagination-nav__page-item').exists({ count: 7 });
    // It displays an ellipsis for the 5th item initially
    assert.dom('.hds-pagination-nav__page-item:nth-child(5)').hasText('...');
    assert
      .dom('.hds-pagination-nav__page-item:not(:nth-child(5))')
      .doesNotIncludeText('...');
  });

  test('it should display an ellipsis for the 2nd and 6th items when a middle page number is selected', async function (assert) {
    await render(hbs`
      <Hds::Pagination::Nav @totalPages={{100}} @currentPage={{4}} @type="truncated" />
    `);
    assert.dom('.hds-pagination-nav__page-item:nth-child(2)').hasText('...');
    assert.dom('.hds-pagination-nav__page-item:nth-child(6)').hasText('...');
    assert
      .dom(
        '.hds-pagination-nav__page-item:not(:nth-child(2)):not(:nth-child(6))'
      )
      .doesNotIncludeText('...');
  });

  test('it should display an ellipsis for the 3rd item when the last page number is selected', async function (assert) {
    await render(hbs`
      <Hds::Pagination::Nav @totalPages={{100}} @currentPage={{100}} @type="truncated" />
    `);
    assert.dom('.hds-pagination-nav__page-item:nth-child(3)').hasText('...');
    assert
      .dom('.hds-pagination-nav__page-item:not(:nth-child(3))')
      .doesNotIncludeText('...');
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
