/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, resetOnerror } from '@ember/test-helpers';
import Wrapper from "@hashicorp/design-system-components/components/hds/dialog-primitive/wrapper";
import Header from "@hashicorp/design-system-components/components/hds/dialog-primitive/header";
import Description from "@hashicorp/design-system-components/components/hds/dialog-primitive/description";
import Body from "@hashicorp/design-system-components/components/hds/dialog-primitive/body";
import Footer from "@hashicorp/design-system-components/components/hds/dialog-primitive/footer";

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
        <Wrapper id="test-dialog-primitive">
          <:header>Header</:header>
          <:body>Body</:body>
          <:footer>Footer</:footer>
        </Wrapper>
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
        <Wrapper id="test-dialog-primitive">
          <:header>
            <Header>Title</Header>
            <Description>Description</Description>
          </:header>
          <:body>
            <Body>Body</Body>
          </:body>
          <:footer>
            <Footer>Footer</Footer>
          </:footer>
        </Wrapper>
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
