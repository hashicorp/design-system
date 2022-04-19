import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/dropdown/list-item/description',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders the "list-item/description"', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Description @text="description" />`
      );
      assert.dom(this.element).exists();
    });

    test('it should render the "list-item/description" as a <li> element with a CSS class that matches the component name', async function (assert) {
      assert.expect(3);
      await render(
        hbs`<Hds::Dropdown::ListItem::Description @text="description" id="test-list-item-description" />`
      );
      assert.dom('#test-list-item-description').hasTagName('li');
      assert
        .dom('#test-list-item-description')
        .hasClass('hds-dropdown-list-item');
      assert
        .dom('#test-list-item-description')
        .hasClass('hds-dropdown-list-item--description');
    });

    // ASSERTIONS

    // TODO once everything is finalized
  }
);
