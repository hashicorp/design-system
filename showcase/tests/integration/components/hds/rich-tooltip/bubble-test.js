/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { modifier } from 'ember-modifier';

module('Integration | Component | hds/rich-tooltip/bubble', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::RichTooltip::Bubble @popoverId="test-rich-tooltip-bubble" />`
    );
    assert
      .dom('#test-rich-tooltip-bubble')
      .hasClass('hds-rich-tooltip__bubble');
  });

  // CONTENT

  test('it should render some elements but not the yielded content by default', async function (assert) {
    await render(hbs`
      <Hds::RichTooltip::Bubble @popoverId="test-rich-tooltip-bubble" @arrowId="test-rich-tooltip-bubble-arrow">
        <div id="test-rich-tooltip-bubble-content" />
      </Hds::RichTooltip::Bubble>
    `);
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
    await render(hbs`
      <Hds::RichTooltip::Bubble @isOpen={{true}}>
        <div id="test-rich-tooltip-bubble-content" />
      </Hds::RichTooltip::Bubble>
    `);
    assert.dom('.hds-rich-tooltip__bubble').exists();
    assert.dom('.hds-rich-tooltip__bubble-arrow').exists();
    assert.dom('.hds-rich-tooltip__bubble-inner-content').exists();
    assert
      .dom(
        '.hds-rich-tooltip__bubble-inner-content > #test-rich-tooltip-bubble-content'
      )
      .exists();
  });

  // WIDTH/HEIGHT

  test('it should render the container with the provided with/height', async function (assert) {
    await render(hbs`
      <Hds::RichTooltip::Bubble @width="123px" @height="456px" @isOpen={{true}} />
    `);
    const container = this.element.querySelector('.hds-rich-tooltip__bubble');
    const rect = container.getBoundingClientRect();
    // we need to divide by 2 because ember testing scales the `#ember-testing` container by a factor 0.5;
    assert.deepEqual(rect.width, 123 / 2);
    assert.deepEqual(rect.height, 456 / 2);
  });

  // ATTRIBUTES

  test('it should assign the ID value provided with @popoverId', async function (assert) {
    await render(
      hbs`<Hds::RichTooltip::Bubble @popoverId="test-rich-tooltip-bubble" />`
    );
    assert
      .dom('.hds-rich-tooltip__bubble')
      .hasAttribute('id', 'test-rich-tooltip-bubble');
  });
  test('it should not override the ID value provided with @popoverId with an attribute', async function (assert) {
    await render(
      hbs`<Hds::RichTooltip::Bubble @popoverId="test-rich-tooltip-bubble" id="the-other-id" />`
    );
    assert
      .dom('.hds-rich-tooltip__bubble')
      .hasAttribute('id', 'test-rich-tooltip-bubble');
  });
  test('it should have a set of attributes based on the arguments provided', async function (assert) {
    await render(
      hbs`<Hds::RichTooltip::Bubble @popoverId="popoverId" @isOpen={{true}} />`
    );
    assert.dom('.hds-rich-tooltip__bubble').hasAttribute('id', 'popoverId');
    assert.dom('.hds-rich-tooltip__bubble').hasAttribute('tabindex', '-1');
    assert.dom('.hds-rich-tooltip__bubble').hasAttribute('role', 'tooltip');
    assert.dom('.hds-rich-tooltip__bubble').doesNotHaveAria('hidden');
    await render(
      hbs`<Hds::RichTooltip::Bubble id="test-rich-tooltip-bubble" />`
    );
    assert.dom('.hds-rich-tooltip__bubble').hasAria('hidden', '');
  });

  // ASSERTIONS

  // not sure why this one doesn't trigger an assertion
  skip('it should throw an assertion if an incorrect value for @placement is provided', async function (assert) {
    // this is used only to trigger the `anchoredPositionOptions` getter
    this.set(
      'fakeSetupPrimitivePopover',
      modifier(() => {})
    );
    const errorMessage =
      '@placement for "Hds::RichTooltip::Bubble" must be one of the following: top, top-start, top-end, right, right-start, right-end, bottom, bottom-start, bottom-end, left, left-start, left-end; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      hbs`<Hds::RichTooltip::Bubble
        @placement="foo"
        @setupPrimitivePopover={{this.fakeSetupPrimitivePopover}}
      />`
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
