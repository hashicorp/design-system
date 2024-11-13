/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import {
  DEFAULT_DISPLAY_MAPPING,
  DISPLAY_KEY_FRIENDLY_LOCAL,
  MINUTE_IN_MS,
  DAY_IN_MS,
} from '@hashicorp/design-system-components/services/hds-time';

module('Integration | Component | hds/time/index', function (hooks) {
  setupRenderingTest(hooks);

  let service;

  // set the locale to 'en-US' to simplify tests; alternatively we can use ember-intl
  Object.defineProperty(navigator, 'language', { value: 'en-US' });

  hooks.beforeEach(function () {
    service = this.owner.lookup('service:hdsTime');
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`
      <Hds::Time @date="05 September 2018 14:48" id="test-time" />
    `);
    assert.dom('#test-time').hasClass('hds-time');
  });

  // OPTIONS

  // OPTION: hasTooltip

  test('it should render the component with a tooltip by default', async function (assert) {
    await render(hbs`
      <Hds::Time @date="05 September 2018 14:48" />
    `);
    assert.dom('.hds-tooltip-button').exists();
  });

  test('it should render the component without a tooltip', async function (assert) {
    await render(hbs`
      <Hds::Time @date="05 September 2018 14:48" @hasTooltip={{false}} />
    `);
    assert.dom('.hds-tooltip-button').doesNotExist();
  });

  // OPTION: isOpen (tooltip)

  test('it should render the component with the tooltip closed by default', async function (assert) {
    await render(hbs`
      <Hds::Time @date="05 September 2018 14:48" />
    `);
    assert.dom('.tippy-box').doesNotExist();
  });

  test('it should render the component with the tooltip open', async function (assert) {
    await render(hbs`
      <Hds::Time @date="05 September 2018 14:48" @isOpen={{true}} />
    `);
    assert.dom('.tippy-box').exists();
  });

  // OPTION: display

  // Default display type

  // default using Date object
  test('it should render the correct string in the default format when passing a Date object', async function (assert) {
    this.set('defaultDate', new Date('05 September 2018 14:07:32'));
    await render(hbs`
      <Hds::Time @date={{this.defaultDate}} @isOpen={{true}} />
    `);
    let options = DEFAULT_DISPLAY_MAPPING[DISPLAY_KEY_FRIENDLY_LOCAL];
    let expectedDateString = new Date(this.defaultDate).toLocaleString(
      navigator.language,
      options.displayFormat
    );
    assert.dom('.hds-time').hasText(expectedDateString);
    // test tooltip content
    assert.dom('.tippy-content').hasText(this.defaultDate.toISOString());
  });

  // default using ISO date string
  test('it should render the correct string in the default format when passing an ISO date string', async function (assert) {
    await render(hbs`
      <Hds::Time @date="05 September 2018 14:07:32" @isOpen={{true}} />
    `);
    let options = DEFAULT_DISPLAY_MAPPING[DISPLAY_KEY_FRIENDLY_LOCAL];
    let expectedDateString = new Date(
      '05 September 2018 14:07:32'
    ).toLocaleString(navigator.language, options.displayFormat);
    assert.dom('.hds-time').hasText(expectedDateString);
    // test tooltip content
    assert
      .dom('.tippy-content')
      .hasText(new Date('05 September 2018 14:07:32').toISOString());
  });

  // Friendly display types

  // friendly local using Date object
  test('it should render the correct string in friendly local format when passing a Date object', async function (assert) {
    this.set('friendlyLocalDate', new Date('05 September 2018 14:07:32'));
    await render(hbs`
      <Hds::Time @date={{this.friendlyLocalDate}} @display="friendly-local" @isOpen={{true}} />
    `);
    let options = DEFAULT_DISPLAY_MAPPING[DISPLAY_KEY_FRIENDLY_LOCAL];
    let expectedDateString = new Date(this.friendlyLocalDate).toLocaleString(
      navigator.language,
      options.displayFormat
    );
    assert.dom('.hds-time').hasText(expectedDateString);
    // test tooltip content
    assert.dom('.tippy-content').hasText(this.friendlyLocalDate.toISOString());
  });

  // friendly local using ISO date string
  test('it should render the correct string in friendly local format when passing an ISO date string', async function (assert) {
    await render(hbs`
      <Hds::Time @date="05 September 2018 14:07:32" @display="friendly-local" @isOpen={{true}} />
    `);
    let options = DEFAULT_DISPLAY_MAPPING[DISPLAY_KEY_FRIENDLY_LOCAL];
    let expectedDateString = new Date(
      '05 September 2018 14:07:32'
    ).toLocaleString(navigator.language, options.displayFormat);
    assert.dom('.hds-time').hasText(expectedDateString);
    // test tooltip content
    assert
      .dom('.tippy-content')
      .hasText(new Date('05 September 2018 14:07:32').toISOString());
  });

  // friendly only using Date object
  test('it should render the correct string in friendly only format when passing a Date object', async function (assert) {
    this.set('friendlyOnlyDate', new Date('05 September 2018 14:07:32'));

    await render(hbs`
      <Hds::Time @date={{this.friendlyOnlyDate}} @display="friendly-only" @isOpen={{true}} />
    `);
    assert.dom('.hds-time').hasText('Sep 5, 2018');
    // test tooltip content
    assert.dom('.tippy-content').hasText(this.friendlyOnlyDate.toISOString());
  });

  // friendly only using ISO date string
  test('it should render the correct string in friendly only format when passing an ISO date string', async function (assert) {
    await render(hbs`
      <Hds::Time @date="05 September 2018 14:07:32" @display="friendly-only" @isOpen={{true}} />
    `);
    assert.dom('.hds-time').hasText('Sep 5, 2018');
    // test tooltip content
    assert
      .dom('.tippy-content')
      .hasText(new Date('05 September 2018 14:07:32').toISOString());
  });

  // UTC display type

  // UTC using Date object
  test('it should render the correct string in UTC format when passing a Date object', async function (assert) {
    this.set('utcDate', new Date('05 September 2018 14:07:32'));

    await render(hbs`
      <Hds::Time @date={{this.utcDate}} @display="utc" @isOpen={{true}} />
    `);
    assert.dom('.hds-time').hasText(this.utcDate.toISOString());
    // test tooltip content
    assert.dom('.tippy-content').hasText(this.utcDate.toISOString());
  });

  // UTC using ISO date string
  test('it should render the correct string in UTC format when passing an ISO date string', async function (assert) {
    await render(hbs`
      <Hds::Time @date="05 September 2018 14:07:32" @display="utc" @isOpen={{true}} />
    `);
    let date = new Date('05 September 2018 14:07:32');
    assert.dom('.hds-time').hasText(date.toISOString());
    // test tooltip content
    assert.dom('.tippy-content').hasText(date.toISOString());
  });

  // Relative display types

  // NOTE: Relative times in the near future are off by 1

  // near times in the future
  test('it should render the correct string for a date that is five minutes from now', async function (assert) {
    this.set(
      'fiveMinutesFromNow',
      new Date(service.now + MINUTE_IN_MS * (5 + 1))
    );

    await render(hbs`
      <Hds::Time @date={{this.fiveMinutesFromNow}} @display="relative" />
    `);
    assert.dom('.hds-time').hasText('in 5 minutes');
  });

  test('it should render the correct string for a date that is two days from now', async function (assert) {
    this.set('twoDaysFromNow', new Date(service.now + DAY_IN_MS * (2 + 1)));

    await render(hbs`
      <Hds::Time @date={{this.twoDaysFromNow}} @display="relative" />
    `);
    assert.dom('.hds-time').hasText('in 2 days');
  });

  test('it should render the correct string for a date that is one week from now', async function (assert) {
    this.set('oneWeekFromNow', new Date(service.now + DAY_IN_MS * (7 + 1)));

    await render(hbs`
      <Hds::Time @date={{this.oneWeekFromNow}} @display="relative" />
    `);
    assert.dom('.hds-time').hasText('in 7 days');
  });

  // near times in the past

  test('it should render the correct string for a date that is five minutes ago', async function (assert) {
    this.set('fiveMinutesAgo', new Date(service.now - MINUTE_IN_MS * 5));

    await render(hbs`
      <Hds::Time @date={{this.fiveMinutesAgo}} @display="relative" />
    `);
    assert.dom('.hds-time').hasText('5 minutes ago');
  });

  test('it should render the correct string for a date that is two days ago', async function (assert) {
    this.set('twoDaysAgo', new Date(service.now - DAY_IN_MS * 2));

    await render(hbs`
      <Hds::Time @date={{this.twoDaysAgo}} @display="relative" />
    `);
    assert.dom('.hds-time').hasText('2 days ago');
  });

  test('it should render the correct string for a date that is one week ago', async function (assert) {
    this.set('oneWeekAgo', new Date(service.now - DAY_IN_MS * 7));

    await render(hbs`
      <Hds::Time @date={{this.oneWeekAgo}} @display="relative" />
    `);
    assert.dom('.hds-time').hasText('7 days ago');
  });

  // DATE RANGE

  // Date range with the same year

  // same year using Date objects
  test('it should render the correct string for a date range with the same year using Date objects', async function (assert) {
    this.set('startDate', new Date('20 September 2024 14:07:32'));
    this.set('endDate', new Date('25 September 2024 02:07:32'));

    await render(hbs`
      <Hds::Time @startDate={{this.startDate}} @endDate={{this.endDate}} @isOpen={{true}} />
    `);
    assert.dom('.hds-time').hasText('Sep 20 – Sep 25, 2024');
    // test tooltip content
    let expectedTooltipContent = `${this.startDate.toISOString()} – ${this.endDate.toISOString()}`;
    assert.dom('.tippy-content').hasText(expectedTooltipContent);
  });

  // same year using ISO date strings
  test('it should render the correct string for a date range with the same year using ISO date strings', async function (assert) {
    await render(hbs`
      <Hds::Time @startDate="20 September 2024 14:07:32" @endDate="25 September 2024 02:07:32" @isOpen={{true}} />
    `);
    assert.dom('.hds-time').hasText('Sep 20 – Sep 25, 2024');
    // test tooltip content
    let startDate = new Date('20 September 2024 14:07:32');
    let endDate = new Date('25 September 2024 02:07:32');
    let expectedTooltipContent = `${startDate.toISOString()} – ${endDate.toISOString()}`;
    assert.dom('.tippy-content').hasText(expectedTooltipContent);
  });

  // Date range with different years

  // different years using Date objects
  test('it should render the correct string for a date range with different years using Date objects', async function (assert) {
    this.set('startDate', new Date('8 November 2024 14:07:32'));
    this.set('endDate', new Date('20 January 2025 02:07:32'));

    await render(hbs`
      <Hds::Time @startDate={{this.startDate}} @endDate={{this.endDate}} @isOpen={{true}} />
    `);
    assert.dom('.hds-time').hasText('Nov 8, 2024 – Jan 20, 2025');
    // test tooltip content
    let expectedTooltipContent = `${this.startDate.toISOString()} – ${this.endDate.toISOString()}`;
    assert.dom('.tippy-content').hasText(expectedTooltipContent);
  });

  // different years using ISO date strings
  test('it should render the correct string for a date range with different years using ISO date strings', async function (assert) {
    await render(hbs`
      <Hds::Time @startDate="8 November 2024 14:07:32" @endDate="20 January 2025 02:07:32" @isOpen={{true}} />
    `);
    assert.dom('.hds-time').hasText('Nov 8, 2024 – Jan 20, 2025');
    // test tooltip content
    let startDate = new Date('8 November 2024 14:07:32');
    let endDate = new Date('20 January 2025 02:07:32');
    let expectedTooltipContent = `${startDate.toISOString()} – ${endDate.toISOString()}`;
    assert.dom('.tippy-content').hasText(expectedTooltipContent);
  });
});
