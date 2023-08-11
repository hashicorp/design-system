/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/pagination/nav/arrow', function (hooks) {
  setupRenderingTest(hooks);
  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`
      <Hds::Pagination::Nav::Arrow @direction="prev" id="test-nav-arrow" />
    `);
    assert.dom('#test-nav-arrow').hasClass('hds-pagination-nav__arrow');
  });

  // DIRECTION

  test('it should render a "Previous" or "Next" button matching the passed in direction', async function (assert) {
    await render(hbs`
    <Hds::Pagination::Nav::Arrow @direction="prev" id="test-nav-arrow-prev" />
    <Hds::Pagination::Nav::Arrow @direction="next" id="test-nav-arrow-next" />
    `);
    assert
      .dom('#test-nav-arrow-next')
      .hasClass('hds-pagination-nav__arrow--direction-next')
      .hasAttribute('aria-label', 'Next page');
    assert.dom('#test-nav-arrow-next .flight-icon-chevron-right').exists();
    assert
      .dom('#test-nav-arrow-prev')
      .hasClass('hds-pagination-nav__arrow--direction-prev')
      .hasAttribute('aria-label', 'Previous page');
    assert.dom('#test-nav-arrow-prev .flight-icon-chevron-left').exists();
  });

  // LABEL

  test('it should render the appropriate text labels by default', async function (assert) {
    await render(hbs`
      <Hds::Pagination::Nav::Arrow @direction="prev" id="test-nav-arrow-prev" />
      <Hds::Pagination::Nav::Arrow @direction="next" id="test-nav-arrow-next" />
    `);
    assert
      .dom('#test-nav-arrow-prev .hds-pagination-nav__arrow-label')
      .hasText('Previous');
    assert
      .dom('#test-nav-arrow-next .hds-pagination-nav__arrow-label')
      .hasText('Next');
  });
  test('it should not render the text label if @showLabel is set to false', async function (assert) {
    await render(hbs`
      <Hds::Pagination::Nav::Arrow @direction="prev" @showLabel={{false}} />
    `);
    assert.dom('.hds-pagination-nav__arrow-label').doesNotExist();
  });

  // DISABLED

  test('it should render a disabled button when @disabled is set to true', async function (assert) {
    await render(hbs`
        <Hds::Pagination::Nav::Arrow @direction="prev" @disabled={{true}} />
      `);
    assert.dom('.hds-pagination-nav__control').hasAttribute('disabled');
  });

  // EVENTS

  test('it should call the onClick handler with the value of the direction of the button', async function (assert) {
    let direction;
    this.set('onClick', (dir) => (direction = dir));
    await render(
      hbs`
          <Hds::Pagination::Nav::Arrow @direction="prev" @onClick={{this.onClick}} />
        `
    );
    await click('.hds-pagination-nav__control');
    assert.strictEqual(direction, 'prev');
  });

  // ASSERTIONS

  test('it should throw an assertion if @direction is not defined', async function (assert) {
    const errorMessage =
      '@direction for "Pagination::Nav::Arrow" must be one of the following: prev, next; received: undefined';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Pagination::Nav::Arrow />`);
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
    await render(hbs`<Hds::Pagination::Nav::Arrow @direction="foo" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
