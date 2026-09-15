import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import Linter from "ember-template-lint";

import plugin from "../index.js";

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

function linter() {
  return new Linter({
    workingDir: packageRoot,
    config: {
      plugins: [plugin],
      rules: { "no-unknown-arguments": true },
    },
  });
}

async function verifyAndFix(source, filePath = "template.hbs") {
  return linter().verifyAndFix({
    source,
    filePath,
    workingDir: packageRoot,
    checkHbsTemplateLiterals: true,
  });
}

async function assertFix(source, expected, filePath) {
  const result = await verifyAndFix(source, filePath);
  assert.equal(result.output, expected);
  assert.equal(result.messages.length, 0);

  const idempotent = await verifyAndFix(result.output, filePath);
  assert.equal(idempotent.output, expected);
  assert.equal(idempotent.isFixed, false);
  assert.equal(idempotent.messages.length, 0);
}

test("migrates text and preserves other element syntax", async () => {
  await assertFix(
    '<Hds::Dropdown as |dd|><dd.Interactive @href="#" @text="Edit" {{on "click" this.edit}} as |item| /></Hds::Dropdown>',
    '<Hds::Dropdown as |dd|><dd.Interactive @href="#" {{on "click" this.edit}} as |item|>Edit</dd.Interactive></Hds::Dropdown>',
  );
});

test("migrates dynamic paths, helpers, hashes, and conditionals", async () => {
  const cases = [
    [
      "<Hds::Dropdown as |dd|><dd.Interactive @text={{this.label}} /></Hds::Dropdown>",
      "<Hds::Dropdown as |dd|><dd.Interactive>{{this.label}}</dd.Interactive></Hds::Dropdown>",
    ],
    [
      '<Hds::Dropdown as |dd|><dd.Interactive @text={{t "actions.edit" count=this.count}} /></Hds::Dropdown>',
      '<Hds::Dropdown as |dd|><dd.Interactive>{{t "actions.edit" count=this.count}}</dd.Interactive></Hds::Dropdown>',
    ],
    [
      '<Hds::Dropdown as |dd|><dd.Interactive @text={{if this.ready "Ready" "Wait"}} /></Hds::Dropdown>',
      '<Hds::Dropdown as |dd|><dd.Interactive>{{if this.ready "Ready" "Wait"}}</dd.Interactive></Hds::Dropdown>',
    ],
  ];

  for (const [source, expected] of cases) {
    await assertFix(source, expected);
  }
});

test("migrates string and number literal mustaches", async () => {
  for (const [value, expected] of [
    ['{{"123"}}', '{{"123"}}'],
    ["{{123}}", "{{123}}"],
  ]) {
    await assertFix(
      `<Hds::Dropdown as |dd|><dd.Interactive @text=${value} /></Hds::Dropdown>`,
      `<Hds::Dropdown as |dd|><dd.Interactive>${expected}</dd.Interactive></Hds::Dropdown>`,
    );
  }
});

test("migrates concatenated values", async () => {
  await assertFix(
    '<Hds::Dropdown as |dd|><dd.Interactive @text="Edit {{this.name}}" /></Hds::Dropdown>',
    "<Hds::Dropdown as |dd|><dd.Interactive>Edit {{this.name}}</dd.Interactive></Hds::Dropdown>",
  );
});

test("migrates invocations nested in conditionals", async () => {
  await assertFix(
    '<Hds::Dropdown as |dd|>{{#if this.canEdit}}<dd.Interactive @text="Edit" />{{/if}}</Hds::Dropdown>',
    "<Hds::Dropdown as |dd|>{{#if this.canEdit}}<dd.Interactive>Edit</dd.Interactive>{{/if}}</Hds::Dropdown>",
  );
});

