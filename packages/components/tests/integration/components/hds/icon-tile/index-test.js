/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/icon-tile/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::IconTile @icon="dashboard" id="test-icon-tile" />`);
    assert.dom('div#test-icon-tile').hasClass('hds-icon-tile');
  });

  // ICON

  test('it renders an icon-tile with an icon', async function (assert) {
    await render(hbs`<Hds::IconTile @icon="dashboard" id="test-icon-tile" />`);
    assert.dom('div#test-icon-tile .hds-icon-tile__icon').exists();
    assert
      .dom('div#test-icon-tile .hds-icon-tile__icon svg.flight-icon-dashboard')
      .exists();
  });

  // LOGO

  test('it renders an icon-tile with a logo', async function (assert) {
    await render(hbs`<Hds::IconTile @logo="boundary" id="test-icon-tile" />`);
    assert.dom('div#test-icon-tile .hds-icon-tile__logo').exists();
    assert.dom('div#test-icon-tile .hds-icon-tile__logo svg').exists();
  });

  // COLOR

  test('it should render the neutral color as the default if no color is declared and is an icon', async function (assert) {
    await render(hbs`<Hds::IconTile @icon="dashboard" id="test-icon-tile" />`);
    assert.dom('div#test-icon-tile').hasClass('hds-icon-tile--color-neutral');
  });
  test('it should render the correct CSS color class if the @color prop is declared and is an icon', async function (assert) {
    await render(
      hbs`<Hds::IconTile @icon="dashboard" @color="boundary" id="test-icon-tile" />`
    );
    assert.dom('div#test-icon-tile').hasClass('hds-icon-tile--color-boundary');
  });
  test('it should render the product color if is a logo', async function (assert) {
    await render(hbs`<Hds::IconTile @logo="boundary" id="test-icon-tile" />`);
    assert.dom('div#test-icon-tile').hasClass('hds-icon-tile--color-boundary');
  });
  test('it should render the product color even if the @color prop is declared and is a logo', async function (assert) {
    await render(
      hbs`<Hds::IconTile @logo="boundary" @color="waypoint" id="test-icon-tile" />`
    );
    assert.dom('div#test-icon-tile').hasClass('hds-icon-tile--color-boundary');
  });

  // SIZE

  test('it should render the medium size if no size is declared', async function (assert) {
    await render(hbs`<Hds::IconTile @icon="dashboard" id="test-icon-tile" />`);
    assert.dom('div#test-icon-tile').hasClass('hds-icon-tile--size-medium');
  });
  test('it should render the correct CSS size class if the @size prop is declared', async function (assert) {
    await render(
      hbs`<Hds::IconTile @icon="dashboard" id="test-icon-tile" @size="small" />`
    );
    assert.dom('div#test-icon-tile').hasClass('hds-icon-tile--size-small');
  });

  // SECONDARY ICON

  test('it should render the secondary icon if the @iconSecondary prop is declared', async function (assert) {
    await render(
      hbs`<Hds::IconTile @icon="dashboard" @iconSecondary="plus" id="test-icon-tile" />`
    );
    assert.dom('div#test-icon-tile .hds-icon-tile__extra').exists();
    assert.dom('div#test-icon-tile .hds-icon-tile__extra-icon').exists();
    assert
      .dom('div#test-icon-tile .hds-icon-tile__extra-icon svg.flight-icon-plus')
      .exists();
  });

  // A11Y

  test('it should have aria-hidden set to true', async function (assert) {
    await render(hbs`<Hds::IconTile @logo="boundary" id="test-icon-tile" />`);
    assert.dom('div#test-icon-tile').hasAria('hidden', 'true');
  });

  // ASSERTIONS

  test('it should throw an assertion if both @icon and @logo are passed', async function (assert) {
    const errorMessage =
      'you can\'t pass both @logo and @icon properties to the "Hds::IconTile" component';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::IconTile @icon="dashboard" @logo="boundary" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if neither @icon or @logo are passed', async function (assert) {
    const errorMessage =
      'you need to pass @logo or @icon to the "Hds::IconTile" component';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::IconTile />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if a wrong @logo value is passed', async function (assert) {
    const errorMessage =
      '@logo for "Hds::IconTile" must be one of the following: boundary, consul, hcp, nomad, packer, terraform, vagrant, vault, vault-secrets, waypoint; received: test';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::IconTile @logo="test" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
