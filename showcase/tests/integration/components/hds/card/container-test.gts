/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';

import { HdsCardContainer } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/card/container', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template><HdsCardContainer id="test-card-container" /></template>,
    );
    assert.dom('#test-card-container').hasClass('hds-card__container');
  });

  // LEVEL(S) + BORDER

  test('it should have the base level elevation as the default if no @level prop is declared', async function (assert) {
    await render(
      <template><HdsCardContainer id="test-card-container" /></template>,
    );
    assert
      .dom('#test-card-container')
      .hasClass('hds-card__container--level-elevation-base');
  });
  test('it should have the correct level class based on the @level prop', async function (assert) {
    await render(
      <template>
        <HdsCardContainer id="test-card-container" @level="mid" />
      </template>,
    );
    assert
      .dom('#test-card-container')
      .hasClass('hds-card__container--level-elevation-mid');
  });
  test('it should have a "surface" elavation the @hasBorder prop is true', async function (assert) {
    await render(
      <template>
        <HdsCardContainer id="test-card-container" @hasBorder={{true}} />
      </template>,
    );
    assert
      .dom('#test-card-container')
      .hasClass('hds-card__container--level-surface-base');
  });

  // BACKGROUND

  test('it should have the default background if no @background prop is declared', async function (assert) {
    await render(
      <template><HdsCardContainer id="test-card-container" /></template>,
    );
    assert
      .dom('#test-card-container')
      .hasClass('hds-card__container--background-neutral-primary');
  });
  test('it should have the correct background class based on the @background prop', async function (assert) {
    await render(
      <template>
        <HdsCardContainer
          id="test-card-container"
          @background="neutral-secondary"
        />
      </template>,
    );
    assert
      .dom('#test-card-container')
      .hasClass('hds-card__container--background-neutral-secondary');
  });

  // OVERFLOW

  test('it should have the overflow visible if no @overflow prop is declared', async function (assert) {
    await render(
      <template><HdsCardContainer id="test-card-container" /></template>,
    );
    assert
      .dom('#test-card-container')
      .hasClass('hds-card__container--overflow-visible');
  });
  test('it should have the overflow hidden if the @overflow prop is declared as "hidden"', async function (assert) {
    await render(
      <template>
        <HdsCardContainer id="test-card-container" @overflow="hidden" />
      </template>,
    );
    assert
      .dom('#test-card-container')
      .hasClass('hds-card__container--overflow-hidden');
  });

  // TAG

  test(`it should render a div if no @tag prop is declared and it should not have a role`, async function (assert) {
    await render(
      <template><HdsCardContainer id="test-card-container" /></template>,
    );
    assert
      .dom('#test-card-container')
      .hasTagName('div')
      .doesNotHaveAttribute('role');
  });

  test(`it should render an li if specified in the @tag prop and it should have the correct role`, async function (assert) {
    await render(
      <template>
        <HdsCardContainer id="test-card-container" @tag="li" />
      </template>,
    );
    assert
      .dom('#test-card-container')
      .hasTagName('li')
      .hasAttribute('role', 'listitem');
  });

  // ASSERTIONS

  test('it should throw an assertion if an incorrect value for @level is provided', async function (assert) {
    const errorMessage =
      '@level for "Hds::Card::Container" must be one of the following: base, mid, high; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      <template>
        {{! @glint-expect-error - assertion testing invalid value }}
        <HdsCardContainer @level="foo" />
      </template>,
    );
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
    await render(
      <template>
        {{! @glint-expect-error - assertion testing invalid value }}
        <HdsCardContainer @levelHover="foo" />
      </template>,
    );
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
    await render(
      <template>
        {{! @glint-expect-error - assertion testing invalid value }}
        <HdsCardContainer @levelActive="foo" />
      </template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });

  // If a tag other than div or li is passed, it should throw an assertion
  test('it should throw an assertion if an incorrect value for @tag is provided', async function (assert) {
    const errorMessage =
      '@tag for "Hds::Card::Container" must be one of the following: div, li; received: section';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      <template>
        {{! @glint-expect-error - assertion testing invalid value }}
        <HdsCardContainer @tag="section" />
      </template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