test("handles nested Dropdown scopes and block-param shadowing", async () => {
  const source =
    '<Hds::Dropdown as |dd|><Hds::Dropdown as |menu|><dd.Interactive @text="Outer" /><menu.Interactive @text="Inner" /></Hds::Dropdown><Hds::Dropdown as |dd|><dd.Interactive @text="Shadowed" /></Hds::Dropdown></Hds::Dropdown>';
  const expected =
    "<Hds::Dropdown as |dd|><Hds::Dropdown as |menu|><dd.Interactive>Outer</dd.Interactive><menu.Interactive>Inner</menu.Interactive></Hds::Dropdown><Hds::Dropdown as |dd|><dd.Interactive>Shadowed</dd.Interactive></Hds::Dropdown></Hds::Dropdown>";

  await assertFix(source, expected);
});

test("ignores unrelated contextual Interactive components, including shadowed names", async () => {
  for (const source of [
    '<Other as |item|><item.Interactive @text="Other" /></Other><Hds::Dropdown as |dd|><Other as |dd|><dd.Interactive @text="Shadowed" /></Other></Hds::Dropdown>',
    '<Hds::Dropdown as |dd|>{{#let this.menu as |dd|}}<dd.Interactive @text="Shadowed" />{{/let}}</Hds::Dropdown>',
  ]) {
    const result = await verifyAndFix(source);

    assert.equal(result.output, source);
    assert.equal(result.isFixed, false);
    assert.equal(result.messages.length, 0);
  }
});

test("removes @text without duplicating substantive block content", async () => {
  await assertFix(
    '<Hds::Dropdown as |dd|><dd.Interactive @href="#" @text="Ignored">{{! keep }}Existing {{this.label}}</dd.Interactive></Hds::Dropdown>',
    '<Hds::Dropdown as |dd|><dd.Interactive @href="#">{{! keep }}Existing {{this.label}}</dd.Interactive></Hds::Dropdown>',
  );
});

test("preserves comments in an otherwise empty block", async () => {
  for (const comment of ["{{! keep }}", "<!-- keep -->"]) {
    await assertFix(
      `<Hds::Dropdown as |dd|><dd.Interactive @text="Edit">${comment}</dd.Interactive></Hds::Dropdown>`,
      `<Hds::Dropdown as |dd|><dd.Interactive>${comment}Edit</dd.Interactive></Hds::Dropdown>`,
    );
  }
});

test("replaces whitespace-only block content", async () => {
  await assertFix(
    '<Hds::Dropdown as |dd|><dd.Interactive @text="Edit"> \n </dd.Interactive></Hds::Dropdown>',
    "<Hds::Dropdown as |dd|><dd.Interactive>Edit</dd.Interactive></Hds::Dropdown>",
  );
});

test("migrates direct invocations without generic argument processing", async () => {
  const source =
    '<Hds::Dropdown::ListItem::Interactive @text="Edit" @href="#" />';
  const messages = await linter().verify({
    source,
    filePath: "template.hbs",
    workingDir: packageRoot,
  });
  assert.equal(messages.length, 1);
  assert.match(messages[0].message, /@text was removed/);

  const result = await verifyAndFix(source);

  assert.equal(
    result.output,
    '<Hds::Dropdown::ListItem::Interactive @href="#">Edit</Hds::Dropdown::ListItem::Interactive>',
  );
  assert.equal(result.messages.length, 0);
});

test("runs on embedded GTS and GJS templates", async () => {
  for (const extension of ["gts", "gjs"]) {
    await assertFix(
      "const Example = <template><Hds::Dropdown as |dd|><dd.Interactive @text={{this.label}} /></Hds::Dropdown></template>;",
      "const Example = <template><Hds::Dropdown as |dd|><dd.Interactive>{{this.label}}</dd.Interactive></Hds::Dropdown></template>;",
      `component.${extension}`,
    );
  }
});

test("reports the removed API and codemod for ambiguous duplicate values", async () => {
  const source =
    '<Hds::Dropdown as |dd|><dd.Interactive @text="One" @text="Two" /></Hds::Dropdown>';
  const result = await verifyAndFix(source);

  assert.equal(result.output, source);
  assert.equal(result.isFixed, false);
  assert.equal(result.messages.length, 1);
  assert.equal(result.messages[0].isFixable, false);
  assert.match(result.messages[0].message, /removed.*5\.0\.0/);
  assert.match(
    result.messages[0].message,
    /@hashicorp\/design-system-codemods v4\/dropdown-list-item-interactive/,
  );
});
