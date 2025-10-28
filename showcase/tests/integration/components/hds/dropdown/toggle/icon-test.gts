/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, skip, test } from 'qunit';
import {
  render,
  resetOnerror,
  settled,
  setupOnerror,
} from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';

import { HdsDropdownToggleIcon } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/dropdown/toggle/icon', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  // notice: by default the "toggle-icon" has "user" icon, "chevron-down", and an aria-label

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template>
        <HdsDropdownToggleIcon
          @icon="user"
          @text="toggle text"
          id="test-toggle-icon"
        />
      </template>,
    );
    assert.dom('#test-toggle-icon').hasClass('hds-dropdown-toggle-icon');
  });

  // ICON

  test('if an @icon is declared the flight icon should render in the component', async function (assert) {
    await render(
      <template>
        <HdsDropdownToggleIcon
          @icon="settings"
          @text="settings menu"
          id="test-toggle-icon"
        />
      </template>,
    );
    assert.dom('.hds-icon.hds-icon-settings').exists();
  });

  // IMAGE (AVATAR)

  test('if an @imageSrc is declared and exists the image should render in the component', async function (assert) {
    await render(
      <template>
        <HdsDropdownToggleIcon
          @icon="user"
          @text="user menu"
          @imageSrc="/assets/images/avatar.png"
          id="test-toggle-icon"
        />
      </template>,
    );
    assert.dom('img').exists();
  });

  skip('if an @imageSrc is declared but does not exist, the flight icon should render in the component', async function (assert) {
    const context = new TrackedObject({
      imageSrc: '/assets/images/avatar.png',
    });

    await render(
      <template>
        <HdsDropdownToggleIcon
          @icon="user"
          @text="user menu"
          @imageSrc={{context.imageSrc}}
          id="test-toggle-icon"
        />
      </template>,
    );
    // we load the image dynamically to cover this usecase and also to prevent this test from intermittently failing for no obvious reason
    context.imageSrc = '/assets/images/avatar-broken.png';
    await settled();

    assert.dom('img').doesNotExist();
    assert.dom('#test-toggle-icon .hds-icon.hds-icon-user').exists();
  });

  // CHEVRON

  test('it should render the chevron "down" by default', async function (assert) {
    await render(
      <template>
        <HdsDropdownToggleIcon
          @icon="user"
          @text="user menu"
          id="test-toggle-icon"
        />
      </template>,
    );
    assert.dom('.hds-icon.hds-icon-chevron-down').exists();
  });
  test('toggle-icon renders no chevron when hasChevron is set to false', async function (assert) {
    await render(
      <template>
        <HdsDropdownToggleIcon
          @icon="more-horizontal"
          @text="user menu"
          id="test-toggle-icon"
          @hasChevron={{false}}
        />
      </template>,
    );
    assert.dom('.hds-icon.hds-icon-chevron-down').doesNotExist();
  });

  // SIZE

  test('it should render the medium size as the default if no size is declared', async function (assert) {
    await render(
      <template>
        <HdsDropdownToggleIcon
          @icon="user"
          @text="user menu"
          id="test-toggle-icon"
        />
      </template>,
    );
    assert
      .dom('#test-toggle-icon')
      .hasClass('hds-dropdown-toggle-icon--size-medium');
  });
  test('it should render the correct CSS size class if the @size prop is declared', async function (assert) {
    await render(
      <template>
        <HdsDropdownToggleIcon
          @icon="user"
          @text="user menu"
          @size="small"
          id="test-toggle-icon"
        />
      </template>,
    );
    assert
      .dom('#test-toggle-icon')
      .hasClass('hds-dropdown-toggle-icon--size-small');
  });

  // A11Y

  test('it should render with the correct aria attribute declared using the @text prop', async function (assert) {
    await render(
      <template>
        <HdsDropdownToggleIcon
          @icon="user"
          @text="user menu"
          id="test-toggle-icon"
        />
      </template>,
    );
    assert.dom('#test-toggle-icon').hasAria('label', 'user menu');
  });
  test('it should render the user "avatar" image with the correct role', async function (assert) {
    await render(
      <template>
        <HdsDropdownToggleIcon
          @icon="user"
          @text="user menu"
          @imageSrc="/assets/images/avatar.png"
          id="test-toggle-icon"
        />
      </template>,
    );
    assert.dom('#test-toggle-icon img').hasAttribute('role', 'presentation');
  });
  test('it should render with the correct aria-expanded attribute on the toggle element', async function (assert) {
    await render(
      <template>
        <HdsDropdownToggleIcon
          @icon="user"
          @text="user menu"
          @isOpen={{true}}
          id="test-toggle-icon"
        />
      </template>,
    );
    assert.dom('#test-toggle-icon').hasAttribute('aria-expanded', 'true');
  });

  // ASSERTIONS

  test('it should throw an assertion if @text is not defined', async function (assert) {
    const errorMessage = `@text for "Hds::Dropdown::Toggle::Icon" must have a valid value`;
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      <template>
        {{! @glint-expect-error - assertion testing invalid value }}
        <HdsDropdownToggleIcon @icon="user" id="test-toggle-icon" />
      </template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if both @icon and @imageSrc are not defined', async function (assert) {
    const errorMessage =
      '@icon or @imageSrc must be defined for "Hds::Dropdown::Toggle::Icon"';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      <template><HdsDropdownToggleIcon @text="user menu" /></template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if an incorrect value for @size is provided', async function (assert) {
    const errorMessage =
      '@size for "Hds::Dropdown::Toggle::Icon" must be one of the following: small, medium; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      <template>
        {{! @glint-expect-error - assertion testing invalid value }}
        <HdsDropdownToggleIcon @icon="user" @text="user menu" @size="foo" />
      </template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if an incorrect value for @icon is provided while @hasChevron is false', async function (assert) {
    const errorMessage =
      '@hasChevron for "Hds::Dropdown::Toggle::Icon" must be true unless the icon is one of the following: more-horizontal, more-vertical; received: apple';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      <template>
        <HdsDropdownToggleIcon
          @icon="apple"
          @text="user menu"
          @hasChevron={{false}}
        />
      </template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
