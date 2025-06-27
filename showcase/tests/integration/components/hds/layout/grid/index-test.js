/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/layout/grid/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Layout::Grid id="test-layout-grid" />`);
    assert.dom('#test-layout-grid').hasClass('hds-layout-grid');
  });

  // CONTENT

  test('it should render the yielded content', async function (assert) {
    await render(
      hbs`<Hds::Layout::Grid id="test-layout-grid"><pre>test</pre></Hds::Layout::Grid>`,
    );
    assert.dom('#test-layout-grid > pre').exists().hasText('test');
  });

  test('it should render the `Item` yielded contextual component', async function (assert) {
    await render(
      hbs`
        <Hds::Layout::Grid id="test-layout-grid" as |LG|>
          <LG.Item><pre>test</pre></LG.Item>
        </Hds::Layout::Grid>`,
    );
    assert
      .dom('#test-layout-grid > .hds-layout-grid-item > pre')
      .exists()
      .hasText('test');
  });

  // OPTIONS

  // ColumnMinWidth

  // Note: A fallback value of 0px is set in the CSS for the `--hds-layout-grid-column-min-width` custom property
  test('if the @columnMinWidth prop is not declared, --hds-layout-grid-column-min-width should be unset', async function (assert) {
    await render(hbs`<Hds::Layout::Grid id="test-layout-grid" />`);
    assert
      .dom('#test-layout-grid')
      .doesNotHaveStyle('--hds-layout-grid-column-min-width');
  });

  test('it should render the correct min-width if the @columnMinWidth prop is declared', async function (assert) {
    await render(
      hbs`<Hds::Layout::Grid id="test-layout-grid" @columnMinWidth="200px" />`,
    );
    assert
      .dom('#test-layout-grid')
      .hasStyle({ '--hds-layout-grid-column-min-width': '200px' });
  });

  // ColumnWidth

  test('it should not have the hds-layout-grid--has-column-width class if @columnWidth is not declared', async function (assert) {
    await render(hbs`<Hds::Layout::Grid id="test-layout-grid" />`);
    assert
      .dom('#test-layout-grid')
      .doesNotHaveClass('hds-layout-grid--has-column-width');
  });

  test('it should have the hds-layout-grid--has-column-width class if @columnWidth is declared', async function (assert) {
    await render(
      hbs`<Hds::Layout::Grid id="test-layout-grid" @columnWidth="200px" />`,
    );
    assert
      .dom('#test-layout-grid')
      .hasClass('hds-layout-grid--has-column-width');
  });

  // Tag

  test('it should render with a "div" element if @tag is not declared', async function (assert) {
    await render(hbs`<Hds::Layout::Grid id="test-layout-grid" />`);
    assert.dom('#test-layout-grid').hasTagName('div');
  });

  test('it should render with the correct @tag declared', async function (assert) {
    await render(
      hbs`<Hds::Layout::Grid id="test-layout-grid" @tag="section" />`,
    );
    assert.dom('#test-layout-grid').hasTagName('section');
  });

  // Align

  test('it should render the element without specific classes if @align is not declared', async function (assert) {
    await render(hbs`<Hds::Layout::Grid id="test-layout-grid" />`);
    assert
      .dom('#test-layout-grid')
      .doesNotHaveClass(/hds-layout-grid--align-items-/);
  });

  test('it should render the correct CSS classes if @align props are declared', async function (assert) {
    await render(
      hbs`<Hds::Layout::Grid id="test-layout-grid" @align="stretch" @wrap={{true}} />`,
    );
    assert
      .dom('#test-layout-grid')
      .hasClass('hds-layout-grid--align-items-stretch');
  });

  // Gap

  test('it should render the element without `gap` class if no @gap is declared', async function (assert) {
    await render(hbs`<Hds::Layout::Grid id="test-layout-grid" />`);
    assert.dom('#test-layout-grid').doesNotHaveClass(/hds-layout-grid--gap-/);
    assert
      .dom('#test-layout-grid')
      .doesNotHaveClass(/hds-layout-grid--row-gap-/);
    assert
      .dom('#test-layout-grid')
      .doesNotHaveClass(/hds-layout-grid--column-gap-/);
  });

  test('it should render the correct CSS classes if the @gap prop is declared as a single value', async function (assert) {
    await render(hbs`<Hds::Layout::Grid id="test-layout-grid" @gap="24" />`);
    assert
      .dom('#test-layout-grid')
      .hasClass('hds-layout-grid--row-gap-24')
      .hasClass('hds-layout-grid--column-gap-24');
  });

  test('it should render the correct CSS class if the @gap prop is declared as two values', async function (assert) {
    await render(
      hbs`<Hds::Layout::Grid id="test-layout-grid" @gap={{array "4" "48"}} />`,
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
    await render(hbs`<Hds::Layout::Grid @align="foo" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });

  test('it should throw an assertion if an incorrect value for @gap is provided', async function (assert) {
    const errorMessage =
      '@gap for "Hds::Layout::Grid" must be a single value or an array of two values of one of the following: 4, 8, 12, 16, 24, 32, 48; received: 4,foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Layout::Grid @gap={{array 4 "foo"}} />`);
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
      hbs`<Hds::Layout::Grid id="test-layout-grid" @columnMinWidth="200px" @columnWidth="300px" />`,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
