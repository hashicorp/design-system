import fs from "node:fs";
import path from "node:path";

import ts from "typescript";

function containedPath(root, filePath) {
  const resolvedRoot = path.resolve(root);
  const resolvedPath = path.isAbsolute(filePath)
    ? path.resolve(filePath)
    : path.resolve(resolvedRoot, filePath);
  const relative = path.relative(resolvedRoot, resolvedPath);
  if (
    relative === "" ||
    relative === ".." ||
    relative.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relative)
  ) {
    return undefined;
  }
  return resolvedPath;
}

function maskRange(source, start, end) {
  return (
    source.slice(0, start) +
    source.slice(start, end).replaceAll(/[^\r\n]/g, " ") +
    source.slice(end)
  );
}

export function templateRanges(source) {
  const ranges = [];
  let state = "code";
  let escaped = false;

  for (let index = 0; index < source.length; index++) {
    const character = source[index];
    const next = source[index + 1];

    if (state === "line-comment") {
      if (character === "\n") {
        state = "code";
      }
      continue;
    }
    if (state === "block-comment") {
      if (character === "*" && next === "/") {
        state = "code";
        index++;
      }
      continue;
    }
    if (state !== "code") {
      if (escaped) {
        escaped = false;
      } else if (character === "\\") {
        escaped = true;
      } else if (
        (state === "single-quote" && character === "'") ||
        (state === "double-quote" && character === '"') ||
        (state === "template-literal" && character === "`")
      ) {
        state = "code";
      }
      continue;
    }

    if (character === "/" && next === "/") {
      state = "line-comment";
      index++;
    } else if (character === "/" && next === "*") {
      state = "block-comment";
      index++;
    } else if (character === "'") {
      state = "single-quote";
    } else if (character === '"') {
      state = "double-quote";
    } else if (character === "`") {
      state = "template-literal";
    } else if (source.startsWith("<template>", index)) {
      const close = source.indexOf("</template>", index + 10);
      if (close === -1) {
        return undefined;
      }
      ranges.push([index, close + 11]);
      index = close + 10;
    }
  }

  return ranges;
}

export function maskEmbeddedTemplates(source) {
  const ranges = templateRanges(source);
  if (!ranges) {
    return undefined;
  }
  return [...ranges]
    .reverse()
    .reduce((masked, [start, end]) => maskRange(masked, start, end), source);
}

function hasModifier(member, kind) {
  return member.modifiers?.some((modifier) => modifier.kind === kind) ?? false;
}

function memberName(member) {
  return member.name && ts.isIdentifier(member.name)
    ? member.name.text
    : undefined;
}

function literalValue(expression) {
  return ts.isStringLiteral(expression) ? expression.text : undefined;
}

function resolvedMember(member) {
  if (
    hasModifier(member, ts.SyntaxKind.StaticKeyword) ||
    hasModifier(member, ts.SyntaxKind.PrivateKeyword) ||
    hasModifier(member, ts.SyntaxKind.ProtectedKeyword) ||
    hasModifier(member, ts.SyntaxKind.AbstractKeyword) ||
    hasModifier(member, ts.SyntaxKind.DeclareKeyword)
  ) {
    return undefined;
  }

  if (ts.isPropertyDeclaration(member)) {
    return member.initializer ? literalValue(member.initializer) : undefined;
  }

  if (
    ts.isGetAccessorDeclaration(member) &&
    member.parameters.length === 0 &&
    member.body?.statements.length === 1
  ) {
    const statement = member.body.statements[0];
    return ts.isReturnStatement(statement) && statement.expression
      ? literalValue(statement.expression)
      : undefined;
  }

  return undefined;
}

