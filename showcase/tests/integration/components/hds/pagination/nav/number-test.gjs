/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { click, render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import Number0 from "@hashicorp/design-system-components/components/hds/pagination/nav/number";

module('Integration | Component | hds/pagination/nav/number', function (hooks) {
  setupRenderingTest(hooks);
  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(<template>
        <Number0 @page={{1}} id="test-pagination-number" />
      </template>);
    assert
      .dom('#test-pagination-number')
      .hasClass('hds-pagination-nav__number');
  });

  // CONTENT

  test('it displays the passed in page number', async function (assert) {
    await render(<template>
        <Number0 @page={{5}} />
      </template>);
    assert.dom('.hds-pagination-nav__control').hasText('page 5');
  });

  // SELECTED

  test('it is selected if @isSelected is set to true', async function (assert) {
    await render(<template>
        <Number0 @page={{1}} @isSelected={{true}} id="test-is-selected" />
        <Number0 @page={{3}} id="test-not-selected" />
      </template>);
    assert
      .dom('#test-is-selected')
      .hasClass('hds-pagination-nav__number--is-selected');
    assert.dom('#test-is-selected').hasAttribute('aria-current', 'page');
    assert
      .dom('#test-not-selected')
      .doesNotHaveClass('hds-pagination-nav__number--is-selected');
    assert
      .dom('#test-not-selected')
      .doesNotHaveAttribute('aria-current', 'page');
  });

  // EVENTS

  test('it should call the onClick handler with the value of the page number', async function (assert) {
    let pageNumber;
    this.set('onClick', (pageNum) => (pageNumber = pageNum));
    await render(
      <template>
          <Number0 @page={{3}} id="test-pagination-number" @onClick={{this.onClick}} />
        </template>,
    );
    await click('#test-pagination-number');
    assert.strictEqual(pageNumber, 3);
  });

  // ASSERTIONS

  test('it should throw an assertion if @page is not defined', async function (assert) {
    const errorMessage =
      '@page for "Pagination::Nav::Number" must have a valid value';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(<template><Number0 /></template>);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
