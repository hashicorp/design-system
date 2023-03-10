import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/side-nav/index', function (hooks) {
  setupRenderingTest(hooks);

  // Basic

  test('it renders the component', async function (assert) {
    await render(hbs`<Hds::SideNav::List />`);
    assert.dom(this.element).exists();
  });

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::SideNav::List />`);
    assert.dom('.hds-side-nav__list-wrapper').exists();
  });

  // Test Content / Args

  test('it renders passed in content', async function (assert) {
    await render(hbs`
      <Hds::SideNav::List as |L|>
        <L.Link @text="Dashboard" id="test-sidenav-list-content" />
      </Hds::SideNav::List>
    `);
    assert.dom('#test-sidenav-list-content').exists();
  });

  // Accessibilty feature
  test('it has the role of "list" role so Safari will identify it correctly as a list since the list-style is changed in the CSS', async function (assert) {
    await render(hbs`
      <Hds::SideNav::List />
    `);
    assert.dom('.hds-side-nav__list').hasAttribute('role', 'list');
  });

  // ATTRIBUTES

  test('it should spread all the attributes passed to the component on the element', async function (assert) {
    await render(
      hbs`<Hds::SideNav::List id="test-sidenav-list" class="my-class" data-test1 data-test2="test" />`
    );
    assert.dom('#test-sidenav-list').hasClass('my-class');
    assert.dom('#test-sidenav-list').hasAttribute('data-test1');
    assert.dom('#test-sidenav-list').hasAttribute('data-test2', 'test');
  });

  //role="list"
});
