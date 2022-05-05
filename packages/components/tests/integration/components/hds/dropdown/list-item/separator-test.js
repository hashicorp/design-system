import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/dropdown/list-item/separator',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders the "list-item/separator"', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Separator @text="separator" />`
      );
      assert.dom(this.element).exists();
    });

    test('it should render the "list-item/separator" as a <li> element with a CSS class that matches the component name', async function (assert) {
      assert.expect(3);
      await render(
        hbs`<Hds::Dropdown::ListItem::Separator @text="separator" id="test-list-item-separator" />`
      );
      assert.dom('#test-list-item-separator').hasTagName('li');
      assert
        .dom('#test-list-item-separator')
        .hasClass('hds-dropdown-list-item');
      assert
        .dom('#test-list-item-separator')
        .hasClass('hds-dropdown-list-item--separator');
    });

    // A11Y

    test('it should render the "list-item/separator" with role of separator', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Separator id="test-list-item-separator" />`
      );
      assert.dom('#test-list-item-separator').hasAttribute('role', 'separator');
    });
  }
);
