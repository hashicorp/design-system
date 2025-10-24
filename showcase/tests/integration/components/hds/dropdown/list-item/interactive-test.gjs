/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import Interactive from '@hashicorp/design-system-components/components/hds/dropdown/list-item/interactive';

module(
  'Integration | Component | hds/dropdown/list-item/interactive',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.afterEach(() => {
      resetOnerror();
    });

    // 🚨 NOTICE 🚨:
    // unlike other components, the `...attributes` spread is not applied to the top element, but to the `<button>/<a>` children,
    // so we can't use the DOM "id" to target the component but we have to rely on the class name

    test('it should render the component as a <li> element with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <Interactive>
            interactive
          </Interactive>
        </template>,
      );
      assert.dom('.hds-dropdown-list-item').hasTagName('li');
      assert
        .dom('.hds-dropdown-list-item')
        .hasClass('hds-dropdown-list-item--variant-interactive');
    });

    // ELEMENTS

    test('it should render the "list-item" with a button by default"', async function (assert) {
      await render(
        <template>
          <Interactive>interactive</Interactive>
        </template>,
      );
      assert.dom('.hds-dropdown-list-item > button').exists();
    });
    test('it should render the "list-item" with a link if it has a @route parameter"', async function (assert) {
      await render(
        <template>
          <Interactive @route="index">
            interactive
          </Interactive>
        </template>,
      );
      assert.dom('.hds-dropdown-list-item > a').exists();
    });
    test('it should render the "list-item" with a link if it has a @href argument"', async function (assert) {
      await render(
        <template>
          <Interactive @href="#">interactive</Interactive>
        </template>,
      );
      assert.dom('.hds-dropdown-list-item > a').exists();
    });

    // COLOR

    test('it should render the "action" color as the default if no color is declared"', async function (assert) {
      await render(
        <template>
          <Interactive>interactive</Interactive>
        </template>,
      );
      assert
        .dom('.hds-dropdown-list-item')
        .hasClass('hds-dropdown-list-item--color-action');
    });
    test('it should render the correct CSS color class if the @color prop is declared', async function (assert) {
      await render(
        <template>
          <Interactive @color="critical" @icon="trash">
            interactive
          </Interactive>
        </template>,
      );
      assert
        .dom('.hds-dropdown-list-item')
        .hasClass('hds-dropdown-list-item--color-critical');
    });

    // ICONS

    test('if an `@icon` is declared a leading icon should be rendered', async function (assert) {
      await render(
        <template>
          <Interactive @icon="clipboard-copy">interactive</Interactive>
        </template>,
      );
      assert.dom('.hds-icon.hds-icon-clipboard-copy').exists();
    });
    test('if an `@trailingIcon` is declared a trailing icon should be rendered', async function (assert) {
      await render(
        <template>
          <Interactive @trailingIcon="external-link">
            interactive
          </Interactive>
        </template>,
      );
      assert.dom('.hds-icon.hds-icon-external-link').exists();
    });
    test('if both an `@icon` and an `@trailingIcon` are declared both the leading and trailing icons should be rendered', async function (assert) {
      await render(
        <template>
          <Interactive
            @icon="clipboard-copy"
            @trailingIcon="external-link"
          >interactive</Interactive>
        </template>,
      );
      assert.dom('.hds-icon.hds-icon-clipboard-copy').exists();
      assert.dom('.hds-icon.hds-icon-external-link').exists();
    });

    // CONTENT

    test('it should render the yielded content', async function (assert) {
      await render(
        <template>
          <Interactive>
            interactive
          </Interactive>
        </template>,
      );
      assert.dom('.hds-dropdown-list-item').hasText('interactive');
    });

    // ASSERTIONS

    test('it should throw an assertion if an incorrect value for @color is provided', async function (assert) {
      const errorMessage =
        '@color for "Hds::Dropdown::ListItem::Interactive" must be one of the following: action, critical; received: foo';
      assert.expect(2);
      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });
      await render(
        <template>
          <Interactive @color="foo">
            interactive text
          </Interactive>
        </template>,
      );
      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });

    // CONTEXTUAL COMPONENTS

    test('it renders the contextual components', async function (assert) {
      await render(
        <template>
          <Interactive as |I|>
            <I.Badge @text="Badge" />
          </Interactive>
        </template>,
      );
      assert
        .dom('.hds-badge')
        .hasText('Badge')
        .hasClass('hds-badge--size-small');
    });
    test('it does not render the contextual components if not provided', async function (assert) {
      await render(
        <template>
          <Interactive>
            interactive
          </Interactive>
        </template>,
      );
      assert.dom('.hds-badge').doesNotExist();
    });
  },
);
