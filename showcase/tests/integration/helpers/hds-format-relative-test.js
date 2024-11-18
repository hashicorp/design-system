/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hdsFormatRelative } from '@hashicorp/design-system-components/helpers/hds-format-relative';

module(
  'Integration | Helper | hds-format-relative - hdsFormatRelative()',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it formats a relative time with the default options', async function (assert) {
      const value = -1;
      const result = hdsFormatRelative([value]);

      assert.strictEqual(
        result,
        new Intl.RelativeTimeFormat(navigator.language).format(value, 'day')
      );
    });

    test('it formats a relative time with the provided options', async function (assert) {
      const value = -1;
      const unit = 'day';
      const result = hdsFormatRelative([value, unit]);

      assert.strictEqual(
        result,
        new Intl.RelativeTimeFormat(navigator.language).format(value, unit)
      );
    });
  }
);
