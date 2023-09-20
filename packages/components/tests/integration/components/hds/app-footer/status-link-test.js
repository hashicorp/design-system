/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/app-footer/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::AppFooter::StatusLink @status="operational" id="test-status-link" />`
    );
    assert.dom('#test-status-link > a').hasClass('hds-app-footer__status-link');
  });

  // OPTIONS

  // status

  test('it should display text, icon, and icon color matching the passed in "operational" status', async function (assert) {
    await render(hbs`<Hds::AppFooter::StatusLink @status="operational" />`);
    assert.dom('.hds-app-footer__status-link').hasText('Operational');
    assert
      .dom('.flight-icon-check-circle')
      .hasAttribute('fill', 'var(--token-color-foreground-success)');
  });

  test('it should display text, icon, and icon color matching the passed in "degraded" status', async function (assert) {
    await render(hbs`<Hds::AppFooter::StatusLink @status="degraded" />`);
    assert.dom('.hds-app-footer__status-link').hasText('Degraded');
    assert
      .dom('.flight-icon-alert-triangle')
      .hasAttribute('fill', 'var(--token-color-foreground-warning)');
  });

  test('it should display text, icon, and icon color matching the passed in "maintenance" status', async function (assert) {
    await render(hbs`<Hds::AppFooter::StatusLink @status="maintenance" />`);
    assert.dom('.hds-app-footer__status-link').hasText('Maintenance');
    assert
      .dom('.flight-icon-alert-triangle')
      .hasAttribute('fill', 'var(--token-color-foreground-warning)');
  });

  test('it should display text, icon, and icon color matching the passed in "critical" status', async function (assert) {
    await render(hbs`<Hds::AppFooter::StatusLink @status="critical" />`);
    assert.dom('.hds-app-footer__status-link').hasText('Critical');
    assert
      .dom('.flight-icon-x-circle')
      .hasAttribute('fill', 'var(--token-color-foreground-critical)');
  });

  // text, statusIcon, statusIconColor
  test('it should display the custom text, icon color, and icon passed in', async function (assert) {
    await render(hbs`
      <Hds::AppFooter::StatusLink
        @text="Waypoint"
        @statusIcon="waypoint"
        @statusIconColor="var(--token-color-waypoint-brand)"
      />
    `);
    assert.dom('.hds-app-footer__status-link').hasText('Waypoint');
    assert
      .dom('.flight-icon-waypoint')
      .hasAttribute('fill', 'var(--token-color-waypoint-brand)');
  });

  // href

  test('it should use the passed in href for the link', async function (assert) {
    await render(hbs`
      <Hds::AppFooter::StatusLink @status="operational" @href="https://www.hashicorp.com/custom-url" />
    `);
    assert
      .dom('.hds-app-footer__status-link')
      .hasAttribute('href', 'https://www.hashicorp.com/custom-url');
  });
});
