/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import {
  render,
  resetOnerror,
  setupOnerror,
  waitFor,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/tag/index', function (hooks) {
  setupRenderingTest(hooks);
  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Tag @text="My tag" id="test-tag" />`);
    assert.dom('#test-tag').hasClass('hds-tag');
  });

  // DISMISS

  test('it should not render the "dismiss" button by default', async function (assert) {
    await render(hbs`<Hds::Tag @text="My tag" />`);
    assert.dom('button.hds-tag__dismiss').doesNotExist();
  });

  test('it should render the "dismiss" button if a callback function is passed to the @onDismiss argument', async function (assert) {
    this.set('NOOP', () => {});
    await render(hbs`<Hds::Tag @text="My tag" @onDismiss={{this.NOOP}} />`);
    assert.dom('button.hds-tag__dismiss').exists();
    assert
      .dom('button.hds-tag__dismiss')
      .hasAttribute('aria-label', 'Dismiss My tag');
  });

  test('it should render a customized label for the dismiss button if custom @ariaLabel text is defined', async function (assert) {
    this.set('NOOP', () => {});
    await render(
      hbs`<Hds::Tag @text="My tag" @onDismiss={{this.NOOP}} @ariaLabel="Please dismiss" />`
    );
    assert.dom('button.hds-tag__dismiss').exists();
    assert
      .dom('button.hds-tag__dismiss')
      .hasAttribute('aria-label', 'Please dismiss My tag');
  });

  // COLOR

  test('it should render the primary color as the default if no @color prop is declared when the text is a link', async function (assert) {
    await render(
      hbs`<Hds::Tag @text="My text tag" @href="/" id="test-link-tag"/>`
    );
    assert.dom('#test-link-tag').hasClass('hds-tag--color-primary');
  });

  test('it should render the correct CSS color class if the @color prop is declared when the text is a link', async function (assert) {
    await render(
      hbs`<Hds::Tag @text="My text tag" @href="/" @color="secondary" id="test-link-tag"/>`
    );
    assert.dom('#test-link-tag').hasClass('hds-tag--color-secondary');
  });

  test('it should throw an assertion if an incorrect value for @color is provided when the text is a link', async function (assert) {
    const errorMessage =
      '@color for "Hds::Tag" must be one of the following: primary, secondary; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Tag @text="My text tag" @href="/" @color="foo"/>`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });

  test('it should throw an assertion if @color is provided without @href or @route', async function (assert) {
    const errorMessage =
      '@color can only be applied to "Hds::Tag" along with either @href or @route';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Tag @text="My text tag" @color="foo"/>`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });

  // OVERFLOW

  test('it should not render a tooltip if the text does not overflow', async function (assert) {
    await render(hbs`
        <Hds::Tag @text="My text tag" id="test-tag"/>
    `);
    assert.dom('.hds-tooltip-button').doesNotExist();
  });

  test('it should render a tooltip if the text overflows', async function (assert) {
    await render(hbs`
      <div style="width: 50px;">
        <Hds::Tag @text="This is a very long text that should go on multiple lines" id="test-tag"/>
      </div>
    `);
    await waitFor('.hds-tooltip-button', { timeout: 1000 });
    assert.dom('.hds-tooltip-button').exists();
  });
});
