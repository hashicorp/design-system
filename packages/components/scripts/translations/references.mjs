/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { preprocess, traverse } from '@glimmer/syntax';
import { Preprocessor } from 'content-tag';
import ts from 'typescript';

const preprocessor = new Preprocessor();
const helperModule = /(?:^|\/)helpers\/hds-t(?:\.ts|\.js)?$/;
const serviceModule = /(?:^|\/)services\/hds-intl(?:\.ts|\.js)?$/;

function unwrap(expression) {
  while (
    ts.isParenthesizedExpression(expression) ||
    ts.isAsExpression(expression) ||
    ts.isTypeAssertionExpression(expression) ||
    ts.isNonNullExpression(expression) ||
    ts.isSatisfiesExpression(expression)
  )
    expression = expression.expression;
  return expression;
}

function propertyName(node) {
  if (node === undefined) return undefined;
  if (
    ts.isIdentifier(node) ||
    ts.isStringLiteral(node) ||
    ts.isNoSubstitutionTemplateLiteral(node)
  )
    return node.text;
  return undefined;
}

function memberAccess(expression) {
  expression = unwrap(expression);
  if (ts.isPropertyAccessExpression(expression))
    return { receiver: expression.expression, name: expression.name.text };
  if (ts.isElementAccessExpression(expression)) {
    const key = unwrap(expression.argumentExpression);
    return {
      receiver: expression.expression,
      name:
        ts.isStringLiteral(key) || ts.isNoSubstitutionTemplateLiteral(key)
          ? key.text
          : undefined,
    };
  }
  return undefined;
}

function enclosingThisClass(node) {
  let parent = node.parent;
  while (parent !== undefined) {
    if (ts.isClassDeclaration(parent) || ts.isClassExpression(parent))
      return parent;
    if (ts.isFunctionLike(parent) && !ts.isArrowFunction(parent)) {
      return ts.isClassDeclaration(parent.parent) ||
        ts.isClassExpression(parent.parent)
        ? parent.parent
        : undefined;
    }
    parent = parent.parent;
  }
  return undefined;
}

