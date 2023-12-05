/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/button/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::Button @text="Copy to clipboard" id="test-button" />`
    );
    assert.dom('#test-button').hasClass('hds-button');
  });

  // SIZE

  test('it should render the medium size if no size is declared', async function (assert) {
    await render(
      hbs`<Hds::Button @text="Copy to clipboard" id="test-button" />`
    );
    assert.dom('#test-button').hasClass('hds-button--size-medium');
  });
  test('it should render the correct CSS size class if the @size prop is declared', async function (assert) {
    await render(
      hbs`<Hds::Button @text="Copy to clipboard" @size="small" id="test-button" />`
    );
    assert.dom('#test-button').hasClass('hds-button--size-small');
  });

  // COLOR

  test('it should render the primary color as the default if no color is declared', async function (assert) {
    await render(
      hbs`<Hds::Button @text="Copy to clipboard" id="test-button" />`
    );
    assert.dom('#test-button').hasClass('hds-button--color-primary');
  });
  test('it should render the correct CSS color class if the @color prop is declared', async function (assert) {
    await render(
      hbs`<Hds::Button @text="Copy to clipboard" @color="critical" id="test-button" />`
    );
    assert.dom('#test-button').hasClass('hds-button--color-critical');
  });

  // ICON

  test('it should not have visible icon if @icon is not declared', async function (assert) {
    await render(
      hbs`<Hds::Button @text="copy to clipboard" id="test-button" />`
    );
    assert.dom('.hds-button__icon').doesNotExist();
  });
  test('if an icon is declared the flight icon should render in the component', async function (assert) {
    await render(
      hbs`<Hds::Button @text="Copy to clipboard" @icon="clipboard-copy" id="test-button" />`
    );
    assert
      .dom(
        this.element.querySelector('.flight-icon.flight-icon-clipboard-copy')
      )
      .exists();
  });
  test('if an icon is declared the icon should be in leading position by default', async function (assert) {
    await render(
      hbs`<Hds::Button @text="Copy to clipboard" @icon="clipboard-copy" id="test-button" />`
    );
    assert.dom('.hds-button__icon').matchesSelector(':first-child');
  });
  test('if an icon is declared the icon should be in trailing position if @iconPosition is set to trailing', async function (assert) {
    await render(
      hbs`<Hds::Button @text="Copy to clipboard" @icon="clipboard-copy" @iconPosition="trailing" id="test-button" />`
    );
    assert.dom('.hds-button__icon').matchesSelector(':last-child');
  });
  test('it should ignore isIconOnly if icon is not defined', async function (assert) {
    await render(
      hbs`<Hds::Button @text="copy to clipboard" @isIconOnly={{true}} id="test-button" />`
    );
    assert
      .dom('#test-button')
      .hasText('copy to clipboard')
      .doesNotHaveAria('label', 'copy to clipboard');
  });

  // ISINLINE

  test('it should render the element as `inline` if the value of @isInline is "true"', async function (assert) {
    await render(hbs`
      <Hds::Button @text="Lorem ipsum" @isInline={{true}} id="test-button" />
    `);
    assert.dom('#test-button').hasClass('hds-button--is-inline');
  });

  // TEXT

  test('it renders a button with the defined text', async function (assert) {
    await render(
      hbs`<Hds::Button @text="Copy to clipboard" id="test-toggle-button" />`
    );
    assert.dom('#test-toggle-button').hasText('Copy to clipboard');
  });

  // A11Y

  test('it should have aria-label on the button element if isIconOnly is set to true', async function (assert) {
    await render(
      hbs`<Hds::Button @text="copy to clipboard" @icon="clipboard-copy" @isIconOnly={{true}} id="test-button" />`
    );
    assert.dom('#test-button').hasAria('label', 'copy to clipboard');
  });
  test('it should have "button" type by default', async function (assert) {
    await render(
      hbs`<Hds::Button @text="copy to clipboard" id="test-button" />`
    );
    assert.dom('#test-button').hasAttribute('type', 'button');
  });

  // OTHER

  test('it should not have visible text if isIconOnly is true', async function (assert) {
    await render(
      hbs`<Hds::Button @text="copy to clipboard" @icon="clipboard-copy" @isIconOnly={{true}} id="test-button" />`
    );
    assert.dom('.hds-button__text').doesNotExist();
  });
  test('it should disable to the button if the `disabled` attribute is passed', async function (assert) {
    await render(
      hbs`<Hds::Button @text="copy to clipboard" disabled id="test-button" />`
    );
    assert.dom('#test-button').isDisabled();
  });
  test('it should have the correct CSS class to support full-width button size if @isFullWidth prop is true', async function (assert) {
    await render(
      hbs`<Hds::Button @text="copy to clipboard" @isFullWidth={{true}} id="test-button" />`
    );
    assert.dom('#test-button').hasClass('hds-button--width-full');
  });

  // ASSERTIONS

  test('it should throw an assertion if @text is missing/has no value', async function (assert) {
    const errorMessage = '@text for "Hds::Button" must have a valid value';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Button @icon="clipboard-copy" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if an incorrect value for @color is provided', async function (assert) {
    const errorMessage =
      '@color for "Hds::Button" must be one of the following: primary, secondary, tertiary, critical; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Button @text="copy to clipboard" @color="foo" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if an incorrect value for @size is provided', async function (assert) {
    const errorMessage =
      '@size for "Hds::Button" must be one of the following: small, medium, large; received: tiny';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Button @text="copy to clipboard" @size="tiny" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if an incorrect value for @iconPosition is provided', async function (assert) {
    const errorMessage =
      '@iconPosition for "Hds::Button" must be one of the following: leading, trailing; received: after';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      hbs`<Hds::Button @icon="clipboard-copy" @text="copy to clipboard" @iconPosition="after" />`
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if @color is "tertiary" and an @icon is not provided', async function (assert) {
    const errorMessage =
      'when the "Hds::Button" @color is "tertiary" an @icon is required';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      hbs`<Hds::Button @text="copy to clipboard" @color="tertiary" />`
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
