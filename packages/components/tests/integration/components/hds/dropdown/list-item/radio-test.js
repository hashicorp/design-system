import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/dropdown/list-item/radio',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders the "list-item/radio"', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Radio>Radio item</Hds::Dropdown::ListItem::Radio>`
      );
      assert.dom(this.element).exists();
    });

    test('it should render the "list-item/radio" as a <li> element with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Radio>Radio item</Hds::Dropdown::ListItem::Radio>`
      );
      assert.dom('.hds-dropdown-list-item').hasTagName('li');
      assert
        .dom('.hds-dropdown-list-item')
        .hasClass('hds-dropdown-list-item--radio');
    });

    // ELEMENTS

    test('it should render the "list-item" with a radio field', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Radio>Radio item</Hds::Dropdown::ListItem::Radio>`
      );
      assert.dom('.hds-form-label').exists();
      assert.dom('.hds-form-radio').exists();
    });

    // ARGUMENT FORWARDING: ID, NAME, VALUE

    test('it should forward the `id`, `name` and `value` arguments to the input control', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Radio @id="id" @name="name" @value="value">Radio item</Hds::Dropdown::ListItem::Radio>`
      );
      assert.dom('.hds-form-radio').hasAttribute('id', 'id');
      assert.dom('.hds-form-radio').hasAttribute('name', 'name');
      assert.dom('.hds-form-radio').hasValue('value');
    });

    // CONTENT

    test('it should render the content passed as block in a form label', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Radio>Radio item</Hds::Dropdown::ListItem::Radio>`
      );
      assert.dom('.hds-form-label').hasText('Radio item');
    });

    // RESULT COUNT

    test('it should render with a result count badge', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Radio @resultCount="10">Radio item</Hds::Dropdown::ListItem::Radio>`
      );
      assert.dom('.hds-dropdown-list-item__count').hasText('10');
    });
  }
);
