import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, select } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/pagination-bar/index', function (hooks) {
  setupRenderingTest(hooks);

  // Test rendering:

  test('it renders the component', async function (assert) {
    await render(hbs`
      <Hds::PaginationBar @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{1}} as |P|>
        <P.Pagination />
      </Hds::PaginationBar>
    `);
    assert.dom(this.element).exists();
  });

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`
      <Hds::PaginationBar @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{1}} id="test-pagination-bar" as |P|>
        <P.Pagination />
      </Hds::PaginationBar>
    `);
    assert.dom('#test-pagination-bar').hasClass('hds-pagination-bar');
  });

  test('it renders the passed in child components', async function (assert) {
    await render(hbs`
      <Hds::PaginationBar @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{1}} as |P|>
        <P.TotalCount id="test-pagination-total-count" />
        <P.Pagination id="test-pagination" />
        <P.PageSize @sizes={{array 10 30 50}} id="test-pagination-page-size" />
      </Hds::PaginationBar>
    `);
    assert
      .dom('#test-pagination-total-count')
      .hasClass('hds-pagination-total-count');
    assert.dom('#test-pagination').hasClass('hds-pagination');
    assert
      .dom('#test-pagination-page-size')
      .hasClass('hds-pagination-page-size');
  });

  // Test user API:

  test('the selected page in numbered pagination should match the passed in currentPage value', async function (assert) {
    await render(hbs`
    <Hds::PaginationBar @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{2}} as |P|>
      <P.Pagination @type="numbered" />
    </Hds::PaginationBar>
    `);
    assert.dom('.hds-pagination__page-selected').exists();
    assert
      .dom('.hds-pagination__page-selected .hds-pagination__page-link')
      .includesText('2');
  });

  test('it should use "compact" type by default', async function (assert) {
    await render(hbs`
      <Hds::PaginationBar @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{1}} as |P|>
        <P.Pagination />
      </Hds::PaginationBar>
    `);
    // type="compact", display navButton labels, do NOT display list of page numbers
    assert
      .dom('.hds-pagination__nav-button:first-child')
      .includesText('Previous');
    assert.dom('.hds-pagination__nav-button:last-child').includesText('Next');
    assert.dom('.hds-pagination__page-list').doesNotExist();
  });

  test('it should use the passed in "numbered" type', async function (assert) {
    await render(hbs`
      <Hds::PaginationBar @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{1}} as |P|>
        <P.Pagination @type="numbered" />
      </Hds::PaginationBar>
    `);
    // type="numbered", do NOT display navButton labels, display list of page numbers
    assert
      .dom('.hds-pagination__nav-button:first-child')
      .doesNotIncludeText('Previous');
    assert
      .dom('.hds-pagination__nav-button:last-child')
      .doesNotIncludeText('Next');
    assert.dom('.hds-pagination__page-list').exists();
  });

  test('it should display the total items in TotalCount by default', async function (assert) {
    await render(hbs`
    <Hds::PaginationBar @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{1}} as |P|>
      <P.TotalCount />
      <P.Pagination />
    </Hds::PaginationBar>
    `);
    assert.dom('.hds-pagination-total-count').includesText('of 100');
  });

  test('it should not display the total items when showTotalItems is set to false', async function (assert) {
    await render(hbs`
    <Hds::PaginationBar @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{1}} as |P|>
      <P.TotalCount @showTotalItems={{false}} />
      <P.Pagination />
    </Hds::PaginationBar>
    `);
    assert.dom('.hds-pagination-total-count').doesNotIncludeText('of 100');
  });

  test('it should display options for the passed in page sizes', async function (assert) {
    await render(hbs`
    <Hds::PaginationBar @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{1}} as |P|>
      <P.Pagination />
      <P.PageSize @sizes={{array 10 30 50}} />
    </Hds::PaginationBar>
    `);
    assert.dom('.hds-pagination-page-size option[value="10"]').hasText('10');
    assert.dom('.hds-pagination-page-size option[value="30"]').hasText('30');
    assert.dom('.hds-pagination-page-size option[value="50"]').hasText('50');
  });

  // Test interactivity:

  test('when on the first page, the "Previous" NavButton should be disabled', async function (assert) {
    await render(hbs`
      <Hds::PaginationBar @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{1}} as |P|>
        <P.Pagination @type="numbered" />
      </Hds::PaginationBar>
    `);
    // Test that the 1st page is selected:
    assert
      .dom('.hds-pagination__page-item:first-child')
      .hasClass('hds-pagination__page-selected');
    assert.dom('.hds-pagination__nav-button--direction-prev').isDisabled();
  });

  test('when on the last page, the "Next" NavButton should be disabled', async function (assert) {
    await render(hbs`
      <Hds::PaginationBar @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{1}} as |P|>
        <P.Pagination @type="numbered" />
      </Hds::PaginationBar>
    `);
    // Activate the last page:
    await click(
      '.hds-pagination__page-item:last-child .hds-pagination__page-link'
    );
    // Test that the last page is selected:
    assert
      .dom('.hds-pagination__page-item:last-child')
      .hasClass('hds-pagination__page-selected');
    assert.dom('.hds-pagination__nav-button--direction-next').isDisabled();
  });

  test('it should select the activated page number', async function (assert) {
    await render(hbs`
    <Hds::PaginationBar @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{1}} as |P|>
      <P.TotalCount />
      <P.Pagination @type="numbered" />
    </Hds::PaginationBar>
    `);
    assert
      .dom('.hds-pagination__page-item:nth-child(3)')
      .doesNotHaveClass('hds-pagination__page-selected');

    // click page 3 control:
    await click(
      '.hds-pagination__page-item:nth-child(3) .hds-pagination__page-link'
    );
    assert
      .dom('.hds-pagination__page-item:nth-child(3)')
      .hasClass('hds-pagination__page-selected');
  });

  test('selecting a pageSize option should change the page size', async function (assert) {
    await render(hbs`
      <Hds::PaginationBar @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{1}} as |P|>
        <P.TotalCount id="test-pagination-total-count" />
        <P.Pagination @type="numbered" />
        <P.PageSize @sizes={{array 10 30 50}} />
      </Hds::PaginationBar>
    `);
    // Check that items per page is initially set to 10:
    assert.dom('.hds-form-select').hasValue('10');
    assert.dom('.hds-pagination-total-count').hasText('1–10 of 100');
    assert
      .dom('.hds-pagination__page-item:first-child .hds-pagination__page-link')
      .includesText('1');
    assert
      .dom('.hds-pagination__page-item:first-child .hds-pagination__page-link')
      .doesNotIncludeText('0');
    assert
      .dom('.hds-pagination__page-item:last-child .hds-pagination__page-link')
      .includesText('10');
    assert
      .dom('.hds-pagination__page-item:last-child .hds-pagination__page-link')
      .doesNotIncludeText('00');

    // Select 30 options per page:
    await select('.hds-form-select', '30');
    // check that the items per page has been updated to 30
    assert.dom('.hds-form-select').hasValue('30');
    assert.dom('.hds-pagination-total-count').hasText('1–30 of 100');
    assert
      .dom('.hds-pagination__page-item:first-child .hds-pagination__page-link')
      .includesText('1');
    assert
      .dom('.hds-pagination__page-item:first-child .hds-pagination__page-link')
      .doesNotIncludeText('0');
    assert
      .dom('.hds-pagination__page-item:last-child .hds-pagination__page-link')
      .includesText('4');
  });
});
