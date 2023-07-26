/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, waitFor } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/copy/snippet/index', function (hooks) {
  setupRenderingTest(hooks);

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
});
