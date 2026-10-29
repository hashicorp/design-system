/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

const fs = require('node:fs');
const path = require('node:path');
const { parse: parseScript } = require('@babel/parser');
const { Preprocessor } = require('content-tag');
const globby = require('globby');
const recast = require('ember-template-recast');
const transform = require('./index');

function walk(node, callback) {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) {
    node.forEach((child) => walk(child, callback));
    return;
  }
  if (node.type) callback(node);
  for (const [key, value] of Object.entries(node)) {
    if (!['loc', 'tokens', 'comments'].includes(key)) walk(value, callback);
  }
}

function applyEdits(source, edits) {
  for (const { start, end, text } of edits.sort((a, b) => b.start - a.start)) {
    source = source.slice(0, start) + text + source.slice(end);
  }
  return source;
}

function templatesIn(source, filename) {
  if (!/\.(gts|gjs)$/.test(filename)) return [];
  const processor = new Preprocessor();
  try {
    return processor.parse(source, { filename }).map((template) => {
      // content-tag reports UTF-8 byte offsets, whereas Babel and slice use UTF-16.
      const offset = (index) => Buffer.from(source).subarray(0, index).toString().length;
      return {
        ...template,
        range: { start: offset(template.range.start), end: offset(template.range.end) },
        contentRange: {
          start: offset(template.contentRange.start),
          end: offset(template.contentRange.end),
        },
      };
    });
  } finally {
    processor.free();
  }
}

