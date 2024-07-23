/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/dialog-primitive/wrapper',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.afterEach(() => {
      resetOnerror();
    });

    test('it should render the component with a CSS class that matches the component name, and its sub', async function (assert) {
      await render(
        hbs`
        <Hds::DialogPrimitive::Wrapper id="test-dialog-primitive">
          <:header>Header</:header>
          <:body>Body</:body>
          <:footer>Footer</:footer>
        </Hds::DialogPrimitive::Wrapper>
      `
      );
      assert
        .dom('#test-dialog-primitive')
        .hasClass('hds-dialog-primitive__wrapper');
    });

    // CONTEXTUAL COMPONENTS

    test('it renders the content slots and the contextual components', async function (assert) {
      await render(
        hbs`
        <Hds::DialogPrimitive::Wrapper id="test-dialog-primitive">
          <:header>
            <Hds::DialogPrimitive::Header>Title</Hds::DialogPrimitive::Header>
            <Hds::DialogPrimitive::Description>Description</Hds::DialogPrimitive::Description>
          </:header>
          <:body>
            <Hds::DialogPrimitive::Body>Body</Hds::DialogPrimitive::Body>
          </:body>
          <:footer>
            <Hds::DialogPrimitive::Footer>Footer</Hds::DialogPrimitive::Footer>
          </:footer>
        </Hds::DialogPrimitive::Wrapper>
      `
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
  }
);
