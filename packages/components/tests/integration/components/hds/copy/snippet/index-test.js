/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  click,
  render,
  resetOnerror,
  setupOnerror,
  waitFor,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/copy/snippet/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::Copy::Snippet id="test-copy-snippet" @textToCopy="3423g-234525-h345346-f34rtf4" />`
    );
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet');
  });

  test('it should render the correct default component variation: primary color, idle status', async function (assert) {
    await render(
      hbs`<Hds::Copy::Snippet id="test-copy-snippet" @textToCopy="3423g-234525-h345346-f34rtf4" />`
    );
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet');
    assert
      .dom('#test-copy-snippet')
      .hasClass('hds-copy-snippet--color-primary');
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet--status-idle');
  });

  test('it should render the secondary color if defined', async function (assert) {
    await render(
      hbs`<Hds::Copy::Snippet id="test-copy-snippet" @textToCopy="3423g-234525-h345346-f34rtf4" @color="secondary" />`
    );
    assert
      .dom('#test-copy-snippet')
      .hasClass('hds-copy-snippet--color-secondary');
  });

  test('it should support truncation if @isTruncated is set to true', async function (assert) {
    await render(
      hbs`<Hds::Copy::Snippet id="test-copy-snippet" @textToCopy="3423g-234525-h345346-f34rtf4" @isTruncated={{true}} />`
    );
    assert
      .dom('#test-copy-snippet > span')
      .hasClass('hds-copy-snippet__text--truncated');
  });

  test('it should have the correct CSS class to support full-width size if @isFullWidth prop is true', async function (assert) {
    await render(
      hbs`<Hds::Copy::Snippet id="test-copy-snippet" @textToCopy="3423g-234525-h345346-f34rtf4" @isFullWidth={{true}} />`
    );
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet--width-full');
  });

  test('it should update the status to success if the copy operation was successful', async function (assert) {
    await render(
      hbs`<Hds::Copy::Snippet id="test-copy-snippet" @textToCopy="3423g-234525-h345346-f34rtf4" @isFullWidth={{true}} />`
    );
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet--status-idle');
    await click('button#test-copy-snippet');
    assert
      .dom('#test-copy-snippet')
      .hasClass('hds-copy-snippet--status-success');
  });

  test('it should update the status back to idle after success', async function (assert) {
    await render(
      hbs`<Hds::Copy::Snippet id="test-copy-snippet" @textToCopy="3423g-234525-h345346-f34rtf4" @isFullWidth={{true}} />`
    );
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet--status-idle');
    await click('button#test-copy-snippet');
    assert
      .dom('#test-copy-snippet')
      .hasClass('hds-copy-snippet--status-success');
    await waitFor('.hds-copy-snippet--status-idle', { timeout: 2000 });
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet--status-idle');
  });

  test('it should be able to copy a number', async function (assert) {
    // context: https://github.com/hashicorp/design-system/pull/1564
    await render(
      hbs`<Hds::Copy::Snippet id="test-copy-snippet" @textToCopy={{123456789}} />`
    );
    // if the `ember-cli-clipboard` addon fails it triggers a JS error
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet--status-idle');
  });

  // ASSERTIONS

  test('it should throw an assertion if an incorrect value for @color is provided', async function (assert) {
    const errorMessage =
      '@color for "Hds::Copy::Snippet" must be one of the following: primary, secondary; received: tertiary';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      hbs`<Hds::Copy::Snippet id="test-copy-snippet" @textToCopy="3423g-234525-h345346-f34rtf4" @color="tertiary" />`
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