function valuesFromDefaultClass(source, fileName) {
  const scriptKind =
    fileName.endsWith(".js") || fileName.endsWith(".gjs")
      ? ts.ScriptKind.JS
      : ts.ScriptKind.TS;
  const sourceFile = ts.createSourceFile(
    fileName,
    source,
    ts.ScriptTarget.Latest,
    true,
    scriptKind,
  );
  if (sourceFile.parseDiagnostics?.length > 0) {
    return new Map();
  }
  const directDefaultClasses = sourceFile.statements.filter(
    (statement) =>
      ts.isClassDeclaration(statement) &&
      hasModifier(statement, ts.SyntaxKind.ExportKeyword) &&
      hasModifier(statement, ts.SyntaxKind.DefaultKeyword),
  );
  const defaultAssignments = sourceFile.statements.filter(
    (statement) =>
      ts.isExportAssignment(statement) && !statement.isExportEquals,
  );
  const namedDefaultExports = sourceFile.statements.filter(
    (statement) =>
      ts.isExportDeclaration(statement) &&
      statement.exportClause &&
      ts.isNamedExports(statement.exportClause) &&
      statement.exportClause.elements.some(
        (element) =>
          element.name.text === "default" ||
          element.propertyName?.text === "default",
      ),
  );
  if (
    directDefaultClasses.length +
      defaultAssignments.length +
      namedDefaultExports.length !==
    1
  ) {
    return new Map();
  }

  let componentClass = directDefaultClasses[0];
  if (defaultAssignments.length === 1) {
    const exported = defaultAssignments[0].expression;
    if (!ts.isIdentifier(exported)) {
      return new Map();
    }
    const matchingClasses = sourceFile.statements.filter(
      (statement) =>
        ts.isClassDeclaration(statement) &&
        statement.name?.text === exported.text,
    );
    if (matchingClasses.length !== 1) {
      return new Map();
    }
    componentClass = matchingClasses[0];
  }
  if (!componentClass) {
    return new Map();
  }

  const declarations = new Map();
  for (const member of componentClass.members) {
    const name = memberName(member);
    if (!name) {
      continue;
    }
    const existing = declarations.get(name) ?? [];
    existing.push(member);
    declarations.set(name, existing);
  }

  const values = new Map();
  for (const [name, members] of declarations) {
    if (members.length !== 1) {
      continue;
    }
    const value = resolvedMember(members[0]);
    if (value !== undefined) {
      values.set(name, value);
    }
  }
  return values;
}

function backingFile(workingDir, filePath) {
  if (typeof filePath !== "string" || filePath.length === 0) {
    return undefined;
  }
  const templatePath = containedPath(workingDir, filePath);
  if (!templatePath) {
    return undefined;
  }

  const extension = path.extname(templatePath);
  if (extension === ".gts" || extension === ".gjs") {
    try {
      return containedPath(workingDir, fs.realpathSync(templatePath));
    } catch {
      return undefined;
    }
  }
  if (extension !== ".hbs") {
    return undefined;
  }

  const stem = templatePath.slice(0, -extension.length);
  const candidates = [`${stem}.ts`, `${stem}.js`].filter((candidate) =>
    fs.existsSync(candidate),
  );
  if (candidates.length !== 1) {
    return undefined;
  }
  try {
    return containedPath(workingDir, fs.realpathSync(candidates[0]));
  } catch {
    return undefined;
  }
}

export function resolveBackingValues(
  workingDir,
  filePath,
  lintedTemplateSource,
) {
  const resolvedBackingFile = backingFile(workingDir, filePath);
  if (!resolvedBackingFile) {
    return new Map();
  }

  let source;
  try {
    source = fs.readFileSync(resolvedBackingFile, "utf8");
  } catch {
    return new Map();
  }

  if (
    resolvedBackingFile.endsWith(".gts") ||
    resolvedBackingFile.endsWith(".gjs")
  ) {
    const ranges = templateRanges(source);
    if (
      ranges?.length !== 1 ||
      source.slice(ranges[0][0] + 10, ranges[0][1] - 11) !==
        lintedTemplateSource
    ) {
      return new Map();
    }
    source = maskEmbeddedTemplates(source);
    if (source === undefined) {
      return new Map();
    }
  } else {
    const templatePath = containedPath(workingDir, filePath);
    if (
      !templatePath ||
      !fs.existsSync(templatePath) ||
      fs.readFileSync(templatePath, "utf8") !== lintedTemplateSource
    ) {
      return new Map();
    }
  }
  return valuesFromDefaultClass(source, resolvedBackingFile);
}

export function backingMemberForAttribute(attribute) {
  const pathNode = attribute?.value?.path;
  if (
    attribute?.value?.type !== "MustacheStatement" ||
    pathNode?.type !== "PathExpression" ||
    typeof pathNode.original !== "string"
  ) {
    return undefined;
  }
  const match = /^this\.([A-Za-z_$][\w$]*)$/.exec(pathNode.original);
  return match?.[1];
}