function scriptState(source, filename) {
  const templates = templatesIn(source, filename);
  const masked = applyEdits(
    source,
    templates.map(({ range, type }) => {
      const blank = source.slice(range.start, range.end).replace(/[^\r\n]/g, ' ');
      return {
        ...range,
        text: type === 'expression' ? `null${blank.slice(4)}` : blank,
      };
    })
  );
  const ast = parseScript(masked, {
    sourceType: 'module',
    plugins: ['decorators-legacy', ...(filename.endsWith('ts') ? ['typescript'] : [])],
  });
  const identifiers = new Set(source.match(/[A-Za-z_$][\w$]*/g));
  const imports = ast.program.body.filter((node) => node.type === 'ImportDeclaration');
  const additions = [];
  const edits = [];
  const owners = new Map();
  const components = new Map();
  const localBindings = new Set();
  const recordBindings = (pattern) =>
    walk(pattern, (node) => {
      if (node.type === 'Identifier') localBindings.add(node.name);
    });
  walk(ast, (node) => {
    if (node.type === 'VariableDeclarator') recordBindings(node.id);
    if (node.type === 'CatchClause') recordBindings(node.param);
    if (/Function|Method/.test(node.type)) {
      recordBindings(node.id);
      recordBindings(node.params);
    }
    if (node.type === 'ClassDeclaration') recordBindings(node.id);
  });
  const fresh = (name) => {
    let candidate = name;
    for (let suffix = 2; identifiers.has(candidate); suffix++) candidate = `${name}${suffix}`;
    identifiers.add(candidate);
    return candidate;
  };
  const importName = (module, imported) => {
    for (const entry of imports) {
      if (entry.source.value !== module || entry.importKind === 'type') continue;
      const specifier = entry.specifiers.find(
        (item) =>
          item.type === 'ImportSpecifier' &&
          item.imported.name === imported &&
          item.importKind !== 'type' &&
          !localBindings.has(item.local.name)
      );
      if (specifier) return specifier.local.name;
    }
    const existing = additions.find((item) => item.module === module && item.imported === imported);
    if (existing) return existing.local;
    const local = fresh(imported);
    additions.push({ module, imported, local });
    return local;
  };
  for (const entry of imports) {
    if (entry.importKind === 'type') continue;
    for (const specifier of entry.specifiers) {
      if (specifier.importKind === 'type') continue;
      const direct = entry.source.value.match(
        /^@hashicorp\/design-system-components\/components\/hds\/form\/(textarea\/(?:base|field)|key-value-inputs(?:\/field)?)$/
      );
      const names = {
        HdsFormTextareaBase: 'textarea',
        HdsFormTextareaField: 'textarea',
        HdsFormKeyValueInputs: 'collection',
        HdsFormKeyValueInputsField: 'field',
      };
      if (direct && specifier.type === 'ImportDefaultSpecifier') {
        components.set(
          specifier.local.name,
          direct[1].startsWith('textarea')
            ? 'textarea'
            : direct[1].endsWith('/field')
              ? 'field'
              : 'collection'
        );
      } else if (
        entry.source.value === '@hashicorp/design-system-components/components' &&
        specifier.type === 'ImportSpecifier' &&
        names[specifier.imported.name]
      ) {
        components.set(specifier.local.name, names[specifier.imported.name]);
      }
    }
    for (const name of components.keys()) {
      if (localBindings.has(name)) {
        components.delete(name);
        console.warn(
          `[v8/textarea] ${filename}: Imported component "${name}" is shadowed in JavaScript. Review its templates manually; this alias was not migrated.`
        );
      }
    }
  }
  function defaultOwner() {
    let declaration = ast.program.body.find(
      (node) => node.type === 'ExportDefaultDeclaration'
    )?.declaration;
    if (declaration?.type === 'Identifier') {
      const name = declaration.name;
      declaration = ast.program.body.find(
        (node) => node.type === 'ClassDeclaration' && node.id?.name === name
      );
      if (!declaration) {
        walk(ast, (node) => {
          if (node.type === 'VariableDeclarator' && node.id.name === name) declaration = node.init;
        });
      }
    }
    if (['ClassDeclaration', 'ClassExpression'].includes(declaration?.type)) {
      return declaration.body;
    }
    if (
      declaration?.type === 'CallExpression' &&
      declaration.callee.type === 'MemberExpression' &&
      declaration.callee.property.name === 'extend'
    ) {
      return declaration.arguments.at(-1)?.type === 'ObjectExpression'
        ? declaration.arguments.at(-1)
        : null;
    }
    return null;
  }
  function ownerFor(template) {
    if (!template) return defaultOwner();
    if (template.type === 'expression') return ast.program;
    let owner;
    walk(ast, (node) => {
      if (
        node.type === 'ClassBody' &&
        node.start < template.range.start &&
        node.end > template.range.end &&
        (!owner || node.end - node.start < owner.end - owner.start)
      ) {
        owner = node;
      }
    });
    return owner;
  }
  function context(owner, strict) {
    if (owners.has(owner)) return owners.get(owner);
    const handler = fresh('hdsTextareaValueChange');
    let used = false;
    const on = strict ? importName('@ember/modifier', 'on') : 'on';
    const fn = strict ? importName('@ember/helper', 'fn') : 'fn';
    const reference = owner.type === 'Program' ? handler : `this.${handler}`;
    const result = {
      strict,
      components,
      on,
      fn,
      handler: reference,
      isMigrated(node) {
        // Existing generated handlers are retained on subsequent runs.
        const value = node.attributes.find((attribute) => attribute.name === '@value')?.value;
        return ['input', 'change'].every((event) =>
          node.modifiers.some((modifier) => {
            const [name, callback] = modifier.params;
            if (
              modifier.path.original !== on ||
              name?.value !== event ||
              callback?.type !== 'SubExpression' ||
              callback.path.original !== fn ||
              `${callback.params[1]?.original}.${callback.params[2]?.value}` !==
                value.path?.original ||
              !/^((this\.)?hdsTextareaValueChange\d*)$/.test(callback.params[0]?.original || '')
            ) {
              return false;
            }
            const handlerName = callback.params[0].original.replace(/^this\./, '');
            const members = owner.body || owner.properties;
            return members.some(
              (member) =>
                (member.key?.name === handlerName ||
                  (member.type === 'VariableDeclaration' &&
                    member.declarations.some((item) => item.id.name === handlerName))) &&
                source.slice(member.start, member.end).includes('HTMLTextAreaElement')
            );
          })
        );
      },
      register(object, property, node, report) {
        const members = owner.body || owner.properties;
        if (object === 'this.args') {
          report(node, 'Component arguments require an owner-provided setter.');
          return false;
        }
        if (
          object === 'this' &&
          members.some((member) => member.key?.name === property && member.kind === 'get') &&
          !members.some((member) => member.key?.name === property && member.kind === 'set')
        ) {
          report(node, `Getter-only property "${property}" requires an owner-provided setter.`);
          return false;
        }
        if (
          object === 'this' &&
          members.some((member) => member.key?.name === property && member.readonly)
        ) {
          report(node, `Readonly property "${property}" requires an owner-provided setter.`);
          return false;
        }
        used = true;
        return true;
      },
      finish() {
        if (!used) return;
        const set = importName('@ember/object', 'set');
        const typed = filename.endsWith('ts');
        const args = typed ? 'object: object, key: string, event: Event' : 'object, key, event';
        const body = `{
    const target = event.target;
    if (!(target instanceof HTMLTextAreaElement)) {
      throw new TypeError('Expected a textarea event target');
    }
    ${set}(object, key, target.value);
  }`;
        if (owner.type === 'Program') {
          const position = imports.at(-1)?.end || ast.program.interpreter?.end || 0;
          edits.push({
            start: position,
            end: position,
            text: `\nconst ${handler} = (${args}) => ${body};\n`,
          });
        } else if (owner.type === 'ObjectExpression') {
          const last = owner.properties.at(-1);
          const trailing = owner.extra?.trailingComma !== undefined;
          edits.push({
            start: owner.end - 1,
            end: owner.end - 1,
            text: `${last && !trailing ? ',' : ''}\n  ${handler}: ${importName('@ember/object', 'action')}(function (${args}) ${body}),\n`,
          });
        } else {
          edits.push({
            start: owner.end - 1,
            end: owner.end - 1,
            text: `\n  ${handler} = (${args}) => ${body};\n`,
          });
        }
      },
    };
    owners.set(owner, result);
    return result;
  }
  return {
    templates,
    edits,
    ownerFor,
    context,
    finish() {
      for (const entry of owners.values()) entry.finish();
      if (!edits.length) return source;
      // Only emit imports actually referenced by the migrated output.
      const output = applyEdits(source, [...edits]);
      const needed = additions.filter(({ local }) => {
        const count = output.match(new RegExp(`\\b${local}\\b`, 'g'))?.length || 0;
        const originalCount = source.match(new RegExp(`\\b${local}\\b`, 'g'))?.length || 0;
        return count > originalCount;
      });
      if (needed.length) {
        const position = imports.at(-1)?.end || ast.program.interpreter?.end || 0;
        edits.push({
          start: position,
          end: position,
          text: `\n${needed
            .map(
              ({ module, imported, local }) =>
                `import { ${imported}${local === imported ? '' : ` as ${local}`} } from '${module}';`
            )
            .join('\n')}\n`,
        });
      }
      return applyEdits(source, edits);
    },
  };
}

