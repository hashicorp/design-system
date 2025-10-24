/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test, skip } from 'qunit';
import { setupRenderingTest, cleanupBodyOverflow } from 'showcase/tests/helpers';
import { click, render, triggerKeyEvent, resetOnerror, setupOnerror, settled } from '@ember/test-helpers';
import Flyout from "@hashicorp/design-system-components/components/hds/flyout/index";
import Button from "@hashicorp/design-system-components/components/hds/button/index";
import { on } from "@ember/modifier";
import set from "ember-set-helper/helpers/set";
import Dropdown from "@hashicorp/design-system-components/components/hds/dropdown/index";

module('Integration | Component | hds/flyout/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
    cleanupBodyOverflow();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template><Flyout id="test-flyout" as |F|><F.Header>Title</F.Header></Flyout></template>,
    );
    assert.dom('#test-flyout').hasClass('hds-flyout');
  });

  // SIZE

  test('it should render the component with default size if no arguments provided', async function (assert) {
    await render(
      <template><Flyout id="test-flyout" as |F|><F.Header>Title</F.Header></Flyout></template>,
    );
    assert.dom('#test-flyout').hasClass('hds-flyout--size-medium');
  });

  test('it should render the component with custom size if provided', async function (assert) {
    await render(
      <template><Flyout id="test-flyout" @size="large" as |F|><F.Header>Title</F.Header></Flyout></template>,
    );
    assert.dom('#test-flyout').hasClass('hds-flyout--size-large');
  });

  // OVERLAY

  test('it should render the component with an overlay element by default', async function (assert) {
    await render(
      <template><Flyout id="test-flyout" as |F|><F.Header>Title</F.Header></Flyout></template>,
    );
    assert.dom('.hds-flyout__overlay').isVisible();
  });

  // CONTEXTUAL COMPONENTS

  test('it renders the contextual components', async function (assert) {
    await render(
      <template><Flyout id="test-flyout" as |F|>
            <F.Header>Title</F.Header>
            <F.Body>Body</F.Body>
            <F.Footer>Footer</F.Footer>
          </Flyout></template>,
    );
    assert.dom('.hds-flyout').exists();
    assert.dom('.hds-flyout__header').exists();
    assert.dom('.hds-flyout__header').hasText('Title');
    assert.dom('.hds-flyout__body').exists();
    assert.dom('.hds-flyout__body').hasText('Body');
    assert.dom('.hds-flyout__footer').exists();
    assert.dom('.hds-flyout__footer').hasText('Footer');
  });

  // TITLE (ICON, TAGLINE & DESCRIPTION)

  test('it renders the title without icon, tagline, and description', async function (assert) {
    await render(
      <template><Flyout id="test-flyout" as |F|>
            <F.Header>Title</F.Header>
          </Flyout></template>,
    );
    assert.dom('.hds-flyout__title').exists();
    assert.dom('.hds-flyout__title').hasText('Title');
    assert.dom('.hds-flyout__icon').doesNotExist();
    assert.dom('.hds-flyout__tagline').doesNotExist();
    assert.dom('.hds-flyout__description').doesNotExist();
  });
  test('it renders the title with icon and tagline if provided', async function (assert) {
    await render(
      <template><Flyout id="test-flyout" as |F|>
            <F.Header @icon="info" @tagline="Tagline">Title</F.Header>
          </Flyout></template>,
    );
    assert.dom('.hds-flyout__title').exists();
    assert.dom('.hds-flyout__title').hasText('Tagline Title');
    assert.dom('.hds-flyout__icon.hds-icon-info').exists();
    assert.dom('.hds-flyout__tagline').exists();
    assert.dom('.hds-flyout__tagline').hasText('Tagline');
  });
  test('it renders the description if provided', async function (assert) {
    await render(
      <template><Flyout id="test-flyout" as |F|>
            <F.Header>Title</F.Header>
            <F.Description>Description</F.Description>
          </Flyout></template>,
    );
    assert.dom('.hds-flyout__title').exists();
    assert.dom('.hds-flyout__title').hasText('Title');
    assert.dom('.hds-flyout__description').exists();
    assert.dom('.hds-flyout__description').hasText('Description');
    assert.dom('.hds-flyout__icon').doesNotExist();
    assert.dom('.hds-flyout__tagline').doesNotExist();
  });

  test('it renders the title as an h1', async function (assert) {
    await render(
      <template><Flyout id="test-flyout" as |F|>
            <F.Header @icon="info" @tagline="Tagline">Title</F.Header>
          </Flyout></template>,
    );
    assert.dom('.hds-flyout__title').hasTagName('h1');
  });

  // DISMISS

  test('it should always render the "dismiss" button', async function (assert) {
    await render(
      <template><Flyout id="test-flyout" as |F|><F.Header>Title</F.Header></Flyout></template>,
    );
    assert.dom('button.hds-flyout__dismiss').exists();
  });
  test('it should close the flyout when the "dismiss" button is pressed', async function (assert) {
    await render(
      <template><Flyout id="test-flyout" as |F|><F.Header>Title</F.Header></Flyout></template>,
    );
    assert.dom('#test-flyout').isVisible();
    await click('button.hds-flyout__dismiss');
    assert.dom('#test-flyout').isNotVisible();
  });
  test('it should close the flyout when the "close" function is called', async function (assert) {
    await render(
      <template><Flyout id="test-flyout" as |M|>
            <M.Footer as |F|>
              <Button id="cancel-button" type="button" @text="Cancel" @color="secondary" {{on "click" F.close}} />
            </M.Footer>
          </Flyout></template>,
    );
    assert.dom('#test-flyout').isVisible();
    await click('#cancel-button');
    assert.dom('#test-flyout').isNotVisible();
  });
  test('it should close the flyout when the "esc" key is pressed', async function (assert) {
    await render(
      <template><Flyout id="test-flyout" as |M|><M.Header>Title</M.Header></Flyout></template>,
    );
    assert.dom('#test-flyout').isVisible();
    await triggerKeyEvent('.hds-flyout', 'keydown', 'Escape');
    assert.dom('#test-flyout').isNotVisible();
  });
  test('it should close the flyout when clicking outside', async function (assert) {
    await render(
      <template><Flyout id="test-flyout" as |M|><M.Header>Title</M.Header></Flyout></template>,
    );
    assert.dom('#test-flyout').isVisible();
    await click('.hds-flyout__overlay');
    assert.dom('#test-flyout').isNotVisible();
  });

  // BODY OVERFLOW

  test('it should close the flyout and remove the body overflow style - manual dismiss', async function (assert) {
    await render(
      <template><Flyout id="test-flyout" as |M|><M.Header>Title</M.Header></Flyout></template>,
    );

    // when the flyout is open the `<body>` element gets applied an overflow:hidden via inline style
    assert.dom('#test-flyout').isVisible();
    assert.dom('body', document).hasStyle({ overflow: 'hidden' });

    // when the flyout is closed the `overflow:hidden` style should be removed
    await click('button.hds-flyout__dismiss');
    assert.dom('#test-flyout').isNotVisible();
    assert.dom('body', document).doesNotHaveStyle({ overflow: 'hidden' });
  });

  test('it should close the flyout and remove the body overflow style - click outside', async function (assert) {
    await render(
      <template><Flyout id="test-flyout" as |M|><M.Header>Title</M.Header></Flyout></template>,
    );

    // when the flyout is open the `<body>` element gets applied an overflow:hidden via inline style
    assert.dom('#test-flyout').isVisible();
    assert.dom('body', document).hasStyle({ overflow: 'hidden' });

    // when the flyout is closed the `overflow:hidden` style should be removed
    await click('.hds-flyout__overlay');
    assert.dom('#test-flyout').isNotVisible();
    assert.dom('body', document).doesNotHaveStyle({ overflow: 'hidden' });
  });

  test('it should close the flyout and remove the body overflow style - dismiss via `F.close`', async function (assert) {
    await render(
      <template><Flyout id="test-flyout" as |M|>
            <M.Header>Title</M.Header>
            <M.Footer as |F|>
              <Button id="cancel-button" type="button" @text="Cancel" @color="secondary" {{on "click" F.close}} />
            </M.Footer>
          </Flyout></template>,
    );

    // when the flyout is open the `<body>` element gets applied an overflow:hidden via inline style
    assert.dom('#test-flyout').isVisible();
    assert.dom('body', document).hasStyle({ overflow: 'hidden' });

    // when the flyout is closed the `overflow:hidden` style should be removed
    await click('#cancel-button');
    assert.dom('#test-flyout').isNotVisible();
    assert.dom('body', document).doesNotHaveStyle({ overflow: 'hidden' });
  });

  test('it should close the flyout and remove the body overflow style - direct DOM removal', async function (assert) {
    this.set('isFlyoutRendered', false);
    this.set(
      'deactivateFlyout',
      function () {
        this.set('isFlyoutRendered', false);
      }.bind(this),
    );

    await render(
      <template>
        {{#if this.isFlyoutRendered}}
          <Flyout id="test-flyout" as |M|>
            <M.Header>Title</M.Header>
            <M.Footer>
              <Button id="confirm-button" type="button" @text="Confirm" @color="primary" {{on "click" this.deactivateFlyout}} />
            </M.Footer>
          </Flyout>
        {{/if}}
      </template>,
    );

    assert.dom('#test-flyout').doesNotExist();
    this.set('isFlyoutRendered', true);
    assert.dom('#test-flyout').exists();

    // when the flyout is open the `<body>` element gets applied an overflow:hidden via inline style
    assert.dom('#test-flyout').isVisible();
    assert.dom('body', document).hasStyle({ overflow: 'hidden' });

    // when the flyout is removed from the DOM the `overflow:hidden` style should be removed
    await click('#confirm-button');
    assert.dom('#test-flyout').doesNotExist();
    assert.dom('body', document).doesNotHaveStyle({ overflow: 'hidden' });
  });

  test('it should close the flyout and remove the body overflow style - form submit', async function (assert) {
    this.set('isFlyoutRendered', false);
    this.set(
      'deactivateFlyoutOnSubmit',
      function (event) {
        event.preventDefault(); // prevent page reload
        this.set('isFlyoutRendered', false);
      }.bind(this),
    );

    await render(
      <template>
        {{#if this.isFlyoutRendered}}
          <Flyout id="test-flyout" as |M|>
            <M.Header>Title</M.Header>
            <M.Body>
              <form id="test-form" {{on "submit" this.deactivateFlyoutOnSubmit}} />
            </M.Body>
            <M.Footer>
              <Button id="submit-button" form="test-form" type="submit" @text="Confirm" @color="primary" />
            </M.Footer>
          </Flyout>
        {{/if}}
      </template>,
    );

    assert.dom('#test-flyout').doesNotExist();
    this.set('isFlyoutRendered', true);
    assert.dom('#test-flyout').exists();

    // when the flyout is open the `<body>` element gets applied an overflow:hidden via inline style
    assert.dom('#test-flyout').isVisible();
    assert.dom('body', document).hasStyle({ overflow: 'hidden' });

    // when the form is submitted and the flyout is removed from the DOM the `overflow:hidden` style should be removed
    await click('#submit-button');
    assert.dom('#test-flyout').doesNotExist();
    assert.dom('body', document).doesNotHaveStyle({ overflow: 'hidden' });
  });

  // ACCESSIBILITY

  test('it uses the title as name for the dialog', async function (assert) {
    await render(
      <template><Flyout id="test-flyout" as |F|><F.Header>Title</F.Header></Flyout></template>,
    );
    // the IDs are dynamically generated
    let titleElement = this.element.querySelector('.hds-flyout__title');
    let titleElementId = titleElement.id;
    assert.dom('dialog').hasAttribute('aria-labelledby', titleElementId);
  });

  // FOCUS MANAGEMENT

  test('it sets initial focus on the dimiss button, as first focusable element', async function (assert) {
    await render(
      <template><Flyout id="test-flyout" as |F|><F.Header>Title</F.Header></Flyout></template>,
    );
    assert.dom('button.hds-flyout__dismiss').isFocused();
  });

  test('it returns focus to the element that initiated the open event, if is still in the DOM', async function (assert) {
    await render(
      <template><button id="test-button" type="button" {{on "click" (set this "showFlyout" true)}}>open flyout</button>
          {{#if this.showFlyout}}
            <Flyout id="test-flyout" as |M|>
              <M.Header>Title</M.Header>
            </Flyout>
          {{/if}}
          </template>,
    );
    await click('#test-button');
    assert.true(this.showFlyout);
    await click('button.hds-flyout__dismiss');
    assert.dom('#test-button').isFocused();
  });

  // this test is flaky in CI, so skipping for now
  skip('it returns focus to the `body` element, if the one that initiated the open event not anymore in the DOM', async function (assert) {
    await render(
      <template><Dropdown as |D|>
            <D.ToggleButton id="test-toggle" @text="open flyout" />
            <D.Interactive id="test-interactive" {{on "click" (set this "showFlyout" true)}}>open flyout</D.Interactive>
          </Dropdown>
          {{#if this.showFlyout}}
            <Flyout id="test-flyout" as |M|>
              <M.Header>Title</M.Header>
            </Flyout>
          {{/if}}
          </template>,
    );
    await click('#test-toggle');
    await click('#test-interactive');
    assert.true(this.showFlyout);
    await click('button.hds-flyout__dismiss');
    assert.dom('body', 'document').isFocused();
  });

  test('it returns focus to a specific element if provided via`@returnFocusTo`', async function (assert) {
    await render(
      <template><Dropdown as |D|>
            <D.ToggleButton id="test-toggle" @text="open flyout" />
            <D.Interactive id="test-interactive" {{on "click" (set this "showFlyout" true)}}>open flyout</D.Interactive>
          </Dropdown>
          {{#if this.showFlyout}}
            <Flyout id="test-flyout" @returnFocusTo="test-toggle" as |M|>
              <M.Header>Title</M.Header>
            </Flyout>
          {{/if}}
          </template>,
    );
    await click('#test-toggle');
    await click('#test-interactive');
    assert.true(this.showFlyout);
    await click('button.hds-flyout__dismiss');
    assert.dom('#test-toggle').isFocused();
  });

  // CALLBACKS

  test('it should call `onOpen` function if provided', async function (assert) {
    let opened = false;
    this.set('onOpen', () => (opened = true));
    await render(
      <template><Flyout id="test-onopen-callback" @onOpen={{this.onOpen}} as |F|>
            <F.Header>Title</F.Header>
          </Flyout></template>,
    );
    assert.dom('#test-onopen-callback').isVisible();
    await settled();
    assert.ok(opened);
  });

  test('it should call `onClose` function if provided', async function (assert) {
    let closed = false;
    this.set('onClose', () => (closed = true));
    await render(
      <template><Flyout id="test-close-callback" @onClose={{this.onClose}} as |F|>
            <F.Header>Title</F.Header>
          </Flyout></template>,
    );
    await click('button.hds-flyout__dismiss');
    assert.dom('#test-onclose-callback').isNotVisible();
    await settled();
    assert.ok(closed);
  });

  test('it should not call `onClose` when the flyout is removed from the DOM directly', async function (assert) {
    let closed = false;

    this.set('onClose', () => (closed = true));
    this.set('isFlyoutRendered', true);

    await render(
      hbs`
        {{#if this.isFlyoutRendered}}
          <Hds::Flyout id="test-modal-onclose-no-callback" @onClose={{this.onClose}} as |F|>
            <F.Header>Title</F.Header>
          </Hds::Flyout>
        {{/if}}
      `,
    );

    assert.dom('#test-modal-onclose-no-callback').isVisible();

    this.set('isFlyoutRendered', false);
    assert.dom('#test-modal-onclose-no-callback').doesNotExist();

    await settled();
    assert.notOk(closed);
  });

  // ASSERTIONS

  test('it should throw an assertion if an incorrect value for @size is provided', async function (assert) {
    const errorMessage =
      '@size for "Hds::Flyout" must be one of the following: medium, large; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      <template><Flyout @size="foo" as |F|><F.Header>Title</F.Header></Flyout></template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
