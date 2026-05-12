/**
 * Copyright HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

/* eslint-env node */

'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const {
  hydrateManifestApiDirectives,
} = require('../../lib/markdown/component-api-from-manifest.js');

test('hydrates arguments directive for accordion docs', () => {
  const output = hydrateManifestApiDirectives(
    '<!-- hds-api:arguments -->',
    'components/accordion/index.md'
  );

  assert.match(output, /<Doc::ComponentApi as \|C\|>/u);
  assert.match(output, /@name="size"/u);
  assert.match(output, /@name="\.\.\.attributes"/u);
});

test('hydrates contextual args directive for accordion item', () => {
  const output = hydrateManifestApiDirectives(
    '<!-- hds-api:contextual-args name=Item -->',
    'components/accordion/index.md'
  );

  assert.match(output, /@name="<:toggle>"/u);
  assert.match(output, /@name="ariaLabel"/u);
});

test('keeps markdown unchanged when no hds-api directive exists', () => {
  const markdown = 'No directive here.';
  const output = hydrateManifestApiDirectives(
    markdown,
    'components/accordion/index.md'
  );

  assert.equal(output, markdown);
});
