/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/badge-count/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::BadgeCount @text="text renders" id="test-badge-count" />`
    );
    assert.dom('#test-badge-count').hasClass('hds-badge-count');
  });

  // COLOR

  test('it should have the default color if no @color prop is declared', async function (assert) {
    await render(
      hbs`<Hds::BadgeCount @text="text renders" id="test-badge-count" />`
    );
    assert.dom('#test-badge-count').hasClass('hds-badge-count--color-neutral');
  });
  test('it should have the correct color class based on the @color prop', async function (assert) {
    await render(
      hbs`<Hds::BadgeCount @text="text renders" id="test-badge-count" @color="neutral-dark-mode" />`
    );
    assert
      .dom('#test-badge-count')
      .hasClass('hds-badge-count--color-neutral-dark-mode');
  });

  // SIZE

  test('it should have the medium size if no @size prop is declared', async function (assert) {
    await render(
      hbs`<Hds::BadgeCount @text="text renders" id="test-badge-count" />`
    );
    assert.dom('#test-badge-count').hasClass('hds-badge-count--size-medium');
  });
  test('it should have the correct size class based on the @size prop', async function (assert) {
    await render(
      hbs`<Hds::BadgeCount @text="text renders" id="test-badge-count" @size="small" />`
    );
    assert.dom('#test-badge-count').hasClass('hds-badge-count--size-small');
  });

  // TYPE

  test('it should have the filled type if no @type prop is declared', async function (assert) {
    await render(
      hbs`<Hds::BadgeCount @text="text renders" id="test-badge-count" />`
    );
    assert.dom('#test-badge-count').hasClass('hds-badge-count--type-filled');
  });
  test('it should have the correct type class based on the @type prop', async function (assert) {
    await render(
      hbs`<Hds::BadgeCount @text="text renders" id="test-badge-count" @type="inverted" />`
    );
    assert.dom('#test-badge-count').hasClass('hds-badge-count--type-inverted');
  });
});
