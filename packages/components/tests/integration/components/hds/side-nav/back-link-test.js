import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/side-nav/index', function (hooks) {
  setupRenderingTest(hooks);

  // Basic

  test('it renders the component', async function (assert) {
    await render(
      hbs`<Hds::SideNav::BackLink @label="Back to parent page" @href="#" />`
    );
    assert.dom(this.element).exists();
  });

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::SideNav::BackLink @label="Back to parent page" @href="#" />`
    );
    assert.dom('.hds-side-nav__list-item-link--back-link').exists();
  });

  // Test Content / Args

  test('it renders the passed in args', async function (assert) {
    await render(
      hbs`<Hds::SideNav::BackLink @label="Back to parent page" @href="https://www.hashicorp.com/" />`
    );
    assert.dom('.flight-icon-chevron-left').exists();
    assert.dom('.hds-side-nav__list-item-label').hasText('Back to parent page');
    assert
      .dom('.hds-side-nav__list-item-link--back-link')
      .hasAttribute('href', 'https://www.hashicorp.com/');
  });
});
