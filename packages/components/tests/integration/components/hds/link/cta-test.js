//  ██     ██  █████  ██████  ███    ██ ██ ███    ██  ██████
//  ██     ██ ██   ██ ██   ██ ████   ██ ██ ████   ██ ██
//  ██  █  ██ ███████ ██████  ██ ██  ██ ██ ██ ██  ██ ██   ███
//  ██ ███ ██ ██   ██ ██   ██ ██  ██ ██ ██ ██  ██ ██ ██    ██
//   ███ ███  ██   ██ ██   ██ ██   ████ ██ ██   ████  ██████
//
// Notice: in this component we're using directly the styles from the `Hds::Button` component
// for this reasons many of the CSS classes used in this test are `hds-button` classes

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/link/cta', function (hooks) {
  setupRenderingTest(hooks);
  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it renders a link(cta) with the defined text', async function (assert) {
    await render(hbs`<Hds::Link::Cta @text="sign in" href="/" />`);
    assert.dom(this.element).hasText('sign in');
  });
  test('it should render with a CSS class that matches the component name and has the `button` class as well', async function (assert) {
    assert.expect(2);
    await render(
      hbs`<Hds::Link::Cta @text="sign in" href="/" id="test-link" />`
    );
    assert.dom('#test-link').hasClass('hds-link-cta--inherit-button-styles');
    assert.dom('#test-link').hasClass('hds-button');
  });

  // SIZE

  test('it should render the medium size if no size is declared', async function (assert) {
    await render(
      hbs`<Hds::Link::Cta @text="sign in" href="/" id="test-link" />`
    );
    assert.dom('#test-link').hasClass('hds-button--size-medium');
  });
  test('it should render the correct CSS size class if the @size prop is declared', async function (assert) {
    await render(
      hbs`<Hds::Link::Cta @text="sign in" href="/" id="test-link" @size="small" />`
    );
    assert.dom('#test-link').hasClass('hds-button--size-small');
  });

  // ICON

  test('it should render the icon in the leading position by default', async function (assert) {
    await render(
      hbs`<Hds::Link::Cta @icon="arrow-right" @text="sign in" href="/" id="test-link" />`
    );
    assert.dom('.hds-button__icon').matchesSelector(':first-child');
  });
  test('it should render the icon in the trailing position if @iconPosition is set to trailing', async function (assert) {
    await render(
      hbs`<Hds::Link::Cta @icon="arrow-right" @text="sign in" href="/" @iconPosition="trailing" id="test-link" />`
    );
    assert.dom('.hds-button__icon').matchesSelector(':last-child');
  });

  // ASSERTIONS

  test('it should throw an assertion if @text is missing/has no value', async function (assert) {
    const errorMessage = '@text for "Hds::Link::Cta" must have a valid value';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Link::Cta href="/" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if an incorrect value for @iconPosition is provided', async function (assert) {
    const errorMessage =
      '@iconPosition for "Hds::Link::Cta" must be one of the following: leading, trailing; received: after';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      hbs`<Hds::Link::Cta @icon="arrow-right" @iconPosition="after" @text="sign in" href="/" />`
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if an incorrect value for @size is provided', async function (assert) {
    const errorMessage =
      '@size for "Hds::Link::Cta" must be one of the following: small, medium, large; received: tiny';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Link::Cta @text="sign in" @size="tiny" href="/" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
