/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';

import { HdsDropdownListItemTitle } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module(
  'Integration | Component | hds/dropdown/list-item/title',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.afterEach(() => {
      resetOnerror();
    });

    test('it should render the component as a <li> element with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsDropdownListItemTitle @text="title" id="test-list-item-title" />
        </template>,
      );
      assert.dom('#test-list-item-title').hasTagName('li');
      assert.dom('#test-list-item-title').hasClass('hds-dropdown-list-item');
      assert
        .dom('#test-list-item-title')
        .hasClass('hds-dropdown-list-item--variant-title');
    });

    // ASSERTIONS

    test('it should throw an assertion if @text is missing/has no value', async function (assert) {
      const errorMessage =
        '@text for "Hds::Dropdown::ListItem::Title" must have a valid value';
      assert.expect(2);
      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });
      await render(
        <template>
          {{! @glint-expect-error - testing invalid component usage }}
          <HdsDropdownListItemTitle />
        </template>,
      );
      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });
  },
);
