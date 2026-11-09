/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import {
  sanitizeGeneratedCssHeaders,
  sanitizeGeneratedCssHeadersWithSourceMap,
} from './sanitize-generated-css-headers.mjs';

describe('sanitizeGeneratedCssHeaders', () => {
  test('keeps one top header and strips duplicate license/autogen headers', () => {
    const css = `@charset "UTF-8";
/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
/**
 * Do not edit directly, this file was auto-generated.
 */
.alpha { color: red; }

/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
.beta { color: blue; }
`;

    const actual = sanitizeGeneratedCssHeaders(css);

    assert.equal(
      actual,
      `@charset "UTF-8";
/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
.alpha { color: red; }

.beta { color: blue; }
`
    );
  });

  test('removes extra blank line after header removal', () => {
    const css = `/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
.one { color: red; }

/**
 * Do not edit directly, this file was auto-generated.
 */



.two { color: blue; }
`;

    const actual = sanitizeGeneratedCssHeaders(css);

    assert.equal(
      actual,
      `/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
.one { color: red; }

.two { color: blue; }
`
    );
  });

  test('preserves non-header comments', () => {
    const css = `/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
/* custom note */
.one { color: red; }
`;

    const actual = sanitizeGeneratedCssHeaders(css);

    assert.match(actual, /\/\* custom note \*\//);
  });

  test('composes source map after header cleanup', () => {
    const css = `/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
/**
 * Do not edit directly, this file was auto-generated.
 */
.alpha {
  color: red;
}
`;

    const sourceMap = {
      version: 3,
      file: 'result.css',
      sourceRoot: '',
      sources: ['source.scss'],
      names: [],
      mappings: 'AAAA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;EAAS,UAAA',
    };

    const sanitized = sanitizeGeneratedCssHeadersWithSourceMap(css, sourceMap, {
      from: 'source.scss',
      to: 'result.css',
    });

    assert.equal(
      sanitized.css,
      `/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
.alpha {
  color: red;
}
`
    );

    assert.ok(sanitized.sourceMap);
    assert.notEqual(sanitized.sourceMap.mappings, sourceMap.mappings);
    assert.equal(sanitized.sourceMap.sources[0], 'source.scss');
    assert.equal(sanitized.sourceMap.file, 'result.css');
  });
});
