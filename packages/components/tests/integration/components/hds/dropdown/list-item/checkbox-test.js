import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/dropdown/list-item/checkbox',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders the "list-item/checkbox"', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Checkbox>Checkbox item</Hds::Dropdown::ListItem::Checkbox>`
      );
      assert.dom(this.element).exists();
    });

    test('it should render the "list-item/checkbox" as a <li> element with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Checkbox>Checkbox item</Hds::Dropdown::ListItem::Checkbox>`
      );
      assert.dom('.hds-dropdown-list-item').hasTagName('li');
      assert
        .dom('.hds-dropdown-list-item')
        .hasClass('hds-dropdown-list-item--checkbox');
    });

    // ELEMENTS

    test('it should render the "list-item" with a checkbox field', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Checkbox>Checkbox item</Hds::Dropdown::ListItem::Checkbox>`
      );
      assert.dom('.hds-form-label').exists();
      assert.dom('.hds-form-checkbox').exists();
    });

    // ARGUMENT FORWARDING: ID, NAME, VALUE

    test('it should forward the `id`, `name` and `value` arguments to the input control', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Checkbox @id="id" @name="name" @value="value">Checkbox item</Hds::Dropdown::ListItem::Checkbox>`
      );
      assert.dom('.hds-form-checkbox').hasAttribute('id', 'id');
      assert.dom('.hds-form-checkbox').hasAttribute('name', 'name');
      assert.dom('.hds-form-checkbox').hasValue('value');
    });

    // CONTENT

    test('it should render the content passed as block in a form label', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Checkbox>Checkbox item</Hds::Dropdown::ListItem::Checkbox>`
      );
      assert.dom('.hds-form-label').hasText('Checkbox item');
    });
  }
);
