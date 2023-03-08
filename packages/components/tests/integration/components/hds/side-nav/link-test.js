import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/side-nav/index', function (hooks) {
  setupRenderingTest(hooks);

  // Basic

  test('it renders the component', async function (assert) {
    await render(
      hbs`<Hds::SideNav::List::Link @text="Terraform" @icon="terraform" @href="#" />`
    );
    assert.dom(this.element).exists();
  });

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::SideNav::List::Link @text="Terraform" @icon="terraform" @href="#" />`
    );
    assert.dom('.hds-side-nav__list-item-link').exists();
  });

  // Test Content / Args

  test('it renders the passed in args', async function (assert) {
    await render(
      hbs`<Hds::SideNav::List::Link @icon="boundary" @text="Boundary" @count="3" @badge="Alpha" @hasSubItems={{true}} />`
    );
    assert.dom('.flight-icon-boundary').exists();
    assert.dom('.hds-side-nav__list-item-label').hasText('Boundary');
    assert.dom('.hds-badge-count').hasText('3');
    assert.dom('.hds-badge').hasText('Alpha');
    assert.dom('.flight-icon-chevron-right').exists();
  });

  test('it renders the passed in custom content', async function (assert) {
    await render(hbs`
      <Hds::SideNav::List::Link @text="Terraform">
        <div id="custom-content"></div>
      </Hds::SideNav::List::Link>
    `);
    assert.dom('#custom-content').exists();
  });

  // GENERATED ELEMENTS

  test('it should render a <button> if no @href or @route is passed (default)', async function (assert) {
    await render(hbs`<Hds::SideNav::List::Link @text="Boundary" />`);
    assert.dom('.hds-side-nav__list-item-link').hasTagName('button');
  });

  test('it should render a <a> link if @href is passed', async function (assert) {
    await render(
      hbs`<Hds::SideNav::List::Link @text="Boundary" @href="https://www.hashicorp.com/" />`
    );
    assert
      .dom('.hds-side-nav__list-item-link')
      .hasTagName('a')
      .hasAttribute('href', 'https://www.hashicorp.com/');
  });

  test('it should render a <a> link if @route is passed', async function (assert) {
    await render(
      hbs`<Hds::SideNav::List::Link @text="Boundary" @route="utilities.interactive" />`
    );
    assert
      .dom('.hds-side-nav__list-item-link')
      .hasTagName('a')
      .hasAttribute('href', '/utilities/interactive');
  });

  // ATTRIBUTES

  test('it should spread all the attributes passed to the component on the element', async function (assert) {
    await render(
      hbs`<Hds::SideNav::List::Link class="my-class" data-test1 data-test2="test" />`
    );
    assert
      .dom('.hds-side-nav__list-item-link')
      .hasClass('my-class')
      .hasAttribute('data-test1')
      .hasAttribute('data-test2', 'test');
  });
});
