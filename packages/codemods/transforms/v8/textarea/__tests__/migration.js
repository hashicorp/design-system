/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const vm = require('node:vm');
const { parse } = require('@babel/parser');
const { Preprocessor } = require('content-tag');
const { migrate } = require('../migrate');

const root = '/textarea-migration-fixture/app';
const component = "import Component from '@glimmer/component';";
const directImport =
  "import Textarea from '@hashicorp/design-system-components/components/hds/form/textarea/field';";
let warn;

beforeEach(() => {
  warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
});
afterEach(() => warn.mockRestore());

function check(files) {
  const changes = migrate(files);
  const combined = { ...files, ...changes };
  expect(migrate(combined)).toEqual({});
  for (const [filename, source] of Object.entries(changes)) {
    if (filename.endsWith('.hbs')) continue;
    let script = source;
    if (/\.(gts|gjs)$/.test(filename)) {
      const processor = new Preprocessor();
      try {
        script = processor.process(source, { filename }).code;
      } finally {
        processor.free();
      }
    }
    expect(() =>
      parse(script, {
        sourceType: 'module',
        plugins: ['decorators-legacy', ...(filename.endsWith('ts') ? ['typescript'] : [])],
      })
    ).not.toThrow();
  }
  return changes;
}

describe('paired Textarea migration', () => {
  it.each(['js', 'ts'])('updates a colocated template and backing .%s class', (extension) => {
    const template = `${root}/components/example.hbs`;
    const script = `${root}/components/example.${extension}`;
    const changes = check({
      [template]:
        '<Hds::Form::Textarea::Field @value={{this.description}} {{on "input" this.validate}} />',
      [script]: `${component}\nexport default class Example extends Component {}`,
    });
    expect(changes[template]).toContain(
      '{{on "input" (fn this.hdsTextareaValueChange this "description")}}'
    );
    expect(changes[template].indexOf('hdsTextareaValueChange')).toBeLessThan(
      changes[template].indexOf('this.validate')
    );
    expect(changes[template]).toContain('{{on "input" this.validate}}');
    expect(changes[script]).toContain("import { set } from '@ember/object'");
    expect(changes[script]).toContain(
      extension === 'ts' ? 'object: object, key: string, event: Event' : 'object, key, event'
    );
    expect(warn).not.toHaveBeenCalled();
  });

  it('finds classic template/component pairs and preserves existing Ember actions', () => {
    const template = `${root}/templates/components/example.hbs`;
    const script = `${root}/components/example.js`;
    const changes = check({
      [template]: '<Hds::Form::Textarea::Base @value={{this.model.description}} />',
      [script]: `${component}\nimport { action as bind } from '@ember/object';\nexport default Component.extend({ actions: { save() {} } });`,
    });
    expect(changes[script]).toContain('hdsTextareaValueChange: bind(function (object, key, event)');
    expect(changes[script]).toContain('actions: { save() {} }');
    expect(changes[template]).toContain('this.model "description"');
  });

  it('finds route controllers and named default-exported classes', () => {
    const template = `${root}/templates/settings.hbs`;
    const script = `${root}/controllers/settings.js`;
    const changes = check({
      [template]: '<Hds::Form::Textarea::Field @value={{this.description}} />',
      [script]:
        "import Controller from '@ember/controller';\nclass Settings extends Controller {}\nexport default Settings;",
    });

    expect(changes[script]).toContain('hdsTextareaValueChange =');
  });

  it('finds pod template/component pairs', () => {
    const script = `${root}/components/example/component.js`;
    const changes = check({
      [`${root}/components/example/template.hbs`]:
        '<Hds::Form::Textarea::Field @value={{this.description}} />',
      [script]: `${component}\nexport default class Example extends Component {}`,
    });
    expect(changes[script]).toContain('hdsTextareaValueChange =');
  });

  it('retains comments containing commas in classic objects', () => {
    const script = `${root}/components/example.js`;
    const changes = check({
      [`${root}/components/example.hbs`]:
        '<Hds::Form::Textarea::Field @value={{this.description}} />',
      [script]: `${component}\nexport default Component.extend({ description: '' /* , */ });`,
    });
    expect(changes[script]).toContain('/* , */');
  });

  it('uses one backing handler for multiple fields and contextual row values', () => {
    const template = `${root}/components/example.hbs`;
    const script = `${root}/components/example.js`;
    const changes = check({
      [template]: `<Hds::Form::Textarea::Base @value={{this.first}} />
<Hds::Form::Textarea::Field @value={{@model.description}} />
<Hds::Form::KeyValueInputs @data={{this.rows}}>
  <:row as |R|><R.Field as |F|><F.Textarea @value={{R.rowData.value}} /></R.Field></:row>
</Hds::Form::KeyValueInputs>`,
      [script]: `${component}\nexport default class Example extends Component {}`,
    });
    expect(changes[script].match(/hdsTextareaValueChange =/g)).toHaveLength(1);
    expect(changes[template]).toContain('R.rowData "value"');
    expect(changes[template]).toContain('@model "description"');
    expect(changes[template].match(/hdsTextareaValueChange/g)).toHaveLength(6);
  });

  it('does not edit getters, readonly state, forwarded attributes or complex bindings', () => {
    const template = `${root}/components/example.hbs`;
    const script = `${root}/components/example.ts`;
    expect(
      check({
        [template]: `<Hds::Form::Textarea::Base @value={{this.description}} />
<Hds::Form::Textarea::Base @value={{this.fixed}} />
<Hds::Form::Textarea::Base @value={{this.other}} ...attributes />
<Hds::Form::Textarea::Base @value={{concat this.other ""}} />
<Hds::Form::Textarea::Base @value={{@value}} />`,
        [script]: `${component}\nexport default class Example extends Component {
  get description() { return 'fixed'; }
  readonly fixed = '';
}`,
      })
    ).toEqual({});
    expect(warn.mock.calls.flat().join('\n')).toMatch(/Getter-only/);
    expect(warn.mock.calls.flat().join('\n')).toMatch(/Readonly/);
    expect(warn.mock.calls.flat().join('\n')).toMatch(/forwarded attributes/);
    expect(warn.mock.calls.flat().join('\n')).toMatch(/Cannot infer/);
  });

  it('reports shadowed global helpers without modifying either file', () => {
    expect(
      check({
        [`${root}/components/example.hbs`]:
          '{{#each this.rows as |fn|}}<Hds::Form::Textarea::Field @value={{fn.value}} />{{/each}}',
        [`${root}/components/example.js`]: `${component}\nexport default class Example extends Component {}`,
      })
    ).toEqual({});
    expect(warn).toHaveBeenCalled();
  });

  it('allows a writable getter/setter pair and avoids handler/import name collisions', () => {
    const script = `${root}/components/example.js`;
    const changes = check({
      [`${root}/components/example.hbs`]:
        '<Hds::Form::Textarea::Field @value={{this.description}} />',
      [script]: `${component}
const set = 'existing';
export default class Example extends Component {
  hdsTextareaValueChange = 'existing';
  get description() { return this.value; }
  set description(value) { this.value = value; }
}`,
    });
    expect(changes[script]).toContain('import { set as set2 }');
    expect(changes[script]).toContain('hdsTextareaValueChange2 =');
    expect(changes[script]).toContain('set2(object, key, target.value)');
  });

  it('generated code writes new, empty and change-only values to the supplied object', () => {
    const script = `${root}/components/example.js`;
    const changes = check({
      [`${root}/components/example.hbs`]:
        '<Hds::Form::Textarea::Field @value={{this.description}} />',
      [script]: `${component}\nexport default class Example extends Component {}`,
    });
    const calls = [];
    class TextareaElement {
      constructor(value) {
        this.value = value;
      }
    }
    const Example = vm.runInNewContext(
      `${changes[script].replace(/^import .*;\n/gm, '').replace('export default ', '')}\nExample;`,
      {
        Component: class {},
        HTMLTextAreaElement: TextareaElement,
        set(object, key, value) {
          calls.push(value);
          object[key] = value;
        },
      }
    );
    const handler = new Example().hdsTextareaValueChange;
    const model = { description: 'initial' };
    for (const [type, value] of [
      ['input', 'new'],
      ['input', ''],
      ['change', 'change-only'],
    ]) {
      handler(model, 'description', { type, target: new TextareaElement(value) });
      expect(model.description).toBe(value);
    }
    expect(calls).toEqual(['new', '', 'change-only']);
    expect(() => handler(model, 'description', { target: null })).toThrow(
      'Expected a textarea event target'
    );
  });
});

