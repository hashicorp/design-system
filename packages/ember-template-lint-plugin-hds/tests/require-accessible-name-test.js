import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import Linter from "ember-template-lint";

import RequireAccessibleName from "../lib/rules/require-accessible-name.js";

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const plugin = {
  name: "require-accessible-name-test",
  rules: { "require-accessible-name": RequireAccessibleName },
};
let fixtureNumber = 0;

function linter() {
  return new Linter({
    workingDir: packageRoot,
    config: {
      plugins: [plugin],
      rules: { "require-accessible-name": true },
    },
  });
}

async function lintHbs(source) {
  return linter().verify({
    source,
    filePath: "tests/fixtures/require-accessible-name.hbs",
    workingDir: packageRoot,
  });
}

async function lintEmbedded(source, extension) {
  fixtureNumber++;
  const relativePath = `tests/fixtures/require-accessible-name-${fixtureNumber}.${extension}`;
  const absolutePath = path.join(packageRoot, relativePath);
  fs.writeFileSync(absolutePath, source);
  try {
    return await linter().verify({
      source,
      filePath: relativePath,
      workingDir: packageRoot,
      checkHbsTemplateLiterals: true,
    });
  } finally {
    fs.unlinkSync(absolutePath);
  }
}

test("accepts every documented accessible-name mechanism in HBS", async () => {
  for (const template of [
    '<Hds::CodeBlock @value="code" @ariaLabel="Example" />',
    '<Hds::CodeEditor @value="code" @ariaLabel={{this.label}} />',
    '<Hds::CodeBlock @value="code" @ariaLabelledBy="heading" />',
    '<Hds::CodeEditor @value="code" @ariaLabelledBy={{this.headingId}} />',
    '<Hds::CodeBlock @value="code" as |CB|><CB.Title>Example</CB.Title></Hds::CodeBlock>',
    '<Hds::CodeEditor @value="code" as |CE|><CE.Title>{{this.title}}</CE.Title></Hds::CodeEditor>',
    '<Hds::CodeBlock @value="code" aria-label="Example" />',
    '<Hds::CodeEditor @value="code" aria-label={{this.label}} />',
    '<Hds::CodeBlock @value="code" aria-labelledby="heading" />',
    '<Hds::CodeEditor @value="code" aria-labelledby={{this.headingId}} />',
  ]) {
    assert.deepEqual(await lintHbs(template), []);
  }
});

test("reports unnamed CodeBlock and CodeEditor invocations", async () => {
  const messages = await lintHbs(
    '<Hds::CodeBlock @value="code" /><Hds::CodeEditor @value="code" @ariaLabel=" " /><Hds::CodeBlock @value="code" aria-label=" " />',
  );

  assert.equal(messages.length, 3);
  assert.match(messages[0].message, /requires an accessible name/);
  assert.match(messages[1].message, /requires an accessible name/);
  assert.match(messages[2].message, /requires an accessible name/);
});

test("only accepts a substantive Title yielded by the same component", async () => {
  const messages = await lintHbs(`
    <Hds::CodeBlock @value="code" as |CB|>
      <CB.Title />
      <Other.Title>Unrelated</Other.Title>
    </Hds::CodeBlock>
    <Hds::CodeEditor @value="code" as |CE|>
      <Hds::CodeBlock @value="code" as |CB|>
        <CE.Title>Editor title</CE.Title>
        <CB.Title>Block title</CB.Title>
      </Hds::CodeBlock>
    </Hds::CodeEditor>
  `);

  assert.equal(messages.length, 1);
  assert.match(messages[0].message, /Hds::CodeBlock/);
});

test("tracks direct and aliased imports in GTS and GJS", async () => {
  const direct = await lintEmbedded(
    `import { HdsCodeBlock } from '@hashicorp/design-system-components/components';
const Example = <template><HdsCodeBlock @value="code" /></template>;`,
    "gts",
  );
  const aliased = await lintEmbedded(
    `import { HdsCodeEditor as Editor } from '@hashicorp/design-system-components/components';
const Example = <template><Editor @value="code" as |CE|><CE.Title>Example</CE.Title></Editor></template>;`,
    "gjs",
  );

  assert.equal(direct.length, 1);
  assert.match(direct[0].message, /HdsCodeBlock/);
  assert.deepEqual(aliased, []);
});

test("ignores unrelated components and imports", async () => {
  assert.deepEqual(
    await lintHbs(
      "<Other::CodeBlock /><Hds::Button as |B|><B.Title>Button</B.Title></Hds::Button>",
    ),
    [],
  );
  assert.deepEqual(
    await lintEmbedded(
      `import { HdsCodeBlock } from 'some-other-package';
const Example = <template><HdsCodeBlock /></template>;`,
      "gts",
    ),
    [],
  );
});
