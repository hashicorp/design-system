/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import { flattenLocale } from './flatten.mjs';

describe('flattenLocale', () => {
  test('produces sorted ember-intl runtime keys', () => {
    const flat = flattenLocale(
      [
        {
          file: 'hds/components/tag/en-us.yaml',
          source: 'dismiss-button:\n  aria-label: Dismiss {text}\n',
        },
        {
          file: 'hds/components/alert/en-us.yaml',
          source: 'zeta: Z\nalpha:\n  beta: B\n',
        },
      ],
      'en-us'
    );

    assert.deepEqual(Object.entries(flat), [
      ['hds.components.alert.alpha.beta', 'B'],
      ['hds.components.alert.zeta', 'Z'],
      ['hds.components.tag.dismiss-button.aria-label', 'Dismiss {text}'],
    ]);
  });

  test('sorts by code point rather than locale collation', () => {
    const flat = flattenLocale(
      [{ file: 'hds/en-us.yaml', source: 'b: B\nB: Upper\na-b: Dash\na: A\n' }],
      'en-us'
    );

    assert.deepEqual(Object.keys(flat), ['hds.B', 'hds.a', 'hds.a-b', 'hds.b']);
  });

  test('flattens only the requested locale', () => {
    const files = [
      { file: 'hds/tag/en-us.yaml', source: 'dismiss: Dismiss\n' },
      { file: 'hds/tag/fr-fr.yaml', source: 'dismiss: Fermer\n' },
    ];

    assert.deepEqual(flattenLocale(files, 'fr-fr'), {
      'hds.tag.dismiss': 'Fermer',
    });
    assert.deepEqual(flattenLocale(files, 'en-us'), {
      'hds.tag.dismiss': 'Dismiss',
    });
  });

  test('preserves loaded values that need quoting', () => {
    const flat = flattenLocale(
      [
        {
          file: 'hds/en-us.yaml',
          source:
            'pair: "{key}: {value}"\ncount: "{count, plural, one {# item} other {# items}}"\n',
        },
      ],
      'en-us'
    );

    assert.deepEqual(flat, {
      'hds.count': '{count, plural, one {# item} other {# items}}',
      'hds.pair': '{key}: {value}',
    });
  });

  test('throws with diagnostics when the catalog is invalid', () => {
    assert.throws(
      () =>
        flattenLocale(
          [{ file: 'hds/en-us.yaml', source: 'a: One\na: Two\n' }],
          'en-us'
        ),
      /^Error: Invalid translation catalog:\ntranslations\/hds\/en-us\.yaml:2:1 \[invalid-catalog\]/
    );
  });
});
