import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/side-nav/index', function (hooks) {
  setupRenderingTest(hooks);

  // Basic

  test('it renders the component', async function (assert) {
    await render(hbs`<Hds::SideNav::Header />`);
    assert.dom(this.element).exists();
  });

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::SideNav::Header />`);
    assert.dom('.hds-side-nav-header').exists();
  });

  // Test Content / Args

  test('it renders passed in content', async function (assert) {
    await render(hbs`
      <Hds::SideNav::Header>
        <:logo>
          <div id="test-yield1"></div>
        </:logo>
        <:actions>
          <div id="test-yield2"></div>
        </:actions>
      </Hds::SideNav::Header>
    `);
    assert.dom('#test-yield1').exists();
    assert.dom('#test-yield2').exists();
  });

  // ATTRIBUTES

  test('it should spread all the attributes passed to the component on the element', async function (assert) {
    await render(
      hbs`<Hds::SideNav::Header id="test-sidenav-header" class="my-class" data-test1 data-test2="test" />`
    );
    assert.dom('#test-sidenav-header').hasClass('my-class');
    assert.dom('#test-sidenav-header').hasAttribute('data-test1');
    assert.dom('#test-sidenav-header').hasAttribute('data-test2', 'test');
  });
});