describe('strict-mode Textarea migration', () => {
  it.each(['gjs', 'gts'])(
    'updates .%s imports, embedded template and backing class',
    (extension) => {
      const filename = `${root}/components/example.${extension}`;
      const changes = check({
        [filename]: `${component}\n${directImport}
export default class Example extends Component {
  <template><Textarea @value={{this.description}} /></template>
}`,
      });
      expect(changes[filename]).toContain("import { on } from '@ember/modifier'");
      expect(changes[filename]).toContain("import { fn } from '@ember/helper'");
      expect(changes[filename]).toContain("import { set } from '@ember/object'");
      expect(changes[filename]).toContain('{{on "input" (fn this.hdsTextareaValueChange');
      expect(warn).not.toHaveBeenCalled();
    }
  );

  it('supports barrel aliases, existing aliased imports and multiple classes', () => {
    const filename = `${root}/components/example.gts`;
    const changes = check({
      [filename]: `${component}
import { HdsFormTextareaField as Area } from '@hashicorp/design-system-components/components';
import { on as listen } from '@ember/modifier';
import { fn as partial } from '@ember/helper';
import { set as assign } from '@ember/object';
class First extends Component { <template><Area @value={{this.first}} /></template> }
export default class Second extends Component { <template><Area @value={{this.second}} /></template> }`,
    });
    expect(changes[filename]).toContain('{{listen "input" (partial this.hdsTextareaValueChange ');
    expect(changes[filename]).toContain('this.hdsTextareaValueChange2');
    expect(changes[filename].match(/assign\(object, key, target.value\)/g)).toHaveLength(2);
    expect(changes[filename].match(/import/g)).toHaveLength(5);
  });

  it('supports template-only expressions and UTF-8 before the template', () => {
    const filename = `${root}/components/example.gjs`;
    const changes = check({
      [filename]: `// \u{1f3d4} \u00e9\n${directImport}\nexport default <template><Textarea @value={{@model.description}} /></template>;`,
    });
    expect(changes[filename]).toContain('(fn hdsTextareaValueChange @model "description")');
    expect(changes[filename]).toContain('const hdsTextareaValueChange =');
    expect(changes[filename]).toContain('// \u{1f3d4} \u00e9');
  });

  it('tracks imported contextual fields and excludes shadowed aliases', () => {
    const filename = `${root}/components/example.gjs`;
    const changes = check({
      [filename]: `${component}
import Field from '@hashicorp/design-system-components/components/hds/form/key-value-inputs/field';
${directImport}
export default class Example extends Component {
  <template>
    <Field as |F|><F.Textarea @value={{this.description}} /></Field>
    <Other as |Textarea|><Textarea @value={{this.unrelated}} /></Other>
    <Other as |Field|><Field as |F|><F.Textarea @value={{this.unrelated}} /></Field></Other>
  </template>
}`,
    });
    expect(changes[filename].match(/fn this.hdsTextareaValueChange/g)).toHaveLength(2);
    expect(changes[filename]).toContain('<Textarea @value={{this.unrelated}} />');
    expect(changes[filename]).toContain('<F.Textarea @value={{this.unrelated}} />');
  });

  it('does not add imports or a handler for unchanged literal values', () => {
    expect(
      check({
        [`${root}/components/example.gjs`]: `${directImport}\nexport default <template><Textarea @value="fixed" /></template>;`,
      })
    ).toEqual({});
  });

  it('does not mistake JavaScript-shadowed imports for HDS components', () => {
    expect(
      check({
        [`${root}/components/example.gjs`]: `${directImport}
export default function make(Textarea) {
  return <template><Textarea @value={{@model.description}} /></template>;
}`,
      })
    ).toEqual({});
    expect(warn.mock.calls[0][0]).toContain('shadowed in JavaScript');
  });

  it('avoids reusing helper imports shadowed in JavaScript', () => {
    const filename = `${root}/components/example.gjs`;
    const changes = check({
      [filename]: `${directImport}
import { on } from '@ember/modifier';
function unrelated(on) { return on; }
export default <template><Textarea @value={{@model.description}} /></template>;`,
    });
    expect(changes[filename]).toContain("import { on as on2 } from '@ember/modifier'");
    expect(changes[filename]).toContain('{{on2 "input"');
  });

  it('reports the original embedded-template line and column', () => {
    const filename = `${root}/components/example.gjs`;
    check({
      [filename]: `${directImport}\n\nexport default <template>\n  <Textarea @value={{@value}} />\n</template>;`,
    });
    expect(warn.mock.calls[0][0]).toContain(`${filename}:4:3:`);
  });
});

