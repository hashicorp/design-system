/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { hdsFormatDate } from '@hashicorp/design-system-components/helpers/hds-format-date';

module(
  'Integration | Helper | hds-format-date - hdsFormatDate()',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it formats a date with the provided options', function (assert) {
      const date = new Date('2021-01-01T00:00:00Z');
      const options: {
        month: Intl.DateTimeFormatOptions['month'];
        day: Intl.DateTimeFormatOptions['day'];
        year?: Intl.DateTimeFormatOptions['year'];
        hour?: Intl.DateTimeFormatOptions['hour'];
        minute?: Intl.DateTimeFormatOptions['minute'];
        second?: Intl.DateTimeFormatOptions['second'];
        timeZoneName?: Intl.DateTimeFormatOptions['timeZoneName'];
      } = {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
      };
      const result = hdsFormatDate([date, options]);

      assert.strictEqual(
        result,
        new Intl.DateTimeFormat(navigator.language, options).format(date),
      );
    });
  },
);
