/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import { readReferences } from './references.mjs';

const serviceImport =
  "import type HdsIntlService from '../../services/hds-intl.ts';";
const helperImport = "import hdsT from '../../helpers/hds-t.ts';";

const read = (source, file = 'src/components/example.gts') =>
  readReferences({ file, source });

const keys = (result) => result.references.map((reference) => reference.key);

const categories = (result) =>
  result.diagnostics.map((diagnostic) => diagnostic.category);

const component = (body) => `
${serviceImport}
export default class Example {
  @service declare readonly hdsIntl: HdsIntlService;
${body}
}
`;

describe('readReferences', () => {
  describe('service calls', () => {
    test('records literal keys from this.hdsIntl.t', () => {
      const result = read(
        component(`  get label() { return this.hdsIntl.t('hds.a', {}); }`),
        'src/components/example.ts'
      );

      assert.deepEqual(result.diagnostics, []);
      assert.deepEqual(keys(result), ['hds.a']);
    });

    test('records no-substitution template literal keys', () => {
      const result = read(
        component('  get label() { return this.hdsIntl.t(`hds.a`); }')
      );

      assert.deepEqual(keys(result), ['hds.a']);
    });

    test('records literal element access to t', () => {
      const result = read(
        component(`  get label() { return this.hdsIntl['t']('hds.a'); }`)
      );

      assert.deepEqual(keys(result), ['hds.a']);
    });

    test('records keys through local aliases and destructuring', () => {
      const result = read(
        component(`
  get aliased() {
    const intl = this.hdsIntl;
    return intl.t('hds.aliased');
  }
  get destructured() {
    const { hdsIntl } = this;
    return hdsIntl.t('hds.destructured');
  }
  get renamed() {
    const { hdsIntl: intl } = this;
    return intl.t('hds.renamed');
  }`)
      );

      assert.deepEqual(result.diagnostics, []);
      assert.deepEqual(keys(result), [
        'hds.aliased',
        'hds.destructured',
        'hds.renamed',
      ]);
    });

    test('records keys inside arrow functions that inherit this', () => {
      const result = read(
        component(`
  get labels() {
    return ['x'].map(() => this.hdsIntl.t('hds.arrow'));
  }`)
      );

      assert.deepEqual(keys(result), ['hds.arrow']);
    });

    test('records keys from typed parameters and Pick types', () => {
      const result = read(
        `
${serviceImport}
export function format(intl: HdsIntlService) {
  return intl.t('hds.param');
}
export function picked(intl: Pick<HdsIntlService, 't'>) {
  return intl.t('hds.picked');
}
export function destructured({ hdsIntl }: { hdsIntl: HdsIntlService }) {
  return hdsIntl.t('hds.destructured-param');
}
`,
        'src/utils/format.ts'
      );

      assert.deepEqual(result.diagnostics, []);
      assert.deepEqual(keys(result), [
        'hds.param',
        'hds.picked',
        'hds.destructured-param',
      ]);
    });

    test('ignores t calls on objects that are not the service', () => {
      const result = read(
        `
const hdsIntl = { t: (key: string) => key };
export const label = hdsIntl.t('not.a.key');
export class Other {
  declare intl: { t(key: string): string };
  get label() { return this.intl.t('also.not.a.key'); }
}
`,
        'src/utils/other.ts'
      );

      assert.deepEqual(result.diagnostics, []);
      assert.deepEqual(keys(result), []);
    });

    test('does not treat this inside a nested function as the component', () => {
      const result = read(
        component(`
  get label() {
    return function (this: { hdsIntl: { t(key: string): string } }) {
      return this.hdsIntl.t('not.a.key');
    };
  }`)
      );

      assert.deepEqual(keys(result), []);
    });

    test('reports dynamic keys as uncheckable', () => {
      const result = read(
        component(`
  get variable() { const key = 'hds.a'; return this.hdsIntl.t(key); }
  get templated() { const s = 'a'; return this.hdsIntl.t(\`hds.\${s}\`); }
  get concatenated() { return this.hdsIntl.t('hds.' + 'a'); }
  get empty() { return this.hdsIntl.t(''); }`)
      );

      assert.deepEqual(keys(result), []);
      assert.deepEqual(categories(result), [
        'uncheckable-call',
        'uncheckable-call',
        'uncheckable-call',
        'uncheckable-call',
      ]);
    });

    test('reports computed method access on the service', () => {
      const result = read(
        component(`
  get label() { const method = 't'; return this.hdsIntl[method]('hds.a'); }`)
      );

      assert.deepEqual(keys(result), []);
      assert.equal(
        result.diagnostics[0]?.message,
        'HDS service method access must use a literal name'
      );
    });

    test('allows the hds-t helper to forward its key', () => {
      const result = read(
        `
${"import type HdsIntlService from '../services/hds-intl.ts';"}
export default class HdsT {
  declare hdsIntl: HdsIntlService;
  compute([key]: [string], named: object) { return this.hdsIntl.t(key, named); }
}
`,
        'src/helpers/hds-t.ts'
      );

      assert.deepEqual(result.diagnostics, []);
      assert.deepEqual(keys(result), []);
    });
  });

  describe('template helper calls', () => {
    test('records literal keys from mustache and sub-expression calls', () => {
      const result = read(`
${helperImport}
<template>
  <span>{{hdsT "hds.mustache"}}</span>
  <Button @text={{hdsT "hds.argument"}} aria-label={{concat (hdsT "hds.sub") "!"}} />
</template>
`);

      assert.deepEqual(result.diagnostics, []);
      assert.deepEqual(keys(result), [
        'hds.mustache',
        'hds.argument',
        'hds.sub',
      ]);
    });

    test('records keys through a renamed helper import', () => {
      const result = read(`
import translate from '../../helpers/hds-t.ts';
<template>{{translate "hds.renamed"}}</template>
`);

      assert.deepEqual(keys(result), ['hds.renamed']);
    });

    test('ignores helpers that are not the hds-t import', () => {
      const result = read(`
import hdsT from './somewhere-else.ts';
<template>{{hdsT "not.a.key"}}</template>
`);

      assert.deepEqual(keys(result), []);
    });

    test('ignores helper names shadowed by block params', () => {
      const result = read(`
${helperImport}
<template>
  {{#each this.items as |hdsT|}}{{hdsT "not.a.key"}}{{/each}}
  <Wrapper as |hdsT|>{{hdsT "also.not.a.key"}}</Wrapper>
</template>
`);

      assert.deepEqual(keys(result), []);
    });

    test('still records helper calls in arguments of an element that yields the same name', () => {
      const result = read(`
${helperImport}
<template>
  <Wrapper @label={{hdsT "hds.outer"}} as |hdsT|>{{hdsT "not.a.key"}}</Wrapper>
</template>
`);

      assert.deepEqual(keys(result), ['hds.outer']);
    });

    test('ignores helper names shadowed in the enclosing script scope', () => {
      const result = read(`
${helperImport}
export function make(hdsT: unknown) {
  return <template>{{hdsT "not.a.key"}}</template>;
}
`);

      assert.deepEqual(keys(result), []);
    });

    test('reports dynamic template keys as uncheckable', () => {
      const result = read(`
${helperImport}
<template>{{hdsT this.key}}{{hdsT}}</template>
`);

      assert.deepEqual(keys(result), []);
      assert.deepEqual(categories(result), [
        'uncheckable-call',
        'uncheckable-call',
      ]);
    });

    test('reports accurate locations for template keys', () => {
      const source = `${helperImport}\n<template>\n  <p>{{hdsT "hds.located"}}</p>\n</template>\n`;
      const result = read(source);

      assert.deepEqual(
        result.references.map(({ line, col }) => ({ line, col })),
        [{ line: 3, col: source.split('\n')[2].indexOf('"') + 1 }]
      );
    });

    test('records both script and template references in class components', () => {
      const result = read(`
${serviceImport}
${helperImport}
export default class Example {
  @service declare readonly hdsIntl: HdsIntlService;
  get label() { return this.hdsIntl.t('hds.script'); }
  <template>{{hdsT "hds.template"}}</template>
}
`);

      assert.deepEqual(result.diagnostics, []);
      assert.deepEqual(keys(result).sort(), ['hds.script', 'hds.template']);
    });
  });

  test('reports parse errors instead of silently skipping the file', () => {
    const result = read('export const = ;', 'src/broken.ts');

    assert.deepEqual(keys(result), []);
    assert.ok(result.diagnostics.length > 0);
    assert.ok(
      result.diagnostics.every(
        (diagnostic) => diagnostic.category === 'parse-error'
      )
    );
  });
});
