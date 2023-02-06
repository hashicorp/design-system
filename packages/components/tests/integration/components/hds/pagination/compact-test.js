import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/pagination/compact', function (hooks) {
  setupRenderingTest(hooks);
  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it renders the component', async function (assert) {
    await render(hbs`
    <Hds::Pagination::Compact />
    `);
    assert.dom(this.element).exists();
  });

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`
    <Hds::Pagination::Compact id="test-pagination-compact" />
    `);
    assert.dom('#test-pagination-compact').hasClass('hds-pagination');
  });

  // CONTENT

  test('it should render the "prev" and "next" controls', async function (assert) {
    await render(hbs`<Hds::Pagination::Compact />`);
    assert
      .dom('.hds-pagination-nav__arrow--direction-prev')
      .includesText('Previous');
    assert
      .dom(
        '.hds-pagination-nav__arrow--direction-prev .hds-pagination-nav__arrow-label'
      )
      .exists();
    assert
      .dom('.hds-pagination-nav__arrow--direction-next')
      .includesText('Next');
    assert
      .dom(
        '.hds-pagination-nav__arrow--direction-next .hds-pagination-nav__arrow-label'
      )
      .exists();
  });
  test('it should not render the text labels if @showLabels is set to false', async function (assert) {
    await render(hbs`
      <Hds::Pagination::Compact @showLabels={{false}} />
    `);
    assert.dom('.hds-pagination-nav__arrow-label').doesNotExist();
  });

  // DISABLED

  test('it should render disabled buttons when @isDisabledPrev/Next are set to true', async function (assert) {
    await render(hbs`
        <Hds::Pagination::Compact @isDisabledPrev={{true}} @isDisabledNext={{true}} />
      `);
    assert
      .dom('.hds-pagination-nav__arrow--direction-prev')
      .hasAttribute('disabled');
    assert
      .dom('.hds-pagination-nav__arrow--direction-next')
      .hasAttribute('disabled');
  });

  // ATTRIBUTES

  test('it should spread all the attributes passed to the component on the element', async function (assert) {
    await render(
      hbs`<Hds::Pagination::Compact id="test-pagination-compact" class="my-class" data-test1 data-test2="test" />`
    );
    assert.dom('#test-pagination-compact').hasClass('my-class');
    assert.dom('#test-pagination-compact').hasAttribute('data-test1');
    assert.dom('#test-pagination-compact').hasAttribute('data-test2', 'test');
  });

  // EVENTS

  test('it should invoke the onPageChange callback and return the value of the new page number and page size', async function (assert) {
    let direction;
    this.set('onPageChange', (dir) => (direction = dir));
    await render(
      hbs`
        <Hds::Pagination::Compact @onPageChange={{this.onPageChange}} />
        `
    );
    await click('.hds-pagination-nav__arrow--direction-prev');
    assert.strictEqual(direction, 'prev');
    await click('.hds-pagination-nav__arrow--direction-next');
    assert.strictEqual(direction, 'next');
  });

  // ROUTING

  test('it should render links instead of buttons, with the correct "href" values, if it has routing', async function (assert) {
    this.set('myQueryFunction', (page) => ({ page }));
    await render(
      hbs`<Hds::Pagination::Compact @route="components.pagination" @queryFunction={{this.myQueryFunction}} />`
    );
    assert
      .dom('.hds-pagination-nav__arrow--direction-prev')
      .hasAttribute('href', '/components/pagination?page=prev');
    assert
      .dom('.hds-pagination-nav__arrow--direction-next')
      .hasAttribute('href', '/components/pagination?page=next');
  });

  // ASSERTIONS

  test('it should throw an assertion if @queryFunction is not a function', async function (assert) {
    const errorMessage =
      '@queryFunction for "Hds::Pagination::Numbered" must be a function';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Pagination::Compact @queryFunction="foo" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
