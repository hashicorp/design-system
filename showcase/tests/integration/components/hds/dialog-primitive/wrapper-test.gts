/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, resetOnerror } from '@ember/test-helpers';

import {
  HdsDialogPrimitiveBody,
  HdsDialogPrimitiveDescription,
  HdsDialogPrimitiveFooter,
  HdsDialogPrimitiveHeader,
  HdsDialogPrimitiveWrapper,
} from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module(
  'Integration | Component | hds/dialog-primitive/wrapper',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.afterEach(() => {
      resetOnerror();
    });

    test('it should render the component with a CSS class that matches the component name, and its sub', async function (assert) {
      await render(
        <template>
          <HdsDialogPrimitiveWrapper id="test-dialog-primitive">
            <:header>Header</:header>
            <:body>Body</:body>
            <:footer>Footer</:footer>
          </HdsDialogPrimitiveWrapper>
        </template>,
      );
      assert
        .dom('#test-dialog-primitive')
        .hasClass('hds-dialog-primitive__wrapper');
    });

    // CONTEXTUAL COMPONENTS

    test('it renders the content slots and the contextual components', async function (assert) {
      await render(
        <template>
          <HdsDialogPrimitiveWrapper id="test-dialog-primitive">
            <:header>
              <HdsDialogPrimitiveHeader>Title</HdsDialogPrimitiveHeader>
              <HdsDialogPrimitiveDescription
              >Description</HdsDialogPrimitiveDescription>
            </:header>
            <:body>
              <HdsDialogPrimitiveBody>Body</HdsDialogPrimitiveBody>
            </:body>
            <:footer>
              <HdsDialogPrimitiveFooter>Footer</HdsDialogPrimitiveFooter>
            </:footer>
          </HdsDialogPrimitiveWrapper>
        </template>,
      );
      assert.dom('.hds-dialog-primitive__wrapper-header').exists();
      assert.dom('.hds-dialog-primitive__wrapper-body').exists();
      assert.dom('.hds-dialog-primitive__wrapper-footer').exists();
      assert.dom('.hds-dialog-primitive__header').exists().hasText('Title');
      assert
        .dom('.hds-dialog-primitive__description')
        .exists()
        .hasText('Description');
      assert.dom('.hds-dialog-primitive__body').exists().hasText('Body');
      assert.dom('.hds-dialog-primitive__footer').exists().hasText('Footer');
    });
  },
);