function backingFor(filename, read) {
  const withoutExtension = filename.slice(0, -4);
  const candidates = [`${withoutExtension}.js`, `${withoutExtension}.ts`];
  if (path.basename(filename) === 'template.hbs') {
    const directory = path.dirname(filename);
    candidates.push(path.join(directory, 'component.js'), path.join(directory, 'component.ts'));
    candidates.push(path.join(directory, 'controller.js'), path.join(directory, 'controller.ts'));
  }
  const segment = `${path.sep}templates${path.sep}`;
  if (filename.includes(segment)) {
    const [root, relative] = withoutExtension.split(segment);
    if (relative.startsWith(`components${path.sep}`)) {
      candidates.push(path.join(root, `${relative}.js`), path.join(root, `${relative}.ts`));
    } else {
      candidates.push(
        path.join(root, 'controllers', `${relative}.js`),
        path.join(root, 'controllers', `${relative}.ts`)
      );
    }
  }
  const existing = candidates.filter((candidate) => read(candidate) !== undefined);
  if (existing.length > 1) throw new Error(`Ambiguous backing files for ${filename}: ${existing}`);
  return existing[0];
}

function migrate(files, { helpers = false } = {}) {
  const sources = new Map(Object.entries(files));
  const states = new Map();
  const outputs = new Map();
  const read = (filename) => {
    if (!sources.has(filename) && fs.existsSync(filename)) {
      sources.set(filename, fs.readFileSync(filename, 'utf8'));
    }
    return sources.get(filename);
  };
  const stateFor = (filename) => {
    if (!states.has(filename)) states.set(filename, scriptState(read(filename), filename));
    return states.get(filename);
  };
  const migrateTemplate = (source, filename, backing, location) =>
    transform(
      { source, path: filename },
      {
        parse: recast.parse,
        visit: (ast, plugin) => recast.transform(ast, plugin).code,
        backing,
        location,
      }
    );
  const previous = process.env.CODEMOD_CLI_ARGS;
  process.env.CODEMOD_CLI_ARGS = JSON.stringify({ helpers });
  try {
    for (const [filename, source] of Object.entries(files)) {
      if (filename.endsWith('.hbs')) {
        const backingPath = backingFor(filename, read);
        const state = backingPath && stateFor(backingPath);
        const owner = state?.ownerFor();
        if (!owner && !helpers && /Textarea/.test(source)) {
          console.warn(
            `[v8/textarea] ${filename}: Cannot identify a backing class. Using global helpers if installed; otherwise manual migration is required.`
          );
        }
        outputs.set(
          filename,
          migrateTemplate(source, filename, owner ? state.context(owner, false) : undefined)
        );
      } else if (/\.(gjs|gts)$/.test(filename)) {
        const state = stateFor(filename);
        for (const template of state.templates) {
          const owner = state.ownerFor(template);
          if (!owner) throw new Error(`Cannot identify template owner in ${filename}`);
          const prefix = source.slice(0, template.contentRange.start).split('\n');
          const output = migrateTemplate(template.contents, filename, state.context(owner, true), {
            line: prefix.length - 1,
            column: prefix.at(-1).length,
          });
          if (output !== template.contents) {
            state.edits.push({ ...template.contentRange, text: output });
          }
        }
      }
    }
    for (const [filename, state] of states) outputs.set(filename, state.finish());
    return Object.fromEntries(
      [...outputs].filter(([filename, source]) => source !== read(filename))
    );
  } finally {
    if (previous === undefined) delete process.env.CODEMOD_CLI_ARGS;
    else process.env.CODEMOD_CLI_ARGS = previous;
  }
}

