import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, select } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/pagination/numbered', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the component', async function (assert) {
    await render(hbs`
      <Hds::Pagination::Numbered @totalItems={{100}} @itemsPerPage={{10}} @pageSizes={{array 10 30 50}} />
    `);
    assert.dom(this.element).exists();
  });

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`
      <Hds::Pagination::Numbered @totalItems={{100}} @itemsPerPage={{10}} @pageSizes={{array 10 30 50}} id="test-pagination-numbered" />
    `);
    assert.dom('#test-pagination-numbered').hasClass('hds-pagination');
  });

  // CONTENT (AND ARGUMENTS DRILLING)

  test('it renders the main child components', async function (assert) {
    await render(hbs`
      <Hds::Pagination::Numbered @totalItems={{100}} @itemsPerPage={{10}} @pageSizes={{array 10 30 50}} />
    `);
    assert.dom('.hds-pagination .hds-pagination-info').exists();
    assert.dom('.hds-pagination .hds-pagination-nav').exists();
    assert.dom('.hds-pagination .hds-pagination-size-selector').exists();
  });
  test('it renders the "info" and "size selector" content', async function (assert) {
    await render(hbs`
      <Hds::Pagination::Numbered @totalItems={{100}} @itemsPerPage={{10}} @pageSizes={{array 10 30 50}} />
    `);
    assert.dom('.hds-pagination .hds-pagination-info').hasText('1–10 of 100');
    assert
      .dom('.hds-pagination .hds-pagination-size-selector option[value="10"]')
      .hasText('10');
  });
  test('it renders the "nav" content', async function (assert) {
    await render(hbs`
      <Hds::Pagination::Numbered @totalItems={{100}} @itemsPerPage={{10}} @pageSizes={{array 10 30 50}} />
    `);
    assert
      .dom('.hds-pagination .hds-pagination-nav__arrow--direction-prev')
      .exists();
    assert
      .dom(
        '.hds-pagination .hds-pagination-nav__page-item:last-child .hds-pagination-nav__control'
      )
      .hasText('page 10');
    assert
      .dom('.hds-pagination .hds-pagination-nav__arrow--direction-next')
      .exists();
  });

  // SHOW/HIDE ELEMENTS
  test('it hides the total items from the "info" content when @showTotalItems is false', async function (assert) {
    await render(hbs`
      <Hds::Pagination::Numbered @totalItems={{100}} @itemsPerPage={{10}} @pageSizes={{array 10 30 50}} @showTotalItems={{false}} />
    `);
    assert.dom('.hds-pagination .hds-pagination-info').hasText('1–10');
  });
  test('it hides "info", "page numbers" and "size-selector" @showInfo/@showPageNumbers/@showSizeSelector are false', async function (assert) {
    await render(hbs`
      <Hds::Pagination::Numbered @totalItems={{100}} @itemsPerPage={{10}} @pageSizes={{array 10 30 50}} @showInfo={{false}} @showPageNumbers={{false}} @showSizeSelector={{false}} />
    `);
    assert.dom('.hds-pagination .hds-pagination-info').doesNotExist();
    assert.dom('.hds-pagination .hds-pagination-nav__page-list').doesNotExist();
    assert.dom('.hds-pagination .hds-pagination-size-selector').doesNotExist();
  });
  test('it hides the "prev/next" labels by default', async function (assert) {
    await render(hbs`
      <Hds::Pagination::Numbered @totalItems={{100}} @itemsPerPage={{10}} @pageSizes={{array 10 30 50}} />
    `);
    assert
      .dom(
        '.hds-pagination-nav__arrow--direction-prev .hds-pagination-nav__arrow-label'
      )
      .doesNotExist();
    assert
      .dom(
        '.hds-pagination-nav__arrow--direction-next .hds-pagination-nav__arrow-label'
      )
      .doesNotExist();
  });
  test('it show the "prev/next" labels is @showLabels is true', async function (assert) {
    await render(hbs`
      <Hds::Pagination::Numbered @totalItems={{100}} @itemsPerPage={{10}} @pageSizes={{array 10 30 50}} @showLabels={{true}} />
    `);
    assert
      .dom(
        '.hds-pagination-nav__arrow--direction-prev .hds-pagination-nav__arrow-label'
      )
      .exists();
    assert
      .dom(
        '.hds-pagination-nav__arrow--direction-next .hds-pagination-nav__arrow-label'
      )
      .exists();
  });

  // CURRENT PAGE

  test('the selected page match the passed in @currentPage value', async function (assert) {
    await render(hbs`
    <Hds::Pagination::Numbered @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{2}} @pageSizes={{array 10 30 50}} />
    `);
    assert.dom('.hds-pagination-nav__number--is-selected').exists();
    assert.dom('.hds-pagination-nav__number--is-selected').hasText('page 2');
  });

  // TRUNCATION

  test('it truncates the page numbers by default', async function (assert) {
    await render(hbs`
      <Hds::Pagination::Numbered @totalItems={{100}} @itemsPerPage={{10}} @pageSizes={{array 10 30 50}} />
    `);
    // displays 7 items (the max number displayed)
    assert
      .dom('.hds-pagination-nav .hds-pagination-nav__page-item')
      .exists({ count: 7 });
  });
  test('it disable truncation if @isTruncated is false', async function (assert) {
    await render(hbs`
      <Hds::Pagination::Numbered @totalItems={{100}} @itemsPerPage={{10}} @pageSizes={{array 10 30 50}} @isTruncated={{false}} />
    `);
    assert
      .dom('.hds-pagination .hds-pagination-nav .hds-pagination-nav__page-item')
      .exists({ count: 10 });
  });
  test('it should display an ellipsis for the 5th item when the first page number is selected', async function (assert) {
    await render(hbs`
      <Hds::Pagination::Numbered @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{1}} @pageSizes={{array 10 30 50}} />
    `);
    assert
      .dom('.hds-pagination-nav .hds-pagination-nav__page-item:nth-child(5)')
      .hasText('...');
    assert
      .dom(
        '.hds-pagination-nav .hds-pagination-nav__page-item:not(:nth-child(5))'
      )
      .doesNotIncludeText('...');
  });
  test('it should display an ellipsis for the 2nd and 6th items when a middle page number is selected', async function (assert) {
    await render(hbs`
      <Hds::Pagination::Numbered @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{4}} @pageSizes={{array 10 30 50}} />
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
      <Hds::Pagination::Numbered @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{10}} @pageSizes={{array 10 30 50}} />
    `);
    assert.dom('.hds-pagination-nav__page-item:nth-child(3)').hasText('...');
    assert
      .dom('.hds-pagination-nav__page-item:not(:nth-child(3))')
      .doesNotIncludeText('...');
  });

  // DISABLED PREV/NEXT

  test('when on the first page, the "Previous" control should be disabled', async function (assert) {
    await render(hbs`
      <Hds::Pagination::Numbered @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{1}} @pageSizes={{array 10 30 50}} />
    `);
    // Test that the first page is selected:
    assert
      .dom(
        '.hds-pagination-nav__page-item:first-child .hds-pagination-nav__control'
      )
      .hasClass('hds-pagination-nav__number--is-selected');
    assert.dom('.hds-pagination-nav__arrow--direction-prev').isDisabled();
  });
  test('when on the last page, the "Next" control should be disabled', async function (assert) {
    await render(hbs`
      <Hds::Pagination::Numbered @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{10}} @pageSizes={{array 10 30 50}} />
    `);
    // Test that the last page is selected:
    assert
      .dom(
        '.hds-pagination-nav__page-item:last-child .hds-pagination-nav__control'
      )
      .hasClass('hds-pagination-nav__number--is-selected');
    assert.dom('.hds-pagination-nav__arrow--direction-next').isDisabled();
  });
  test('clicking on the fist/last page disable the "Prev/Next" controls', async function (assert) {
    await render(hbs`<Hds::Pagination::Numbered @totalItems={{100}} @itemsPerPage={{5}} @currentPage={{10}} @pageSizes={{array 10 30 50}} />
    `);
    assert.dom('.hds-pagination-nav__arrow--direction-prev').isNotDisabled();
    assert.dom('.hds-pagination-nav__arrow--direction-prev').isNotDisabled();
    // Activate the first page:
    await click(
      '.hds-pagination-nav__page-item:first-child .hds-pagination-nav__control'
    );
    // Test that the first page is selected:
    assert
      .dom(
        '.hds-pagination-nav__page-item:first-child .hds-pagination-nav__control'
      )
      .hasClass('hds-pagination-nav__number--is-selected');
    assert.dom('.hds-pagination-nav__arrow--direction-prev').isDisabled();
    // Activate the last page:
    await click(
      '.hds-pagination-nav__page-item:last-child .hds-pagination-nav__control'
    );
    // Test that the last page is selected:
    assert
      .dom(
        '.hds-pagination-nav__page-item:last-child .hds-pagination-nav__control'
      )
      .hasClass('hds-pagination-nav__number--is-selected');
    assert.dom('.hds-pagination-nav__arrow--direction-next').isDisabled();
  });

  // ATTRIBUTES

  test('it should spread all the attributes passed to the component on the element', async function (assert) {
    await render(
      hbs`<Hds::Pagination::Numbered @totalItems={{100}} @itemsPerPage={{10}} @pageSizes={{array 10 30 50}} id="test-pagination-numbered" class="my-class" data-test1 data-test2="test" />`
    );
    assert.dom('#test-pagination-numbered').hasClass('my-class');
    assert.dom('#test-pagination-numbered').hasAttribute('data-test1');
    assert.dom('#test-pagination-numbered').hasAttribute('data-test2', 'test');
  });

  // INTERACTION

  test('it should select the activated page number', async function (assert) {
    await render(hbs`
    <Hds::Pagination::Numbered @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{1}} @pageSizes={{array 10 30 50}} />
    `);
    assert
      .dom(
        '.hds-pagination-nav__page-item:nth-child(3) .hds-pagination-nav__control'
      )
      .doesNotHaveClass('hds-pagination-nav__number--is-selected');

    // click page 3 control:
    await click(
      '.hds-pagination-nav__page-item:nth-child(3) .hds-pagination-nav__control'
    );
    assert
      .dom(
        '.hds-pagination-nav__page-item:nth-child(3) .hds-pagination-nav__control'
      )
      .hasClass('hds-pagination-nav__number--is-selected');
  });
  test('selecting a pageSize option should change the page size', async function (assert) {
    await render(hbs`
      <Hds::Pagination::Numbered @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{1}} @pageSizes={{array 10 30 50}} />
    `);
    // Check that items per page is initially set to 10:
    assert.dom('.hds-pagination-size-selector select').hasValue('10');
    assert.dom('.hds-pagination-info').hasText('1–10 of 100');
    assert
      .dom(
        '.hds-pagination-nav__page-item:first-child .hds-pagination-nav__control'
      )
      .includesText('1');
    assert
      .dom(
        '.hds-pagination-nav__page-item:first-child .hds-pagination-nav__control'
      )
      .doesNotIncludeText('0');
    assert
      .dom(
        '.hds-pagination-nav__page-item:last-child .hds-pagination-nav__control'
      )
      .includesText('10');
    assert
      .dom(
        '.hds-pagination-nav__page-item:last-child .hds-pagination-nav__control'
      )
      .doesNotIncludeText('00');

    // Select 30 options per page:
    await select('.hds-pagination-size-selector select', '30');
    // check that the items per page has been updated to 30
    assert.dom('.hds-pagination-size-selector select').hasValue('30');
    assert.dom('.hds-pagination-info').hasText('1–30 of 100');
    assert
      .dom(
        '.hds-pagination-nav__page-item:first-child .hds-pagination-nav__control'
      )
      .includesText('1');
    assert
      .dom(
        '.hds-pagination-nav__page-item:first-child .hds-pagination-nav__control'
      )
      .doesNotIncludeText('0');
    assert
      .dom(
        '.hds-pagination-nav__page-item:last-child .hds-pagination-nav__control'
      )
      .includesText('4');
  });

  // EVENTS

  test('it should invoke the onPageChange callback and return the value of the new page number and page size', async function (assert) {
    let pageNumber, pageSize;
    this.set('onPageChange', (page, size) => {
      pageNumber = page;
      pageSize = size;
    });
    await render(
      hbs`
        <Hds::Pagination::Numbered @totalItems={{100}} @itemsPerPage={{10}} @pageSizes={{array 10 30 50}} @onPageChange={{this.onPageChange}} />
        `
    );
    await click(
      '.hds-pagination-nav__page-item:nth-child(3) .hds-pagination-nav__control'
    );
    assert.strictEqual(pageNumber, 3);
    assert.strictEqual(pageSize, 10);
  });
  test('it should invoke the onPageSizeChange callback and return the value of the new page size', async function (assert) {
    let size;
    this.set('onPageSizeChange', (pageSize) => (size = pageSize));
    await render(
      hbs`
        <Hds::Pagination::Numbered @totalItems={{100}} @itemsPerPage={{10}} @pageSizes={{array 10 30 50}} @onPageSizeChange={{this.onPageSizeChange}} />
        `
    );
    await select('.hds-pagination-size-selector select', '30'); // notice: '30' needs to be a string to work
    assert.strictEqual(size, 30); // notice: it's converted to an integer by the callback function
  });
});
