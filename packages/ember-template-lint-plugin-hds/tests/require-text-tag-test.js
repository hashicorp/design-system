import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import Linter from "ember-template-lint";

import RequireTextTag from "../lib/rules/require-text-tag.js";

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const plugin = {
  name: "require-text-tag-test",
  rules: { "require-text-tag": RequireTextTag },
};
let fixtureNumber = 0;

function linter() {
  return new Linter({
    workingDir: packageRoot,
    config: {
      plugins: [plugin],
      rules: { "require-text-tag": true },
    },
  });
}

async function lintHbs(source) {
  return linter().verify({
    source,
    filePath: "tests/fixtures/require-text-tag.hbs",
    workingDir: packageRoot,
  });
}

async function lintEmbedded(source, extension) {
  fixtureNumber++;
  const relativePath = `tests/fixtures/require-text-tag-${fixtureNumber}.${extension}`;
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

test("requires @tag on every documented Text variant", async () => {
  const messages = await lintHbs(`
    <Hds::Text::Display>Display</Hds::Text::Display>
    <Hds::Text::Body>Body</Hds::Text::Body>
    <Hds::Text::Code>Code</Hds::Text::Code>
  `);

  assert.equal(messages.length, 3);
  for (const message of messages) {
    assert.match(message.message, /requires an explicit semantic @tag/);
  }
});

test("accepts static and dynamic @tag without judging its value", async () => {
  assert.deepEqual(
    await lintHbs(`
      <Hds::Text::Display @tag="h1">Display</Hds::Text::Display>
      <Hds::Text::Body @tag={{this.tag}}>Body</Hds::Text::Body>
      <Hds::Text::Code @tag={{if this.inline "span" "pre"}}>Code</Hds::Text::Code>
    `),
    [],
  );
});

test("tracks direct and aliased imports in GTS and GJS", async () => {
  const direct = await lintEmbedded(
    `import { HdsTextBody } from '@hashicorp/design-system-components/components';
const Example = <template><HdsTextBody>Body</HdsTextBody></template>;`,
    "gts",
  );
  const aliased = await lintEmbedded(
    `import { HdsTextCode as Code } from '@hashicorp/design-system-components/components';
const Example = <template><Code @tag={{this.tag}}>Code</Code></template>;`,
    "gjs",
  );

  assert.equal(direct.length, 1);
  assert.match(direct[0].message, /HdsTextBody/);
  assert.deepEqual(aliased, []);
});

test("ignores unrelated components and imports", async () => {
  assert.deepEqual(
    await lintHbs(
      "<Hds::Button>Button</Hds::Button><Other::Text::Body>Body</Other::Text::Body>",
    ),
    [],
  );
  assert.deepEqual(
    await lintEmbedded(
      `import { HdsTextDisplay } from 'some-other-package';
const Example = <template><HdsTextDisplay>Text</HdsTextDisplay></template>;`,
      "gts",
    ),
    [],
  );
});
