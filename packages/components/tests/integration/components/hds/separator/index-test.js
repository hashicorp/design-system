/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/separator/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Separator id="test-separator" />`);
    assert.dom('#test-separator').hasClass('hds-separator');
  });

  // SPACING

  test('it should render the component with CSS classes that reflect the default vaules if no arguments provided', async function (assert) {
    await render(hbs`<Hds::Separator id="test-separator" />`);
    assert.dom('#test-separator').hasClass('hds-separator--spacing-24');
  });

  test('it should render the component with CSS classes that reflect the arguments provided', async function (assert) {
    await render(hbs`<Hds::Separator @spacing="0" id="test-separator" />`);
    assert.dom('#test-separator').hasClass('hds-separator--spacing-0');
  });

  // ASSERTIONS

  test('it should throw an assertion if an incorrect value for @spacing is provided', async function (assert) {
    const errorMessage =
      '@spacing for "Hds::Separator" must be one of the following: 24, 0; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Separator @spacing="foo" id="test-separator" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
