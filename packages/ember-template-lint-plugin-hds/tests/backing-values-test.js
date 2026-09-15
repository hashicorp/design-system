import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import Linter from "ember-template-lint";

import plugin from "../index.js";

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const fixtureRoot = path.join(packageRoot, "tests/.backing-runs");

function writeFixture(relativePath, source) {
  const filePath = path.join(fixtureRoot, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, source);
  return filePath;
}

function linterFor(rule) {
  return new Linter({
    workingDir: packageRoot,
    config: {
      plugins: [plugin],
      rules: { [rule]: true },
    },
  });
}

async function verifyFile(rule, filePath, source) {
  return linterFor(rule).verify({
    source,
    filePath: path.relative(packageRoot, filePath),
    workingDir: packageRoot,
    checkHbsTemplateLiterals: true,
  });
}

async function verifyAndFixFile(rule, filePath, source) {
  return linterFor(rule).verifyAndFix({
    source,
    filePath: path.relative(packageRoot, filePath),
    workingDir: packageRoot,
    checkHbsTemplateLiterals: true,
  });
}

test.beforeEach(() => {
  fs.rmSync(fixtureRoot, { recursive: true, force: true });
});

test.after(() => {
  fs.rmSync(fixtureRoot, { recursive: true, force: true });
});

test("resolves a same-file GTS class field without modifying the file", async () => {
  const source = `import Component from "@glimmer/component";

export default class Example extends Component {
  tag = "P";

  constructor(owner, args) {
    super(owner, args);
  }

  <template>
    <Hds::Text::Body @tag={{this.tag}}>Text</Hds::Text::Body>
  </template>
}
`;
  const filePath = writeFixture("same-file/field.gts", source);
  const messages = await verifyFile(
    "valid-static-argument-values",
    filePath,
    source,
  );

  assert.equal(messages.length, 1);
  assert.equal(messages[0].isFixable, false);
  assert.match(messages[0].message, /backing member this\.tag to "P"/);
  assert.match(messages[0].message, /Did you mean "p"/);

  const fixed = await verifyAndFixFile(
    "valid-static-argument-values",
    filePath,
    source,
  );
  assert.equal(fixed.output, source);
  assert.equal(fs.readFileSync(filePath, "utf8"), source);
});

test("resolves an ambiguous same-file GJS literal getter", async () => {
  const source = `import Component from "@glimmer/component";

export default class Example extends Component {
  get display() {
    return "Friendly";
  }

  <template>
    <Hds::Time @display={{this.display}} />
  </template>
}
`;
  const filePath = writeFixture("same-file/getter.gjs", source);
  const messages = await verifyFile(
    "valid-static-argument-values",
    filePath,
    source,
  );

  assert.equal(messages.length, 1);
  assert.equal(messages[0].isFixable, false);
  assert.match(messages[0].message, /this\.display to "Friendly"/);
  assert.match(
    messages[0].message,
    /friendly-only, friendly-local, friendly-relative/,
  );
  assert.doesNotMatch(messages[0].message, /Did you mean/);
});

test("combination rule resolves same-file backing color", async () => {
  const source = `import Component from "@glimmer/component";

export default class Example extends Component {
  color = "tertiary";

  <template>
    <Hds::Button @color={{this.color}}>Continue</Hds::Button>
  </template>
}
`;
  const filePath = writeFixture("same-file/policy.gts", source);
  const messages = await verifyFile(
    "valid-argument-combinations",
    filePath,
    source,
  );

  assert.equal(messages.length, 1);
  assert.match(messages[0].message, /this\.color to "tertiary"/);
  assert.match(messages[0].message, /requires @icon/);

  const fixed = await verifyAndFixFile(
    "valid-argument-combinations",
    filePath,
    source,
  );
  assert.equal(fixed.output, source);
  assert.equal(fs.readFileSync(filePath, "utf8"), source);
});

test("resolves a separately declared class exported by identifier in GTS", async () => {
  const source = `import Component from "@glimmer/component";

class Example extends Component {
  tag = "P";

  <template>
    <Hds::Text::Body @tag={{this.tag}}>Text</Hds::Text::Body>
  </template>
}

export default Example;
`;
  const filePath = writeFixture("local-export/example.gts", source);
  const messages = await verifyFile(
    "valid-static-argument-values",
    filePath,
    source,
  );

  assert.equal(messages.length, 1);
  assert.match(messages[0].message, /this\.tag to "P"/);
});

test("resolves sibling TS fields and JS getters for HBS templates", async () => {
  const cases = [
    {
      directory: "sibling-ts",
      member: "display",
      template: "<Hds::Time @display={{this.display}} />",
      backing: `import Component from "@glimmer/component";
class Example extends Component {
  display = "friendly";
}
export default Example;
`,
      expected: /friendly-only, friendly-local, friendly-relative/,
      extension: "ts",
    },
    {
      directory: "sibling-js",
      member: "tag",
      template: "<Hds::Text::Body @tag={{this.tag}}>Text</Hds::Text::Body>",
      backing: `import Component from "@glimmer/component";
class Example extends Component {
  get tag() {
    return "P";
  }
}
export default Example;
`,
      expected: /Did you mean "p"/,
      extension: "js",
    },
  ];

  for (const example of cases) {
    const templatePath = writeFixture(
      `${example.directory}/example.hbs`,
      example.template,
    );
    const backingPath = writeFixture(
      `${example.directory}/example.${example.extension}`,
      example.backing,
    );
    const messages = await verifyFile(
      "valid-static-argument-values",
      templatePath,
      example.template,
    );

    assert.equal(messages.length, 1);
    assert.match(messages[0].message, new RegExp(`this\\.${example.member}`));
    assert.match(messages[0].message, example.expected);

    const fixed = await verifyAndFixFile(
      "valid-static-argument-values",
      templatePath,
      example.template,
    );
    assert.equal(fixed.output, example.template);
    assert.equal(fs.readFileSync(backingPath, "utf8"), example.backing);
  }
});

