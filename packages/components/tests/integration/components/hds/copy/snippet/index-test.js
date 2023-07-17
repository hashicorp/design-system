/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/copy/snippet/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the default component variation with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::Copy::Snippet id="test-copy-snippet" @textToCopy="3423g-234525-h345346-f34rtf4" />`
    );
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet');
  });

  test('it should render the secondary color if defined', async function (assert) {
    await render(
      hbs`<Hds::Copy::Snippet id="test-copy-snippet" @textToCopy="3423g-234525-h345346-f34rtf4" @color="secondary" />`
    );
    assert
      .dom('#test-copy-snippet')
      .hasClass('hds-copy-snippet--color-secondary');
  });

  test('it should have the correct CSS class to support full-width button size if @isFullWidth prop is true', async function (assert) {
    await render(
      hbs`<Hds::Copy::Snippet id="test-copy-snippet" @textToCopy="3423g-234525-h345346-f34rtf4" @isFullWidth={{true}} />`
    );
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet--width-full');
  });
});
