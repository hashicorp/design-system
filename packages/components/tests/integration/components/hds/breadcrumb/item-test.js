/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/breadcrumb/item', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Breadcrumb::Item id="test-breadcrumb-item" />`);
    assert.dom('#test-breadcrumb-item').hasClass('hds-breadcrumb__item');
  });

  test('it should render the correct style if the @maxWidth prop is declared', async function (assert) {
    await render(
      hbs`<Hds::Breadcrumb::Item @maxWidth="200px" @text="test" id="test-breadcrumb-item" />`
    );
    assert.dom('#test-breadcrumb-item').hasStyle({ 'max-width': '200px' });
  });

  // CONTENT

  test('it should render a link by default', async function (assert) {
    await render(
      hbs`<Hds::Breadcrumb::Item id="test-breadcrumb-item" @text="text renders" />`
    );
    assert.dom('#test-breadcrumb-item > a').exists();
  });
  test('it should not render a if @current is true', async function (assert) {
    await render(
      hbs`<Hds::Breadcrumb::Item id="test-breadcrumb-item" @text="text renders" @current={{true}} />`
    );
    assert.dom('#test-breadcrumb-item > a').doesNotExist();
    assert.dom('#test-breadcrumb-item .hds-breadcrumb__current').exists();
  });
  test('it should render the item with icon and text if @icon and @text are provided', async function (assert) {
    await render(
      hbs`<Hds::Breadcrumb::Item id="test-breadcrumb-item" @text="text renders" @icon="activity" />`
    );
    assert.dom('.flight-icon.flight-icon-activity').exists();
    assert.dom('.hds-breadcrumb__text').hasText('text renders');
  });

  // ASSERTIONS

  test('it should throw an assertion if @maxWidth is not in px/em', async function (assert) {
    const errorMessage = `@maxWidth for "Hds::Breadcrumb::Item" must be a size as number in 'px' or in 'em' (eg. '200px' or '24em'); received: 123`;
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      hbs`<Hds::Breadcrumb::Item @maxWidth="123" id="test-breadcrumb-item" />`
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
