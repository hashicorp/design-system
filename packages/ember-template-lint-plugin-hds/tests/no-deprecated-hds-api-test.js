import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import Linter from "ember-template-lint";

import NoDeprecatedHdsApi from "../lib/rules/no-deprecated-hds-api.js";
import existingPlugin from "../index.js";

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const localPlugin = {
  name: "local-hds-deprecated-api",
  rules: { "no-deprecated-hds-api": NoDeprecatedHdsApi },
};

function linter(ruleConfig = true, plugins = [localPlugin]) {
  return new Linter({
    workingDir: packageRoot,
    config: {
      plugins,
      rules: { "no-deprecated-hds-api": ruleConfig },
    },
  });
}

test("reports and safely renames removed direct Modal and Flyout subcomponents", async () => {
  const migrations = [
    ["Hds::Modal::Header", "Hds::DialogPrimitive::Header"],
    ["Hds::Modal::Body", "Hds::DialogPrimitive::Body"],
    ["Hds::Modal::Footer", "Hds::DialogPrimitive::Footer"],
    ["Hds::Flyout::Header", "Hds::DialogPrimitive::Header"],
    ["Hds::Flyout::Description", "Hds::DialogPrimitive::Description"],
    ["Hds::Flyout::Body", "Hds::DialogPrimitive::Body"],
    ["Hds::Flyout::Footer", "Hds::DialogPrimitive::Footer"],
  ];
  const source = migrations
    .map(([component]) => `<${component}>Content</${component}>`)
    .join("");
  const messages = await linter().verify({
    source,
    filePath: "template.hbs",
    workingDir: packageRoot,
  });

  assert.equal(messages.length, migrations.length);
  assert.ok(messages.every((message) => message.isFixable));
  assert.match(messages[0].message, /removed.*5\.0\.0/);
  assert.match(messages[0].message, /DialogPrimitive::Header/);
  assert.match(messages[0].message, /version-history/);

  const result = await linter().verifyAndFix({
    source,
    filePath: "template.hbs",
    workingDir: packageRoot,
  });
  assert.equal(
    result.output,
    migrations
      .map(([, replacement]) => `<${replacement}>Content</${replacement}>`)
      .join(""),
  );
  assert.equal(result.messages.length, 0);
});

test("reports Advanced Table Th argument with diagnostic-only columns guidance", async () => {
  const source =
    "<Hds::AdvancedTable::Th @isVisuallyHidden={{true}}>Actions</Hds::AdvancedTable::Th>";
  const result = await linter().verifyAndFix({
    source,
    filePath: "template.hbs",
    workingDir: packageRoot,
  });

  assert.equal(result.output, source);
  assert.equal(result.messages.length, 1);
  assert.equal(result.messages[0].isFixable, false);
  assert.match(result.messages[0].message, /corresponding item.*@columns/);
});

test("recognizes only explicitly proven imported names and aliases", async () => {
  const filePath = "tests/fixtures/deprecated-imports.gts";
  const source = fs.readFileSync(path.join(packageRoot, filePath), "utf8");
  const messages = await linter().verify({
    source,
    filePath,
    workingDir: packageRoot,
    checkHbsTemplateLiterals: true,
  });

  assert.equal(messages.length, 4);
  assert.equal(
    messages.filter((message) => message.message.includes("@isVisuallyHidden"))
      .length,
    2,
  );
  assert.ok(messages.every((message) => !message.isFixable));
});

test("does not duplicate the existing Dropdown text migration", async () => {
  const combinedPlugin = {
    name: "local-hds-combined",
    rules: {
      ...existingPlugin.rules,
      "no-deprecated-hds-api": NoDeprecatedHdsApi,
    },
  };
  const messages = await new Linter({
    workingDir: packageRoot,
    config: {
      plugins: [combinedPlugin],
      rules: {
        "no-deprecated-hds-api": true,
        "no-unknown-arguments": true,
      },
    },
  }).verify({
    source:
      '<Hds::Dropdown as |dd|><dd.Interactive @text="Edit" /></Hds::Dropdown>',
    filePath: "template.hbs",
    workingDir: packageRoot,
  });

  assert.equal(messages.length, 1);
  assert.match(messages[0].message, /@text was removed/);
});
