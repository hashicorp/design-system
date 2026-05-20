import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

import { parseArgs } from '../parsers/parse-args.ts';
import {
  addFixtureSource,
  createFixtureProject,
  getSignatureInterface,
} from './helpers.ts';

/**
 * Build a minimal Signature interface and return its parsed args.
 */
function parseFixtureArgs(argsSource: string) {
  const project = createFixtureProject();
  const file = addFixtureSource(
    project,
    '/fixtures/component.ts',
    `
    export interface TestSignature {
      Args: {
        ${argsSource}
      };
    }
    `
  );

  return parseArgs(getSignatureInterface(file, 'TestSignature'));
}

describe('parse-args: baseline inference', () => {
  it('infers an enum type and values from a string literal union', () => {
    const args = parseFixtureArgs(`
      size?: 'sm' | 'md' | 'lg';
    `);

    assert.equal(args.length, 1);
    const [arg] = args;
    assert.equal(arg?.name, 'size');
    assert.equal(arg?.type, 'enum');
    assert.deepEqual(arg?.values, ['sm', 'md', 'lg']);
    assert.equal(arg?.required, false);
  });

  it('marks args without a `?` token as required', () => {
    const args = parseFixtureArgs(`
      label: string;
    `);

    const [arg] = args;
    assert.equal(arg?.required, true);
    assert.equal(arg?.type, 'string');
    assert.equal(arg?.values, undefined);
  });
});

describe('parse-args: @values precedence', () => {
  it('lets @values override inferred enum values', () => {
    const args = parseFixtureArgs(`
      /**
       * Visual size.
       * @values sm, md, lg
       */
      size?: 'sm' | 'md' | 'lg' | 'legacy';
    `);

    const [arg] = args;
    assert.deepEqual(arg?.values, ['sm', 'md', 'lg']);
  });

  it('does not allow inferred values to overwrite @values when both are present', () => {
    // Regression guard: prior order-of-operations bug let parsedType.values
    // be assigned after @values, silently undoing the override.
    const args = parseFixtureArgs(`
      /**
       * @values primary, secondary
       */
      color?: 'primary' | 'secondary' | 'experimental';
    `);

    const [arg] = args;
    assert.deepEqual(arg?.values, ['primary', 'secondary']);
  });

  it('keeps inferred values when @values tag is absent', () => {
    const args = parseFixtureArgs(`
      /** Just a description, no values tag. */
      tone?: 'neutral' | 'critical';
    `);

    const [arg] = args;
    assert.deepEqual(arg?.values, ['neutral', 'critical']);
  });
});

describe('parse-args: @type precedence', () => {
  it('lets @type override the inferred type label and clears inferred values', () => {
    const args = parseFixtureArgs(`
      /**
       * @type icon
       */
      icon?: 'arrow' | 'check';
    `);

    const [arg] = args;
    assert.equal(arg?.type, 'icon');
    assert.equal(arg?.values, undefined);
  });

  it('honors both @type and @values when both are present (values wins last)', () => {
    const args = parseFixtureArgs(`
      /**
       * @type enum
       * @values compact, spacious
       */
      layout?: 'compact' | 'spacious' | 'legacy';
    `);

    const [arg] = args;
    assert.equal(arg?.type, 'enum');
    assert.deepEqual(arg?.values, ['compact', 'spacious']);
  });
});

describe('parse-args: default/description/notes/links passthrough', () => {
  it('captures description and @default', () => {
    const args = parseFixtureArgs(`
      /**
       * The visible label.
       * @default "Submit"
       */
      label?: string;
    `);

    const [arg] = args;
    assert.equal(arg?.description, 'The visible label.');
    assert.equal(arg?.default, 'Submit');
  });
});
