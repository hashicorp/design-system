/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, resetOnerror } from '@ember/test-helpers';
import Description from "@hashicorp/design-system-components/components/hds/dialog-primitive/description";

module(
  'Integration | Component | hds/dialog-primitive/description',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.afterEach(() => {
      resetOnerror();
    });

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
        <Description id="test-description">
          Description
        </Description>
      </template>,
      );
      assert
        .dom('#test-description')
        .hasClass('hds-dialog-primitive__description');
    });

    // CONTENT

    test('it renders the passed in content', async function (assert) {
      await render(
        <template>
        <Description>
          Description
        </Description>
      </template>,
      );
      assert.dom('.hds-dialog-primitive__description').hasText('Description');
    });
  },
);
