import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/dropdown/list-item', function (hooks) {
  setupRenderingTest(hooks);

  // ITEM: INTERACTIVE

  test('Interactive link renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(
      hbs`<Hds::Dropdown::ListItem @text="external link" @href="/" id="test-listItem" />`
    );

    assert.dom('a').hasText('external link');
  });
  test('Interactive linkTo renders', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ListItem @text="internal link" @route="index" id="test-listItem" />`
    );

    assert.dom('a').hasText('internal link');
  });
  test('Interactive button renders', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ListItem @text="button element" id="test-listItem" />`
    );

    assert.dom('button').hasText('button element');
  });

  // COLORS
  test('Interactive item has critical class if color is set to critial', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ListItem @text="external link" @href="/" @color="critical" id="test-listItem" />`
    );

    assert
      .dom(
        this.element.querySelector(
          '.hds-dropdown-list-item.hds-dropdown-list-item--interactive.hds-dropdown-list-item--color-critical'
        )
      )
      .exists();
  });

  // ICON
  test('Interactive item has icon if one is defined', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ListItem @text="external link" @href="/" @color="critical" @icon="trash" id="test-listItem" />`
    );

    assert
      .dom(this.element.querySelector('.flight-icon.flight-icon-trash'))
      .exists();
  });

  // ITEM: TITLE
  test('Title renders when item is set to title', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ListItem @text="some title" @item="title" id="test-listItem" />`
    );

    assert
      .dom(
        this.element.querySelector(
          '.hds-dropdown-list-item.hds-dropdown-list-item--title'
        )
      )
      .exists();
  });
  test('Description renders when item is set to description', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ListItem @text="some title" @item="description" id="test-listItem" />`
    );

    assert
      .dom(
        this.element.querySelector(
          '.hds-dropdown-list-item.hds-dropdown-list-item--description'
        )
      )
      .exists();
  });
  test('Separator renders when item is set to title', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ListItem @text="some title" @item="separator" id="test-listItem" />`
    );

    assert
      .dom(
        this.element.querySelector(
          '.hds-dropdown-list-item.hds-dropdown-list-item--separator'
        )
      )
      .exists();
  });
  test('Separator has role of separator for a11y', async function (assert) {
    await render(
      hbs`<Hds::Dropdown::ListItem @text="some title" @item="separator" id="test-listItem" />`
    );

    assert
      .dom(
        this.element.querySelector(
          '.hds-dropdown-list-item.hds-dropdown-list-item--separator'
        )
      )
      .hasAttribute('role');
  });
});
