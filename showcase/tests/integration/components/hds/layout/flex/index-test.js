/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/layout/flex/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Layout::Flex id="test-layout-flex" />`);
    assert.dom('#test-layout-flex').hasClass('hds-layout-flex');
  });

  // CONTENT

  test('it should render the yielded content', async function (assert) {
    await render(
      hbs`<Hds::Layout::Flex id="test-layout-flex"><pre>test</pre></Hds::Layout::Flex>`,
    );
    assert.dom('#test-layout-flex > pre').exists().hasText('test');
  });
  test('it should render the `Item` yielded contextual component', async function (assert) {
    await render(
      hbs`<Hds::Layout::Flex id="test-layout-flex" as |LF|><LF.Item><pre>test</pre></LF.Item></Hds::Layout::Flex>`,
    );
    assert
      .dom('#test-layout-flex > .hds-layout-flex-item > pre')
      .exists()
      .hasText('test');
  });

  // TAG

  test('it should render with a "div" element if @tag is not declared', async function (assert) {
    await render(hbs`<Hds::Layout::Flex id="test-layout-flex" />`);
    assert.dom('#test-layout-flex').hasTagName('div');
  });
  test('it should render with the correct @tag declared', async function (assert) {
    await render(
      hbs`<Hds::Layout::Flex id="test-layout-flex" @tag="section" />`,
    );
    assert.dom('#test-layout-flex').hasTagName('section');
  });

  // DIRECTION

  test('it should render the element with `row` direction if no @direction is declared', async function (assert) {
    await render(hbs`<Hds::Layout::Flex id="test-layout-flex" />`);
    assert.dom('#test-layout-flex').hasClass('hds-layout-flex--direction-row');
  });
  test('it should render the correct CSS class if the @direction prop is declared', async function (assert) {
    await render(
      hbs`<Hds::Layout::Flex id="test-layout-flex" @direction="column" />`,
    );
    assert
      .dom('#test-layout-flex')
      .hasClass('hds-layout-flex--direction-column');
  });

  // JUSTIFY / ALIGN / WRAP / IS-INLINE

  test('it should render the element without specific classes if no @justify/@align/@wrap/@isInline are declared', async function (assert) {
    await render(hbs`<Hds::Layout::Flex id="test-layout-flex" />`);
    assert
      .dom('#test-layout-flex')
      .doesNotHaveClass(/hds-layout-flex--justify-content-/)
      .doesNotHaveClass(/hds-layout-flex--align-items-/)
      .doesNotHaveClass('hds-layout-flex--has-wrapping')
      .doesNotHaveClass('hds-layout-flex--is-inline');
  });
  test('it should render the correct CSS classes if the @justify/@align/@wrap/@isInline props are declared', async function (assert) {
    await render(
      hbs`<Hds::Layout::Flex id="test-layout-flex" @justify="space-between" @align="stretch" @wrap={{true}} @isInline={{true}} />`,
    );
    assert
      .dom('#test-layout-flex')
      .hasClass('hds-layout-flex--justify-content-space-between')
      .hasClass('hds-layout-flex--align-items-stretch')
      .hasClass('hds-layout-flex--has-wrapping')
      .hasClass('hds-layout-flex--is-inline');
  });

  // GAP

  test('it should render the element without `gap` class if no @gap is declared', async function (assert) {
    await render(hbs`<Hds::Layout::Flex id="test-layout-flex" />`);
    assert
      .dom('#test-layout-flex')
      .doesNotHaveClass(/hds-layout-flex--row-gap-/)
      .doesNotHaveClass(/hds-layout-flex--column-gap-/);
  });
  test('it should render the correct CSS classes if the @gap prop is declared as single value', async function (assert) {
    await render(hbs`<Hds::Layout::Flex id="test-layout-flex" @gap="24" />`);
    assert
      .dom('#test-layout-flex')
      .hasClass('hds-layout-flex--row-gap-24')
      .hasClass('hds-layout-flex--column-gap-24');
  });
  test('it should render the correct CSS class if the @gap prop is declared as a couple of values', async function (assert) {
    await render(
      hbs`<Hds::Layout::Flex id="test-layout-flex" @gap={{array "4" "48"}} />`,
    );
    assert
      .dom('#test-layout-flex')
      .hasClass('hds-layout-flex--row-gap-4')
      .hasClass('hds-layout-flex--column-gap-48');
  });

  // ASSERTIONS

  test('it should throw an assertion if an incorrect value for @direction is provided', async function (assert) {
    const errorMessage =
      '@direction for "Hds::Layout::Flex" must be one of the following: row, column; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Layout::Flex @direction="foo" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if an incorrect value for @justify is provided', async function (assert) {
    const errorMessage =
      '@justify for "Hds::Layout::Flex" must be one of the following: start, center, end, space-between, space-around, space-evenly; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Layout::Flex @justify="foo" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if an incorrect value for @align is provided', async function (assert) {
    const errorMessage =
      '@align for "Hds::Layout::Flex" must be one of the following: start, center, end, stretch; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Layout::Flex @align="foo" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if an incorrect value for @gap is provided', async function (assert) {
    const errorMessage =
      '@gap for "Hds::Layout::Flex" must be a single value or an array of two values of one of the following: 4, 8, 12, 16, 24, 32, 48; received: 4,foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Layout::Flex @gap={{array 4 "foo"}} />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
