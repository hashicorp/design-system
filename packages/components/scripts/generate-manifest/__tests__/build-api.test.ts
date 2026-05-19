import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

import { SPLATTRIBUTES_API_PROPERTY, buildApi } from '../build-api.ts';
import type { CatalogArg, CatalogBlock } from '../types.ts';

const SAMPLE_ARG: CatalogArg = {
  name: 'size',
  type: 'enum',
  required: false,
  values: ['sm', 'md'],
};

const SAMPLE_BLOCK: CatalogBlock = {
  name: 'default',
};

describe('build-api: `...attributes` emission', () => {
  it('omits api.arguments when there are no args and no splattributes', () => {
    const api = buildApi([], [], [], false);

    assert.equal(api.arguments, undefined);
  });

  it('emits api.arguments with only `...attributes` when args are empty and splattributes is true', () => {
    const api = buildApi([], [], [], true);

    assert.ok(api.arguments, 'expected api.arguments to be defined');
    assert.equal(api.arguments?.length, 1);
    assert.equal(api.arguments?.[0]?.name, SPLATTRIBUTES_API_PROPERTY.name);
  });

  it('appends `...attributes` after explicit args when both are present', () => {
    const api = buildApi([SAMPLE_ARG], [], [], true);

    assert.ok(api.arguments);
    assert.equal(api.arguments?.length, 2);
    assert.equal(api.arguments?.[0]?.name, 'size');
    assert.equal(
      api.arguments?.[api.arguments.length - 1]?.name,
      SPLATTRIBUTES_API_PROPERTY.name
    );
  });

  it('does not append `...attributes` when splattributes is false but args exist', () => {
    const api = buildApi([SAMPLE_ARG], [], [], false);

    assert.ok(api.arguments);
    assert.equal(api.arguments?.length, 1);
    assert.equal(api.arguments?.[0]?.name, 'size');
  });

  it('preserves blocks and contextualComponents independently from splattributes behavior', () => {
    const api = buildApi(
      [],
      [SAMPLE_BLOCK],
      [{ name: '[B].foo', type: 'yielded tracked property' }],
      true
    );

    assert.ok(api.arguments);
    assert.equal(api.arguments?.length, 1);
    assert.equal(api.blocks?.length, 1);
    assert.equal(api.contextualComponents?.length, 1);
  });
});
