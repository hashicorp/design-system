/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

const fs = require('node:fs');
const path = require('node:path');
const { getOptions } = require('codemod-cli');

function hasHelpers(filePath) {
  let directory = path.dirname(path.resolve(filePath));
  while (true) {
    const manifest = path.join(directory, 'package.json');
    if (fs.existsSync(manifest)) {
      const { dependencies, devDependencies } = JSON.parse(fs.readFileSync(manifest, 'utf8'));
      const packages = { ...dependencies, ...devDependencies };
      return Boolean(
        packages['ember-set-helper'] &&
          (packages['@nullvoxpopuli/ember-composable-helpers'] ||
            packages['ember-composable-helpers'])
      );
    }
    const parent = path.dirname(directory);
    if (parent === directory) return false;
    directory = parent;
  }
}

module.exports = function ({ source, path: filePath }, { parse, visit }) {
  const ast = parse(source);
  const options = getOptions();
  const helpersAvailable = options.helpers === true || hasHelpers(filePath);
  const scopes = [];
  const elements = [];

  return visit(ast, (env) => {
    const { builders: b } = env.syntax;
    const report = (node, message) => {
      console.warn(
        `[v8/textarea] ${filePath}:${node.loc.start.line}:${node.loc.start.column + 1}: ${message}`
      );
    };
    const pushScope = (blockParams, type = null) => {
      scopes.push(new Map(blockParams.map((name, index) => [name, index === 0 ? type : null])));
    };
    const contextualType = (tag) => {
      const [name, member, ...rest] = tag.split('.');
      if (rest.length) return null;
      for (let index = scopes.length - 1; index >= 0; index--) {
        if (scopes[index].has(name)) {
          const type = scopes[index].get(name);
          if (type === 'row' && member === 'Field') return 'field';
          if (type === 'field' && member === 'Textarea') return 'textarea';
          return null;
        }
      }
      return null;
    };

    return {
      Block: {
        enter(node) {
          pushScope(node.blockParams);
        },
        exit() {
          scopes.pop();
        },
      },
      ElementNode: {
        enter(node) {
          let type = contextualType(node.tag);
          if (node.tag === 'Hds::Form::KeyValueInputs') type = 'collection';
          if (node.tag === 'Hds::Form::KeyValueInputs::Field') type = 'field';
          if (node.tag === ':row' && elements[elements.length - 1] === 'collection') type = 'row';
          const isTextarea =
            ['Hds::Form::Textarea::Base', 'Hds::Form::Textarea::Field'].includes(node.tag) ||
            type === 'textarea';
          pushScope(node.blockParams, type);
          elements.push(type);
          if (!isTextarea) return;

          const value = node.attributes.find((attribute) => attribute.name === '@value')?.value;
          if (!value || value.type === 'TextNode') return;
          if (
            value.type === 'MustacheStatement' &&
            ['StringLiteral', 'UndefinedLiteral', 'NullLiteral'].includes(value.path.type)
          ) {
            return;
          }

          const isGeneratedHandler = (modifier, event) => {
            const [eventName, callback] = modifier.params;
            return (
              modifier.path.original === 'on' &&
              eventName?.value === event &&
              callback?.type === 'SubExpression' &&
              callback.path.original === 'pick' &&
              callback.params[0]?.value === 'target.value' &&
              callback.params[1]?.type === 'SubExpression' &&
              callback.params[1].path.original === 'set' &&
              callback.params[1].params.length === 2 &&
              `${callback.params[1].params[0].original}.${callback.params[1].params[1].value}` ===
                value.path?.original
            );
          };
          if (
            node.modifiers.length === 2 &&
            !node.attributes.some((attribute) => attribute.name === '...attributes') &&
            node.modifiers.some((modifier) => isGeneratedHandler(modifier, 'input')) &&
            node.modifiers.some((modifier) => isGeneratedHandler(modifier, 'change'))
          ) {
            return;
          }
          if (
            node.modifiers.length ||
            node.attributes.some((attribute) => attribute.name === '...attributes')
          ) {
            report(
              node,
              'Review existing modifiers/forwarded attributes. Ensure input and change handlers explicitly update @value; no handlers were added.'
            );
            return;
          }
          if (
            value.type !== 'MustacheStatement' ||
            value.path.type !== 'PathExpression' ||
            value.params.length ||
            value.hash.pairs.length ||
            !/^(?:this|@[A-Za-z_$][\w$]*|[A-Za-z_$][\w$]*)\.[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*$/.test(
              value.path.original
            )
          ) {
            report(
              node,
              'Cannot infer a writable object/property from @value. Add an explicit value-update handler if caller state must change.'
            );
            return;
          }
          if (!helpersAvailable) {
            report(
              node,
              'Automatic migration requires ember-set-helper and ember-composable-helpers (or @nullvoxpopuli/ember-composable-helpers) as direct dependencies. Install them, or add a class handler manually. Use --helpers only if equivalent global helpers are already available.'
            );
            return;
          }
          if (scopes.some((scope) => ['on', 'pick', 'set'].some((name) => scope.has(name)))) {
            report(
              node,
              'A block parameter shadows on, pick, or set. Add a class handler manually.'
            );
            return;
          }
          const parts = value.path.original.split('.');
          const property = parts.pop();
          const object = parts.join('.');
          for (const event of ['input', 'change']) {
            node.modifiers.push(
              b.elementModifier('on', [
                b.string(event),
                b.sexpr('pick', [
                  b.string('target.value'),
                  b.sexpr('set', [b.path(object), b.string(property)]),
                ]),
              ])
            );
          }
        },
        exit() {
          scopes.pop();
          elements.pop();
        },
      },
    };
  });
};

module.exports.type = 'hbs';