export function readReferences({ file, source }) {
  const references = [];
  const diagnostics = [];
  const locationSource = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest
  );
  const report = (offset, category, message) => {
    const { line, character } =
      locationSource.getLineAndCharacterOfPosition(offset);
    diagnostics.push({
      file,
      line: line + 1,
      col: character + 1,
      category,
      message,
    });
  };
  const record = (key, offset) => {
    if (typeof key !== 'string' || key.trim().length === 0) {
      report(
        offset,
        'uncheckable-call',
        'Translation keys must be non-empty string literals'
      );
      return;
    }
    const { line, character } =
      locationSource.getLineAndCharacterOfPosition(offset);
    references.push({ key, file, line: line + 1, col: character + 1 });
  };

  try {
    const templates = file.endsWith('.gts')
      ? preprocessor.parse(source, { filename: file })
      : [];
    let script = source;
    // preserve UTF-16 offsets and newlines so diagnostics point into the original file
    for (const tag of [...templates].reverse()) {
      const start = tag.range.startUtf16Codepoint;
      const end = tag.range.endUtf16Codepoint;
      const replacement = tag.type === 'class-member' ? ';' : '0';
      script =
        script.slice(0, start) +
        replacement +
        script.slice(start + 1, end).replace(/[^\r\n]/g, ' ') +
        script.slice(end);
    }
    const ast = ts.createSourceFile(
      file,
      script,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS
    );
    if (ast.parseDiagnostics.length > 0) {
      for (const error of ast.parseDiagnostics)
        report(
          error.start ?? 0,
          'parse-error',
          ts.flattenDiagnosticMessageText(error.messageText, '\n')
        );
      return { references, diagnostics };
    }
    const host = {
      ...ts.createCompilerHost({}),
      getSourceFile: (name) => (name === file ? ast : undefined),
      fileExists: (name) => name === file,
      readFile: (name) => (name === file ? script : undefined),
      writeFile: () => {},
    };
    const program = ts.createProgram(
      [file],
      { noLib: true, noResolve: true, allowNonTsExtensions: true },
      host
    );
    const checker = program.getTypeChecker();
    const helpers = new Set();
    const services = new Set();
    for (const statement of ast.statements) {
      if (
        !ts.isImportDeclaration(statement) ||
        !ts.isStringLiteral(statement.moduleSpecifier)
      )
        continue;
      const bindings = statement.importClause?.namedBindings;
      const names = [
        statement.importClause?.name,
        ...(bindings !== undefined && ts.isNamedImports(bindings)
          ? bindings.elements
              .filter(
                (binding) =>
                  (binding.propertyName ?? binding.name).text === 'default'
              )
              .map((binding) => binding.name)
          : []),
      ].filter((name) => name !== undefined);
      for (const name of names) {
        const symbol = checker.getSymbolAtLocation(name);
        if (helperModule.test(statement.moduleSpecifier.text))
          helpers.add(symbol);
        if (serviceModule.test(statement.moduleSpecifier.text))
          services.add(symbol);
      }
    }

    function isServiceType(type, seen = new Set()) {
      if (type === undefined || !ts.isTypeReferenceNode(type)) return false;
      const symbol = checker.getSymbolAtLocation(type.typeName);
      if (services.has(symbol)) return true;
      if (
        type.typeName.getText(ast) === 'Pick' &&
        type.typeArguments?.[1]?.getText(ast).replaceAll('"', "'") === "'t'"
      )
        return isServiceType(type.typeArguments[0], seen);
      if (symbol === undefined || seen.has(symbol)) return false;
      seen.add(symbol);
      return (symbol.declarations ?? []).some(
        (declaration) =>
          ts.isTypeAliasDeclaration(declaration) &&
          isServiceType(declaration.type, seen)
      );
    }

    function serviceProperty(receiver, name) {
      receiver = unwrap(receiver);
      if (receiver.kind === ts.SyntaxKind.ThisKeyword) {
        const declaration = enclosingThisClass(receiver)?.members.find(
          (member) => propertyName(member.name) === name
        );
        return isServiceType(declaration?.type);
      }
      const symbol = checker.getTypeAtLocation(receiver).getProperty(name);
      return (symbol?.declarations ?? []).some((declaration) =>
        isServiceType(declaration.type)
      );
    }

    function isService(expression, seen = new Set()) {
      expression = unwrap(expression);
      const member = memberAccess(expression);
      if (
        member?.name !== undefined &&
        serviceProperty(member.receiver, member.name)
      )
        return true;
      const symbol = checker.getSymbolAtLocation(
        ts.isPropertyAccessExpression(expression) ? expression.name : expression
      );
      if (symbol === undefined || seen.has(symbol)) return false;
      seen.add(symbol);
      return (symbol.declarations ?? []).some((declaration) => {
        const type = declaration.type;
        if (isServiceType(type)) return true;
        if (
          ts.isBindingElement(declaration) &&
          ts.isObjectBindingPattern(declaration.parent)
        ) {
          const name = propertyName(
            declaration.propertyName ?? declaration.name
          );
          const initializer = declaration.parent.parent.initializer;
          return (
            name !== undefined &&
            initializer !== undefined &&
            serviceProperty(initializer, name)
          );
        }
        return (
          declaration.initializer !== undefined &&
          isService(declaration.initializer, seen)
        );
      });
    }

    function visit(node) {
      const member = ts.isCallExpression(node)
        ? memberAccess(node.expression)
        : undefined;
      if (
        member !== undefined &&
        isService(member.receiver) &&
        member.name === undefined
      ) {
        report(
          node.getStart(ast),
          'uncheckable-call',
          'HDS service method access must use a literal name'
        );
      }
      if (member?.name === 't' && isService(member.receiver)) {
        const key = node.arguments[0];
        // the helper's implementation forwards its public arguments rather than owning a translation key
        const forwarding =
          file === 'src/helpers/hds-t.ts' &&
          key?.getText(ast) === 'key' &&
          node.arguments[1]?.getText(ast) === 'named';
        if (!forwarding)
          record(
            key !== undefined &&
              (ts.isStringLiteral(key) ||
                ts.isNoSubstitutionTemplateLiteral(key))
              ? key.text
              : undefined,
            (key ?? node).getStart(ast)
          );
      }
      ts.forEachChild(node, visit);
    }
    visit(ast);

    for (const tag of templates) {
      const start = tag.range.startUtf16Codepoint;
      const contentStart = tag.startRange.endUtf16Codepoint;
      let context = ast;
      function findContext(node) {
        if (node.pos <= start && node.end > start) {
          context = node;
          ts.forEachChild(node, findContext);
        }
      }
      findContext(ast);
      const helperNames = new Set(
        checker
          .getSymbolsInScope(
            context,
            ts.SymbolFlags.Value | ts.SymbolFlags.Alias
          )
          .filter((symbol) => helpers.has(symbol))
          .map((symbol) => symbol.name)
      );
      const template = preprocess(tag.contents);
      const ancestors = [];
      const templateOffset = (node) => {
        const lines = tag.contents.split('\n');
        return (
          contentStart +
          lines
            .slice(0, node.loc.start.line - 1)
            .reduce((sum, line) => sum + line.length + 1, 0) +
          node.loc.start.column
        );
      };
      traverse(template, {
        All: {
          enter(node) {
            ancestors.push(node);
            if (
              (node.type === 'MustacheStatement' ||
                node.type === 'SubExpression') &&
              node.path.type === 'PathExpression' &&
              helperNames.has(node.path.original) &&
              !ancestors.some(
                (ancestor, index) =>
                  (ancestor.blockParams ?? []).includes(node.path.original) &&
                  (ancestor.type !== 'ElementNode' ||
                    ancestor.children.includes(ancestors[index + 1]))
              )
            ) {
              const key = node.params[0];
              record(
                key?.type === 'StringLiteral' ? key.value : undefined,
                templateOffset(key ?? node)
              );
            }
          },
          exit() {
            ancestors.pop();
          },
        },
      });
    }
  } catch (error) {
    report(0, 'parse-error', error.message);
  }
  return { references, diagnostics };
}
