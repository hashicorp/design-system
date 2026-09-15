import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import Linter from "ember-template-lint";

import RequireHdsArguments from "../lib/rules/require-hds-arguments.js";

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const catalogPath = "tests/fixtures/require-hds-arguments-catalog.json";
const plugin = {
  name: "require-hds-arguments-test",
  rules: {
    "require-hds-arguments": RequireHdsArguments,
  },
};
let fixtureNumber = 0;

function linter() {
  return new Linter({
    workingDir: packageRoot,
    config: {
      plugins: [plugin],
      rules: {
        "require-hds-arguments": { catalogPath },
      },
    },
  });
}

function verify(source, filePath = "template.hbs") {
  return linter().verify({
    source,
    filePath,
    workingDir: packageRoot,
    checkHbsTemplateLiterals: true,
  });
}

async function verifySaved(source, extension) {
  fixtureNumber++;
  const relativePath = `tests/fixtures/require-hds-arguments-${fixtureNumber}.${extension}`;
  const absolutePath = path.join(packageRoot, relativePath);
  fs.writeFileSync(absolutePath, source);
  try {
    return await verify(source, relativePath);
  } finally {
    fs.unlinkSync(absolutePath);
  }
}

test("reports missing required arguments on direct classic HBS invocations", async () => {
  const messages = await verify("<Hds::Button />");

  assert.equal(messages.length, 1);
  assert.equal(
    messages[0].message,
    "Missing required argument @text on <Hds::Button>.",
  );
  assert.equal(messages[0].rule, "require-hds-arguments");
});

test("reports multiple missing arguments in deterministic name order", async () => {
  const messages = await verify("<Hds::Link::Standalone />");

  assert.equal(messages.length, 1);
  assert.equal(
    messages[0].message,
    "Missing required arguments @icon, @text on <Hds::Link::Standalone>.",
  );
});

test("accepts required arguments regardless of their values", async () => {
  assert.deepEqual(
    await verify(
      '<Hds::Link::Standalone @text={{this.text}} @icon="docs-link" />',
    ),
    [],
  );
});

test("uses configured catalog required metadata", async () => {
  const messages = await verify("<Hds::CatalogFixture />");

  assert.equal(messages.length, 1);
  assert.equal(
    messages[0].message,
    "Missing required argument @configured on <Hds::CatalogFixture>.",
  );
});

test("reports statically resolved direct and aliased imports in GJS", async () => {
  const direct = await verifySaved(
    `import { HdsButton } from '@hashicorp/design-system-components/components';
const Example = <template><HdsButton /></template>;`,
    "gjs",
  );
  const aliased = await verifySaved(
    `import { HdsLinkStandalone as Link } from '@hashicorp/design-system-components/components';
const Example = <template><Link @icon="docs-link" /></template>;`,
    "gjs",
  );

  assert.equal(direct.length, 1);
  assert.equal(
    direct[0].message,
    "Missing required argument @text on <Hds::Button>.",
  );
  assert.equal(aliased.length, 1);
  assert.equal(
    aliased[0].message,
    "Missing required argument @text on <Hds::Link::Standalone>.",
  );
});

test("skips GTS templates", async () => {
  const messages = await verifySaved(
    `import { HdsButton } from '@hashicorp/design-system-components/components';
const Example = <template><Hds::Button /><HdsButton /></template>;`,
    "gts",
  );

  assert.deepEqual(messages, []);
});

test("skips unknown, dynamic, contextual, and GJS classic components", async () => {
  assert.deepEqual(
    await verify(
      "<Hds::Imaginary /><this.Dynamic /><Menu as |menu|><menu.Item /></Menu>",
    ),
    [],
  );
  assert.deepEqual(
    await verifySaved(
      "const Example = <template><Hds::Button /></template>;",
      "gjs",
    ),
    [],
  );
});
