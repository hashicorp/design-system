import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/link/inline', function (hooks) {
  setupRenderingTest(hooks);
  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it renders the link(inline)', async function (assert) {
    await render(hbs`<Hds::Link::Inline @href="/" />`);
    assert.dom(this.element).exists();
  });
  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::Link::Inline @href="/" id="test-link">watch video</Hds::Link::Inline>`
    );
    assert.dom('#test-link').hasClass('hds-link-inline');
  });

  // COLOR

  test('it should render the primary color as the default if no color is declared', async function (assert) {
    await render(
      hbs`<Hds::Link::Inline @href="/" id="test-link">watch video</Hds::Link::Inline>`
    );
    assert.dom('#test-link').hasClass('hds-link-inline--color-primary');
  });
  test('it should render the correct CSS color class if the @color prop is declared', async function (assert) {
    await render(
      hbs`<Hds::Link::Inline @href="/" @color="secondary" id="test-link">watch video</Hds::Link::Inline>`
    );
    assert.dom('#test-link').hasClass('hds-link-inline--color-secondary');
  });

  // YIELDING

  test('it should yield the children of the <a> element', async function (assert) {
    assert.expect(2);
    await render(
      hbs`<Hds::Link::Inline @href="/" id="test-link"><span>test</span></Hds::Link::Inline>`
    );
    assert.dom('#test-link > span').exists();
    assert.dom('#test-link > span').hasText('test');
  });

  // ASSERTIONS

  test('it should throw an assertion if both @href and @route are not defined', async function (assert) {
    const errorMessage =
      '@href or @route must be defined for <Hds::Link::Inline>';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Link::Inline>watch video</Hds::Link::Inline>`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if an incorrect value for @color is provided', async function (assert) {
    const errorMessage =
      '@color for "Hds::Link::Standalone" must be one of the following: primary, secondary; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      hbs`<Hds::Link::Standalone @icon="film" @text="watch video" @href="/" @color="foo" />`
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
