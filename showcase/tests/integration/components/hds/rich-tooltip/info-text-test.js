/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/rich-tooltip/toggle/info-text',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.afterEach(() => {
      resetOnerror();
    });

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`<Hds::RichTooltip::Toggle::InfoText id="test-rich-tooltip-toggle-info-text" />`
      );
      assert
        .dom('#test-rich-tooltip-toggle-info-text')
        .hasClass('hds-rich-tooltip__toggle-info-text');
    });

    // ICON

    test('it should not render the icon by default', async function (assert) {
      await render(hbs`<Hds::RichTooltip::Toggle::InfoText />`);
      assert
        .dom('.hds-rich-tooltip__toggle-info-text > .flight-icon')
        .doesNotExist();
    });
    test('it should render the icon in the leading position by default', async function (assert) {
      await render(hbs`<Hds::RichTooltip::Toggle::InfoText @icon="info" />`);
      assert
        .dom('.hds-rich-tooltip__toggle-info-text > .flight-icon:first-child')
        .exists();
    });
    test('it should render the icon in the trailing position if @iconPosition is set to trailing', async function (assert) {
      await render(
        hbs`<Hds::RichTooltip::Toggle::InfoText @icon="info" @iconPosition="trailing" />`
      );
      assert
        .dom('.hds-rich-tooltip__toggle-info-text > .flight-icon:last-child')
        .exists();
    });

    // CONTENT

    test('it should yield the content provided', async function (assert) {
      await render(hbs`
        <Hds::RichTooltip::Toggle::InfoText>
          Lorem <strong>ipsum</strong> dolor
        </Hds::RichTooltip::Toggle::InfoText>
      `);
      assert.dom('.hds-rich-tooltip__toggle-info-text').exists();
      assert.dom('.hds-rich-tooltip__toggle-info-text-decoration').exists();
      assert
        .dom(
          '.hds-rich-tooltip__toggle-info-text .hds-rich-tooltip__toggle-info-text-decoration'
        )
        .hasText('Lorem ipsum dolor');
      assert
        .dom(
          '.hds-rich-tooltip__toggle-info-text .hds-rich-tooltip__toggle-info-text-decoration strong'
        )
        .hasText('ipsum');
    });

    // DISPLAY

    test('it should render the element as block by default', async function (assert) {
      await render(hbs`<Hds::RichTooltip::Toggle::InfoText />`);
      assert.dom('.hds-rich-tooltip__toggle-info-text--is-block').exists();
    });
    test('it should render the element as inline if `@isInline` is `true`', async function (assert) {
      await render(
        hbs`<Hds::RichTooltip::Toggle::InfoText @isInline={{true}} />`
      );
      assert.dom('.hds-rich-tooltip__toggle-info-text--is-inline').exists();
    });

    // SIZE

    test('it should render the element without sizing classes by default if no @size prop is declared', async function (assert) {
      await render(hbs`<Hds::RichTooltip::Toggle::InfoText />`);
      assert
        .dom('[class*="hds-rich-tooltip__toggle-info-text--size-"]')
        .doesNotExist();
    });
    test('it should render the correct CSS size class if the @size prop is declared', async function (assert) {
      await render(hbs`<Hds::RichTooltip::Toggle::InfoText @size="large" />`);
      assert
        .dom('.hds-rich-tooltip__toggle-info-text')
        .hasClass('hds-rich-tooltip__toggle-info-text--size-large');
    });

    // ASSERTIONS

    test('it should throw an assertion if an incorrect value for @iconPosition is provided', async function (assert) {
      const errorMessage =
        '@iconPosition for "Hds::RichTooltip::Toggle::InfoText" must be one of the following: leading, trailing; received: foo';
      assert.expect(2);
      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });
      await render(
        hbs`<Hds::RichTooltip::Toggle::InfoText @icon="info" @iconPosition="foo" />`
      );
      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });
    test('it should throw an assertion if an incorrect value for @size is provided', async function (assert) {
      const errorMessage =
        '@size for "Hds::RichTooltip::Toggle::InfoText" must be one of the following: small, medium, large; received: foo';
      assert.expect(2);
      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });
      await render(hbs`<Hds::RichTooltip::Toggle::InfoText @size="foo" />`);
      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });
  }
);
