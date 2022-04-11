import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/dropdown/list-item/title',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders the "list-item/title"', async function (assert) {
      await render(hbs`<Hds::Dropdown::ListItem::Title @text="title" />`);
      assert.dom(this.element).exists();
    });

    test('it should render the "list-item/title" as a <li> element with a CSS class that matches the component name', async function (assert) {
      assert.expect(3);
      await render(
        hbs`<Hds::Dropdown::ListItem::Title @text="title" id="test-list-item-title" />`
      );
      assert.dom('#test-list-item-title').hasTagName('li');
      assert.dom('#test-list-item-title').hasClass('hds-dropdown-list-item');
      assert
        .dom('#test-list-item-title')
        .hasClass('hds-dropdown-list-item--title');
    });

    // ASSERTIONS

    // TODO once everything is finalized
  }
);
