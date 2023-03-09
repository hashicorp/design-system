import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/side-nav/index', function (hooks) {
  setupRenderingTest(hooks);

  // Basic

  test('it renders the component', async function (assert) {
    await render(
      hbs`<Hds::SideNav::List::BackLink @text="Back to parent page" @href="#" />`
    );
    assert.dom(this.element).exists();
  });

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::SideNav::List::BackLink @text="Back to parent page" @href="#" />`
    );
    assert.dom('.hds-side-nav__list-item-link--back-link').exists();
  });

  // Test Content / Args

  test('it renders the passed in args', async function (assert) {
    await render(
      hbs`<Hds::SideNav::List::BackLink @text="Back to parent page" @href="#" />`
    );
    assert.dom('.flight-icon-chevron-left').exists();
    assert.dom('.hds-side-nav__list-item-text').hasText('Back to parent page');
  });

  // GENERATED ELEMENTS

  test('it should render a <button> if no @href or @route is passed (default)', async function (assert) {
    await render(
      hbs`<Hds::SideNav::List::BackLink @text="Back to parent page" />`
    );
    assert.dom('.hds-side-nav__list-item-link--back-link').hasTagName('button');
  });

  test('it should render a <a> link if @href is passed', async function (assert) {
    await render(
      hbs`<Hds::SideNav::List::BackLink @text="Back to parent page" @href="https://www.hashicorp.com/" />`
    );
    assert
      .dom('.hds-side-nav__list-item-link--back-link')
      .hasTagName('a')
      .hasAttribute('href', 'https://www.hashicorp.com/');
  });

  test('it should render a <a> link if @route is passed', async function (assert) {
    await render(
      hbs`<Hds::SideNav::List::BackLink @text="Back to parent page" @route="utilities.interactive" />`
    );
    assert.dom('.hds-side-nav__list-item-link--back-link').hasTagName('a');
    assert
      .dom('.hds-side-nav__list-item-link--back-link')
      .hasAttribute('href', '/utilities/interactive');
  });

  // ATTRIBUTES

  test('it should spread all the attributes passed to the component on the element', async function (assert) {
    await render(
      hbs`<Hds::SideNav::List::BackLink id="test-sidenav-backlink" @text="Back to parent page" @href="https://www.hashicorp.com/" class="my-class" data-test1 data-test2="test" />`
    );
    assert.dom('#test-sidenav-backlink').hasClass('my-class');
    assert.dom('#test-sidenav-backlink').hasAttribute('data-test1');
    assert.dom('#test-sidenav-backlink').hasAttribute('data-test2', 'test');
  });
});
