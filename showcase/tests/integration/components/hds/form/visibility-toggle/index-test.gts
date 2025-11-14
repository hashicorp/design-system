/**
 * Copyright (c) HashiCorp, Inc.
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

    test('it should render the default icon, `aria-label` and `sr-live` message', async function (assert) {
      await render(
        <template>
          <HdsFormVisibilityToggle id="test-visibility-toggle" />
        </template>,
      );
      assert
        .dom('#test-visibility-toggle .hds-icon')
        .hasClass('hds-icon-eye-off');
    });

    test('it should render correct icon when `@isVisible` is `true`', async function (assert) {
      await render(
        <template>
          <HdsFormVisibilityToggle
            @isVisible={{true}}
            id="test-visibility-toggle"
          />
        </template>,
      );
      assert.dom('#test-visibility-toggle .hds-icon').hasClass('hds-icon-eye');
    });

    test('it should render `aria-label` and `sr-live` message', async function (assert) {
      await render(
        <template>
          <HdsFormVisibilityToggle
            @ariaLabel="Hide masked content"
            @ariaMessageText="Input content is visible"
            id="test-visibility-toggle"
          />
        </template>,
      );
      assert
        .dom('#test-visibility-toggle')
        .hasAttribute('aria-label', 'Hide masked content');
      assert
        .dom('#test-visibility-toggle .sr-only')
        .hasText('Input content is visible');
    });
  },
);
