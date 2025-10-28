/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { HdsFormSectionMultiFieldGroupItem } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module(
  'Integration | Component | hds/form/section/multi-field-group/item/index',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsFormSectionMultiFieldGroupItem
            id="test-form-section-multi-field-group-item"
          />
        </template>,
      );
      assert
        .dom('#test-form-section-multi-field-group-item')
        .hasClass('hds-form__section-multi-field-group-item');
    });

    // OPTIONS

    // width
    test('it should set an inline style for the width custom property', async function (assert) {
      await render(
        <template>
          <HdsFormSectionMultiFieldGroupItem
            @width="8em"
            id="test-form-section-multi-field-group-item"
          />
        </template>,
      );
      assert.dom('#test-form-section-multi-field-group-item').hasStyle(
        {
          '--hds-form-section-multi-field-group-item-width': '8em',
        },
        'Inline style for width is set',
      );
    });

    // CONTENT

    // It should yield the passed in content
    test('it should yield the passed in content', async function (assert) {
      await render(
        <template>
          <HdsFormSectionMultiFieldGroupItem
            id="test-form-section-multi-field-group-item"
          >
            <span class="test-content">Test Content</span>
          </HdsFormSectionMultiFieldGroupItem>
        </template>,
      );
      assert
        .dom('#test-form-section-multi-field-group-item .test-content')
        .exists('The content is yielded correctly')
        .hasText('Test Content');
    });
  },
);
