/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, resetOnerror, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/dialog-primitive/index',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.afterEach(() => {
      resetOnerror();
    });

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`
        <Hds::DialogPrimitive id="test-dialog-primitive">
          <:header>Header</:header>
          <:body>Body</:body>
          <:footer>Footer</:footer>
        </Hds::DialogPrimitive>
      `
      );
      assert.dom('#test-dialog-primitive').hasClass('hds-dialog-primitive');
    });

    // CONTEXTUAL COMPONENTS

    test('it renders the contextual components', async function (assert) {
      await render(
        hbs`
        <Hds::DialogPrimitive id="test-dialog-primitive">
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
        </Hds::DialogPrimitive>
      `
      );
      assert.dom('.hds-dialog-primitive').exists();
      assert.dom('.hds-dialog-primitive__header').exists().hasText('Title');
      assert
        .dom('.hds-dialog-primitive__description')
        .exists()
        .hasText('Description');
      assert.dom('.hds-dialog-primitive__body').exists().hasText('Body');
      assert.dom('.hds-dialog-primitive__footer').exists().hasText('Footer');
    });

    // DISMISS

    test('it should close the dialog when the "dismiss" button is pressed', async function (assert) {
      await render(
        hbs`
         <Hds::DialogPrimitive id="test-dialog-primitive">
          <:header>
            <Hds::DialogPrimitive::Header>Title</Hds::DialogPrimitive::Header>
          </:header>
          <:body>
            <Hds::DialogPrimitive::Body>Body</Hds::DialogPrimitive::Body>
          </:body>
        </Hds::DialogPrimitive>
      `
      );
      assert.dom('#test-dialog-primitive').isVisible();
      await click('button.hds-dialog-primitive__dismiss');
      assert.dom('#test-dialog-primitive').isNotVisible();
    });

    test('it should close the dialog when the "close" function is called', async function (assert) {
      await render(
        hbs`
        <Hds::DialogPrimitive id="test-dialog-primitive">
          <:header>
            <Hds::DialogPrimitive::Header>Title</Hds::DialogPrimitive::Header>
            <Hds::DialogPrimitive::Description>Description</Hds::DialogPrimitive::Description>
          </:header>
          <:body>
            <Hds::DialogPrimitive::Body>Body</Hds::DialogPrimitive::Body>
          </:body>
          <:footer>
            <Hds::DialogPrimitive::Footer>
              <Hds::Button id="cancel-button" type="button" @text="Cancel" @color="secondary" {{on "click" F.close}} />
            </Hds::DialogPrimitive::Footer>
          </:footer>
        </Hds::DialogPrimitive>
      `
      );
      assert.dom('#test-dialog-primitive').isVisible();
      await click('#cancel-button');
      assert.dom('#test-dialog-primitive').isNotVisible();
    });

    // ACCESSIBILITY

    // DISABLEtest('it uses the title as name for the dialog', async function (assert) {
    //   await render(
    //     hbs`
    //       <Hds::DialogPrimitive id="test-dialog-primitive">
    //         <:header>
    //           <Hds::DialogPrimitive::Header>Title</Hds::DialogPrimitive::Header>
    //         </:header>
    //       </Hds::DialogPrimitive>
    //     `
    //   );
    //   // the IDs are dynamically generated
    //   let titleElement = this.element.querySelector(
    //     '.hds-dialog-primitive__title'
    //   );
    //   let titleElementId = titleElement.id;
    //   assert.dom('dialog').hasAttribute('aria-labelledby', titleElementId);
    // });

    // FOCUS MANAGEMENT

    test('it sets initial focus on the dimiss button, as first focusable element', async function (assert) {
      await render(
        hbs`
        <Hds::DialogPrimitive id="test-dialog-primitive">
          <:header>
            <Hds::DialogPrimitive::Header>Title</Hds::DialogPrimitive::Header>
          </:header>
        </Hds::DialogPrimitive>
      `
      );
      assert.dom('button.hds-dialog-primitive__dismiss').isFocused();
    });

    // CALLBACKS

    test('it should call `onOpen` function if provided', async function (assert) {
      let opened = false;
      this.set('onOpen', () => (opened = true));
      await render(
        hbs`
        <Hds::DialogPrimitive id="test-dialog-primitive-onopen-callback" @onOpen={{this.onOpen}}>
          <:header>
            <Hds::DialogPrimitive::Header>Title</Hds::DialogPrimitive::Header>
          </:header>
        </Hds::DialogPrimitive>
      `
      );
      assert.dom('#test-dialog-primitive-onopen-callback').isVisible();
      await settled();
      assert.ok(opened);
    });

    test('it should call `onClose` function if provided', async function (assert) {
      let closed = false;
      this.set('onClose', () => (closed = true));
      await render(
        hbs`
        <Hds::DialogPrimitive id="test-dialog-primitive-onclose-callback" @onOpen={{this.onOpen}}>
          <:header>
            <Hds::DialogPrimitive::Header>Title</Hds::DialogPrimitive::Header>
          </:header>
        </Hds::DialogPrimitive>
      `
      );
      await click(
        '#test-dialog-primitive-onclose-callback button.hds-dialog-primitive__dismiss'
      );
      assert.dom('#test-dialog-primitive-onclose-callback').isNotVisible();
      await settled();
      assert.ok(closed);
    });
  }
);
