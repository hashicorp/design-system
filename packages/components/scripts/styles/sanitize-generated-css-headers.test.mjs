/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import * as sass from 'sass';
import postcss from 'postcss';

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
    const scss = `/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
/**
 * Do not edit directly, this file was auto-generated.
 */
.alpha {
  .beta {
    color: red;
  }
}
`;

    const compiled = sass.compileString(scss, {
      style: 'expanded',
      sourceMap: true,
      url: new URL('file:///source.scss'),
    });

    const sanitized = sanitizeGeneratedCssHeadersWithSourceMap(
      compiled.css,
      compiled.sourceMap,
      {
        from: 'source.scss',
        to: 'result.css',
      }
    );

    assert.equal(
      sanitized.css,
      `/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
.alpha .beta {
  color: red;
}`
    );

    assert.ok(sanitized.sourceMap);
    assert.notEqual(sanitized.sourceMap.mappings, compiled.sourceMap.mappings);
    assert.equal(sanitized.sourceMap.sources[0], 'file:///source.scss');
    assert.equal(sanitized.sourceMap.file, 'result.css');

    const remapped = postcss().process(sanitized.css, {
      from: 'result.css',
      map: {
        prev: sanitized.sourceMap,
      },
    });

    let colorDeclaration;

    remapped.root.walkDecls((node) => {
      if (node.prop === 'color') {
        colorDeclaration = node;
      }
    });

    assert.ok(colorDeclaration);
    const originalPosition = colorDeclaration.source.input
      .map.consumer()
      .originalPositionFor({
        line: colorDeclaration.source.start.line,
        column: colorDeclaration.source.start.column - 1,
      });

    assert.deepEqual(originalPosition, {
      source: 'file:///source.scss',
      line: 10,
      column: 4,
      name: null,
    });
  });

  test('preserves source mappings for multiple declarations after header cleanup', () => {
    const scss = `/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
/**
 * Do not edit directly, this file was auto-generated.
 */
.alpha {
  .beta {
    color: red;
    background-color: blue;
  }
}

.gamma {
  border-width: 1px;
}
`;

    const compiled = sass.compileString(scss, {
      style: 'expanded',
      sourceMap: true,
      url: new URL('file:///source.scss'),
    });

    const sanitized = sanitizeGeneratedCssHeadersWithSourceMap(
      compiled.css,
      compiled.sourceMap,
      {
        from: 'source.scss',
        to: 'result.css',
      }
    );

    assert.equal(
      sanitized.css,
      `/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
.alpha .beta {
  color: red;
  background-color: blue;
}

.gamma {
  border-width: 1px;
}`
    );

    const remapped = postcss().process(sanitized.css, {
      from: 'result.css',
      map: {
        prev: sanitized.sourceMap,
      },
    });

    const declarationPositions = new Map();

    remapped.root.walkDecls((node) => {
      const originalPosition = node.source.input
        .map.consumer()
        .originalPositionFor({
          line: node.source.start.line,
          column: node.source.start.column - 1,
        });

      declarationPositions.set(node.prop, originalPosition);
    });

    assert.deepEqual(declarationPositions.get('color'), {
      source: 'file:///source.scss',
      line: 10,
      column: 4,
      name: null,
    });

    assert.deepEqual(declarationPositions.get('background-color'), {
      source: 'file:///source.scss',
      line: 11,
      column: 4,
      name: null,
    });

    assert.deepEqual(declarationPositions.get('border-width'), {
      source: 'file:///source.scss',
      line: 16,
      column: 2,
      name: null,
    });
  });
});
