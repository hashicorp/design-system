/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/dropdown/toggle/button',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.afterEach(() => {
      resetOnerror();
    });

    // notice: "toggle-button" is a wrapper around the "hds::button" so we test only very specific things

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::Toggle::Button @text="toggle text" id="test-toggle-button" />`
      );
      assert.dom('#test-toggle-button').hasClass('hds-dropdown-toggle-button');
    });

    // TEXT

    test('it should render the text passed as @text prop', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::Toggle::Button @text="toggle text" id="test-toggle-button" />`
      );
      assert.dom('#test-toggle-button').hasText('toggle text');
    });

    // CHEVRON

    test('it should render the chevron "down" by default', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::Toggle::Button @text="text toggle" id="test-toggle-button" />`
      );
      assert.dom('.flight-icon.flight-icon-chevron-down').exists();
    });

    // ICON

    test('it should render an icon if @icon is defined', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::Toggle::Button @text="text toggle" @icon="hexagon" />`
      );
      assert.dom('.flight-icon.flight-icon-hexagon').exists();
    });

    // BADGE

    test('it should render a badge if @badge is defined', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::Toggle::Button @text="Lorem ipsum" @badge="badge" id="test-toggle-button" />`
      );
      assert
        .dom('#test-toggle-button .hds-dropdown-toggle-button__badge')
        .hasText('badge');
      assert
        .dom('.hds-dropdown-toggle-button__badge .flight-icon')
        .doesNotExist();
    });
    test('it should render a badge with icon if @badge and @badgeIcon is defined', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::Toggle::Button @text="Lorem ipsum" @badge="badge" @badgeIcon="hexagon" id="test-toggle-button" />`
      );
      assert
        .dom('#test-toggle-button .hds-dropdown-toggle-button__badge')
        .hasText('badge');
      assert
        .dom(
          '.hds-dropdown-toggle-button__badge .flight-icon.flight-icon-hexagon'
        )
        .exists();
    });

    // COUNT

    test('it should render a badge count if @count is defined', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::Toggle::Button @text="Lorem ipsum" @count="3" id="test-toggle-button" />`
      );
      assert
        .dom('#test-toggle-button .hds-dropdown-toggle-button__count')
        .hasText('3');
    });

    // COLOR

    test('it should render the primary color as the default if no color is declared', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::Toggle::Button @text="text toggle" id="test-toggle-button" />`
      );
      assert
        .dom('#test-toggle-button')
        .hasClass('hds-dropdown-toggle-button--color-primary');
    });
    test('it should render the correct CSS color class if the @color prop is declared', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::Toggle::Button @text="text toggle" @color="secondary" id="test-toggle-button" />`
      );
      assert
        .dom('#test-toggle-button')
        .hasClass('hds-dropdown-toggle-button--color-secondary');
    });

    // SIZE

    test('it should render the medium size as the default if no size is declared', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::Toggle::Button @text="text toggle" id="test-toggle-button" />`
      );
      assert
        .dom('#test-toggle-button')
        .hasClass('hds-dropdown-toggle-button--size-medium');
    });
    test('it should render the correct CSS size class if the @size prop is declared', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::Toggle::Button @text="text toggle" @size="small" id="test-toggle-button" />`
      );
      assert
        .dom('#test-toggle-button')
        .hasClass('hds-dropdown-toggle-button--size-small');
    });

    // A11Y

    test('it should render with the correct aria-expanded attribute on the toggle element', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::Toggle::Button @text="text toggle" @isOpen={{true}} id="test-toggle-button" />`
      );
      assert.dom('#test-toggle-button').hasAttribute('aria-expanded', 'true');
    });

    // ASSERTIONS

    test('it should throw an assertion if @text is not defined', async function (assert) {
      const errorMessage = `@text for "Hds::Dropdown::Toggle::Button" must have a valid value`;
      assert.expect(2);
      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });
      await render(
        hbs`<Hds::Dropdown::Toggle::Button id="test-toggle-button" />`
      );
      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });
    test('it should throw an assertion if an incorrect value for @color is provided', async function (assert) {
      const errorMessage =
        '@color for "Hds::Dropdown::Toggle::Button" must be one of the following: primary, secondary; received: foo';
      assert.expect(2);
      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });
      await render(
        hbs`<Hds::Dropdown::Toggle::Button @text="text toggle" @color="foo" id="test-toggle-button" />`
      );
      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });
    test('it should throw an assertion if an incorrect value for @size is provided', async function (assert) {
      const errorMessage =
        '@size for "Hds::Dropdown::Toggle::Button" must be one of the following: small, medium; received: foo';
      assert.expect(2);
      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });
      await render(
        hbs`<Hds::Dropdown::Toggle::Button @text="text toggle" @size="foo" />`
      );
      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });
  }
);
