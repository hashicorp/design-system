import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/dropdown/list-item/generic',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders the "list-item/generic"', async function (assert) {
      await render(hbs`<Hds::Dropdown::ListItem::Generic />`);
      assert.dom(this.element).exists();
    });

    test('it should render the "list-item/generic" as a <li> element with a CSS class that matches the component name', async function (assert) {
      assert.expect(3);
      await render(
        hbs`<Hds::Dropdown::ListItem::Generic id="test-list-item-generic" />`
      );
      assert.dom('#test-list-item-generic').hasTagName('li');
      assert.dom('#test-list-item-generic').hasClass('hds-dropdown-list-item');
      assert
        .dom('#test-list-item-generic')
        .hasClass('hds-dropdown-list-item--generic');
    });

    // CONTENT

    test('it should render the yielded content', async function (assert) {
      assert.expect(2);
      await render(
        hbs`<Hds::Dropdown::ListItem::Generic><pre>test</pre></Hds::Dropdown::ListItem::Generic>`
      );
      assert.dom('.hds-dropdown-list-item--generic > pre').exists();
      assert.dom('.hds-dropdown-list-item--generic > pre').hasText('test');
    });
  }
);
