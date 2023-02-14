import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/dropdown/list-item/checkmark',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders the "list-item/checkmark"', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Checkmark>Checkmark item</Hds::Dropdown::ListItem::Checkmark>`
      );
      assert.dom(this.element).exists();
    });

    test('it should render the "list-item/checkmark" as a <li> element with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Checkmark>Checkmark item</Hds::Dropdown::ListItem::Checkmark>`
      );
      assert.dom('.hds-dropdown-list-item').hasTagName('li');
      assert
        .dom('.hds-dropdown-list-item')
        .hasClass('hds-dropdown-list-item--checkmark')
        .hasClass('hds-dropdown-list-item--color-action');
    });

    // ELEMENTS

    test('it should render the "list-item" with a button by default"', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Checkmark>Checkmark item</Hds::Dropdown::ListItem::Checkmark>`
      );
      assert.dom('button.hds-dropdown-list-item__interactive').exists();
    });
    test('it should render the "list-item" with a link if it has a @route parameter"', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Checkmark @route="index">Checkmark item</Hds::Dropdown::ListItem::Checkmark>`
      );
      assert.dom('a.hds-dropdown-list-item__interactive').exists();
    });
    test('it should render the "list-item" with a link if it has a @href argument"', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Checkmark @href="#">Checkmark item</Hds::Dropdown::ListItem::Checkmark>`
      );
      assert.dom('a.hds-dropdown-list-item__interactive').exists();
    });

    // CONTENT

    test('it should render the content passed as block', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Checkmark>Checkmark item</Hds::Dropdown::ListItem::Checkmark>`
      );
      assert.dom('.hds-dropdown-list-item').hasText('Checkmark item');
    });

    // RESULT COUNT

    test('it should render with a result count badge', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Checkmark @resultCount="10">Checkmark item</Hds::Dropdown::ListItem::Checkmark>`
      );
      assert.dom('.hds-dropdown-list-item__count').hasText('10');
    });

    // SELECTED

    test('it should render as selected if `@selected` is true', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Checkmark @selected={{true}}>Checkmark item</Hds::Dropdown::ListItem::Checkmark>`
      );
      assert
        .dom('.hds-dropdown-list-item')
        .hasClass('hds-dropdown-list-item--checkmark-selected');
      assert.dom('.hds-dropdown-list-item__checkmark').exists();
    });

    // ACCESSIBILITY

    test('it should present the interactive element as a selectable option', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Checkmark @selected={{true}}>Checkmark item</Hds::Dropdown::ListItem::Checkmark>`
      );
      assert
        .dom('.hds-dropdown-list-item__interactive')
        .hasAttribute('role', 'option')
        .hasAttribute('aria-selected', 'true');
    });
  }
);
