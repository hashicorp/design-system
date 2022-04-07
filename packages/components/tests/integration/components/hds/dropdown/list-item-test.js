import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/dropdown/list-item', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  // notice: the "list-item" has multiple "types" controlled via the @item property

  test('it renders the "list-item"', async function (assert) {
    await render(hbs`<Hds::Dropdown::ListItem />`);
    assert.dom(this.element).exists();
  });

  // TYPES OF ITEM

  test('it should render the "list-item" with a CSS class that matches the component name and the "interactive" type (default)"', async function (assert) {
    assert.expect(2);
    await render(hbs`<Hds::Dropdown::ListItem @text="interactive" />`);
    assert.dom('#test-list-item').hasClass('hds-dropdown-list-item');
    assert
      .dom('#test-list-item')
      .hasClass('hds-dropdown-list-item--interactive');
  });
  test('it should render the "list-item/title" with a CSS class that matches the component name and the type of item', async function (assert) {
    assert.expect(2);
    await render(
      hbs`<Hds::Dropdown::ListItem @item="title" @text="title" id="test-list-item" />`
    );
    assert.dom('#test-list-item').hasClass('hds-dropdown-list-item');
    assert.dom('#test-list-item').hasClass('hds-dropdown-list-item--title');
  });
  test('it should render the "list-item/description" with a CSS class that matches the component name and the type of item', async function (assert) {
    assert.expect(2);
    await render(
      hbs`<Hds::Dropdown::ListItem @item="description" @text="description" id="test-list-item" />`
    );
    assert.dom('#test-list-item').hasClass('hds-dropdown-list-item');
    assert
      .dom('#test-list-item')
      .hasClass('hds-dropdown-list-item--description');
  });
  test('it should render the "list-item/separator" with a CSS class that matches the component name and the type of item', async function (assert) {
    assert.expect(2);
    await render(hbs`<Hds::Dropdown::ListItem @item="separator" />`);
    assert.dom('#test-list-item').hasClass('hds-dropdown-list-item');
    assert.dom('#test-list-item').hasClass('hds-dropdown-list-item--separator');
  });
  test('it should render the "list-item/copy-item" with a CSS class that matches the component name and the type of item', async function (assert) {
    assert.expect(2);
    await render(hbs`<Hds::Dropdown::ListItem @text="copy-item" />`);
    assert.dom('#test-list-item').hasClass('hds-dropdown-list-item');
    assert.dom('#test-list-item').hasClass('hds-dropdown-list-item--copy-item');
  });
  test('it should render the "list-item/generic" with a CSS class that matches the component name and the type of item', async function (assert) {
    assert.expect(2);
    await render(hbs`<Hds::Dropdown::ListItem @item="generic" />`);
    assert.dom('#test-list-item').hasClass('hds-dropdown-list-item');
    assert.dom('#test-list-item').hasClass('hds-dropdown-list-item--generic');
  });

  // ITEM: TEXT

  test('it should render the "list-item/title" with a title text', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ListItem @item="title" @text="This is the title" id="test-list-item" />`
    );
    assert.dom('#test-list-item').hasText('This is the title');
  });

  // ITEM: DESCRIPTION

  test('it should render the "list-item/description" with a description text', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ListItem @item="description" @text="This is the description" id="test-list-item" />`
    );
    assert.dom('#test-list-item').hasText('This is the description');
  });

  // ITEM: INTERACTIVE

  test('it should render the "list-item" as a button by default"', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ListItem @text="interactive" id="test-list-item" />`
    );
    assert.dom('#test-list-item').hasTagName('button');
  });
  test('it should render the "list-item" as a link if it has a @route parameter"', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ListItem @text="interactive" @route="index" id="test-list-item" />`
    );
    assert.dom('#test-list-item').hasTagName('a');
  });
  test('it should render the "list-item" as a link if it has a @href argument"', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ListItem @text="interactive" @href="#" id="test-list-item" />`
    );
    assert.dom('#test-list-item').hasTagName('a');
  });
  test('it should render the "action" color as the default if no color is declared"', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ListItem @text="interactive" id="test-list-item" />`
    );
    assert.dom('#test-button').hasClass('hds-dropdown-list-item--color-action');
  });
  test('it should render the correct CSS color class if the @color prop is declared', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ListItem @color="critical" @text="interactive" id="test-list-item" />`
    );
    assert
      .dom('#test-button')
      .hasClass('hds-dropdown-list-item--color-critical');
  });

  // TODO
  // - test text
  // - test icon

  // ICON
  test('Interactive item has icon if one is defined', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ListItem @text="external link" @href="/" @color="critical" @icon="trash" id="test-list-item" />`
    );

    assert
      .dom(this.element.querySelector('.flight-icon.flight-icon-trash'))
      .exists();
  });

  // A11Y

  test('it should render the "list-item/separator" with role of separator', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ListItem @item="separator" id="test-list-item" />`
    );
    assert.dom('#test-list-item').hasAttribute('role', 'separator');
  });

  // ASSERTIONS

  // TODO
});
