import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/dropdown/list-item/description',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.afterEach(() => {
      resetOnerror();
    });

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

    test('it should throw an assertion if @text is missing/has no value', async function (assert) {
      const errorMessage =
        '@text for "Hds::Dropdown::ListItem::Description" must have a valid value';
      assert.expect(2);
      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });
      await render(hbs`<Hds::Dropdown::ListItem::Description />`);
      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });
  }
);
