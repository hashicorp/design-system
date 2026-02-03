/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import HdsTimeService, {
  HdsDisplayKeyValues,
  DEFAULT_DISPLAY_MAPPING,
  MINUTE_IN_MS,
  DAY_IN_MS,
  THRESHOLD_RELATIVE_TIME_IN_MS,
} from '@hashicorp/design-system-components/services/hds-time';
import { HdsTime } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/time/index', function (hooks) {
  setupRenderingTest(hooks);
  // set the locale to 'en-US' to simplify tests; alternatively we can use ember-intl
  Object.defineProperty(navigator, 'language', { value: 'en-US' });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template>
        <HdsTime @date="05 September 2018 14:48" id="test-time" />
      </template>,
    );
    assert.dom('#test-time').hasClass('hds-time');
  });

  // OPTIONS

  // OPTION: hasTooltip

  test('it should render the component with a tooltip by default', async function (assert) {
    await render(
      <template><HdsTime @date="05 September 2018 14:48" /></template>,
    );
    assert.dom('.hds-tooltip-button').exists();
  });

  test('it should render the component without a tooltip', async function (assert) {
    await render(
      <template>
        <HdsTime @date="05 September 2018 14:48" @hasTooltip={{false}} />
      </template>,
    );
    assert.dom('.hds-tooltip-button').doesNotExist();
  });

  // OPTION: isOpen (tooltip)

  test('it should render the component with the tooltip closed by default', async function (assert) {
    await render(
      <template><HdsTime @date="05 September 2018 14:48" /></template>,
    );
    assert.dom('.tippy-box').doesNotExist();
  });

  test('it should render the component with the tooltip open', async function (assert) {
    await render(
      <template>
        <HdsTime @date="05 September 2018 14:48" @isOpen={{true}} />
      </template>,
    );
    assert.dom('.tippy-box').exists();
  });

  // OPTION: display

  test('it uses relative display as the default when passing a date object with a date within 7 days in the future from now', async function (assert) {
    const service = this.owner.lookup('service:hdsTime') as HdsTimeService;
    const exactlySevenDaysFromNow = new Date(
      service.now + THRESHOLD_RELATIVE_TIME_IN_MS,
    );

    await render(
      <template><HdsTime @date={{exactlySevenDaysFromNow}} /></template>,
    );
    assert.dom('.hds-time').includesText('in');
    assert.dom('.hds-time').includesText('days');
  });

  test('it uses relative display as the default when passing a date object with a date within 7 days in the past from now', async function (assert) {
    const service = this.owner.lookup('service:hdsTime') as HdsTimeService;
    const exactlySevenDaysFromNow = new Date(
      service.now - THRESHOLD_RELATIVE_TIME_IN_MS + DAY_IN_MS,
    );

    await render(
      <template><HdsTime @date={{exactlySevenDaysFromNow}} /></template>,
    );
    assert.dom('.hds-time').includesText('days');
    assert.dom('.hds-time').includesText('ago');
  });

  test('it uses friendly-local display as the default when passing a date object with a date more than 7 days in the future from now', async function (assert) {
    const service = this.owner.lookup('service:hdsTime') as HdsTimeService;
    const justOverSevenDaysFromNow = new Date(
      service.now + THRESHOLD_RELATIVE_TIME_IN_MS + DAY_IN_MS,
    );

    await render(
      <template>
        <HdsTime @date={{justOverSevenDaysFromNow}} @isOpen={{true}} />
      </template>,
    );

    const options = DEFAULT_DISPLAY_MAPPING[HdsDisplayKeyValues.FriendlyLocal];

    if (options?.displayFormat !== null) {
      const expectedDateString = new Date(
        justOverSevenDaysFromNow,
      ).toLocaleString(
        navigator.language,
        // @ts-expect-error - displayFormat exists if options exists
        options.displayFormat,
      );
      assert.dom('.hds-time').hasText(expectedDateString);
      // test tooltip content
      assert
        .dom('.tippy-content')
        .hasText(justOverSevenDaysFromNow.toISOString());
    }
  });

  test('it uses friendly-local display as the default when passing a date object with a date more than 7 days in the past from now', async function (assert) {
    const service = this.owner.lookup('service:hdsTime') as HdsTimeService;
    const justOverSevenDaysFromNow = new Date(
      service.now - THRESHOLD_RELATIVE_TIME_IN_MS - DAY_IN_MS,
    );

    await render(
      <template>
        <HdsTime @date={{justOverSevenDaysFromNow}} @isOpen={{true}} />
      </template>,
    );

    const options = DEFAULT_DISPLAY_MAPPING[HdsDisplayKeyValues.FriendlyLocal];

    if (options?.displayFormat !== null) {
      const expectedDateString = new Date(
        justOverSevenDaysFromNow,
      ).toLocaleString(
        navigator.language,
        // @ts-expect-error - displayFormat exists if options exists
        options.displayFormat,
      );
      assert.dom('.hds-time').hasText(expectedDateString);
      // test tooltip content
      assert
        .dom('.tippy-content')
        .hasText(justOverSevenDaysFromNow.toISOString());
    }
  });

  // default using ISO date string
  test('it should render the correct string in the default format when passing an ISO date string', async function (assert) {
    await render(
      <template>
        <HdsTime @date="05 September 2018 14:07:32" @isOpen={{true}} />
      </template>,
    );
    const options = DEFAULT_DISPLAY_MAPPING[HdsDisplayKeyValues.FriendlyLocal];

    if (options?.displayFormat !== null) {
      const expectedDateString = new Date(
        '05 September 2018 14:07:32',
      ).toLocaleString(
        navigator.language,
        // @ts-expect-error - displayFormat exists if options exists
        options.displayFormat,
      );
      assert.dom('.hds-time').hasText(expectedDateString);
      // test tooltip content
      assert
        .dom('.tippy-content')
        .hasText(new Date('05 September 2018 14:07:32').toISOString());
    }
  });

  // Friendly display types

  // friendly local using Date object
  test('it should render the correct string in friendly local format when passing a Date object', async function (assert) {
    const friendlyLocalDate = new Date('05 September 2018 14:07:32');

    await render(
      <template>
        <HdsTime
          @date={{friendlyLocalDate}}
          @display="friendly-local"
          @isOpen={{true}}
        />
      </template>,
    );
    const options = DEFAULT_DISPLAY_MAPPING[HdsDisplayKeyValues.FriendlyLocal];

    if (options?.displayFormat !== null) {
      const expectedDateString = new Date(friendlyLocalDate).toLocaleString(
        navigator.language,
        // @ts-expect-error - displayFormat exists if options exists
        options.displayFormat,
      );
      assert.dom('.hds-time').hasText(expectedDateString);
      // test tooltip content
      assert.dom('.tippy-content').hasText(friendlyLocalDate.toISOString());
    }
  });

  // friendly local using ISO date string
  test('it should render the correct string in friendly local format when passing an ISO date string', async function (assert) {
    await render(
      <template>
        <HdsTime
          @date="05 September 2018 14:07:32"
          @display="friendly-local"
          @isOpen={{true}}
        />
      </template>,
    );
    const options = DEFAULT_DISPLAY_MAPPING[HdsDisplayKeyValues.FriendlyLocal];

    if (options?.displayFormat !== null) {
      const expectedDateString = new Date(
        '05 September 2018 14:07:32',
      ).toLocaleString(
        navigator.language,
        // @ts-expect-error - displayFormat exists if options exists
        options.displayFormat,
      );
      assert.dom('.hds-time').hasText(expectedDateString);
      // test tooltip content
      assert
        .dom('.tippy-content')
        .hasText(new Date('05 September 2018 14:07:32').toISOString());
    }
  });

  // friendly only using Date object
  test('it should render the correct string in friendly only format when passing a Date object', async function (assert) {
    const friendlyOnlyDate = new Date('05 September 2018 14:07:32');

    await render(
      <template>
        <HdsTime
          @date={{friendlyOnlyDate}}
          @display="friendly-only"
          @isOpen={{true}}
        />
      </template>,
    );
    assert.dom('.hds-time').hasText('Sep 5, 2018');
    // test tooltip content
    assert.dom('.tippy-content').hasText(friendlyOnlyDate.toISOString());
  });

  // friendly only using ISO date string
  test('it should render the correct string in friendly only format when passing an ISO date string', async function (assert) {
    await render(
      <template>
        <HdsTime
          @date="05 September 2018 14:07:32"
          @display="friendly-only"
          @isOpen={{true}}
        />
      </template>,
    );
    assert.dom('.hds-time').hasText('Sep 5, 2018');
    // test tooltip content
    assert
      .dom('.tippy-content')
      .hasText(new Date('05 September 2018 14:07:32').toISOString());
  });

  // UTC display type

  // UTC using Date object
  test('it should render the correct string in UTC format when passing a Date object', async function (assert) {
    const utcDate = new Date('05 September 2018 14:07:32');

    await render(
      <template>
        <HdsTime @date={{utcDate}} @display="utc" @isOpen={{true}} />
      </template>,
    );
    assert.dom('.hds-time').hasText(utcDate.toISOString());
    // test tooltip content
    assert.dom('.tippy-content').hasText(utcDate.toISOString());
  });

  // UTC using ISO date string
  test('it should render the correct string in UTC format when passing an ISO date string', async function (assert) {
    await render(
      <template>
        <HdsTime
          @date="05 September 2018 14:07:32"
          @display="utc"
          @isOpen={{true}}
        />
      </template>,
    );
    const date = new Date('05 September 2018 14:07:32');
    assert.dom('.hds-time').hasText(date.toISOString());
    // test tooltip content
    assert.dom('.tippy-content').hasText(date.toISOString());
  });

  // Relative display types

  // NOTE: Relative times in the near future are off by 1

  // near times in the future
  test('it should render the correct string for a date that is five minutes from now', async function (assert) {
    const service = this.owner.lookup('service:hdsTime') as HdsTimeService;
    const fiveMinutesFromNow = new Date(service.now + MINUTE_IN_MS * (5 + 1));

    await render(
      <template>
        <HdsTime @date={{fiveMinutesFromNow}} @display="relative" />
      </template>,
    );
    assert.dom('.hds-time').hasText('in 5 minutes');
  });

  test('it should render the correct string for a date that is two days from now', async function (assert) {
    const service = this.owner.lookup('service:hdsTime') as HdsTimeService;
    const twoDaysFromNow = new Date(service.now + DAY_IN_MS * (2 + 1));

    await render(
      <template>
        <HdsTime @date={{twoDaysFromNow}} @display="relative" />
      </template>,
    );
    assert.dom('.hds-time').hasText('in 2 days');
  });

  test('it should render the correct string for a date that is one week from now', async function (assert) {
    const service = this.owner.lookup('service:hdsTime') as HdsTimeService;
    const oneWeekFromNow = new Date(service.now + DAY_IN_MS * (7 + 1));

    await render(
      <template>
        <HdsTime @date={{oneWeekFromNow}} @display="relative" />
      </template>,
    );
    assert.dom('.hds-time').hasText('in 7 days');
  });

  // near times in the past

  test('it should render the correct string for a date that is five minutes ago', async function (assert) {
    const service = this.owner.lookup('service:hdsTime') as HdsTimeService;
    const fiveMinutesAgo = new Date(service.now - MINUTE_IN_MS * 5);

    await render(
      <template>
        <HdsTime @date={{fiveMinutesAgo}} @display="relative" />
      </template>,
    );
    assert.dom('.hds-time').hasText('5 minutes ago');
  });

  test('it should render the correct string for a date that is two days ago', async function (assert) {
    const service = this.owner.lookup('service:hdsTime') as HdsTimeService;
    const twoDaysAgo = new Date(service.now - DAY_IN_MS * 2);

    await render(
      <template><HdsTime @date={{twoDaysAgo}} @display="relative" /></template>,
    );
    assert.dom('.hds-time').hasText('2 days ago');
  });

  test('it should render the correct string for a date that is one week ago', async function (assert) {
    const service = this.owner.lookup('service:hdsTime') as HdsTimeService;
    const oneWeekAgo = new Date(service.now - DAY_IN_MS * 7);

    await render(
      <template><HdsTime @date={{oneWeekAgo}} @display="relative" /></template>,
    );
    assert.dom('.hds-time').hasText('7 days ago');
  });

  // DATE RANGE

  // Date range with the same year

  // same year using Date objects
  test('it should render the correct string for a date range with the same year using Date objects', async function (assert) {
    const startDate = new Date('20 September 2024 14:07:32');
    const endDate = new Date('25 September 2024 02:07:32');

    await render(
      <template>
        <HdsTime
          @startDate={{startDate}}
          @endDate={{endDate}}
          @isOpen={{true}}
        />
      </template>,
    );
    assert.dom('.hds-time').hasText('Sep 20 – Sep 25, 2024');
    // test tooltip content
    const expectedTooltipContent = `${startDate.toISOString()}–${endDate.toISOString()}`;
    assert.dom('.tippy-content').hasText(expectedTooltipContent);
  });

  // same year using ISO date strings
  test('it should render the correct string for a date range with the same year using ISO date strings', async function (assert) {
    await render(
      <template>
        <HdsTime
          @startDate="20 September 2024 14:07:32"
          @endDate="25 September 2024 02:07:32"
          @isOpen={{true}}
        />
      </template>,
    );
    assert.dom('.hds-time').hasText('Sep 20 – Sep 25, 2024');
    // test tooltip content
    const startDate = new Date('20 September 2024 14:07:32');
    const endDate = new Date('25 September 2024 02:07:32');
    const expectedTooltipContent = `${startDate.toISOString()}–${endDate.toISOString()}`;
    assert.dom('.tippy-content').hasText(expectedTooltipContent);
  });

  // Date range with different years

  // different years using Date objects
  test('it should render the correct string for a date range with different years using Date objects', async function (assert) {
    const startDate = new Date('8 November 2024 14:07:32');
    const endDate = new Date('20 January 2025 02:07:32');

    await render(
      <template>
        <HdsTime
          @startDate={{startDate}}
          @endDate={{endDate}}
          @isOpen={{true}}
        />
      </template>,
    );
    assert.dom('.hds-time').hasText('Nov 8, 2024 – Jan 20, 2025');
    // test tooltip content
    const expectedTooltipContent = `${startDate.toISOString()}–${endDate.toISOString()}`;
    assert.dom('.tippy-content').hasText(expectedTooltipContent);
  });

  // different years using ISO date strings
  test('it should render the correct string for a date range with different years using ISO date strings', async function (assert) {
    await render(
      <template>
        <HdsTime
          @startDate="8 November 2024 14:07:32"
          @endDate="20 January 2025 02:07:32"
          @isOpen={{true}}
        />
      </template>,
    );
    assert.dom('.hds-time').hasText('Nov 8, 2024 – Jan 20, 2025');
    // test tooltip content
    const startDate = new Date('8 November 2024 14:07:32');
    const endDate = new Date('20 January 2025 02:07:32');
    const expectedTooltipContent = `${startDate.toISOString()}–${endDate.toISOString()}`;
    assert.dom('.tippy-content').hasText(expectedTooltipContent);
  });
});
