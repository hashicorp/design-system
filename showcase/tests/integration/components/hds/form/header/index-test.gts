/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import Header from "@hashicorp/design-system-components/components/hds/form/header/index";

module('Integration | Component | hds/form/header/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(<template><Header id="test-form-header" /></template>);
    assert.dom('#test-form-header').hasClass('hds-form__header');
  });

  // CONTENT

  test('it should yield the Title and Description children', async function (assert) {
    await render(
      <template><Header id="test-form-header" as |Header|><Header.Title /><Header.Description /></Header></template>,
    );
    assert
      .dom('#test-form-header > .hds-form__header-title')
      .exists('Title is yielded');
    assert
      .dom('#test-form-header > .hds-form__header-description')
      .exists('Description is yielded');
  });

  // OPTIONS

  // isFullWidth
  test(`it should have the default max-width if no @isFullWidth prop is declared`, async function (assert) {
    await render(<template><Header id="test-form-header" /></template>);
    assert
      .dom('#test-form-header')
      .doesNotHaveClass('hds-form-content--is-full-width');
  });

  test(`if @isFullWidth is true, it should not have a max-width set`, async function (assert) {
    await render(
      <template><Header id="test-form-header" @isFullWidth={{true}} /></template>,
    );
    assert.dom('#test-form-header').hasClass('hds-form-content--is-full-width');
  });
});
