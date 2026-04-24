/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { click, render, resetOnerror, setupOnerror } from '@ember/test-helpers';

import { HdsPaginationNavNumber } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';
import NOOP from 'showcase/utils/noop';

module('Integration | Component | hds/pagination/nav/number', function (hooks) {
  setupRenderingTest(hooks);
  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template>
        <HdsPaginationNavNumber
          @page={{1}}
          @onClick={{NOOP}}
          @isSelected={{false}}
          id="test-pagination-number"
        />
      </template>,
    );
    assert
      .dom('#test-pagination-number')
      .hasClass('hds-pagination-nav__number');
  });

  // CONTENT

  test('it displays the passed in page number', async function (assert) {
    await render(
      <template>
        <HdsPaginationNavNumber
          @page={{5}}
          @onClick={{NOOP}}
          @isSelected={{false}}
        />
      </template>,
    );
    assert.dom('.hds-pagination-nav__control').hasText('page 5');
  });

  // SELECTED

  test('it is selected if @isSelected is set to true', async function (assert) {
    await render(
      <template>
        <HdsPaginationNavNumber
          @page={{1}}
          @isSelected={{true}}
          id="test-is-selected"
          @onClick={{NOOP}}
        />
        <HdsPaginationNavNumber
          @page={{3}}
          id="test-not-selected"
          @onClick={{NOOP}}
          @isSelected={{false}}
        />
      </template>,
    );
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
    const onClick = (pageNum: number) => (pageNumber = pageNum);

    await render(
      <template>
        <HdsPaginationNavNumber
          @page={{3}}
          id="test-pagination-number"
          @onClick={{onClick}}
          @isSelected={{false}}
        />
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
    await render(
      <template>
        {{! @glint-expect-error - testing invalid component usage }}
        <HdsPaginationNavNumber @onClick={{NOOP}} @isSelected={{false}} />
      </template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
