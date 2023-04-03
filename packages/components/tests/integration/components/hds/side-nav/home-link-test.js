/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/side-nav/home-link', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  // Basic

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::SideNav::HomeLink @icon="hashicorp" @ariaLabel="Hashicorp" id="test-home-link" />`
    );
    assert.dom('#test-home-link').hasClass('hds-side-nav__home-link');
  });

  // Test Content / Args

  test('it renders the passed in args', async function (assert) {
    await render(
      hbs`<Hds::SideNav::HomeLink @icon="hashicorp" @ariaLabel="Hashicorp" @href="https://www.hashicorp.com/" id="test-home-link" />`
    );
    assert.dom('.flight-icon-hashicorp').exists();
    assert
      .dom('#test-home-link')
      .hasAttribute('href', 'https://www.hashicorp.com/');
  });

  test('it renders the logo with a custom passed in color', async function (assert) {
    await render(
      hbs`<Hds::SideNav::HomeLink @icon="boundary" @ariaLabel="Boundary" @color="var(--token-color-boundary-brand)" @href="#" />`
    );
    assert
      .dom('.flight-icon-boundary')
      .hasAttribute('fill', 'var(--token-color-boundary-brand)');
  });

  // ATTRIBUTES

  test('it should spread all the attributes passed to the component on the element', async function (assert) {
    await render(
      hbs`<Hds::SideNav::HomeLink @icon="hashicorp" @ariaLabel="Hashicorp" id="test-sidenav-homelink" class="my-class" data-test1 data-test2="test" />`
    );
    assert.dom('#test-sidenav-homelink').hasClass('my-class');
    assert.dom('#test-sidenav-homelink').hasAttribute('data-test1');
    assert.dom('#test-sidenav-homelink').hasAttribute('data-test2', 'test');
  });

  // ASSERTIONS

  test('it should throw an assertion if @ariaLabel is missing/has no value', async function (assert) {
    const errorMessage =
      '@ariaLabel for "Hds::SideNav::HomeLink" must have a valid value';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::SideNav::HomeLink @icon="hashicorp" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
