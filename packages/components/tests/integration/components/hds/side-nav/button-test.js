import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/side-nav/button', function (hooks) {
  setupRenderingTest(hooks);

  // Basic

  test('it renders the component', async function (assert) {
    await render(hbs`<Hds::SideNav::Button @icon="search" />`);
    assert.dom(this.element).exists();
  });

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::SideNav::Button @icon="search" />`);
    assert.dom('.hds-side-nav__button').exists();
  });

  // Test Content / Args

  test('it renders the passed in args', async function (assert) {
    await render(
      hbs`<Hds::SideNav::Button @icon="search" id="test-sidenav-button" />`
    );
    assert.dom('.flight-icon-search').exists();
  });

  // GENERATED ELEMENTS

  test('it should render a <button> if no @href or @route is passed (default)', async function (assert) {
    await render(
      hbs`<Hds::SideNav::Button @icon="search" id="test-sidenav-button" />`
    );
    assert.dom('#test-sidenav-button').hasTagName('button');
  });

  test('it should render a <a> link if @href is passed', async function (assert) {
    await render(
      hbs`<Hds::SideNav::Button @icon="search" @href="https://www.hashicorp.com/" id="test-sidenav-button" />`
    );
    assert
      .dom('#test-sidenav-button')
      .hasTagName('a')
      .hasAttribute('href', 'https://www.hashicorp.com/');
  });

  test('it should render a <a> link if @route is passed', async function (assert) {
    await render(
      hbs`<Hds::SideNav::Button @icon="search" @route="utilities.interactive" id="test-sidenav-button" />`
    );
    assert
      .dom('#test-sidenav-button')
      .hasTagName('a')
      .hasAttribute('href', '/utilities/interactive');
  });

  // ATTRIBUTES

  test('it should spread all the attributes passed to the component on the element', async function (assert) {
    await render(
      hbs`<Hds::SideNav::Button @icon="search" id="test-sidenav-button" class="my-class" data-test1 data-test2="test" />`
    );
    assert.dom('#test-sidenav-button').hasClass('my-class');
    assert.dom('#test-sidenav-button').hasAttribute('data-test1');
    assert.dom('#test-sidenav-button').hasAttribute('data-test2', 'test');
  });
});
