/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';

import { HdsThemeContext } from '@hashicorp/design-system-components/components';

import {
  CONTEXTUAL_THEMES,
  CONTEXTUAL_MODES,
} from '@hashicorp/design-system-components/components/hds/theme-context/index';

module('Integration | Component | hds/theme-context/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template>
        <HdsThemeContext @context="light" id="test-theme-context" />
      </template>,
    );
    assert.dom('#test-theme-context').hasClass('hds-theme-context');
  });

  // CONTEXT - THEMES

  CONTEXTUAL_THEMES.forEach((context) => {
    test(`it should render the correct CSS "theme" class for "${context}" context`, async function (assert) {
      await render(
        <template>
          <HdsThemeContext @context={{context}} id="test-theme-context" />
        </template>,
      );
      assert.dom('#test-theme-context').hasClass(`hds-theme-${context}`);
    });
  });

  // CONTEXT - MODES

  CONTEXTUAL_MODES.forEach((context) => {
    test(`it should render the correct CSS "mode" class for "${context}" context`, async function (assert) {
      await render(
        <template>
          <HdsThemeContext @context={{context}} id="test-theme-context" />
        </template>,
      );
      assert.dom('#test-theme-context').hasClass(`hds-mode-${context}`);
    });
  });

  // YIELDED CONTENT

  test('it correctly yields content passed in the default block', async function (assert) {
    await render(
      <template>
        <HdsThemeContext @context="light" id="test-theme-context">
          <p id="test-content">This is yielded content</p>
        </HdsThemeContext>
      </template>,
    );
    assert.dom('#test-content').exists();
    assert.dom('#test-content').hasText('This is yielded content');
    assert.dom('#test-theme-context #test-content').exists();
  });

  // ASSERTIONS

  test('it should throw an assertion if an incorrect value for @context is provided', async function (assert) {
    const errorMessage =
      '@context for "Hds::ThemeContext" must be one of the following: default, system, light, dark, cds-g0, cds-g10, cds-g90, cds-g100; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      <template>
        {{! @glint-expect-error - testing invalid component usage }}
        <HdsThemeContext @context="foo" />
      </template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
