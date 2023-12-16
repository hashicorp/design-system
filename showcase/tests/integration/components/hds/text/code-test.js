/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/text/code', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::Text::Code @size="200" @tag="pre" id="test-text" />`
    );
    assert.dom('#test-text').hasClass('hds-text');
    assert.dom('#test-text').hasClass('hds-typography-code-200');
  });

  // GENERAL TEST
  // most of the testing is already done in the `index` test file

  test('it renders correctly the provided arguments', async function (assert) {
    await render(
      hbs`<Hds::Text::Code @size="100" @tag="code" @weight="regular" @align="right" @color="success" id="test-text">This is the text</Hds::Text::Code>`
    );
    assert.dom('#test-text').hasText('This is the text');
    assert.dom('#test-text').hasClass('hds-typography-code-100');
    assert.dom('#test-text').hasTagName('code');
    assert.dom('#test-text').hasClass('hds-font-weight-regular');
    assert.dom('#test-text').hasClass('hds-text--align-right');
    assert.dom('#test-text').hasClass('hds-foreground-success');
  });

  // ASSERTIONS

  test('it should throw an assertion if an incorrect value for @size is provided', async function (assert) {
    const errorMessage =
      '@size for "Hds::Text::Code" must be one of the following: 300, 200, 100; received: 123';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Text::Code @size="123" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if an incorrect value for @weight is provided when @size=300', async function (assert) {
    const errorMessage =
      '@weight for "Hds::Text::Code" with @size=300 must be one of the following: regular, bold; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Text::Code @size="300" @weight="foo" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if an incorrect value for @weight is provided when @size=200', async function (assert) {
    const errorMessage =
      '@weight for "Hds::Text::Code" with @size=200 must be one of the following: regular, bold; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Text::Code @size="200" @weight="foo" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if an incorrect value for @weight is provided when @size=100', async function (assert) {
    const errorMessage =
      '@weight for "Hds::Text::Code" with @size=100 must be one of the following: regular, bold; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Text::Code @size="100" @weight="foo" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
