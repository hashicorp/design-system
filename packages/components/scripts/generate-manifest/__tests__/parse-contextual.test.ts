import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

import {
  getImportSpecifierForIdentifier,
  parseYieldedSourceText,
} from '../contextual-helpers.ts';
import { parseYieldedNamedBlockProperties } from '../parse-contextual.ts';
import {
  addFixtureSource,
  createFixtureProject,
  getSignatureInterface,
} from './helpers.ts';

describe('parse-contextual: parseYieldedSourceText', () => {
  it('extracts class name and bound args from WithBoundArgs<typeof X, "a" | "b">', () => {
    const parsed = parseYieldedSourceText(
      'WithBoundArgs<typeof HdsFoo, "a" | "b">'
    );

    assert.ok(parsed);
    assert.equal(parsed?.className, 'HdsFoo');
    assert.deepEqual(Array.from(parsed?.boundArgs ?? []), ['a', 'b']);
  });

  it('extracts class name from a plain `typeof X` form with no bound args', () => {
    const parsed = parseYieldedSourceText('typeof HdsBar');

    assert.ok(parsed);
    assert.equal(parsed?.className, 'HdsBar');
    assert.equal(parsed?.boundArgs.size, 0);
  });

  it('returns undefined for unrelated type text', () => {
    assert.equal(parseYieldedSourceText('string'), undefined);
  });

  it('filters out `never` from bound args union', () => {
    const parsed = parseYieldedSourceText(
      'WithBoundArgs<typeof HdsFoo, "a" | never>'
    );

    assert.deepEqual(Array.from(parsed?.boundArgs ?? []), ['a']);
  });
});

describe('parse-contextual: getImportSpecifierForIdentifier (alias resolution)', () => {
  function buildInterfaceFromImports(importsSource: string) {
    const project = createFixtureProject();
    const file = addFixtureSource(
      project,
      '/fixtures/component.ts',
      `
      ${importsSource}

      export interface TestSignature {
        Args: {};
      }
      `
    );

    return getSignatureInterface(file, 'TestSignature');
  }

  it('resolves a default import by its local identifier', () => {
    const decl = buildInterfaceFromImports(`import HdsFoo from './foo';`);

    assert.equal(getImportSpecifierForIdentifier(decl, 'HdsFoo'), './foo');
  });

  it('resolves a non-aliased named import by its original name', () => {
    const decl = buildInterfaceFromImports(`import { HdsFoo } from './foo';`);

    assert.equal(getImportSpecifierForIdentifier(decl, 'HdsFoo'), './foo');
  });

  it('resolves an aliased named import by its local alias', () => {
    // Regression guard: prior implementation only matched the original
    // import name, so `import { Foo as Bar }` failed lookup by `Bar`.
    const decl = buildInterfaceFromImports(
      `import { HdsFoo as Foo } from './foo';`
    );

    assert.equal(getImportSpecifierForIdentifier(decl, 'Foo'), './foo');
  });

  it('still resolves an aliased named import by its original name', () => {
    const decl = buildInterfaceFromImports(
      `import { HdsFoo as Foo } from './foo';`
    );

    assert.equal(getImportSpecifierForIdentifier(decl, 'HdsFoo'), './foo');
  });

  it('returns undefined when identifier is not imported', () => {
    const decl = buildInterfaceFromImports(`import { HdsFoo } from './foo';`);

    assert.equal(getImportSpecifierForIdentifier(decl, 'Missing'), undefined);
  });
});

describe('parse-contextual: parseYieldedNamedBlockProperties precedence parity', () => {
  function parseFixtureBlocks(blocksSource: string) {
    const project = createFixtureProject();
    const file = addFixtureSource(
      project,
      '/fixtures/component.ts',
      `
      export interface TestSignature {
        Blocks: {
          ${blocksSource}
        };
      }
      `
    );

    return parseYieldedNamedBlockProperties(
      getSignatureInterface(file, 'TestSignature')
    );
  }

  it('infers contextual property type and values from a string literal union', () => {
    const props = parseFixtureBlocks(`
      header: [
        {
          size: 'sm' | 'md' | 'lg';
        }
      ];
    `);

    const headerBlock = props.find((p) => p.name === '<:header>');
    assert.ok(headerBlock);
    const size = headerBlock?.properties?.find((p) => p.name.endsWith('.size'));
    assert.equal(size?.type, 'enum');
    assert.deepEqual(size?.values, ['sm', 'md', 'lg']);
  });

  it('lets @values override inferred values on a contextual property', () => {
    const props = parseFixtureBlocks(`
      header: [
        {
          /**
           * @values sm, md
           */
          size: 'sm' | 'md' | 'lg';
        }
      ];
    `);

    const headerBlock = props.find((p) => p.name === '<:header>');
    const size = headerBlock?.properties?.find((p) => p.name.endsWith('.size'));
    assert.deepEqual(size?.values, ['sm', 'md']);
  });

  it('lets @type override the inferred type label and clears inferred values', () => {
    const props = parseFixtureBlocks(`
      header: [
        {
          /**
           * @type icon
           */
          glyph: 'arrow' | 'check';
        }
      ];
    `);

    const headerBlock = props.find((p) => p.name === '<:header>');
    const glyph = headerBlock?.properties?.find((p) =>
      p.name.endsWith('.glyph')
    );
    assert.equal(glyph?.type, 'icon');
    assert.equal(glyph?.values, undefined);
  });

  it('honors both @type and @values together on a contextual property', () => {
    const props = parseFixtureBlocks(`
      header: [
        {
          /**
           * @type enum
           * @values compact, spacious
           */
          layout: 'compact' | 'spacious' | 'legacy';
        }
      ];
    `);

    const headerBlock = props.find((p) => p.name === '<:header>');
    const layout = headerBlock?.properties?.find((p) =>
      p.name.endsWith('.layout')
    );
    assert.equal(layout?.type, 'enum');
    assert.deepEqual(layout?.values, ['compact', 'spacious']);
  });
});
