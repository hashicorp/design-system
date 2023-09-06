/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/text/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::Text @group="body" @size="200" @tag="p" id="test-text" />`
    );
    assert.dom('#test-text').hasClass('hds-text');
  });

  // CONTENT (TEXT)

  test('it renders with the provided text', async function (assert) {
    await render(
      hbs`<Hds::Text @group="body" @size="200" @tag="p" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasText('This is the text');
  });

  // VARIANT (GROUP + SIZE)

  test('it should render text with the correct variant based on the @group/@size declared', async function (assert) {
    await render(
      hbs`<Hds::Text @group="display" @size="500" @tag="p" id="test-text">This is the text</Hds::Text>`
    );
    // notice: we use CSS helper classes for the weight definitions
    assert.dom('#test-text').hasClass('hds-typography-display-500');
  });

  // TAG

  test('it should render text with a "span" element if @tag is not declared', async function (assert) {
    await render(
      hbs`<Hds::Text @group="body" @size="200" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('span');
  });
  test('it should render text with the correct @tag declared', async function (assert) {
    await render(
      hbs`<Hds::Text @group="body" @tag="mark" @size="200" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasTagName('mark');
  });

  // WEIGHT

  test('it should render text without weight if no @weight is declared', async function (assert) {
    await render(
      hbs`<Hds::Text @group="body" @size="200" @tag="p" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').doesNotHaveClass(/hds-text--weight-/);
  });
  test('it should render the correct CSS class if the @weight prop is declared', async function (assert) {
    await render(
      hbs`<Hds::Text @group="body" @size="200" @tag="p" @weight="semibold" id="test-text">This is the text</Hds::Text>`
    );
    // notice: we use CSS helper classes for the weight definitions
    assert.dom('#test-text').hasClass('hds-font-weight-semibold');
  });

  // ALIGN

  test('it should render text without alignment if no @align is declared', async function (assert) {
    await render(
      hbs`<Hds::Text @group="body" @size="200" @tag="p" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').doesNotHaveClass(/hds-text--align-/);
  });
  test('it should render the correct CSS class if the @align prop is declared', async function (assert) {
    await render(
      hbs`<Hds::Text @group="body" @size="200" @tag="p" @align="right" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasClass('hds-text--align-right');
  });

  // COLOR

  test('it should render text without color if no @color is declared', async function (assert) {
    await render(
      hbs`<Hds::Text @group="body" @size="200" @tag="p" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').doesNotHaveClass(/hds-text--color-/);
    assert.dom('#test-text').doesNotHaveAttribute('style');
  });
  test('it should render the correct CSS color class if the @color prop is declared using a pre-defined color', async function (assert) {
    await render(
      hbs`<Hds::Text @group="body" @size="200" @tag="p" @color="highlight" id="test-text">This is the text</Hds::Text>`
    );
    // notice: we use CSS helper classes for the color definitions
    assert.dom('#test-text').hasClass('hds-foreground-highlight');
  });
  test('it should render the correct style if the @color prop is declared as custom CSS property color', async function (assert) {
    await render(
      hbs`<Hds::Text @group="body" @size="200" @tag="p" @color="var(--token-color-foreground-action)" id="test-text">This is the text</Hds::Text>`
    );
    assert
      .dom('#test-text')
      .hasAttribute('style', 'color: var(--token-color-foreground-action);');
  });
  test('it should render the correct style if the @color prop is declared as custom HEX color', async function (assert) {
    await render(
      hbs`<Hds::Text @group="body" @size="200" @tag="p" @color="#FF0000" id="test-text">This is the text</Hds::Text>`
    );
    assert.dom('#test-text').hasAttribute('style', 'color: rgb(255, 0, 0);');
  });

  // ASSERTIONS

  test('it should throw an assertion if an incorrect value for @align is provided', async function (assert) {
    const errorMessage =
      '@align for "Hds::Text" must be one of the following: left, center, right; received: top';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      hbs`<Hds::Text @group="body" @size="200" @tag="p" @align="top" id="test-text">This is the text</Hds::Text>`
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
