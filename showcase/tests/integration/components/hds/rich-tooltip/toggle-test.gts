/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';

import {
  HdsPopoverPrimitive,
  HdsRichTooltipToggle,
} from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/rich-tooltip/toggle', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template>
        <HdsPopoverPrimitive as |PP|>
          <HdsRichTooltipToggle
            id="test-rich-tooltip-toggle"
            @setupPrimitiveToggle={{PP.setupPrimitiveToggle}}
            @popoverId="foo"
          />
        </HdsPopoverPrimitive>
      </template>,
    );
    assert
      .dom('#test-rich-tooltip-toggle')
      .hasClass('hds-rich-tooltip__toggle');
  });

  // TEXT + ICON

  test('it should render the text and icon provided', async function (assert) {
    await render(
      <template>
        <HdsPopoverPrimitive as |PP|>
          <HdsRichTooltipToggle
            @text="test"
            @icon="info"
            @setupPrimitiveToggle={{PP.setupPrimitiveToggle}}
            @popoverId="foo"
          />
        </HdsPopoverPrimitive>
      </template>,
    );
    assert.dom('.hds-rich-tooltip__toggle-text').hasText('test');
    assert.dom('.hds-rich-tooltip__toggle-icon.hds-icon-info').exists();
  });
  test('it should render only the text provided', async function (assert) {
    await render(
      <template>
        <HdsPopoverPrimitive as |PP|>
          <HdsRichTooltipToggle
            @text="test"
            @setupPrimitiveToggle={{PP.setupPrimitiveToggle}}
            @popoverId="foo"
          />
        </HdsPopoverPrimitive>
      </template>,
    );
    assert.dom('.hds-rich-tooltip__toggle-text').hasText('test');
    assert.dom('.hds-rich-tooltip__toggle-icon').doesNotExist();
  });
  test('it should render only the icon provided (in the leading position by default)', async function (assert) {
    await render(
      <template>
        <HdsPopoverPrimitive as |PP|>
          <HdsRichTooltipToggle
            @icon="info"
            @setupPrimitiveToggle={{PP.setupPrimitiveToggle}}
            @popoverId="foo"
          />
        </HdsPopoverPrimitive>
      </template>,
    );
    assert.dom('.hds-rich-tooltip__toggle-icon:first-child').exists();
    assert.dom('.hds-rich-tooltip__toggle-text').doesNotExist();
  });
  test('it should render the icon in the trailing position if @iconPosition is set to trailing', async function (assert) {
    await render(
      <template>
        <HdsPopoverPrimitive as |PP|>
          <HdsRichTooltipToggle
            @icon="info"
            @iconPosition="trailing"
            @setupPrimitiveToggle={{PP.setupPrimitiveToggle}}
            @popoverId="foo"
          />
        </HdsPopoverPrimitive>
      </template>,
    );
    assert.dom('.hds-rich-tooltip__toggle-icon:last-child').exists();
    assert.dom('.hds-rich-tooltip__toggle-text').doesNotExist();
  });

  // YIELD

  test('it should yield the content provided', async function (assert) {
    await render(
      <template>
        <HdsPopoverPrimitive as |PP|>
          <HdsRichTooltipToggle
            @setupPrimitiveToggle={{PP.setupPrimitiveToggle}}
            @popoverId="foo"
          >
            Lorem
            <strong>ipsum</strong>
            dolor
          </HdsRichTooltipToggle>
        </HdsPopoverPrimitive>
      </template>,
    );
    assert.dom('.hds-rich-tooltip__toggle').exists();
    assert.dom('.hds-rich-tooltip__toggle').hasText('Lorem ipsum dolor');
    assert.dom('.hds-rich-tooltip__toggle strong').hasText('ipsum');
  });

  // DISPLAY

  test('it should render the element as block by default', async function (assert) {
    await render(
      <template>
        <HdsPopoverPrimitive as |PP|>
          <HdsRichTooltipToggle
            @icon="info"
            @setupPrimitiveToggle={{PP.setupPrimitiveToggle}}
            @popoverId="foo"
          />
        </HdsPopoverPrimitive>
      </template>,
    );
    assert.dom('.hds-rich-tooltip__toggle--is-block').exists();
    assert
      .dom('.hds-rich-tooltip__toggle-icon')
      .doesNotHaveClass('hds-icon--is-inline');
  });
  test('it should render the element as inline if `@isInline` is `true`', async function (assert) {
    await render(
      <template>
        <HdsPopoverPrimitive as |PP|>
          <HdsRichTooltipToggle
            @isInline={{true}}
            @icon="info"
            @setupPrimitiveToggle={{PP.setupPrimitiveToggle}}
            @popoverId="foo"
          />
        </HdsPopoverPrimitive>
      </template>,
    );
    assert.dom('.hds-rich-tooltip__toggle--is-inline').exists();
    assert
      .dom('.hds-rich-tooltip__toggle-icon')
      .hasClass('hds-icon--is-inline');
  });

  // SIZE

  test('it should render the element with @text without sizing classes by default if no @size prop is declared', async function (assert) {
    await render(
      <template>
        <HdsPopoverPrimitive as |PP|>
          <HdsRichTooltipToggle
            @text="test"
            @setupPrimitiveToggle={{PP.setupPrimitiveToggle}}
            @popoverId="foo"
          />
        </HdsPopoverPrimitive>
      </template>,
    );
    assert.dom('[class*="hds-rich-tooltip__toggle--size-"]').doesNotExist();
  });
  test('it should render the correct CSS size class if the @size prop is declared', async function (assert) {
    await render(
      <template>
        <HdsPopoverPrimitive as |PP|>
          <HdsRichTooltipToggle
            @text="test"
            @size="large"
            @setupPrimitiveToggle={{PP.setupPrimitiveToggle}}
            @popoverId="foo"
          />
        </HdsPopoverPrimitive>
      </template>,
    );
    assert
      .dom('.hds-rich-tooltip__toggle')
      .hasClass('hds-rich-tooltip__toggle--size-large');
  });
  test('it should render the element with yielded content without sizing classes even if the @size prop is declared', async function (assert) {
    await render(
      <template>
        <HdsPopoverPrimitive as |PP|>
          <HdsRichTooltipToggle
            @size="large"
            @setupPrimitiveToggle={{PP.setupPrimitiveToggle}}
            @popoverId="foo"
          >
            test
          </HdsRichTooltipToggle>
        </HdsPopoverPrimitive>
      </template>,
    );
    assert.dom('[class*="hds-rich-tooltip__toggle--size-"]').doesNotExist();
  });

  // ATTRIBUTES

  test('it should have a set of attributes based on the arguments provided', async function (assert) {
    await render(
      <template>
        <HdsPopoverPrimitive as |PP|>
          <HdsRichTooltipToggle
            @popoverId="popoverId"
            @isOpen={{true}}
            @setupPrimitiveToggle={{PP.setupPrimitiveToggle}}
          />
        </HdsPopoverPrimitive>
      </template>,
    );
    assert.dom('.hds-rich-tooltip__toggle').hasAttribute('type', 'button');
    assert.dom('.hds-rich-tooltip__toggle').hasAria('describedby', 'popoverId');
    assert.dom('.hds-rich-tooltip__toggle').hasAria('expanded', 'true');
  });

  // ASSERTIONS

  test('it should throw an assertion if an incorrect value for @iconPosition is provided', async function (assert) {
    const errorMessage =
      '@iconPosition for "Hds::RichTooltip::Toggle" must be one of the following: leading, trailing; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      <template>
        <HdsPopoverPrimitive as |PP|>
          <HdsRichTooltipToggle
            @icon="info"
            {{! @glint-expect-error - testing invalid component usage }}
            @iconPosition="foo"
            @setupPrimitiveToggle={{PP.setupPrimitiveToggle}}
            @popoverId="foo"
          />
        </HdsPopoverPrimitive>
      </template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if an incorrect value for @size is provided', async function (assert) {
    const errorMessage =
      '@size for "Hds::RichTooltip::Toggle" must be one of the following: small, medium, large; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      <template>
        <HdsPopoverPrimitive as |PP|>
          <HdsRichTooltipToggle
            @text="test"
            {{! @glint-expect-error - testing invalid component usage }}
            @size="foo"
            @setupPrimitiveToggle={{PP.setupPrimitiveToggle}}
            @popoverId="foo"
          />
        </HdsPopoverPrimitive>
      </template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
