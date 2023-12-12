/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  click,
  render,
  resetOnerror,
  setupOnerror,
  settled,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/modal/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::Modal id="test-modal" as |M|><M.Header>Title</M.Header></Hds::Modal>`
    );
    assert.dom('#test-modal').hasClass('hds-modal');
  });

  // SIZE & COLOR

  test('it should render the component with CSS classes that reflect the default vaules if no arguments provided', async function (assert) {
    await render(
      hbs`<Hds::Modal id="test-modal" as |M|><M.Header>Title</M.Header></Hds::Modal>`
    );
    assert.dom('#test-modal').hasClass('hds-modal--size-medium');
    assert.dom('#test-modal').hasClass('hds-modal--color-neutral');
  });

  test('it should render the component with CSS classes that reflect the arguments provided', async function (assert) {
    await render(
      hbs`<Hds::Modal @size="small" @color="warning" id="test-modal" as |M|><M.Header>Title</M.Header></Hds::Modal>`
    );
    assert.dom('#test-modal').hasClass('hds-modal--size-small');
    assert.dom('#test-modal').hasClass('hds-modal--color-warning');
  });

  // OVERLAY

  test('it should render the component with an overlay element', async function (assert) {
    await render(
      hbs`<Hds::Modal @size="small" @color="warning" id="test-modal" as |M|><M.Header>Title</M.Header></Hds::Modal>`
    );
    assert.dom('.hds-modal__overlay').isVisible();
  });

  // CONTEXTUAL COMPONENTS

  test('it renders the contextual components', async function (assert) {
    await render(
      hbs`<Hds::Modal id="test-modal" as |M|>
            <M.Header>Title</M.Header>
            <M.Body>Body</M.Body>
            <M.Footer>Footer</M.Footer>
          </Hds::Modal>`
    );
    assert.dom('.hds-modal').exists();
    assert.dom('.hds-modal__header').exists();
    assert.dom('.hds-modal__header').hasText('Title');
    assert.dom('.hds-modal__body').exists();
    assert.dom('.hds-modal__body').hasText('Body');
    assert.dom('.hds-modal__footer').exists();
    assert.dom('.hds-modal__footer').hasText('Footer');
  });

  // TITLE (ICON & TAGLINE)

  test('it renders the title without icon and tagline if not provided', async function (assert) {
    await render(
      hbs`<Hds::Modal id="test-modal" as |M|>
            <M.Header>Title</M.Header>
          </Hds::Modal>`
    );
    assert.dom('.hds-modal__title').exists();
    assert.dom('.hds-modal__title').hasText('Title');
    assert.dom('.hds-modal__icon').doesNotExist();
    assert.dom('.hds-modal__tagline').doesNotExist();
  });
  test('it renders the title with icon and tagline if provided', async function (assert) {
    await render(
      hbs`<Hds::Modal id="test-modal" as |M|>
            <M.Header @icon="info" @tagline="Tagline">Title</M.Header>
          </Hds::Modal>`
    );
    assert.dom('.hds-modal__title').exists();
    assert.dom('.hds-modal__title').hasText('Tagline Title');
    assert.dom('.hds-modal__icon.flight-icon-info').exists();
    assert.dom('.hds-modal__tagline').exists();
    assert.dom('.hds-modal__tagline').hasText('Tagline');
  });

  // DISMISS

  test('it should always render the "dismiss" button', async function (assert) {
    await render(
      hbs`<Hds::Modal id="test-modal" as |M|><M.Header>Title</M.Header></Hds::Modal>`
    );
    assert.dom('button.hds-modal__dismiss').exists();
  });
  test('it should close the modal when the "dismiss" button is pressed', async function (assert) {
    await render(
      hbs`<Hds::Modal id="test-modal" as |M|><M.Header>Title</M.Header></Hds::Modal>`
    );
    assert.dom('#test-modal').isVisible();
    await click('button.hds-modal__dismiss');
    assert.dom('#test-modal').isNotVisible();
  });
  test('it should close the modal when the "close" function is called', async function (assert) {
    await render(
      hbs`<Hds::Modal id="test-modal" as |M|>
            <M.Footer as |F|>
              <Hds::Button id="cancel-button" type="button" @text="Cancel" @color="secondary" {{on "click" F.close}} />
            </M.Footer>
          </Hds::Modal>`
    );
    assert.dom('#test-modal').isVisible();
    await click('#cancel-button');
    assert.dom('#test-modal').isNotVisible();
  });
  test('it should not close the modal when `@isDismissDisabled` is `true`', async function (assert) {
    await render(
      hbs`<Hds::Modal @isDismissDisabled={{true}} id="test-modal" as |M|><M.Header>Title</M.Header></Hds::Modal>`
    );
    await click('button.hds-modal__dismiss');
    assert.dom('#test-modal').exists();
  });

  // ACCESSIBILITY

  test('it uses the title as name for the dialog', async function (assert) {
    await render(
      hbs`<Hds::Modal id="test-modal" as |M|>
            <M.Header>Title</M.Header>
          </Hds::Modal>`
    );
    // the IDs are dynamically generated
    let titleElement = this.element.querySelector('.hds-modal__title');
    let titleElementId = titleElement.id;
    assert.dom('dialog').hasAttribute('aria-labelledby', titleElementId);
  });

  // FOCUS MANAGEMENT

  test('it sets initial focus on the dimiss button, as first focusable element', async function (assert) {
    await render(
      hbs`<Hds::Modal id="test-modal" as |M|>
            <M.Header>Title</M.Header>
          </Hds::Modal>`
    );
    assert.dom('button.hds-modal__dismiss').isFocused();
  });

  // CALLBACKS

  test('it should call `onOpen` function if provided', async function (assert) {
    let opened = false;
    this.set('onOpen', () => (opened = true));
    await render(
      hbs`<Hds::Modal id="test-modal-onopen-callback" @onOpen={{this.onOpen}} as |M|>
            <M.Header>Title</M.Header>
          </Hds::Modal>`
    );
    assert.dom('#test-modal-onopen-callback').isVisible();
    await settled();
    assert.ok(opened);
  });

  test('it should call `onClose` function if provided', async function (assert) {
    let closed = false;
    this.set('onClose', () => (closed = true));
    await render(
      hbs`<Hds::Modal id="test-modal-onclose-callback" @onClose={{this.onClose}} as |M|>
            <M.Header>Title</M.Header>
          </Hds::Modal>`
    );
    await click('#test-modal-onclose-callback button.hds-modal__dismiss');
    assert.dom('#test-modal-onclose-callback').isNotVisible();
    await settled();
    assert.ok(closed);
  });

  // ASSERTIONS

  test('it should throw an assertion if an incorrect value for @size is provided', async function (assert) {
    const errorMessage =
      '@size for "Hds::Modal" must be one of the following: small, medium, large; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      hbs`<Hds::Modal @size="foo" as |M|><M.Header>Title</M.Header></Hds::Modal>`
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if an incorrect value for @color is provided', async function (assert) {
    const errorMessage =
      '@color for "Hds::Modal" must be one of the following: neutral, warning, critical; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      hbs`<Hds::Modal @color="foo" as |M|><M.Header>Title</M.Header></Hds::Modal>`
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
