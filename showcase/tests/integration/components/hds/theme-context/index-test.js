/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/theme-context/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::ThemeContext @context="light" id="test-theme-context" />`,
    );
    assert.dom('#test-theme-context').hasClass('hds-theme-context');
  });

  // CONTEXT - THEMES

  test('it should render the correct CSS theme class for "default" context', async function (assert) {
    await render(
      hbs`<Hds::ThemeContext @context="default" id="test-theme-context" />`,
    );
    assert.dom('#test-theme-context').hasClass('hds-theme-context');
    assert.dom('#test-theme-context').hasClass('hds-theme-default');
  });

  test('it should render the correct CSS theme class for "system" context', async function (assert) {
    await render(
      hbs`<Hds::ThemeContext @context="system" id="test-theme-context" />`,
    );
    assert.dom('#test-theme-context').hasClass('hds-theme-context');
    assert.dom('#test-theme-context').hasClass('hds-theme-system');
  });

  test('it should render the correct CSS theme class for "light" context', async function (assert) {
    await render(
      hbs`<Hds::ThemeContext @context="light" id="test-theme-context" />`,
    );
    assert.dom('#test-theme-context').hasClass('hds-theme-context');
    assert.dom('#test-theme-context').hasClass('hds-theme-light');
  });

  test('it should render the correct CSS theme class for "dark" context', async function (assert) {
    await render(
      hbs`<Hds::ThemeContext @context="dark" id="test-theme-context" />`,
    );
    assert.dom('#test-theme-context').hasClass('hds-theme-context');
    assert.dom('#test-theme-context').hasClass('hds-theme-dark');
  });

  // CONTEXT - MODES (LIGHT)

  test('it should render the correct CSS mode class for "cds-g0" context', async function (assert) {
    await render(
      hbs`<Hds::ThemeContext @context="cds-g0" id="test-theme-context" />`,
    );
    assert.dom('#test-theme-context').hasClass('hds-theme-context');
    assert.dom('#test-theme-context').hasClass('hds-mode-cds-g0');
    assert.dom('#test-theme-context').doesNotHaveClass(/hds-theme-/);
  });

  test('it should render the correct CSS mode class for "cds-g10" context', async function (assert) {
    await render(
      hbs`<Hds::ThemeContext @context="cds-g10" id="test-theme-context" />`,
    );
    assert.dom('#test-theme-context').hasClass('hds-theme-context');
    assert.dom('#test-theme-context').hasClass('hds-mode-cds-g10');
    assert.dom('#test-theme-context').doesNotHaveClass(/hds-theme-/);
  });

  // CONTEXT - MODES (DARK)

  test('it should render the correct CSS mode class for "cds-g90" context', async function (assert) {
    await render(
      hbs`<Hds::ThemeContext @context="cds-g90" id="test-theme-context" />`,
    );
    assert.dom('#test-theme-context').hasClass('hds-theme-context');
    assert.dom('#test-theme-context').hasClass('hds-mode-cds-g90');
    assert.dom('#test-theme-context').doesNotHaveClass(/hds-theme-/);
  });

  test('it should render the correct CSS mode class for "cds-g100" context', async function (assert) {
    await render(
      hbs`<Hds::ThemeContext @context="cds-g100" id="test-theme-context" />`,
    );
    assert.dom('#test-theme-context').hasClass('hds-theme-context');
    assert.dom('#test-theme-context').hasClass('hds-mode-cds-g100');
    assert.dom('#test-theme-context').doesNotHaveClass(/hds-theme-/);
  });

  // YIELDED CONTENT

  test('it correctly yields content passed in the default block', async function (assert) {
    await render(hbs`
      <Hds::ThemeContext @context="light" id="test-theme-context">
        <p id="test-content">This is yielded content</p>
      </Hds::ThemeContext>
    `);
    assert.dom('#test-content').exists();
    assert.dom('#test-content').hasText('This is yielded content');
    assert.dom('#test-theme-context #test-content').exists();
  });

  // ATTRIBUTES SPREADING

  test('it should support splattributes', async function (assert) {
    await render(hbs`
      <Hds::ThemeContext @context="light" id="test-theme-context" data-test-custom-attribute="custom-value" />
    `);
    assert
      .dom('#test-theme-context')
      .hasAttribute('data-test-custom-attribute', 'custom-value');
  });

  // ASSERTIONS

  test('it should throw an assertion if an incorrect value for @context is provided', async function (assert) {
    const errorMessage =
      '@context for "Hds::ThemeContext" must be one of the following: default, system, light, dark, cds-g0, cds-g10, cds-g90, cds-g100; received: invalid';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      hbs`<Hds::ThemeContext @context="invalid" id="test-theme-context" />`,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
