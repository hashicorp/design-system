import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/dropdown/list-item/copy-item',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders the "list-item/copy-item"', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::CopyItem @text="copy-item" />`
      );
      assert.dom(this.element).exists();
    });

    test('it should render the "list-item/copy-item" as a <li> element with a CSS class that matches the component name', async function (assert) {
      assert.expect(3);
      await render(
        hbs`<Hds::Dropdown::ListItem::CopyItem @text="copy-item" id="test-list-item-copy-item" />`
      );
      assert.dom('#test-list-item-copy-item').hasTagName('li');
      assert
        .dom('#test-list-item-copy-item')
        .hasClass('hds-dropdown-list-item');
      assert
        .dom('#test-list-item-copy-item')
        .hasClass('hds-dropdown-list-item--copy-item');
    });

    // ASSERTIONS

    // TODO once everything is finalized
  }
);
