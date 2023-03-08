import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/side-nav/wrapper', function (hooks) {
  setupRenderingTest(hooks);

  // Basic:

  test('it renders the component', async function (assert) {
    await render(hbs`<Hds::SideNav::Wrapper />`);
    assert.dom(this.element).exists();
  });

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::SideNav::Wrapper id="test-side-nav" />`);
    assert.dom('#test-side-nav').hasClass('hds-side-nav__wrapper');
  });

  test('it should spread all the attributes passed to the component', async function (assert) {
    await render(
      hbs`<Hds::SideNav::Wrapper id="test-side-nav" data-test="test" />`
    );
    assert.dom('#test-side-nav').hasAttribute('data-test', 'test');
  });

  // Test Content:

  test('it renders content passed to the named blocks', async function (assert) {
    await render(hbs`
      <Hds::SideNav::Wrapper>
        <:header>
          <span id="test-sidenav-header" />
        </:header>
        <:body>
          <span id="test-sidenav-body" />
        </:body>
        <:footer>
          <span id="test-sidenav-footer" />
        </:footer>
      </Hds::SideNav::Wrapper>
    `);

    assert.dom('#test-sidenav-header').exists();
    assert.dom('#test-sidenav-body').exists();
    assert.dom('#test-sidenav-footer').exists();
  });

  // ATTRIBUTES

  test('it should spread all the attributes passed to the component on the element', async function (assert) {
    await render(
      hbs`<Hds::SideNav::Wrapper id="test-side-nav" class="my-class" data-test1 data-test2="test" />`
    );
    assert
      .dom('#test-side-nav')
      .hasClass('my-class')
      .hasAttribute('data-test1')
      .hasAttribute('data-test2', 'test');
  });
});
