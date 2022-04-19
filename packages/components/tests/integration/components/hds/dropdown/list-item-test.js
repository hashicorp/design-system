import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/dropdown/list-item', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  // notice (1): the "list-item" has multiple "types" controlled via the @item property
  // notice (2): unlike other components, the `...attributes` spread is not applied to the top element, but to the `<button>/<a>` children,
  // so we can't use the DOM "id" to target the component but we have to rely on the class name

  test('it renders the "list-item"', async function (assert) {
    await render(hbs`<Hds::Dropdown::ListItem @text="some text must exist" />`);
    assert.dom(this.element).exists();
  });

  // TYPES OF ITEM

  test('it should render the "list-item" as a "<li>" element with a CSS class that matches the component name and the "interactive" type (default)"', async function (assert) {
    assert.expect(2);
    await render(hbs`<Hds::Dropdown::ListItem @text="interactive" />`);
    assert.dom('li').hasClass('hds-dropdown-list-item');
    assert
      .dom('.hds-dropdown-list-item')
      .hasClass('hds-dropdown-list-item--interactive');
  });
  test('it should render the "list-item/copy-item" with a CSS class that matches the component name and the type of item', async function (assert) {
    assert.expect(2);
    await render(
      hbs`<Hds::Dropdown::ListItem @item="copy-item" @text="copy-item" />`
    );
    assert.dom('.hds-dropdown-list-item').hasClass('hds-dropdown-list-item');
    assert
      .dom('.hds-dropdown-list-item')
      .hasClass('hds-dropdown-list-item--copy-item');
  });
  test('it should render the "list-item/description" with a CSS class that matches the component name and the type of item', async function (assert) {
    assert.expect(2);
    await render(
      hbs`<Hds::Dropdown::ListItem @item="description" @text="description" />`
    );
    assert.dom('.hds-dropdown-list-item').hasClass('hds-dropdown-list-item');
    assert
      .dom('.hds-dropdown-list-item')
      .hasClass('hds-dropdown-list-item--description');
  });
  test('it should render the "list-item/generic" with a CSS class that matches the component name and the type of item', async function (assert) {
    assert.expect(2);
    await render(hbs`<Hds::Dropdown::ListItem @item="generic" />`);
    assert.dom('.hds-dropdown-list-item').hasClass('hds-dropdown-list-item');
    assert
      .dom('.hds-dropdown-list-item')
      .hasClass('hds-dropdown-list-item--generic');
  });
  test('it should render the "list-item/interactive" with a CSS class that matches the component name and the type of item', async function (assert) {
    assert.expect(2);
    await render(
      hbs`<Hds::Dropdown::ListItem @item="interactive" @text="interactive" />`
    );
    assert.dom('.hds-dropdown-list-item').hasClass('hds-dropdown-list-item');
    assert
      .dom('.hds-dropdown-list-item')
      .hasClass('hds-dropdown-list-item--interactive');
  });
  test('it should render the "list-item/separator" with a CSS class that matches the component name and the type of item', async function (assert) {
    assert.expect(2);
    await render(hbs`<Hds::Dropdown::ListItem @item="separator" />`);
    assert.dom('.hds-dropdown-list-item').hasClass('hds-dropdown-list-item');
    assert
      .dom('.hds-dropdown-list-item')
      .hasClass('hds-dropdown-list-item--separator');
  });
  test('it should render the "list-item/title" with a CSS class that matches the component name and the type of item', async function (assert) {
    assert.expect(2);
    await render(hbs`<Hds::Dropdown::ListItem @item="title" @text="title" />`);
    assert.dom('.hds-dropdown-list-item').hasClass('hds-dropdown-list-item');
    assert
      .dom('.hds-dropdown-list-item')
      .hasClass('hds-dropdown-list-item--title');
  });

  // ITEM: DESCRIPTION

  test('it should render the "list-item/description" with a description text', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ListItem @item="description" @text="This is the description" />`
    );
    assert.dom('.hds-dropdown-list-item').hasText('This is the description');
  });

  // ITEM: INTERACTIVE

  test('it should render the "list-item" with a button by default"', async function (assert) {
    await render(hbs`<Hds::Dropdown::ListItem @text="interactive" />`);
    assert.dom('.hds-dropdown-list-item > button').exists();
  });
  test('it should render the "list-item" with a link if it has a @route parameter"', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ListItem @text="interactive" @route="index" />`
    );
    assert.dom('.hds-dropdown-list-item > a').exists();
  });
  test('it should render the "list-item" with a link if it has a @href argument"', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ListItem @text="interactive" @href="#" />`
    );
    assert.dom('.hds-dropdown-list-item > a').exists();
  });
  test('it should render the "action" color as the default if no color is declared"', async function (assert) {
    await render(hbs`<Hds::Dropdown::ListItem @text="interactive" />`);
    assert
      .dom('.hds-dropdown-list-item')
      .hasClass('hds-dropdown-list-item--color-action');
  });
  test('it should render the correct CSS color class if the @color prop is declared', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ListItem @color="critical" @text="interactive" @icon="trash" />`
    );
    assert
      .dom('.hds-dropdown-list-item')
      .hasClass('hds-dropdown-list-item--color-critical');
  });
  test('if an icon is declared the flight icon should render in the component', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ListItem @icon="clipboard-copy" @text="interactive" />`
    );
    assert.dom('.flight-icon.flight-icon-clipboard-copy').exists();
  });
  test('it should render the text passed as @text prop', async function (assert) {
    await render(hbs`<Hds::Dropdown::ListItem @text="interactive text" />`);
    assert.dom('.hds-dropdown-list-item').hasText('interactive text');
  });

  // ITEM: TITLE

  test('it should render the "list-item/title" with a title text', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ListItem @item="title" @text="This is the title" />`
    );
    assert.dom('.hds-dropdown-list-item').hasText('This is the title');
  });

  // A11Y

  test('it should render the "list-item/separator" with role of separator', async function (assert) {
    await render(hbs`<Hds::Dropdown::ListItem @item="separator" />`);
    assert.dom('.hds-dropdown-list-item').hasAttribute('role', 'separator');
  });

  // ASSERTIONS

  // TODO once everything is finalized in https://github.com/hashicorp/design-system/pull/66
});