async function run(args) {
  const flags = new Set(args.filter((argument) => argument.startsWith('--')));
  for (const flag of flags) {
    if (!['--dry', '--print', '--helpers'].includes(flag)) {
      throw new Error(`Unsupported v8/textarea option: ${flag}`);
    }
  }
  const patterns = args.filter((argument) => !argument.startsWith('--'));
  if (!patterns.length) throw new Error('Provide paths or globs for .hbs, .gjs, and .gts files.');
  const filenames = await globby(patterns, {
    absolute: true,
    ignore: ['**/node_modules/**', '**/dist/**', '**/tmp/**'],
  });
  if (!filenames.length) throw new Error('No files matched the supplied paths or globs.');
  if (!filenames.some((filename) => /\.(hbs|gjs|gts)$/.test(filename))) {
    throw new Error('Include .hbs, .gjs, or .gts files in the migration paths.');
  }
  const files = Object.fromEntries(
    filenames.map((filename) => [filename, fs.readFileSync(filename, 'utf8')])
  );
  // Plan every paired edit before writing, so parse errors cannot leave half a migration.
  const changes = migrate(files, { helpers: flags.has('--helpers') });
  for (const [filename, source] of Object.entries(changes)) {
    if (flags.has('--print')) console.log(`--- ${filename}\n${source}`);
    if (!flags.has('--dry')) fs.writeFileSync(filename, source);
  }
  console.log(
    `[v8/textarea] ${flags.has('--dry') ? 'Would update' : 'Updated'} ${Object.keys(changes).length} files.`
  );
}

module.exports = { migrate, run };
