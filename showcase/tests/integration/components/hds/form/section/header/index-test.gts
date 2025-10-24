/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import Header from "@hashicorp/design-system-components/components/hds/form/section/header";

module(
  'Integration | Component | hds/form/section/header/index',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template><Header id="test-form-section-header" /></template>,
      );
      assert
        .dom('#test-form-section-header')
        .hasClass('hds-form__section-header');
    });

    // CONTENT

    test('it should yield the Title and Description children', async function (assert) {
      await render(
        <template>
          <Header id="test-form-section-header" as |Header|>
            <Header.Title /><Header.Description />
          </Header>
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
