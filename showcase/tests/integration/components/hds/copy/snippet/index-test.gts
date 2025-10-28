/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { click, render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';
import { wait } from 'showcase/tests/helpers';
import sinon from 'sinon';

import { HdsCopySnippet } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/copy/snippet/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(() => {
    sinon.stub(window.navigator.clipboard, 'writeText').resolves();
  });

  hooks.afterEach(() => {
    resetOnerror();
    // we need to restore the "window.navigator" methods
    sinon.restore();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template>
        <HdsCopySnippet
          id="test-copy-snippet"
          @textToCopy="someSecretThingGoesHere"
        />
      </template>,
    );
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet');
  });

  test('it should render the component with an aria-label that includes the correct copy text', async function (assert) {
    await render(
      <template>
        <HdsCopySnippet id="test-copy-snippet" @textToCopy="this aria label" />
      </template>,
    );
    assert.dom('#test-copy-snippet').hasAria('label', 'copy this aria label');
  });

  // VARIANTS

  test('it should render the correct default component variation: primary color, idle status', async function (assert) {
    await render(
      <template>
        <HdsCopySnippet
          id="test-copy-snippet"
          @textToCopy="someSecretThingGoesHere"
        />
      </template>,
    );
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet');
    assert
      .dom('#test-copy-snippet')
      .hasClass('hds-copy-snippet--color-primary');
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet--status-idle');
  });

  test('it should render the secondary color if defined', async function (assert) {
    await render(
      <template>
        <HdsCopySnippet
          id="test-copy-snippet"
          @textToCopy="someSecretThingGoesHere"
          @color="secondary"
        />
      </template>,
    );
    assert
      .dom('#test-copy-snippet')
      .hasClass('hds-copy-snippet--color-secondary');
  });

  test('it should support truncation if @isTruncated is set to true', async function (assert) {
    await render(
      <template>
        <HdsCopySnippet
          id="test-copy-snippet"
          @textToCopy="someSecretThingGoesHere"
          @isTruncated={{true}}
        />
      </template>,
    );
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet--is-truncated');
  });

  test('it should have the correct CSS class to support full-width size if @isFullWidth prop is true', async function (assert) {
    await render(
      <template>
        <HdsCopySnippet
          id="test-copy-snippet"
          @textToCopy="someSecretThingGoesHere"
          @isFullWidth={{true}}
        />
      </template>,
    );
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet--width-full');
  });

  // COPY STATES

  test('it should update the status to success if the copy operation was successful', async function (assert) {
    const context = new TrackedObject<Record<'success', boolean | undefined>>({
      success: undefined,
    });
    const onSuccess = () => {
      context.success = true;
    };
    const onError = () => {
      context.success = false;
    };

    await render(
      <template>
        <HdsCopySnippet
          id="test-copy-snippet"
          @textToCopy="someSecretThingGoesHere"
          @onSuccess={{onSuccess}}
          @onError={{onError}}
        />
      </template>,
    );
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet--status-idle');
    await click('button#test-copy-snippet');
    assert.true(context.success);
    assert
      .dom('#test-copy-snippet')
      .hasClass('hds-copy-snippet--status-success');
  });

  test('it should update the status back to idle after success', async function (assert) {
    await render(
      <template>
        <HdsCopySnippet
          id="test-copy-snippet"
          @textToCopy="someSecretThingGoesHere"
        />
      </template>,
    );
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet--status-idle');
    await click('button#test-copy-snippet');
    assert
      .dom('#test-copy-snippet')
      .hasClass('hds-copy-snippet--status-success');
    await wait(2000); // wait for the status to revert to "idle" automatically
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet--status-idle');
  });

  test('it should update the status to an error after a failed "copy" operation', async function (assert) {
    const context = new TrackedObject<Record<'success', boolean | undefined>>({
      success: undefined,
    });
    const onSuccess = () => {
      context.success = true;
    };
    const onError = () => {
      context.success = false;
    };

    sinon.restore();
    sinon
      .stub(window.navigator.clipboard, 'writeText')
      .throws('Sinon throws (syntethic error)');
    await render(
      <template>
        <HdsCopySnippet
          id="test-copy-snippet"
          @textToCopy="someSecretThingGoesHere"
          @onSuccess={{onSuccess}}
          @onError={{onError}}
        />
      </template>,
    );
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet--status-idle');
    await click('button#test-copy-snippet');
    assert.false(context.success);
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet--status-error');
    await wait(2000); // wait for the status to revert to "idle" automatically
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet--status-idle');
  });

  // ASSERTIONS

  test('it should throw an assertion if an incorrect value for @color is provided', async function (assert) {
    const errorMessage =
      '@color for "Hds::Copy::Snippet" must be one of the following: primary, secondary; received: tertiary';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      <template>
        <HdsCopySnippet
          id="test-copy-snippet"
          @textToCopy="someSecretThingGoesHere"
          {{! @glint-expect-error - assertion testing invalid value }}
          @color="tertiary"
        />
      </template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
