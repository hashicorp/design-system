/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { modifier } from 'ember-modifier';
import { render, resetOnerror, setupOnerror, find } from '@ember/test-helpers';

import { HdsRichTooltipBubble } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/rich-tooltip/bubble', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template>
        {{! @glint-expect-error - @setupPrimitivePopper is a required arg, but we are not passing to test the bubble in isolation }}
        <HdsRichTooltipBubble
          @popoverId="test-rich-tooltip-bubble"
          @arrowId="test-rich-tooltip-bubble-arrow"
        />
      </template>,
    );
    assert
      .dom('#test-rich-tooltip-bubble')
      .hasClass('hds-rich-tooltip__bubble');
  });

  // CONTENT

  test('it should render some elements but not the yielded content by default', async function (assert) {
    await render(
      <template>
        {{! @glint-expect-error - @setupPrimitivePopper is a required arg, but we are not passing to test the bubble in isolation }}
        <HdsRichTooltipBubble
          @popoverId="test-rich-tooltip-bubble"
          @arrowId="test-rich-tooltip-bubble-arrow"
        >
          <div id="test-rich-tooltip-bubble-content" />
        </HdsRichTooltipBubble>
      </template>,
    );
    assert.dom('.hds-rich-tooltip__bubble').exists();
    assert
      .dom('.hds-rich-tooltip__bubble')
      .hasAttribute('id', 'test-rich-tooltip-bubble');
    assert.dom('.hds-rich-tooltip__bubble-arrow').exists();
    assert
      .dom('.hds-rich-tooltip__bubble-arrow')
      .hasAttribute('id', 'test-rich-tooltip-bubble-arrow');
    assert.dom('.hds-rich-tooltip__bubble-inner-content').doesNotExist();
    assert.dom('#test-rich-tooltip-bubble-content').doesNotExist();
  });

  test('it should render the inner content if `@isOpen` is `true`', async function (assert) {
    await render(
      <template>
        {{! @glint-expect-error - @setupPrimitivePopper is a required arg, but we are not passing to test the bubble in isolation }}
        <HdsRichTooltipBubble
          @isOpen={{true}}
          @popoverId="test-rich-tooltip-bubble"
          @arrowId="test-rich-tooltip-bubble-arrow"
        >
          <div id="test-rich-tooltip-bubble-content" />
        </HdsRichTooltipBubble>
      </template>,
    );
    assert.dom('.hds-rich-tooltip__bubble').exists();
    assert.dom('.hds-rich-tooltip__bubble-arrow').exists();
    assert.dom('.hds-rich-tooltip__bubble-inner-content').exists();
    assert
      .dom(
        '.hds-rich-tooltip__bubble-inner-content > #test-rich-tooltip-bubble-content',
      )
      .exists();
  });

  // WIDTH/HEIGHT

  test('it should render the container with the provided width/height', async function (assert) {
    await render(
      <template>
        {{! @glint-expect-error - @setupPrimitivePopper is a required arg, but we are not passing to test the bubble in isolation }}
        <HdsRichTooltipBubble
          @width="123px"
          @height="456px"
          @isOpen={{true}}
          @popoverId="test-rich-tooltip-bubble"
          @arrowId="test-rich-tooltip-bubble-arrow"
        />
      </template>,
    );
    const container = find('.hds-rich-tooltip__bubble');
    const rect = container?.getBoundingClientRect();
    // we need to divide by 2 because ember testing scales the `#ember-testing` container by a factor 0.5;
    assert.deepEqual(rect?.width, 123 / 2);
    assert.deepEqual(rect?.height, 456 / 2);
  });

  // ANCHORED POSITION OPTIONS
  // here we're testing the anchoredPositionOptions getter using a fake modifier

  test('it should return the default values for the `anchoredPositionOptions` object', async function (assert) {
    let anchoredPositionOptions;
    const fakeSetupPrimitivePopover = modifier(
      (_element, _positional, named) => {
        anchoredPositionOptions = named;
      },
    );

    await render(
      <template>
        <HdsRichTooltipBubble
          @popoverId="test-rich-tooltip-bubble"
          @arrowId="test-rich-tooltip-arrow"
          @setupPrimitivePopover={{fakeSetupPrimitivePopover}}
        />
      </template>,
    );
    assert.deepEqual(anchoredPositionOptions, {
      anchoredPositionOptions: {
        arrowPadding: 12,
        arrowSelector: '#test-rich-tooltip-arrow',
        enableCollisionDetection: true,
        offsetOptions: 12,
        placement: 'bottom',
      },
    });
  });
  test('it should return the values provided via arguments for the `anchoredPositionOptions` object', async function (assert) {
    let anchoredPositionOptions;
    const fakeSetupPrimitivePopover = modifier(
      (_element, _positional, named) => {
        anchoredPositionOptions = named;
      },
    );

    await render(
      <template>
        <HdsRichTooltipBubble
          @popoverId="test-rich-tooltip-bubble"
          @arrowId="test-rich-tooltip-arrow"
          @placement="top-start"
          @offset={{123}}
          @enableCollisionDetection={{false}}
          @setupPrimitivePopover={{fakeSetupPrimitivePopover}}
        />
      </template>,
    );
    assert.deepEqual(anchoredPositionOptions, {
      anchoredPositionOptions: {
        arrowPadding: 12,
        arrowSelector: '#test-rich-tooltip-arrow',
        enableCollisionDetection: false,
        offsetOptions: 123,
        placement: 'top-start',
      },
    });
  });

  // ATTRIBUTES

  test('it should assign the ID value provided with @popoverId', async function (assert) {
    await render(
      <template>
        {{! @glint-expect-error - @setupPrimitivePopper is a required arg, but we are not passing to test the bubble in isolation }}
        <HdsRichTooltipBubble
          @popoverId="test-rich-tooltip-bubble"
          @arrowId="test-rich-tooltip-bubble-arrow"
        />
      </template>,
    );
    assert
      .dom('.hds-rich-tooltip__bubble')
      .hasAttribute('id', 'test-rich-tooltip-bubble');
  });
  test('it should not override the ID value provided with @popoverId with a passed in id attribute', async function (assert) {
    await render(
      <template>
        {{! @glint-expect-error - @setupPrimitivePopper is a required arg, but we are not passing to test the bubble in isolation }}
        <HdsRichTooltipBubble
          @popoverId="test-rich-tooltip-bubble"
          @arrowId="test-rich-tooltip-bubble-arrow"
          id="the-other-id"
        />
      </template>,
    );
    assert
      .dom('.hds-rich-tooltip__bubble')
      .hasAttribute('id', 'test-rich-tooltip-bubble');
  });
  test('it should have a set of attributes based on the arguments provided', async function (assert) {
    await render(
      <template>
        {{! @glint-expect-error - @setupPrimitivePopper is a required arg, but we are not passing to test the bubble in isolation }}
        <HdsRichTooltipBubble
          @popoverId="popoverId"
          @arrowId="test-rich-tooltip-bubble-arrow"
          @isOpen={{true}}
        />
      </template>,
    );
    assert.dom('.hds-rich-tooltip__bubble').hasAttribute('id', 'popoverId');
    assert.dom('.hds-rich-tooltip__bubble').hasAttribute('tabindex', '-1');
    assert.dom('.hds-rich-tooltip__bubble').hasAttribute('role', 'tooltip');
    assert.dom('.hds-rich-tooltip__bubble').doesNotHaveAria('hidden');

    await render(
      <template>
        {{! @glint-expect-error - @setupPrimitivePopper is a required arg, but we are not passing to test the bubble in isolation }}
        <HdsRichTooltipBubble
          @popoverId="test-rich-tooltip-bubble"
          @arrowId="test-rich-tooltip-bubble-arrow"
        />
      </template>,
    );
    assert.dom('.hds-rich-tooltip__bubble').hasAria('hidden', '');
  });

  // ASSERTIONS

  test('it should throw an assertion if an incorrect value for @placement is provided', async function (assert) {
    // this is used only to trigger the `anchoredPositionOptions` getter
    const fakeSetupPrimitivePopover = modifier(() => {});
    const errorMessage =
      '@placement for "Hds::RichTooltip::Bubble" must be one of the following: top, top-start, top-end, right, right-start, right-end, bottom, bottom-start, bottom-end, left, left-start, left-end; received: foo';
    assert.expect(1);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      <template>
        <HdsRichTooltipBubble
          {{! @glint-expect-error - testing invalid component usage }}
          @placement="foo"
          @setupPrimitivePopover={{fakeSetupPrimitivePopover}}
          @popoverId="test-rich-tooltip-bubble"
          @arrowId="test-rich-tooltip-bubble-arrow"
        />
      </template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
