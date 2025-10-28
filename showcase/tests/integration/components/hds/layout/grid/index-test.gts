/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { array } from '@ember/helper';
import { render, setupOnerror } from '@ember/test-helpers';

import { HdsLayoutGrid } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/layout/grid/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(<template><HdsLayoutGrid id="test-layout-grid" /></template>);
    assert.dom('#test-layout-grid').hasClass('hds-layout-grid');
  });

  // CONTENT

  test('it should render the yielded content', async function (assert) {
    await render(
      <template>
        <HdsLayoutGrid id="test-layout-grid"><pre>test</pre></HdsLayoutGrid>
      </template>,
    );
    assert.dom('#test-layout-grid > pre').exists().hasText('test');
  });

  test('it should render the `Item` yielded contextual component', async function (assert) {
    await render(
      <template>
        <HdsLayoutGrid id="test-layout-grid" as |LG|>
          <LG.Item><pre>test</pre></LG.Item>
        </HdsLayoutGrid>
      </template>,
    );
    assert
      .dom('#test-layout-grid > .hds-layout-grid-item > pre')
      .exists()
      .hasText('test');
  });

  // OPTIONS

  // COLUMN MIN WIDTH AND COLUMN WIDTH

  // Notes:
  // A fallback value of 0px is set in the CSS for the `--hds-layout-grid-column-min-width` custom property
  // A fallback value of `auto-fit` is set in the CSS for the `--hds-layout-grid-column-fill-type` custom property

  // if neither columnMinWidth or columnWidth are declared, we do not set the inline custom properties
  test('if neither columnMinWidth or columnWidth are declared, we do not set the inline custom properties', async function (assert) {
    await render(<template><HdsLayoutGrid id="test-layout-grid" /></template>);
    assert
      .dom('#test-layout-grid')
      .doesNotHaveStyle({ '--hds-layout-grid-column-min-width': '' })
      .doesNotHaveStyle({ '--hds-layout-grid-column-fill-type': '' });
  });

  test('it should render the correct min-width if the @columnMinWidth prop is declared', async function (assert) {
    await render(
      <template>
        <HdsLayoutGrid id="test-layout-grid" @columnMinWidth="200px" />
      </template>,
    );
    assert
      .dom('#test-layout-grid')
      .hasStyle({ '--hds-layout-grid-column-min-width': '200px' });
  });

  test('it should set the correct fill type and column width if the @columnWidth prop is declared', async function (assert) {
    await render(
      <template>
        <HdsLayoutGrid id="test-layout-grid" @columnWidth="200px" />
      </template>,
    );
    assert
      .dom('#test-layout-grid')
      .hasStyle({ '--hds-layout-grid-column-fill-type': 'auto-fill' })
      .hasStyle({ '--hds-layout-grid-column-min-width': '200px' });
  });

  // TAG

  test('it should render with a "div" element if @tag is not declared', async function (assert) {
    await render(<template><HdsLayoutGrid id="test-layout-grid" /></template>);
    assert.dom('#test-layout-grid').hasTagName('div');
  });

  test('it should render with the correct @tag declared', async function (assert) {
    await render(
      <template>
        <HdsLayoutGrid id="test-layout-grid" @tag="section" />
      </template>,
    );
    assert.dom('#test-layout-grid').hasTagName('section');
  });

  // ALIGN

  test('it should render the element without specific classes if @align is not declared', async function (assert) {
    await render(<template><HdsLayoutGrid id="test-layout-grid" /></template>);
    assert
      .dom('#test-layout-grid')
      .doesNotHaveClass(/hds-layout-grid--align-items-/);
  });

  test('it should render the correct CSS classes if @align props are declared', async function (assert) {
    await render(
      <template>
        <HdsLayoutGrid id="test-layout-grid" @align="stretch" />
      </template>,
    );
    assert
      .dom('#test-layout-grid')
      .hasClass('hds-layout-grid--align-items-stretch');
  });

  // GAP

  test('it should render the element with the default `gap` class if no @gap is declared', async function (assert) {
    await render(<template><HdsLayoutGrid id="test-layout-grid" /></template>);
    assert.dom('#test-layout-grid').hasClass('hds-layout-grid--row-gap-0');
    assert.dom('#test-layout-grid').hasClass('hds-layout-grid--column-gap-0');
  });

  test('it should render the correct CSS classes if the @gap prop is declared as a single value', async function (assert) {
    await render(
      <template><HdsLayoutGrid id="test-layout-grid" @gap="24" /></template>,
    );
    assert
      .dom('#test-layout-grid')
      .hasClass('hds-layout-grid--row-gap-24')
      .hasClass('hds-layout-grid--column-gap-24');
  });

  test('it should render the correct CSS class if the @gap prop is declared as two values', async function (assert) {
    await render(
      <template>
        <HdsLayoutGrid id="test-layout-grid" @gap={{array "4" "48"}} />
      </template>,
    );
    assert.dom('#test-layout-grid').hasClass('hds-layout-grid--row-gap-4');
    assert.dom('#test-layout-grid').hasClass('hds-layout-grid--column-gap-48');
  });

  // ASSERTIONS

  test('it should throw an assertion if an incorrect value for @align is provided', async function (assert) {
    const errorMessage =
      '@align for "Hds::Layout::Grid" must be one of the following: start, center, end, stretch; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      <template>
        {{! @glint-expect-error - testing invalid component usage }}
        <HdsLayoutGrid @align="foo" />
      </template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });

  test('it should throw an assertion if an incorrect value for @gap is provided', async function (assert) {
    const errorMessage =
      '@gap for "Hds::Layout::Grid" must be a single value or an array of two values of one of the following: 0, 4, 8, 12, 16, 24, 32, 48; received: 4,foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      <template>
        {{! @glint-expect-error - testing invalid component usage }}
        <HdsLayoutGrid @gap={{array 4 "foo"}} />
      </template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });

  test('it should throw an assertion if both @columnMinWidth and @columnWidth are declared', async function (assert) {
    const errorMessage =
      '@columnMinWidth and @columnWidth for "Hds::Layout::Grid" cannot be used together';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      <template>
        <HdsLayoutGrid
          id="test-layout-grid"
          @columnMinWidth="200px"
          @columnWidth="300px"
        />
      </template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
