import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/dropdown/toggle-button',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.afterEach(() => {
      resetOnerror();
    });

    // notice: "toggle-button" is a wrapper around the "hds::button" so we test only very specific things

    test('it renders the "toggle-button"', async function (assert) {
      await render(hbs`<Hds::Dropdown::ToggleButton @text="toggle text" />`);
      assert.dom(this.element).exists();
    });

    // TEXT

    test('it should render the text passed as @text prop', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ToggleButton @text="toggle text" id="test-toggle-button" />`
      );
      assert.dom('#test-toggle-button').hasText('toggle text');
    });

    // CHEVRON

    test('it should render the chevron "down" by default', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ToggleButton @text="text toggle" id="test-toggle-button" />`
      );
      assert.dom('.flight-icon.flight-icon-chevron-down').exists();
    });
    test('it should render the chevron "up" when @isOpen is true', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ToggleButton @text="text toggle" @isOpen="true" id="test-toggle-button" />`
      );
      assert.dom('.flight-icon.flight-icon-chevron-up').exists();
    });

    // COLOR

    test('it should render the primary color as the default if no color is declared', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ToggleButton @text="text toggle" id="test-toggle-button" />`
      );
      assert.dom('#test-toggle-button').hasClass('hds-button--color-primary');
    });
    test('it should render the correct CSS color class if the @color prop is declared', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ToggleButton @text="text toggle" @color="secondary" id="test-toggle-button" />`
      );
      assert.dom('#test-toggle-button').hasClass('hds-button--color-secondary');
    });

    // ASSERTIONS

    test('it should throw an assertion if @text is not defined', async function (assert) {
      const errorMessage = `@text for "Hds::Dropdown::ToggleButton" must have a valid value`;
      assert.expect(2);
      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });
      await render(hbs`<Hds::Dropdown::ToggleButton id="test-toggle-button" />`);
      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });
    test('it should throw an assertion if an incorrect value for @color is provided', async function (assert) {
      const errorMessage =
        '@color for "Hds::Dropdown::ToggleButton" must be one of the following: primary, secondary; received: foo';
      assert.expect(2);
      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });
      await render(
        hbs`<Hds::Dropdown::ToggleButton @text="text toggle" @color="foo" id="test-toggle-button" />`
      );
      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });
  }
);
