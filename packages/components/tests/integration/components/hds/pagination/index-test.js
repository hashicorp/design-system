import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, select } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/pagination/index', function (hooks) {
  setupRenderingTest(hooks);

  // Test rendering:

  test('it renders the component', async function (assert) {
    await render(hbs`
      <Hds::Pagination @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{1}} as |P|>
        <P.Nav />
      </Hds::Pagination>
    `);
    assert.dom(this.element).exists();
  });

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`
      <Hds::Pagination @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{1}} id="test-pagination-bar" as |P|>
        <P.Nav />
      </Hds::Pagination>
    `);
    assert.dom('#test-pagination-bar').hasClass('hds-pagination');
  });

  test('it renders the passed in child components', async function (assert) {
    await render(hbs`
      <Hds::Pagination @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{1}} as |P|>
        <P.Info id="test-pagination-info" />
        <P.Nav id="test-pagination-nav" />
        <P.SizeSelector @sizes={{array 10 30 50}} id="test-pagination-size-selector" />
      </Hds::Pagination>
    `);
    assert.dom('#test-pagination-info').hasClass('hds-pagination-info');
    assert.dom('#test-pagination-nav').hasClass('hds-pagination-nav');
    assert
      .dom('#test-pagination-size-selector')
      .hasClass('hds-pagination-size-selector');
  });

  // Test user API:

  test('the selected page in numbered pagination should match the passed in currentPage value', async function (assert) {
    await render(hbs`
    <Hds::Pagination @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{2}} as |P|>
      <P.Nav @type="numbered" />
    </Hds::Pagination>
    `);
    assert.dom('.hds-pagination-nav__button-number--is-selected').exists();
    assert
      .dom(
        '.hds-pagination-nav__button-number--is-selected .hds-pagination-nav__control'
      )
      .includesText('2');
  });

  test('it should use "compact" type by default', async function (assert) {
    await render(hbs`
      <Hds::Pagination @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{1}} as |P|>
        <P.Nav />
      </Hds::Pagination>
    `);
    // type="compact", display navButton labels, do NOT display list of page numbers
    assert
      .dom('.hds-pagination-nav__button-arrow--direction-prev')
      .includesText('Previous');
    assert
      .dom('.hds-pagination-nav__button-arrow--direction-next')
      .includesText('Next');
    assert.dom('.hds-pagination-nav__page-list').doesNotExist();
  });

  test('it should use the passed in "numbered" type', async function (assert) {
    await render(hbs`
      <Hds::Pagination @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{1}} as |P|>
        <P.Nav @type="numbered" />
      </Hds::Pagination>
    `);
    // type="numbered", do NOT display navButton labels, display list of page numbers
    assert
      .dom('.hds-pagination-nav__button-arrow--direction-next')
      .doesNotIncludeText('Previous');
    assert
      .dom('.hds-pagination-nav__button-arrow--direction-prev')
      .doesNotIncludeText('Next');
    assert.dom('.hds-pagination-nav__page-list').exists();
  });

  test('it should display options for the passed in page sizes', async function (assert) {
    await render(hbs`
    <Hds::Pagination @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{1}} as |P|>
      <P.Nav />
      <P.SizeSelector @sizes={{array 10 30 50}} />
    </Hds::Pagination>
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

  // Test interactivity:

  test('when on the first page, the "Previous" NavButton should be disabled', async function (assert) {
    await render(hbs`
      <Hds::Pagination @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{1}} as |P|>
        <P.Nav @type="numbered" />
      </Hds::Pagination>
    `);
    // Test that the 1st page is selected:
    assert
      .dom('.hds-pagination-nav__page-item:first-child')
      .hasClass('hds-pagination-nav__button-number--is-selected');
    assert
      .dom('.hds-pagination-nav__button-arrow--direction-prev')
      .isDisabled();
  });

  test('when on the last page, the "Next" NavButton should be disabled', async function (assert) {
    await render(hbs`
      <Hds::Pagination @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{1}} as |P|>
        <P.Nav @type="numbered" />
      </Hds::Pagination>
    `);
    // Activate the last page:
    await click(
      '.hds-pagination-nav__page-item:last-child .hds-pagination-nav__control'
    );
    // Test that the last page is selected:
    assert
      .dom('.hds-pagination-nav__page-item:last-child')
      .hasClass('hds-pagination-nav__button-number--is-selected');
    assert
      .dom('.hds-pagination-nav__button-arrow--direction-next')
      .isDisabled();
  });

  test('it should select the activated page number', async function (assert) {
    await render(hbs`
    <Hds::Pagination @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{1}} as |P|>
      <P.Info />
      <P.Nav @type="numbered" />
    </Hds::Pagination>
    `);
    assert
      .dom('.hds-pagination-nav__page-item:nth-child(3)')
      .doesNotHaveClass('hds-pagination-nav__button-number--is-selected');

    // click page 3 control:
    await click(
      '.hds-pagination-nav__page-item:nth-child(3) .hds-pagination-nav__control'
    );
    assert
      .dom('.hds-pagination-nav__page-item:nth-child(3)')
      .hasClass('hds-pagination-nav__button-number--is-selected');
  });

  test('selecting a pageSize option should change the page size', async function (assert) {
    await render(hbs`
      <Hds::Pagination @totalItems={{100}} @itemsPerPage={{10}} @currentPage={{1}} as |P|>
        <P.Info />
        <P.Nav @type="numbered" />
        <P.SizeSelector @sizes={{array 10 30 50}} />
      </Hds::Pagination>
    `);
    // Check that items per page is initially set to 10:
    assert.dom('.hds-form-select').hasValue('10');
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
    await select('.hds-form-select', '30');
    // check that the items per page has been updated to 30
    assert.dom('.hds-form-select').hasValue('30');
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
});
