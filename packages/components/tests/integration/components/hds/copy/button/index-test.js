/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/copy/button/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the default component variation with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::Copy::Button id="test-copy-button" @text="copy" @clipboardText="#clipboardText" />`
    );
    assert.dom('#test-copy-button').hasClass('hds-copy-button');
  });

  test('it should only render an icon and also render an aria-label if isIconOnly is set to true', async function (assert) {
    await render(
      hbs`<p id="clipboardTarget2">
      The button will copy the text in this paragraph element.
    </p>
    <Hds::Copy::Button @text="Copy" @isIconOnly={{true}}
    @targetToCopy="#clipboardTarget2" id="test-copy-button" />`
    );
    assert.dom('#test-copy-button').doesNotIncludeText('Copy');
    assert.dom('#test-copy-button').hasAria('label', 'Copy');
  });

  test('it should render the medium size if no size is declared', async function (assert) {
    await render(
      hbs`<Hds::Copy::Button id="test-copy-button" @text="copy" @clipboardText="#clipboardText" />`
    );
    assert.dom('#test-copy-button').hasClass('hds-button--size-medium');
  });

  test('it should render the small size if @size small is defined', async function (assert) {
    await render(
      hbs`<Hds::Copy::Button id="test-copy-button" @text="copy" @clipboardText="#clipboardText" @size="small" />`
    );
    assert.dom('#test-copy-button').hasClass('hds-button--size-small');
  });

  test('it render the text value even if textToCopy is defined', async function (assert) {
    await render(
      hbs`<Hds::Copy::Button id="test-copy-button" @text="Copy your secret key"
      @textToCopy="someSecretThingGoesHere" />`
    );
    assert.dom('#test-copy-button').hasText('Copy your secret key');
  });

  test('it should have the correct CSS class to support full-width button size if @isFullWidth prop is true', async function (assert) {
    await render(
      hbs`<Hds::Copy::Button id="test-copy-button" @text="copy" @clipboardText="#clipboardText" @isFullWidth={{true}} />`
    );
    assert.dom('#test-copy-button').hasClass('hds-button--width-full');
  });
});
