/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test, skip } from 'qunit';
import {
  click,
  find,
  render,
  resetOnerror,
  settled,
  setupOnerror,
  triggerKeyEvent,
} from '@ember/test-helpers';
import { on } from '@ember/modifier';
import { TrackedObject } from 'tracked-built-ins';

import {
  HdsDropdown,
  HdsButton,
  HdsModal,
} from '@hashicorp/design-system-components/components';

import {
  cleanupBodyOverflow,
  setupRenderingTest,
} from 'showcase/tests/helpers';

module('Integration | Component | hds/modal/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
    cleanupBodyOverflow();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template>
        <HdsModal id="test-modal" as |M|><M.Header>Title</M.Header></HdsModal>
      </template>,
    );
    assert.dom('#test-modal').hasClass('hds-modal');
  });

  // SIZE & COLOR

  test('it should render the component with CSS classes that reflect the default vaules if no arguments provided', async function (assert) {
    await render(
      <template>
        <HdsModal id="test-modal" as |M|><M.Header>Title</M.Header></HdsModal>
      </template>,
    );
    assert.dom('#test-modal').hasClass('hds-modal--size-medium');
    assert.dom('#test-modal').hasClass('hds-modal--color-neutral');
  });

  test('it should render the component with CSS classes that reflect the arguments provided', async function (assert) {
    await render(
      <template>
        <HdsModal
          @size="small"
          @color="warning"
          id="test-modal"
          as |M|
        ><M.Header>Title</M.Header></HdsModal>
      </template>,
    );
    assert.dom('#test-modal').hasClass('hds-modal--size-small');
    assert.dom('#test-modal').hasClass('hds-modal--color-warning');
  });

  // OVERLAY

  test('it should render the component with an overlay element', async function (assert) {
    await render(
      <template>
        <HdsModal
          @size="small"
          @color="warning"
          id="test-modal"
          as |M|
        ><M.Header>Title</M.Header></HdsModal>
      </template>,
    );
    assert.dom('.hds-modal__overlay').isVisible();
  });

  // CONTEXTUAL COMPONENTS

  test('it renders the contextual components', async function (assert) {
    await render(
      <template>
        <HdsModal id="test-modal" as |M|>
          <M.Header>Title</M.Header>
          <M.Body>Body</M.Body>
          <M.Footer>Footer</M.Footer>
        </HdsModal>
      </template>,
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
      <template>
        <HdsModal id="test-modal" as |M|>
          <M.Header>Title</M.Header>
        </HdsModal>
      </template>,
    );
    assert.dom('.hds-modal__title').exists();
    assert.dom('.hds-modal__title').hasText('Title');
    assert.dom('.hds-modal__icon').doesNotExist();
    assert.dom('.hds-modal__tagline').doesNotExist();
  });
  test('it renders the title with icon and tagline if provided', async function (assert) {
    await render(
      <template>
        <HdsModal id="test-modal" as |M|>
          <M.Header @icon="info" @tagline="Tagline">Title</M.Header>
        </HdsModal>
      </template>,
    );
    assert.dom('.hds-modal__title').exists();
    assert.dom('.hds-modal__title').hasText('Tagline Title');
    assert.dom('.hds-modal__icon.hds-icon-info').exists();
    assert.dom('.hds-modal__tagline').exists();
    assert.dom('.hds-modal__tagline').hasText('Tagline');
  });

  test('it renders the title as an h1', async function (assert) {
    await render(
      <template>
        <HdsModal id="test-modal" as |M|>
          <M.Header @icon="info" @tagline="Tagline">Title</M.Header>
        </HdsModal>
      </template>,
    );
    assert.dom('.hds-modal__title').hasTagName('h1');
  });

  // DISMISS

  test('it should always render the "dismiss" button', async function (assert) {
    await render(
      <template>
        <HdsModal id="test-modal" as |M|><M.Header>Title</M.Header></HdsModal>
      </template>,
    );
    assert.dom('button.hds-modal__dismiss').exists();
  });
  test('it should close the modal when the "dismiss" button is pressed', async function (assert) {
    await render(
      <template>
        <HdsModal id="test-modal" as |M|><M.Header>Title</M.Header></HdsModal>
      </template>,
    );
    assert.dom('#test-modal').isVisible();
    await click('button.hds-modal__dismiss');
    assert.dom('#test-modal').isNotVisible();
  });
  test('it should close the modal when the "close" function is called', async function (assert) {
    await render(
      <template>
        <HdsModal id="test-modal" as |M|>
          <M.Footer as |F|>
            <HdsButton
              id="cancel-button"
              type="button"
              @text="Cancel"
              @color="secondary"
              {{on "click" F.close}}
            />
          </M.Footer>
        </HdsModal>
      </template>,
    );
    assert.dom('#test-modal').isVisible();
    await click('#cancel-button');
    assert.dom('#test-modal').isNotVisible();
  });
  test('it should close the modal when the "esc" key is pressed', async function (assert) {
    await render(
      <template>
        <HdsModal id="test-modal" as |M|><M.Header>Title</M.Header></HdsModal>
      </template>,
    );
    assert.dom('#test-modal').isVisible();
    await triggerKeyEvent('.hds-modal', 'keydown', 'Escape');
    assert.dom('#test-modal').isNotVisible();
  });

  test('it should close the modal when clicking outside', async function (assert) {
    await render(
      <template>
        <HdsModal id="test-modal" as |M|><M.Header>Title</M.Header></HdsModal>
      </template>,
    );
    assert.dom('#test-modal').isVisible();
    await click('.hds-modal__overlay');
    assert.dom('#test-modal').isNotVisible();
  });

  test('it should not close the modal when `@isDismissDisabled` is `true`', async function (assert) {
    const context = new TrackedObject({ isDismissDisabled: true });

    await render(
      <template>
        <HdsModal
          @isDismissDisabled={{context.isDismissDisabled}}
          id="test-modal"
          as |M|
        >
          <M.Header>Title</M.Header>
          <M.Footer as |F|>
            <HdsButton
              id="cancel-button"
              type="button"
              @text="Cancel"
              @color="secondary"
              {{on "click" F.close}}
            />
          </M.Footer>
        </HdsModal>
      </template>,
    );
    // top right dismiss button
    await click('button.hds-modal__dismiss');
    assert.dom('#test-modal').isVisible();
    // cancel button with yielded "close" callback
    await click('#cancel-button');
    assert.dom('#test-modal').isVisible();
    // click on overlay
    await click('.hds-modal__overlay');
    assert.dom('#test-modal').isVisible();
    // "esc" key
    await triggerKeyEvent('.hds-modal', 'keydown', 'Escape');
    assert.dom('#test-modal').isVisible();

    // now let's check that the state is reset and it can be closed
    context.isDismissDisabled = false;
    await settled();

    await click('button.hds-modal__dismiss');
    assert.dom('#test-modal').isNotVisible();
  });

  // BODY OVERFLOW

  test('it should close the modal and remove the body overflow style - manual dismiss', async function (assert) {
    await render(
      <template>
        <HdsModal id="test-modal" as |M|><M.Header>Title</M.Header></HdsModal>
      </template>,
    );

    // when the modal is open the `<body>` element gets applied an overflow:hidden via inline style
    assert.dom('#test-modal').isVisible();
    assert.dom('body', document).hasStyle({ overflow: 'hidden' });

    // when the modal is closed the `overflow:hidden` style should be removed
    await click('button.hds-modal__dismiss');
    assert.dom('#test-modal').isNotVisible();
    assert.dom('body', document).doesNotHaveStyle({ overflow: 'hidden' });
  });

  test('it should close the modal and remove the body overflow style - click outside', async function (assert) {
    await render(
      <template>
        <HdsModal id="test-modal" as |M|><M.Header>Title</M.Header></HdsModal>
      </template>,
    );

    // when the modal is open the `<body>` element gets applied an overflow:hidden via inline style
    assert.dom('#test-modal').isVisible();
    assert.dom('body', document).hasStyle({ overflow: 'hidden' });

    // when the modal is closed the `overflow:hidden` style should be removed
    await click('.hds-modal__overlay');
    assert.dom('#test-modal').isNotVisible();
    assert.dom('body', document).doesNotHaveStyle({ overflow: 'hidden' });
  });

  test('it should close the modal and remove the body overflow style - dismiss via `F.close`', async function (assert) {
    await render(
      <template>
        <HdsModal id="test-modal" as |M|>
          <M.Header>Title</M.Header>
          <M.Footer as |F|>
            <HdsButton
              id="cancel-button"
              type="button"
              @text="Cancel"
              @color="secondary"
              {{on "click" F.close}}
            />
          </M.Footer>
        </HdsModal>
      </template>,
    );

    // when the modal is open the `<body>` element gets applied an overflow:hidden via inline style
    assert.dom('#test-modal').isVisible();
    assert.dom('body', document).hasStyle({ overflow: 'hidden' });

    // when the modal is closed the `overflow:hidden` style should be removed
    await click('#cancel-button');
    assert.dom('#test-modal').isNotVisible();
    assert.dom('body', document).doesNotHaveStyle({ overflow: 'hidden' });
  });

  test('it should close the modal and remove the body overflow style - direct DOM removal', async function (assert) {
    const context = new TrackedObject({ isModalRendered: false });
    const onCloseModal = () => {
      context.isModalRendered = false;
    };

    await render(
      <template>
        {{#if context.isModalRendered}}
          <HdsModal id="test-modal" as |M|>
            <M.Header>Title</M.Header>
            <M.Footer>
              <HdsButton
                id="confirm-button"
                type="button"
                @text="Confirm"
                @color="primary"
                {{on "click" onCloseModal}}
              />
            </M.Footer>
          </HdsModal>
        {{/if}}
      </template>,
    );

    assert.dom('#test-modal').doesNotExist();

    context.isModalRendered = true;
    await settled();

    assert.dom('#test-modal').exists();

    // when the modal is open the `<body>` element gets applied an overflow:hidden via inline style
    assert.dom('#test-modal').isVisible();
    assert.dom('body', document).hasStyle({ overflow: 'hidden' });

    // when the modal is removed from the DOM the `overflow:hidden` style should be removed
    await click('#confirm-button');
    assert.dom('#test-modal').doesNotExist();
    assert.dom('body', document).doesNotHaveStyle({ overflow: 'hidden' });
  });

  test('it should close the modal and remove the body overflow style - form submit', async function (assert) {
    const context = new TrackedObject({ isModalRendered: false });
    const onCloseModalOnSubmit = (event: SubmitEvent) => {
      event.preventDefault(); // prevent page reload
      context.isModalRendered = false;
    };

    await render(
      <template>
        {{#if context.isModalRendered}}
          <HdsModal id="test-modal" as |M|>
            <M.Header>Title</M.Header>
            <M.Body>
              <form id="test-form" {{on "submit" onCloseModalOnSubmit}} />
            </M.Body>
            <M.Footer>
              <HdsButton
                id="submit-button"
                form="test-form"
                type="submit"
                @text="Confirm"
                @color="primary"
              />
            </M.Footer>
          </HdsModal>
        {{/if}}
      </template>,
    );

    assert.dom('#test-modal').doesNotExist();

    context.isModalRendered = true;
    await settled();

    assert.dom('#test-modal').exists();

    // when the modal is open the `<body>` element gets applied an overflow:hidden via inline style
    assert.dom('#test-modal').isVisible();
    assert.dom('body', document).hasStyle({ overflow: 'hidden' });

    // when the form is submitted and the modal is removed from the DOM the `overflow:hidden` style should be removed
    await click('#submit-button');
    assert.dom('#test-modal').doesNotExist();
    assert.dom('body', document).doesNotHaveStyle({ overflow: 'hidden' });
  });

  // ACCESSIBILITY

  test('it uses the title as name for the dialog', async function (assert) {
    await render(
      <template>
        <HdsModal id="test-modal" as |M|>
          <M.Header>Title</M.Header>
        </HdsModal>
      </template>,
    );

    const titleElement = find('.hds-modal__title');
    const titleId = titleElement?.id ?? '';

    assert.dom('dialog').hasAttribute('aria-labelledby', titleId);
  });

  // FOCUS MANAGEMENT

  test('it sets initial focus on the dimiss button, as first focusable element', async function (assert) {
    await render(
      <template>
        <HdsModal id="test-modal" as |M|>
          <M.Header>Title</M.Header>
        </HdsModal>
      </template>,
    );
    assert.dom('button.hds-modal__dismiss').isFocused();
  });

  test('it returns focus to the element that initiated the open event, if is still in the DOM', async function (assert) {
    const context = new TrackedObject({ isModalRendered: false });
    const showModal = () => {
      context.isModalRendered = true;
    };

    await render(
      <template>
        <button id="test-button" type="button" {{on "click" showModal}}>open
          modal</button>
        {{#if context.isModalRendered}}
          <HdsModal id="test-modal" as |M|>
            <M.Header>Title</M.Header>
          </HdsModal>
        {{/if}}
      </template>,
    );
    await click('#test-button');
    assert.true(context.isModalRendered);
    await click('button.hds-modal__dismiss');
    assert.dom('#test-button').isFocused();
  });

  // this test is flaky in CI, so skipping for now
  skip('it returns focus to the `body` element, if the one that initiated the open event not anymore in the DOM', async function (assert) {
    const context = new TrackedObject({ isModalRendered: false });
    const showModal = () => {
      context.isModalRendered = true;
    };

    await render(
      <template>
        <HdsDropdown as |D|>
          <D.ToggleButton id="test-toggle" @text="open modal" />
          <D.Interactive id="test-interactive" {{on "click" showModal}}>open
            modal</D.Interactive>
        </HdsDropdown>
        {{#if context.isModalRendered}}
          <HdsModal id="test-modal" as |M|>
            <M.Header>Title</M.Header>
          </HdsModal>
        {{/if}}
      </template>,
    );
    await click('#test-toggle');
    await click('#test-interactive');
    assert.true(context.isModalRendered);
    await click('button.hds-modal__dismiss');
    assert.dom('body', document).isFocused();
  });

  test('it returns focus to a specific element if provided via`@returnFocusTo`', async function (assert) {
    const context = new TrackedObject({ isModalRendered: false });
    const showModal = () => {
      context.isModalRendered = true;
    };

    await render(
      <template>
        <HdsDropdown as |D|>
          <D.ToggleButton id="test-toggle" @text="open modal" />
          <D.Interactive id="test-interactive" {{on "click" showModal}}>open
            modal</D.Interactive>
        </HdsDropdown>
        {{#if context.isModalRendered}}
          <HdsModal id="test-modal" @returnFocusTo="test-toggle" as |M|>
            <M.Header>Title</M.Header>
          </HdsModal>
        {{/if}}
      </template>,
    );
    await click('#test-toggle');
    await click('#test-interactive');
    assert.true(context.isModalRendered);
    await click('button.hds-modal__dismiss');
    assert.dom('#test-toggle').isFocused();
  });

  // CALLBACKS

  test('it should call `onOpen` function if provided', async function (assert) {
    const context = new TrackedObject({ isOpen: false });
    const onOpen = () => {
      context.isOpen = true;
    };

    await render(
      <template>
        <HdsModal id="test-modal-onopen-callback" @onOpen={{onOpen}} as |M|>
          <M.Header>Title</M.Header>
        </HdsModal>
      </template>,
    );
    assert.dom('#test-modal-onopen-callback').isVisible();
    await settled();
    assert.ok(context.isOpen);
  });

  test('it should call `onClose` function if provided', async function (assert) {
    const context = new TrackedObject({ isOpen: true });
    const onClose = () => {
      context.isOpen = false;
    };

    await render(
      <template>
        <HdsModal id="test-modal-onclose-callback" @onClose={{onClose}} as |M|>
          <M.Header>Title</M.Header>
        </HdsModal>
      </template>,
    );
    await click('#test-modal-onclose-callback button.hds-modal__dismiss');
    assert.dom('#test-modal-onclose-callback').isNotVisible();
    assert.ok(!context.isOpen);
  });

  test('it should not call `onClose` when the modal is removed from the DOM directly', async function (assert) {
    const context = new TrackedObject({
      isModalRendered: true,
      closed: false,
    });

    const onClose = () => {
      context.closed = true;
    };

    await render(
      <template>
        {{#if context.isModalRendered}}
          <HdsModal
            id="test-modal-onclose-no-callback"
            @onClose={{onClose}}
            as |M|
          >
            <M.Header>Title</M.Header>
          </HdsModal>
        {{/if}}
      </template>,
    );

    assert.dom('#test-modal-onclose-no-callback').isVisible();

    context.isModalRendered = false;
    await settled();

    assert.dom('#test-modal-onclose-no-callback').doesNotExist();
    assert.notOk(context.closed);
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
      <template>
        {{! @glint-expect-error - testing invalid component usage }}
        <HdsModal @size="foo" as |M|><M.Header>Title</M.Header></HdsModal>
      </template>,
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
      <template>
        {{! @glint-expect-error - testing invalid component usage }}
        <HdsModal @color="foo" as |M|><M.Header>Title</M.Header></HdsModal>
      </template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
