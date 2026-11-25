/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { HdsFormVisibilityToggle } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module(
  'Integration | Component | hds/form/visibility-toggle/index',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsFormVisibilityToggle id="test-visibility-toggle" />
        </template>,
      );
      assert
        .dom('#test-visibility-toggle')
        .hasClass('hds-form-visibility-toggle');
    });

    test('it should render the default icon', async function (assert) {
      await render(
        <template>
          <HdsFormVisibilityToggle id="test-visibility-toggle" />
        </template>,
      );
      assert
        .dom('#test-visibility-toggle .hds-icon')
        .hasClass('hds-icon-eye-off');
    });

    test('it should render correct icon when `@isMasked` is `true`', async function (assert) {
      await render(
        <template>
          <HdsFormVisibilityToggle
            @isMasked={{true}}
            id="test-visibility-toggle"
          />
        </template>,
      );
      assert.dom('#test-visibility-toggle .hds-icon').hasClass('hds-icon-eye');
    });

    // A11Y

    test('it should render a custom `aria-label` when `@ariaLabel` is provided', async function (assert) {
      await render(
        <template>
          <HdsFormVisibilityToggle
            @ariaLabel="Toggle custom content"
            id="test-visibility-toggle"
          />
        </template>,
      );
      assert
        .dom('#test-visibility-toggle')
        .hasAttribute('aria-label', 'Toggle custom content');
    });

    test('it should have a fallback `aria-label` when `@ariaLabel` is not provided', async function (assert) {
      await render(
        <template>
          <HdsFormVisibilityToggle id="test-visibility-toggle" />
        </template>,
      );
      assert
        .dom('#test-visibility-toggle')
        .hasAttribute('aria-label', 'Toggle content visibility');
    });

    test('it should render a custom value when `@isMasked` is `true` and `@ariaMessageText` is provided', async function (assert) {
      await render(
        <template>
          <HdsFormVisibilityToggle
            @isMasked={{true}}
            @ariaMessageText="My content is hidden"
            id="test-visibility-toggle"
          />
        </template>,
      );
      assert
        .dom('#test-visibility-toggle .sr-only')
        .hasText('My content is hidden');
    });

    test('it should render the default `sr-only` value when `@isMasked` is not provided', async function (assert) {
      await render(
        <template>
          <HdsFormVisibilityToggle
            @isMasked={{true}}
            id="test-visibility-toggle"
          />
        </template>,
      );
      assert
        .dom('#test-visibility-toggle .sr-only')
        .hasText('Content is hidden');
    });

    test('it should render a custom value when `@isMasked` is `false` and `@ariaMessageTextWhenVisible` is provided', async function (assert) {
      await render(
        <template>
          <HdsFormVisibilityToggle
            @isMasked={{false}}
            @ariaMessageTextWhenVisible="My content is visible"
            id="test-visibility-toggle"
          />
        </template>,
      );
      assert
        .dom('#test-visibility-toggle .sr-only')
        .hasText('My content is visible');
    });

    test('it should render the default `sr-only` value when `@isMasked` is `false`', async function (assert) {
      await render(
        <template>
          <HdsFormVisibilityToggle
            @isMasked={{false}}
            id="test-visibility-toggle"
          />
        </template>,
      );
      assert
        .dom('#test-visibility-toggle .sr-only')
        .hasText('Content is visible');
    });
  },
);
