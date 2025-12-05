/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { click, render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';

import { HdsPaginationNavArrow } from '@hashicorp/design-system-components/components';
import type { HdsPaginationDirections } from '@hashicorp/design-system-components/components/hds/pagination/types';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/pagination/nav/arrow', function (hooks) {
  setupRenderingTest(hooks);
  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template>
        <HdsPaginationNavArrow @direction="prev" id="test-nav-arrow" />
      </template>,
    );
    assert.dom('#test-nav-arrow').hasClass('hds-pagination-nav__arrow');
  });

  // DIRECTION

  test('it should render a "Previous" or "Next" button matching the passed in direction', async function (assert) {
    await render(
      <template>
        <HdsPaginationNavArrow @direction="prev" id="test-nav-arrow-prev" />
        <HdsPaginationNavArrow @direction="next" id="test-nav-arrow-next" />
      </template>,
    );
    assert
      .dom('#test-nav-arrow-next')
      .hasClass('hds-pagination-nav__arrow--direction-next')
      .hasAttribute('aria-label', 'Next page');
    assert.dom('#test-nav-arrow-next .hds-icon-chevron-right').exists();
    assert
      .dom('#test-nav-arrow-prev')
      .hasClass('hds-pagination-nav__arrow--direction-prev')
      .hasAttribute('aria-label', 'Previous page');
    assert.dom('#test-nav-arrow-prev .hds-icon-chevron-left').exists();
  });

  // LABEL

  test('it should render the appropriate text labels by default', async function (assert) {
    await render(
      <template>
        <HdsPaginationNavArrow @direction="prev" id="test-nav-arrow-prev" />
        <HdsPaginationNavArrow @direction="next" id="test-nav-arrow-next" />
      </template>,
    );
    assert
      .dom('#test-nav-arrow-prev .hds-pagination-nav__arrow-label')
      .hasText('Previous');
    assert
      .dom('#test-nav-arrow-next .hds-pagination-nav__arrow-label')
      .hasText('Next');
  });
  test('it should not render the text label if @showLabel is set to false', async function (assert) {
    await render(
      <template>
        <HdsPaginationNavArrow @direction="prev" @showLabel={{false}} />
      </template>,
    );
    assert.dom('.hds-pagination-nav__arrow-label').doesNotExist();
  });

  // DISABLED

  test('it should render a disabled button when @disabled is set to true', async function (assert) {
    await render(
      <template>
        <HdsPaginationNavArrow @direction="prev" @disabled={{true}} />
      </template>,
    );
    assert.dom('.hds-pagination-nav__control').hasAttribute('disabled');
  });

  // EVENTS

  test('it should call the onClick handler with the value of the direction of the button', async function (assert) {
    const context = new TrackedObject<
      Record<'direction', HdsPaginationDirections | undefined>
    >({
      direction: undefined,
    });

    const onClick = (dir: HdsPaginationDirections) => {
      context.direction = dir;
    };

    await render(
      <template>
        <HdsPaginationNavArrow @direction="prev" @onClick={{onClick}} />
      </template>,
    );
    await click('.hds-pagination-nav__control');
    assert.strictEqual(context.direction, 'prev');
  });

  // ASSERTIONS

  test('it should throw an assertion if @direction is not defined', async function (assert) {
    const errorMessage =
      '@direction for "Pagination::Nav::Arrow" must be one of the following: prev, next; received: undefined';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      <template>
        {{! @glint-expect-error - testing invalid component usage }}
        <HdsPaginationNavArrow />
      </template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if @direction is not one of the right values', async function (assert) {
    const errorMessage =
      '@direction for "Pagination::Nav::Arrow" must be one of the following: prev, next; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      <template>
        {{! @glint-expect-error - testing invalid component usage }}
        <HdsPaginationNavArrow @direction="foo" />
      </template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
