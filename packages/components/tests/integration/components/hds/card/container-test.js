/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/card/container', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Card::Container id="test-card-container" />`);
    assert.dom('#test-card-container').hasClass('hds-card__container');
  });

  // LEVEL(S) + BORDER

  test('it should have the base level elevation as the default if no @level prop is declared', async function (assert) {
    await render(hbs`<Hds::Card::Container id="test-card-container" />`);
    assert
      .dom('#test-card-container')
      .hasClass('hds-card__container--level-elevation-base');
  });
  test('it should have the correct level class based on the @level prop', async function (assert) {
    await render(
      hbs`<Hds::Card::Container id="test-card-container" @level="mid" />`
    );
    assert
      .dom('#test-card-container')
      .hasClass('hds-card__container--level-elevation-mid');
  });
  test('it should have a "surface" elavation the @hasBorder prop is true', async function (assert) {
    await render(
      hbs`<Hds::Card::Container id="test-card-container" @hasBorder={{true}} />`
    );
    assert
      .dom('#test-card-container')
      .hasClass('hds-card__container--level-surface-base');
  });

  // BACKGROUND

  test('it should have the default background if no @background prop is declared', async function (assert) {
    await render(hbs`<Hds::Card::Container id="test-card-container" />`);
    assert
      .dom('#test-card-container')
      .hasClass('hds-card__container--background-neutral-primary');
  });
  test('it should have the correct background class based on the @background prop', async function (assert) {
    await render(
      hbs`<Hds::Card::Container id="test-card-container" @background="neutral-secondary" />`
    );
    assert
      .dom('#test-card-container')
      .hasClass('hds-card__container--background-neutral-secondary');
  });

  // OVERFLOW

  test('it should have the overflow visible if no @overflow prop is declared', async function (assert) {
    await render(hbs`<Hds::Card::Container id="test-card-container" />`);
    assert
      .dom('#test-card-container')
      .hasClass('hds-card__container--overflow-visible');
  });
  test('it should have the overflow hidden if the @overflow prop is declared as "hidden"', async function (assert) {
    await render(
      hbs`<Hds::Card::Container id="test-card-container" @overflow="hidden" />`
    );
    assert
      .dom('#test-card-container')
      .hasClass('hds-card__container--overflow-hidden');
  });

  // ASSERTIONS

  test('it should throw an assertion if an incorrect value for @level is provided', async function (assert) {
    const errorMessage =
      '@level for "Hds::Card::Container" must be one of the following: base, mid, high; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Card::Container @level="foo" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if an incorrect value for @levelHover is provided', async function (assert) {
    const errorMessage =
      '@levelHover for "Hds::Card::Container" must be one of the following: base, mid, high; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Card::Container @levelHover="foo" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if an incorrect value for @levelActive is provided', async function (assert) {
    const errorMessage =
      '@levelActive for "Hds::Card::Container" must be one of the following: base, mid, high; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Card::Container @levelActive="foo" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
