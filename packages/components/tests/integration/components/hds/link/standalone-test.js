import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/link/standalone', function (hooks) {
  setupRenderingTest(hooks);
  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it renders a link(standalone) with the defined text', async function (assert) {
    await render(
      hbs`<Hds::Link::Standalone @text="watch video" @href="/" @icon="film" />`
    );
    assert.dom(this.element).hasText('watch video');
  });
  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::Link::Standalone @text="watch video" @href="/" @icon="film" id="test-link" />`
    );
    assert.dom('#test-link').hasClass('hds-link-standalone');
  });

  // SIZE

  test('it should render the medium size if no size is declared', async function (assert) {
    await render(
      hbs`<Hds::Link::Standalone @text="watch video" @href="/" @icon="film" id="test-link" />`
    );
    assert.dom('#test-link').hasClass('hds-link-standalone--size-medium');
  });
  test('it should render the correct CSS size class if the @size prop is declared', async function (assert) {
    await render(
      hbs`<Hds::Link::Standalone @text="watch video" @href="/" @icon="film" id="test-link" @size="small" />`
    );
    assert.dom('#test-link').hasClass('hds-link-standalone--size-small');
  });

  // ICON

  test('it should render the icon in the leading position by default', async function (assert) {
    await render(
      hbs`<Hds::Link::Standalone @text="watch video" @href="/" @icon="film" id="test-link" />`
    );
    assert.dom('.hds-link-standalone__icon').matchesSelector(':first-child');
  });
  test('it should render the icon in the trailing position if @iconPosition is set to trailing', async function (assert) {
    await render(
      hbs`<Hds::Link::Standalone @text="watch video" @href="/" @icon="film" @iconPosition="trailing" id="test-link" />`
    );
    assert.dom('.hds-link-standalone__icon').matchesSelector(':last-child');
  });

  // TEXT

  test('it renders a link with the defined text', async function (assert) {
    await render(
      hbs`<Hds::Button @text="Copy to clipboard" id="test-toggle-button" />`
    );
    assert.dom('#test-toggle-button').hasText('Copy to clipboard');
  });

  // ASSERTIONS

  test('it should throw an assertion if both @href and @route are not defined', async function (assert) {
    const errorMessage =
      '@href or @route must be defined for <Hds::Link::Standalone>';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Link::Standalone @text="watch video" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if @text is missing/has no value', async function (assert) {
    const errorMessage =
      '@text for "Hds::Link::Standalone" must have a valid value';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Link::Standalone @icon="film" @href="/" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if there is no @icon defined', async function (assert) {
    const errorMessage =
      '@icon for "Hds::Link::Standalone" must have a valid value';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Link::Standalone @href="/" @text="watch video" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if an incorrect value for @iconPosition is provided', async function (assert) {
    const errorMessage =
      '@iconPosition for "Hds::Link::Standalone" must be one of the following: leading, trailing; received: after';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      hbs`<Hds::Link::Standalone @icon="film" @href="/" @text="watch video" @iconPosition="after" />`
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if an incorrect value for @size is provided', async function (assert) {
    const errorMessage =
      '@size for "Hds::Link::Standalone" must be one of the following: small, medium, large; received: tiny';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      hbs`<Hds::Link::Standalone @icon="film" @text="watch video" @href="/" @size="tiny" />`
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
