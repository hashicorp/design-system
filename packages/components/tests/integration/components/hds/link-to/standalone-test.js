import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/link-to/standalone', function (hooks) {
  setupRenderingTest(hooks);
  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it renders', async function (assert) {
    await render(
      hbs`<Hds::LinkTo::Standalone @text="watch video" @route="index" @icon="film" />`
    );
    assert.dom(this.element).hasText('watch video');
  });
  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::LinkTo::Standalone @text="watch video" @route="index" @icon="film" id="test-link" />`
    );
    assert.dom('#test-link').hasClass('hds-link-standalone');
  });

  // SIZE

  test('it should render the medium size if no size is declared', async function (assert) {
    await render(
      hbs`<Hds::LinkTo::Standalone @text="watch video" @route="index" @icon="film" id="test-link" />`
    );
    assert.dom('#test-link').hasClass('hds-link-standalone--size-medium');
  });
  test('it should render the correct CSS size class if the @size prop is declared', async function (assert) {
    await render(
      hbs`<Hds::LinkTo::Standalone @text="watch video" @route="index" @icon="film" id="test-link" @size="small" />`
    );
    assert.dom('#test-link').hasClass('hds-link-standalone--size-small');
  });

  // ASSERTIONS

  test('it should throw an assertion if @text is missing/has no value', async function (assert) {
    const errorMessage =
      '@text for "Hds::LinkTo::Standalone" must have a valid value';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::LinkTo::Standalone @icon="film" @route="index" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if there is no @icon defined', async function (assert) {
    const errorMessage =
      '@icon for "Hds::LinkTo::Standalone" must have a valid value';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      hbs`<Hds::LinkTo::Standalone @route="index" @text="watch video" />`
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if an incorrect value for @size is provided', async function (assert) {
    const errorMessage =
      '@size for "Hds::LinkTo::Standalone" must be one of the following: small, medium, large; received: tiny';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      hbs`<Hds::LinkTo::Standalone @icon="film" @text="watch video" @route="index" @size="tiny" />`
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
