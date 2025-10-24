/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import HomeLink from "@hashicorp/design-system-components/components/hds/app-header/home-link";

module('Integration | Component | hds/app-header/home-link', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template><HomeLink @icon="hashicorp" @text="HashiCorp" id="test-home-link" /></template>,
    );
    assert.dom('#test-home-link').hasClass('hds-app-header__home-link');
  });

  // CONTENT

  test('it renders the passed in args', async function (assert) {
    await render(
      <template><HomeLink @icon="hashicorp" @text="HashiCorp" @href="https://www.hashicorp.com/" id="test-home-link" /></template>,
    );
    assert.dom('.hds-icon-hashicorp').exists();
    assert
      .dom('#test-home-link')
      .hasAttribute('href', 'https://www.hashicorp.com/')
      .hasAttribute('aria-label', 'HashiCorp');
  });

  test('it renders the logo with a custom passed in color', async function (assert) {
    await render(
      <template><HomeLink @icon="boundary" @text="Boundary" @color="var(--token-color-boundary-brand)" @href="#" /></template>,
    );
    assert
      .dom('.hds-icon-boundary')
      .hasAttribute('fill', 'var(--token-color-boundary-brand)');
  });

  test('it renders the logo with text when @isIconOnly is false', async function (assert) {
    await render(
      <template><HomeLink @icon="hashicorp" @text="HashiCorp" @isIconOnly={{false}} @href="#" id="test-home-link" /></template>,
    );
    assert.dom('.hds-text').exists();
  });

  // ASSERTIONS

  test('it should throw an assertion if @text is missing/has no value', async function (assert) {
    const errorMessage =
      '@text for "Hds::AppHeader::HomeLink" must have a valid value';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(<template><HomeLink @icon="hashicorp" /></template>);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
