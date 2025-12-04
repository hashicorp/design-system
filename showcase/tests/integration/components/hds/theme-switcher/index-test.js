/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

module('Integration | Component | hds/theme-switcher/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::ThemeSwitcher />`);
    assert.dom('.hds-theme-switcher-control').exists();
  });

  test('it renders correctly with default arguments', async function (assert) {
    await render(hbs`<Hds::ThemeSwitcher />`);

    assert
      .dom('.hds-dropdown-toggle-button')
      .hasClass('hds-button--size-small');
    assert
      .dom('.hds-dropdown-toggle-button')
      .doesNotHaveClass('hds-button--full-width');
    assert.dom('.hds-dropdown-toggle-button').hasText('System');
    assert.dom('.hds-icon-monitor').exists();

    await click('.hds-dropdown-toggle-button');

    assert.dom('.hds-dropdown-content-container').exists();
    assert.dom('.hds-dropdown__list-item').exists({ count: 3 });
    assert.dom('.hds-dropdown__list-item:nth-child(1)').hasText('System');
    assert.dom('.hds-dropdown__list-item:nth-child(2)').hasText('Light');
    assert.dom('.hds-dropdown__list-item:nth-child(3)').hasText('Dark');
  });

  test('it renders correctly with @toggleSize', async function (assert) {
    await render(hbs`<Hds::ThemeSwitcher @toggleSize="medium" />`);
    assert
      .dom('.hds-dropdown-toggle-button')
      .hasClass('hds-button--size-medium');
  });

  test('it renders correctly with @toggleIsFullWidth', async function (assert) {
    await render(hbs`<Hds::ThemeSwitcher @toggleIsFullWidth={{true}} />`);
    assert
      .dom('.hds-dropdown-toggle-button')
      .hasClass('hds-button--full-width');
  });

  test('it renders correctly with @hasDefaultOption', async function (assert) {
    await render(hbs`<Hds::ThemeSwitcher @hasDefaultOption={{true}} />`);
    await click('.hds-dropdown-toggle-button');

    assert.dom('.hds-dropdown__list-item').exists({ count: 4 });
    assert.dom('.hds-dropdown__list-item:nth-child(1)').hasText('Default');
  });

  test('it renders correctly with @hasSystemOption={{false}}', async function (assert) {
    await render(hbs`<Hds::ThemeSwitcher @hasSystemOption={{false}} />`);
    await click('.hds-dropdown-toggle-button');

    assert.dom('.hds-dropdown__list-item').exists({ count: 2 });
    assert.dom('.hds-dropdown__list-item:nth-child(1)').hasText('Light');
    assert.dom('.hds-dropdown__list-item:nth-child(2)').hasText('Dark');
  });

  test('it calls @onSetTheme when a theme is selected', async function (assert) {
    const onSetThemeSpy = sinon.spy();
    this.set('onSetTheme', onSetThemeSpy);

    await render(hbs`<Hds::ThemeSwitcher @onSetTheme={{this.onSetTheme}} />`);

    await click('.hds-dropdown-toggle-button');
    await click('.hds-dropdown__list-item:nth-child(2)');

    assert.ok(
      onSetThemeSpy.calledWith('light'),
      'onSetTheme was called with "light"',
    );
  });
});
