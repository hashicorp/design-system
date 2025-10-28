/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { HdsDropdownListItemGeneric } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module(
  'Integration | Component | hds/dropdown/list-item/generic',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component as a <li> element with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsDropdownListItemGeneric id="test-list-item-generic" />
        </template>,
      );
      assert.dom('#test-list-item-generic').hasTagName('li');
      assert.dom('#test-list-item-generic').hasClass('hds-dropdown-list-item');
      assert
        .dom('#test-list-item-generic')
        .hasClass('hds-dropdown-list-item--variant-generic');
    });

    // CONTENT

    test('it should render the yielded content', async function (assert) {
      await render(
        <template>
          <HdsDropdownListItemGeneric><pre
            >test</pre></HdsDropdownListItemGeneric>
        </template>,
      );
      assert.dom('.hds-dropdown-list-item--variant-generic > pre').exists();
      assert
        .dom('.hds-dropdown-list-item--variant-generic > pre')
        .hasText('test');
    });
  },
);