describe('Textarea CLI', () => {
  let directory;
  beforeEach(() => {
    directory = fs.mkdtempSync(path.join(os.tmpdir(), 'hds-textarea-'));
  });
  afterEach(() => {
    for (const entry of fs.readdirSync(directory)) fs.unlinkSync(path.join(directory, entry));
    fs.rmdirSync(directory);
  });
  const cli = path.resolve(__dirname, '../../../../bin/cli.js');

  it('supports paired writes, --dry and idempotent subsequent runs', () => {
    const template = path.join(directory, 'example.hbs');
    const script = path.join(directory, 'example.js');
    fs.writeFileSync(template, '<Hds::Form::Textarea::Field @value={{this.description}} />');
    fs.writeFileSync(script, `${component}\nexport default class Example extends Component {}`);
    const before = fs.readFileSync(script, 'utf8');
    expect(
      execFileSync(process.execPath, [cli, 'v8/textarea', template, '--dry'], { encoding: 'utf8' })
    ).toContain('Would update 2 files');
    expect(fs.readFileSync(script, 'utf8')).toBe(before);
    expect(
      execFileSync(process.execPath, [cli, 'v8/textarea', template], { encoding: 'utf8' })
    ).toContain('Updated 2 files');
    expect(fs.readFileSync(script, 'utf8')).toContain('hdsTextareaValueChange =');
    expect(
      execFileSync(process.execPath, [cli, 'v8/textarea', template], { encoding: 'utf8' })
    ).toContain('Updated 0 files');
  });

  it('writes nothing when any input fails to parse', () => {
    const template = path.join(directory, 'example.hbs');
    const script = path.join(directory, 'example.js');
    const invalid = path.join(directory, 'invalid.gjs');
    const original = '<Hds::Form::Textarea::Field @value={{this.description}} />';
    fs.writeFileSync(template, original);
    fs.writeFileSync(script, `${component}\nexport default class Example extends Component {}`);
    fs.writeFileSync(invalid, 'export default class { <template>broken');
    expect(() =>
      execFileSync(process.execPath, [cli, 'v8/textarea', template, invalid], { stdio: 'pipe' })
    ).toThrow();
    expect(fs.readFileSync(template, 'utf8')).toBe(original);
    expect(fs.readFileSync(script, 'utf8')).not.toContain('hdsTextareaValueChange');
  });
});
