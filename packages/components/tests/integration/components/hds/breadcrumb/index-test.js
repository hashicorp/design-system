/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/breadcrumb/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Breadcrumb id="test-breadcrumb" />`);
    assert.dom('#test-breadcrumb').hasClass('hds-breadcrumb');
  });

  test('it should render the correct CSS color class if the @itemsCanWrap prop is declared', async function (assert) {
    await render(
      hbs`<Hds::Breadcrumb @itemsCanWrap={{true}} id="test-breadcrumb" />`
    );
    assert.dom('#test-breadcrumb').hasClass('hds-breadcrumb--items-can-wrap');
  });

  test('it should dispatch a didInsert event when the component is rendered', async function (assert) {
    let inserted = false;
    this.set('didInsert', () => (inserted = true));
    await render(
      hbs`<Hds::Breadcrumb id="test-breadcrumb" @didInsert={{this.didInsert}} />`
    );
    assert.ok(inserted);
  });

  // A11Y

  test('it should render with the correct semantic tags', async function (assert) {
    await render(hbs`<Hds::Breadcrumb id="test-breadcrumb" />`);
    assert.dom('#test-breadcrumb').hasTagName('nav');
    assert.dom('#test-breadcrumb').hasAria('label', 'breadcrumbs');
    assert.dom('#test-breadcrumb > ol').exists();
  });
  test('it should support a custom aria-label attribute', async function (assert) {
    await render(
      hbs`<Hds::Breadcrumb id="test-breadcrumb" aria-label="my aria label" />`
    );
    assert.dom('#test-breadcrumb').hasAria('label', 'my aria label');
    assert.dom('#test-breadcrumb > ol').exists();
  });
  test('it should have a fallback aria-label if no custom aria-label is provided', async function (assert) {
    await render(hbs`<Hds::Breadcrumb id="test-breadcrumb" />`);
    assert.dom('#test-breadcrumb').hasAria('label', 'breadcrumbs');
  });
});
