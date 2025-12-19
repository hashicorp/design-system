/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, click } from '@ember/test-helpers';
import sinon from 'sinon';

import { HdsThemeSwitcher } from '@hashicorp/design-system-components/components';
import type HdsThemingService from '@hashicorp/design-system-components/services/hds-theming';

module('Integration | Component | hds/theme-switcher/index', function (hooks) {
  setupRenderingTest(hooks);

  let themingService: HdsThemingService;

  hooks.beforeEach(function () {
    themingService = this.owner.lookup(
      'service:hds-theming',
    ) as HdsThemingService;
  });

  hooks.afterEach(function () {
    // Reset the theme after each test
    themingService.setTheme({ theme: undefined });
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template><HdsThemeSwitcher id="test-theme-switcher" /></template>,
    );
    assert.dom('#test-theme-switcher').hasClass('hds-theme-switcher-control');
  });

  // TOGGLE SIZE

  test('it should render with small size by default', async function (assert) {
    await render(
      <template><HdsThemeSwitcher id="test-theme-switcher" /></template>,
    );
    assert
      .dom('#test-theme-switcher .hds-dropdown-toggle-button')
      .hasClass('hds-dropdown-toggle-button--size-small');
  });

  test('it should render the correct CSS size class if @toggleSize is declared', async function (assert) {
    await render(
      <template>
        <HdsThemeSwitcher @toggleSize="medium" id="test-theme-switcher" />
      </template>,
    );
    assert
      .dom('#test-theme-switcher .hds-dropdown-toggle-button')
      .hasClass('hds-dropdown-toggle-button--size-medium');
  });

  // TOGGLE IS FULL WIDTH

  test('it should not be full width by default', async function (assert) {
    await render(
      <template><HdsThemeSwitcher id="test-theme-switcher" /></template>,
    );
    assert
      .dom('#test-theme-switcher .hds-dropdown-toggle-button')
      .doesNotHaveClass('hds-button--width-full');
  });

  test('it should render full width if @toggleIsFullWidth is true', async function (assert) {
    await render(
      <template>
        <HdsThemeSwitcher
          @toggleIsFullWidth={{true}}
          id="test-theme-switcher"
        />
      </template>,
    );
    assert
      .dom('#test-theme-switcher .hds-dropdown-toggle-button')
      .hasClass('hds-dropdown-toggle-button--width-full');
  });

  // THEME DISPLAY

  test('it should display "Theme" label when no theme is set', async function (assert) {
    await render(
      <template><HdsThemeSwitcher id="test-theme-switcher" /></template>,
    );
    assert
      .dom('#test-theme-switcher .hds-dropdown-toggle-button')
      .containsText('Theme');
  });

  test('it should display "System" label when system theme is set', async function (assert) {
    themingService.setTheme({ theme: 'system' });
    await render(
      <template><HdsThemeSwitcher id="test-theme-switcher" /></template>,
    );
    assert
      .dom('#test-theme-switcher .hds-dropdown-toggle-button')
      .containsText('System');
  });

  test('it should display "Light" label when light theme is set', async function (assert) {
    themingService.setTheme({ theme: 'light' });
    await render(
      <template><HdsThemeSwitcher id="test-theme-switcher" /></template>,
    );
    assert
      .dom('#test-theme-switcher .hds-dropdown-toggle-button')
      .containsText('Light');
  });

  test('it should display "Dark" label when dark theme is set', async function (assert) {
    themingService.setTheme({ theme: 'dark' });
    await render(
      <template><HdsThemeSwitcher id="test-theme-switcher" /></template>,
    );
    assert
      .dom('#test-theme-switcher .hds-dropdown-toggle-button')
      .containsText('Dark');
  });

  test('it should display "Default" label when default theme is set and hasDefaultOption is true', async function (assert) {
    themingService.setTheme({ theme: 'default' });
    await render(
      <template>
        <HdsThemeSwitcher @hasDefaultOption={{true}} id="test-theme-switcher" />
      </template>,
    );
    assert
      .dom('#test-theme-switcher .hds-dropdown-toggle-button')
      .containsText('Default');
  });

  // HAS DEFAULT OPTION

  test('it should not include the "Default" option by default', async function (assert) {
    await render(
      <template><HdsThemeSwitcher id="test-theme-switcher" /></template>,
    );
    await click('#test-theme-switcher button');
    assert.dom('.hds-dropdown-list-item').exists({ count: 3 });
    assert.dom('.hds-dropdown-list-item').doesNotContainText('Default');
  });

  test('it should include the "Default" option when `@hasDefaultOption` is `true`', async function (assert) {
    await render(
      <template>
        <HdsThemeSwitcher @hasDefaultOption={{true}} id="test-theme-switcher" />
      </template>,
    );
    await click('#test-theme-switcher button');
    assert.dom('.hds-dropdown-list-item').exists({ count: 4 });
    assert.dom('.hds-dropdown-list-item').containsText('Default');
  });

  // HAS SYSTEM OPTION

  test('it should include the "System" option by default', async function (assert) {
    await render(
      <template><HdsThemeSwitcher id="test-theme-switcher" /></template>,
    );
    await click('#test-theme-switcher button');
    assert.dom('.hds-dropdown-list-item').containsText('System');
  });

  test('it should not include the "System" option when `@hasSystemOption` is `false`', async function (assert) {
    await render(
      <template>
        <HdsThemeSwitcher @hasSystemOption={{false}} id="test-theme-switcher" />
      </template>,
    );
    await click('#test-theme-switcher button');
    assert.dom('.hds-dropdown-list-item').exists({ count: 2 });
    assert.dom('.hds-dropdown-list-item').doesNotContainText('System');
  });

  // THEME SELECTION

  test('it should update the theme in the service and the label in the toggle when a dropdown option is selected', async function (assert) {
    await render(
      <template>
        <HdsThemeSwitcher
          @hasDefaultOption={{true}}
          @hasSystemOption={{true}}
          id="test-theme-switcher"
        />
      </template>,
    );

    // open the dropdown
    await click('#test-theme-switcher button');

    // click on `Light` theme
    await click('.hds-dropdown-list-item:nth-of-type(3) button');
    assert.strictEqual(
      themingService.currentTheme,
      'light',
      'theme service should be updated to `light`',
    );
    assert
      .dom('#test-theme-switcher .hds-dropdown-toggle-button')
      .containsText('Light');

    // click on `Dark` theme
    await click('.hds-dropdown-list-item:nth-of-type(4) button');
    assert.strictEqual(
      themingService.currentTheme,
      'dark',
      'theme service should be updated to `dark`',
    );
    assert
      .dom('#test-theme-switcher .hds-dropdown-toggle-button')
      .containsText('Dark');

    // click on `System` theme
    await click('.hds-dropdown-list-item:nth-of-type(2) button');
    assert.strictEqual(
      themingService.currentTheme,
      'system',
      'theme service should be updated to `system`',
    );
    assert
      .dom('#test-theme-switcher .hds-dropdown-toggle-button')
      .containsText('System');

    // click on `Default` theme
    await click('.hds-dropdown-list-item:nth-of-type(1) button');
    assert.strictEqual(
      themingService.currentTheme,
      'default',
      'theme service should be updated to `undefined` (default)',
    );
    assert
      .dom('#test-theme-switcher .hds-dropdown-toggle-button')
      .containsText('Default');
  });

  // CALLBACKS

  test('it should call @onSetTheme callback when provided', async function (assert) {
    const onSetTheme = sinon.spy();

    await render(
      <template>
        <HdsThemeSwitcher @onSetTheme={{onSetTheme}} id="test-theme-switcher" />
      </template>,
    );
    await click('#test-theme-switcher button');

    // change theme
    await click('.hds-dropdown-list-item:nth-of-type(3) button');

    assert.true(onSetTheme.calledOnce);
  });
});
