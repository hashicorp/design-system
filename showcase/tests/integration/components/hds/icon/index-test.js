/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds-icon', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Icon @name="activity" />`);
    assert.dom('svg.hds-icon').hasClass('hds-icon');
  });

  // SIZE

  test('it renders the 16x16 icon by default', async function (assert) {
    await render(hbs`<Hds::Icon @name="activity" />`);
    assert
      .dom('svg.hds-icon.hds-icon-activity')
      .hasStyle({ height: '16px', width: '16px' })
      .hasAttribute('width', '16')
      .hasAttribute('height', '16');
  });
  test('it renders the 24x24 icon when the "size" option is set', async function (assert) {
    await render(hbs`<Hds::Icon @name="activity" @size="24" />`);
    assert
      .dom('svg.hds-icon.hds-icon-activity')
      .hasStyle({ height: '24px', width: '24px' })
      .hasAttribute('width', '24')
      .hasAttribute('height', '24');
  });
  test('it sets the width/height to 100% when the "stretched" option is set to true', async function (assert) {
    await render(
      hbs`<Hds::Icon @name="activity" @size="24" @stretched={{true}} />`
    );
    assert
      .dom('svg.hds-icon.hds-icon-activity')
      .hasAttribute('width', '100%')
      .hasAttribute('height', '100%');
  });

  // DISPLAY

  test('it does not have the "hds-icon--is-inline" class by default', async function (assert) {
    await render(hbs`<Hds::Icon @name="activity" />`);
    assert.dom('svg.hds-icon').doesNotHaveClass('hds-icon--is-inline');
  });
  test('it does have the "hds-icon--is-inline" class if the `@isInline` option is set to `true`', async function (assert) {
    await render(hbs`<Hds::Icon @name="activity" @isInline={{true}} />`);
    assert.dom('svg.hds-icon').hasClass('hds-icon--is-inline');
  });

  // COLOR

  test('the fill color should be `currentColor` if no @color is declared', async function (assert) {
    await render(hbs`<Hds::Icon @name="alert-circle" />`);
    assert.dom(`svg.hds-icon`).hasAttribute('fill', 'currentColor');
  });
  test('it should render the correct CSS color class if the @color prop is declared using a pre-defined color', async function (assert) {
    await render(hbs`<Hds::Icon @name="alert-circle" @color="highlight" />`);
    // notice: we use CSS helper classes for the color definitions
    assert.dom(`svg.hds-icon`).hasClass('hds-foreground-highlight');
    assert.dom(`svg.hds-icon`).hasAttribute('fill', 'currentColor');
  });
  test('it should render the correct style if the @color prop is declared as custom CSS property color', async function (assert) {
    await render(
      hbs`<Hds::Icon @name="alert-circle" @color="var(--doc-color-feedback-critical-100)" />`
    );
    assert
      .dom(`svg.hds-icon`)
      .hasAttribute('fill', 'var(--doc-color-feedback-critical-100)');
  });
  test('it should render the correct style if the @color prop is declared as custom HEX color', async function (assert) {
    await render(hbs`<Hds::Icon @name="alert-circle" @color="#FF0000" />`);
    assert.dom(`svg.hds-icon`).hasAttribute('fill', '#FF0000');
  });
  test('the fill color should be able to be inherited from parent', async function (assert) {
    await render(
      hbs`<div style="color:blue;"><Hds::Icon @name="alert-circle" /></div>`
    );
    assert.dom(`svg.hds-icon`).hasStyle({
      fill: 'rgb(0, 0, 255)',
    });
  });

  // A11Y

  test('it renders the title if one is defined', async function (assert) {
    await render(hbs`<Hds::Icon @name="activity" @title="try to avoid" />`);
    assert.dom('title').containsText('try to avoid');
  });
  test('it has aria-hidden set to true', async function (assert) {
    await render(hbs`<Hds::Icon @name="activity" />`);
    assert.dom('svg.hds-icon.hds-icon-activity').hasAria('hidden', 'true');
  });
  test('it has aria-hidden set to false if a title is defined', async function (assert) {
    await render(hbs`<Hds::Icon @name="activity" @title="try to avoid" />`);
    assert.dom('svg.hds-icon.hds-icon-activity').hasAria('hidden', 'false');
  });
  test('it has aria-labelledby if a title exists', async function (assert) {
    await render(hbs`<Hds::Icon @name="activity" @title="try to avoid" />`);
    assert
      .dom('svg.hds-icon.hds-icon-activity')
      .hasAttribute('aria-labelledby');
  });
  test('it does not have aria-labelledby if a title does not exist', async function (assert) {
    await render(hbs`<Hds::Icon @name="activity" />`);
    assert
      .dom('svg.hds-icon.hds-icon-activity')
      .doesNotHaveAttribute('aria-labelledby');
  });
  test('it has a g element with role of presentation if a title exists', async function (assert) {
    await render(hbs`<Hds::Icon @name="activity" @title="computer says no" />`);
    assert.dom('svg > g').hasAttribute('role');
  });

  // ATTRIBUTES

  test('additional classes can be added when component is invoked', async function (assert) {
    await render(hbs`<Hds::Icon @name="meh" class="demo" />`);
    assert.dom(`svg.hds-icon`).hasClass('demo');
  });

  // ASSERTIONS

  test('it should throw an assertion if @name is not provided', async function (assert) {
    const errorMessage = `Please provide to <Hds::Icon> a value for @name`;
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Icon />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if the icon @name does not exist', async function (assert) {
    const errorMessage = `The icon @name "abc" provided to <Hds::Icon> is not correct. Please verify it exists on https://helios.hashicorp.design/icons/library`;
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Icon @name="abc" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
