import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/side-nav/index', function (hooks) {
  setupRenderingTest(hooks);

  // Basic

  test('it renders the component', async function (assert) {
    await render(
      hbs`<Hds::SideNav::HomeLink @icon="hashicorp" @text="HashiCorp" @href="#" />`
    );
    assert.dom(this.element).exists();
  });

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::SideNav::HomeLink @icon="hashicorp" @text="HashiCorp" @href="#" id="test-home-link" />`
    );
    assert.dom('#test-home-link').hasClass('hds-side-nav__home-link');
  });

  // Test Content / Args

  test('it renders the passed in args', async function (assert) {
    await render(
      hbs`<Hds::SideNav::HomeLink @icon="hashicorp" @text="HashiCorp" @href="https://www.hashicorp.com/" />`
    );
    assert.dom('.flight-icon-hashicorp').exists();
    assert
      .dom('.hds-side-nav__home-link')
      .hasAttribute('aria-label', 'HashiCorp');
    assert
      .dom('.hds-side-nav__home-link')
      .hasAttribute('href', 'https://www.hashicorp.com/');
  });
});
