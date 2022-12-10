import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/pagination/nav/button-arrow',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders the component', async function (assert) {
      await render(hbs`
      <Hds::Pagination::Nav::ButtonArrow @direction="next" />
    `);
      assert.dom(this.element).exists();
    });

    test('it should render with a CSS class that matches the component name', async function (assert) {
      await render(hbs`
      <Hds::Pagination::Nav::ButtonArrow @direction="prev" id="test-button-arrow" />
    `);
      assert
        .dom('#test-button-arrow')
        .hasClass('hds-pagination-nav__button-arrow');
    });

    // Test API:

    test('it should render a "Previous" or "Next" button matching the passed in direction', async function (assert) {
      await render(hbs`
      <Hds::Pagination::Nav::ButtonArrow @direction="next" id="test-button-arrow-next" />
      <Hds::Pagination::Nav::ButtonArrow @direction="prev" id="test-button-arrow-prev" />
    `);
      assert
        .dom('#test-button-arrow-next')
        .hasClass('hds-pagination-nav__button-arrow--direction-next');
      assert.dom('#test-button-arrow-next .flight-icon-chevron-right').exists();
      assert
        .dom('#test-button-arrow-prev')
        .hasClass('hds-pagination-nav__button-arrow--direction-prev');
      assert.dom('#test-button-arrow-prev .flight-icon-chevron-left').exists();
    });

    test('it should render the appropriate text label when type is set to "compact"', async function (assert) {
      await render(hbs`
      <Hds::Pagination::Nav::ButtonArrow @direction="prev" @type="compact" />
      <Hds::Pagination::Nav::ButtonArrow @direction="next" @type="compact" />
    `);
      assert
        .dom(
          '.hds-pagination-nav__button-arrow--direction-prev .hds-pagination-nav__page-label'
        )
        .hasText('Previous');
      assert
        .dom(
          '.hds-pagination-nav__button-arrow--direction-next .hds-pagination-nav__page-label'
        )
        .hasText('Next');
    });
  }
);
