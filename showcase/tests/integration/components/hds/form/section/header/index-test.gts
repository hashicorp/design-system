/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { HdsFormSectionHeader } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module(
  'Integration | Component | hds/form/section/header/index',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsFormSectionHeader id="test-form-section-header" />
        </template>,
      );
      assert
        .dom('#test-form-section-header')
        .hasClass('hds-form__section-header');
    });

    // CONTENT

    test('it should yield the Title and Description children', async function (assert) {
      await render(
        <template>
          <HdsFormSectionHeader id="test-form-section-header" as |Header|>
            <Header.Title /><Header.Description />
          </HdsFormSectionHeader>
        </template>,
      );
      assert
        .dom('#test-form-section-header > .hds-form__header-title')
        .exists('Title is yielded');
      assert
        .dom('#test-form-section-header > .hds-form__header-description')
        .exists('Description is yielded');
    });
  },
);
