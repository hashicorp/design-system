/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hdsFormatDate } from '@hashicorp/design-system-components/helpers/hds-format-date';

module(
  'Integration | Helper | hds-format-date - hdsFormatDate()',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it formats a date with the provided options', async function (assert) {
      assert.expect(1);

      const date = new Date('2021-01-01T00:00:00Z');
      const options = {
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
        new Intl.DateTimeFormat(navigator.language, options).format(date)
      );
    });
  }
);
