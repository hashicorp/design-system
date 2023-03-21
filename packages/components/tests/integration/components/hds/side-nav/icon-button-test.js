/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/side-nav/icon-button', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  // Basic

  test('it renders the component', async function (assert) {
    await render(
      hbs`<Hds::SideNav::IconButton @icon="search" @ariaLabel="Search" />`
    );
    assert.dom(this.element).exists();
  });

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::SideNav::IconButton @icon="search" @ariaLabel="Search" />`
    );
    assert.dom('.hds-side-nav__icon-button').exists();
  });

  // Test Content / Args

  test('it renders the passed in args', async function (assert) {
    await render(
      hbs`<Hds::SideNav::IconButton @icon="search" @ariaLabel="Search" id="test-sidenav-button" />`
    );
    assert.dom('.flight-icon-search').exists();
  });

  // GENERATED ELEMENTS

  test('it should render a <button> if no @href or @route is passed (default)', async function (assert) {
    await render(
      hbs`<Hds::SideNav::IconButton @icon="search" @ariaLabel="Search" id="test-sidenav-button" />`
    );
    assert.dom('#test-sidenav-button').hasTagName('button');
  });

  test('it should render a <a> link if @href is passed', async function (assert) {
    await render(
      hbs`<Hds::SideNav::IconButton @icon="search" @ariaLabel="Search" @href="https://www.hashicorp.com/" id="test-sidenav-button" />`
    );
    assert
      .dom('#test-sidenav-button')
      .hasTagName('a')
      .hasAttribute('href', 'https://www.hashicorp.com/');
  });

  test('it should render a <a> link if @route is passed', async function (assert) {
    await render(
      hbs`<Hds::SideNav::IconButton @icon="search" @ariaLabel="Search" @route="utilities.interactive" id="test-sidenav-button" />`
    );
    assert
      .dom('#test-sidenav-button')
      .hasTagName('a')
      .hasAttribute('href', '/utilities/interactive');
  });

  // ATTRIBUTES

  test('it should spread all the attributes passed to the component on the element', async function (assert) {
    await render(
      hbs`<Hds::SideNav::IconButton @icon="search" @ariaLabel="Search" id="test-sidenav-button" class="my-class" data-test1 data-test2="test" />`
    );
    assert.dom('#test-sidenav-button').hasClass('my-class');
    assert.dom('#test-sidenav-button').hasAttribute('data-test1');
    assert.dom('#test-sidenav-button').hasAttribute('data-test2', 'test');
  });

  // ASSERTIONS

  test('it should throw an assertion if @ariaLabel is missing/has no value', async function (assert) {
    const errorMessage =
      '@ariaLabel for "Hds::SideNav::IconButton" must have a valid value';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::SideNav::IconButton @icon="search" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