test("skips multiple embedded templates with ambiguous containing classes", async () => {
  const source = `import Component from "@glimmer/component";

class Inner extends Component {
  color = "primary";

  <template>
    <Hds::Button @color={{this.color}} />
  </template>
}

export default class Outer extends Component {
  color = "not-a-color";

  <template>
    <Hds::Button @color={{this.color}} />
  </template>
}
`;
  const filePath = writeFixture("multiple-templates/example.gts", source);
  assert.deepEqual(
    await verifyFile("valid-static-argument-values", filePath, source),
    [],
  );
});

test("skips backing resolution when linted template differs from disk", async () => {
  const diskSource = `import Component from "@glimmer/component";
export default class Example extends Component {
  tag = "P";
  <template><Hds::Text::Body @tag={{this.tag}}>Disk</Hds::Text::Body></template>
}
`;
  const lintedSource = diskSource.replace(">Disk<", ">Unsaved<");
  const filePath = writeFixture("mismatch/example.gts", diskSource);

  assert.deepEqual(
    await verifyFile("valid-static-argument-values", filePath, lintedSource),
    [],
  );
});

test("skips missing and ambiguous sibling backing files", async () => {
  const template = "<Hds::Button @color={{this.color}} />";
  const missingPath = writeFixture("missing/example.hbs", template);
  assert.deepEqual(
    await verifyFile("valid-static-argument-values", missingPath, template),
    [],
  );

  const dualPath = writeFixture("dual/example.hbs", template);
  const backing = 'export default class Example { color = "not-a-color"; }\n';
  writeFixture("dual/example.ts", backing);
  writeFixture("dual/example.js", backing);
  assert.deepEqual(
    await verifyFile("valid-static-argument-values", dualPath, template),
    [],
  );
});

test("skips imported, re-exported, expression, and ambiguous identifier defaults", async () => {
  const template = "<Hds::Text::Body @tag={{this.tag}}>Text</Hds::Text::Body>";
  const backingSources = {
    imported: `import Example from "./example-component";
export default Example;
`,
    reexported: 'export { default } from "./example-component";\n',
    expression: "export default makeComponent();\n",
    ambiguous: `class Example { tag = "P"; }
class Example { tag = "P"; }
export default Example;
`,
  };

  for (const [name, backing] of Object.entries(backingSources)) {
    const templatePath = writeFixture(`${name}/example.hbs`, template);
    writeFixture(`${name}/example.ts`, backing);
    assert.deepEqual(
      await verifyFile("valid-static-argument-values", templatePath, template),
      [],
    );
  }
});

test("skips inherited, imported, dynamic, computed, and ambiguous members", async () => {
  const source = `import Component from "@glimmer/component";
import importedColor from "./value";

class Base extends Component {
  inheritedColor = "invalid";
}

export default class Example extends Base {
  importedColor = importedColor;
  dynamicColor = this.other;
  calledColor = getColor();
  templateColor = \`invalid\`;
  conditionalColor = true ? "invalid" : "primary";
  static staticColor = "invalid";
  #privateColor = "invalid";
  ["computedColor"] = "invalid";
  duplicateColor = "invalid";
  get duplicateColor() {
    return "invalid";
  }
  methodColor() {
    return "invalid";
  }
  get complexColor() {
    const color = "invalid";
    return color;
  }

  <template>
    <Hds::Button @color={{this.inheritedColor}} />
    <Hds::Button @color={{this.importedColor}} />
    <Hds::Button @color={{this.dynamicColor}} />
    <Hds::Button @color={{this.calledColor}} />
    <Hds::Button @color={{this.templateColor}} />
    <Hds::Button @color={{this.conditionalColor}} />
    <Hds::Button @color={{this.staticColor}} />
    <Hds::Button @color={{this.privateColor}} />
    <Hds::Button @color={{this.computedColor}} />
    <Hds::Button @color={{this.duplicateColor}} />
    <Hds::Button @color={{this.methodColor}} />
    <Hds::Button @color={{this.complexColor}} />
  </template>
}
`;
  const filePath = writeFixture("skips/unsafe.gts", source);
  assert.deepEqual(
    await verifyFile("valid-static-argument-values", filePath, source),
    [],
  );
});

test("skips ambiguous default-export classes", async () => {
  const template = "<Hds::Button @color={{this.color}} />";
  const templatePath = writeFixture("ambiguous/example.hbs", template);
  writeFixture(
    "ambiguous/example.ts",
    `export default class One { color = "invalid"; }
export default class Two { color = "invalid"; }
`,
  );

  assert.deepEqual(
    await verifyFile("valid-static-argument-values", templatePath, template),
    [],
  );
});
