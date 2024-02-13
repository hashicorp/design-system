/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/badge/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Badge @text="text renders" id="test-badge" />`);
    assert.dom('#test-badge').hasClass('hds-badge');
  });

  // COLOR

  test('it should render the neutral color as the default if no color is declared', async function (assert) {
    await render(hbs`<Hds::Badge @text="text renders" id="test-badge" />`);
    assert.dom('#test-badge').hasClass('hds-badge--color-neutral');
  });
  test('it should render the correct CSS color class if the @color prop is declared', async function (assert) {
    await render(
      hbs`<Hds::Badge @text="text renders" id="test-badge" @color="highlight" />`
    );
    assert.dom('#test-badge').hasClass('hds-badge--color-highlight');
  });

  // SIZE

  test('it should render the medium size if no size is declared', async function (assert) {
    await render(hbs`<Hds::Badge @text="text renders" id="test-badge" />`);
    assert.dom('#test-badge').hasClass('hds-badge--size-medium');
  });
  test('it should render the correct CSS size class if the @size prop is declared', async function (assert) {
    await render(
      hbs`<Hds::Badge @text="text renders" id="test-badge" @size="small" />`
    );
    assert.dom('#test-badge').hasClass('hds-badge--size-small');
  });

  // TYPE

  test('it should render the filled type if no type is declared', async function (assert) {
    await render(hbs`<Hds::Badge @text="text renders" id="test-badge" />`);
    assert.dom('#test-badge').hasClass('hds-badge--type-filled');
  });
  test('it should render the correct CSS type class if @type prop is declared', async function (assert) {
    await render(
      hbs`<Hds::Badge @text="text renders" id="test-badge" @type="inverted" />`
    );
    assert.dom('#test-badge').hasClass('hds-badge--type-inverted');
  });

  // ICON

  test('if an icon is declared the flight icon should render in the component', async function (assert) {
    await render(
      hbs`<Hds::Badge @text="text renders" id="test-badge" @icon="activity" />`
    );
    assert.dom('.flight-icon-activity').exists();
  });
  test('if isIconOnly is set to true, visible text is hidden but text is still available to assistive technology', async function (assert) {
    await render(
      hbs`<Hds::Badge @text="meaningful text for icon only badge" @isIconOnly={{true}} id="test-badge" @icon="activity" />`
    );
    assert.deepEqual(
      this.element.querySelector('.sr-only').textContent.trim(),
      'meaningful text for icon only badge'
    );
  });
});
