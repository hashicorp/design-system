import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/side-nav/index', function (hooks) {
  setupRenderingTest(hooks);

  // Basic

  test('it renders the component', async function (assert) {
    await render(
      hbs`<Hds::SideNav::HomeLink @icon="hashicorp" aria-label="HashiCorp" @href="#" />`
    );
    assert.dom(this.element).exists();
  });

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::SideNav::HomeLink @icon="hashicorp" aria-label="HashiCorp" @href="#" id="test-home-link" />`
    );
    assert.dom('#test-home-link').hasClass('hds-side-nav__home-link');
  });

  // Test Content / Args

  test('it renders the passed in args', async function (assert) {
    await render(
      hbs`<Hds::SideNav::HomeLink @icon="hashicorp" aria-label="HashiCorp" id="test-home-link" @href="https://www.hashicorp.com/" />`
    );
    assert.dom('.flight-icon-hashicorp').exists();
    assert
      .dom('#test-home-link')
      .hasAttribute('href', 'https://www.hashicorp.com/');
  });

  test('it renders the logo with a custom passed in color', async function (assert) {
    await render(
      hbs`
      <Hds::SideNav::HomeLink
        @icon="boundary"
        @color="var(--token-color-boundary-brand)"
        @href="#"
      />
      `
    );
    assert
      .dom('.flight-icon-boundary')
      .hasAttribute('fill', 'var(--token-color-boundary-brand)');
  });

  // ATTRIBUTES

  test('it should spread all the attributes passed to the component on the element', async function (assert) {
    await render(
      hbs`<Hds::SideNav::HomeLink id="test-sidenav-homelink" @icon="hashicorp" @href="https://www.hashicorp.com/" class="my-class" data-test1 data-test2="test" />`
    );
    assert.dom('#test-sidenav-homelink').hasClass('my-class');
    assert.dom('#test-sidenav-homelink').hasAttribute('data-test1');
    assert.dom('#test-sidenav-homelink').hasAttribute('data-test2', 'test');
  });
});
