import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import Linter from "ember-template-lint";

import plugin from "../index.js";
import { loadCatalog } from "../lib/catalog.js";

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const catalogPath = path.join(packageRoot, "tests/fixtures/catalog.json");

function linterFor(rule, ruleConfig = {}) {
  return new Linter({
    config: {
      plugins: [plugin],
      rules: {
        [rule]: {
          catalogPath,
          ...ruleConfig,
        },
      },
    },
  });
}

function installedCatalogLinterFor(rule) {
  return new Linter({
    workingDir: packageRoot,
    config: {
      plugins: [plugin],
      rules: { [rule]: true },
    },
  });
}

async function fixWithInstalledCatalog(
  rule,
  source,
  filePath = "template.hbs",
) {
  return installedCatalogLinterFor(rule).verifyAndFix({
    source,
    filePath,
    workingDir: packageRoot,
  });
}

async function verify(rule, source, filePath = "template.hbs") {
  return linterFor(rule).verify({
    source,
    filePath,
    workingDir: packageRoot,
    checkHbsTemplateLiterals: true,
  });
}

test("plugin exports a recommended config with all MVP rules", () => {
  assert.equal(plugin.name, "hds");
  assert.deepEqual(plugin.configurations.recommended.rules, {
    "no-unknown-arguments": true,
    "valid-argument-combinations": true,
    "valid-static-argument-values": true,
  });
});

test("recommended config resolves through the hds plugin namespace", async () => {
  const linter = new Linter({
    workingDir: packageRoot,
    config: {
      plugins: [plugin],
      extends: ["hds:recommended"],
    },
  });
  const messages = await linter.verify({
    source: '<Hds::Button @colro="primary" />',
    filePath: "template.hbs",
    workingDir: packageRoot,
  });

  assert.equal(messages.length, 1);
  assert.equal(messages[0].rule, "no-unknown-arguments");
});

test("rules reject unknown configuration options", async () => {
  const messages = await linterFor("no-unknown-arguments", {
    unexpected: true,
  }).verify({
    source: "<Hds::Button />",
    filePath: "template.hbs",
    workingDir: packageRoot,
  });

  assert.equal(messages[0].fatal, true);
  assert.match(messages[0].message, /received unknown option.*unexpected/);
});

test("no-unknown-arguments validates direct HDS invocations and suggests a fix", async () => {
  assert.equal(
    (await verify("no-unknown-arguments", '<Hds::Button @colro="primary" />'))
      .length,
    1,
  );
  assert.match(
    (
      await verify("no-unknown-arguments", '<Hds::Button @colro="primary" />')
    )[0].message,
    /Did you mean @color/,
  );

  const result = await linterFor("no-unknown-arguments").verifyAndFix({
    source: '<Hds::Button @colro="primary" />',
    filePath: "template.hbs",
    workingDir: packageRoot,
  });
  assert.equal(result.output, '<Hds::Button @color="primary" />');
});

test("no-unknown-arguments accepts known args and ignores non-HDS components", async () => {
  assert.deepEqual(
    await verify(
      "no-unknown-arguments",
      '<Hds::Button @color="primary" /><Product::Button @colro="primary" />',
    ),
    [],
  );
});

test("no-unknown-arguments does not autofix to a duplicate argument", async () => {
  const source = '<Hds::Button @colro="secondary" @color="primary" />';
  const result = await linterFor("no-unknown-arguments").verifyAndFix({
    source,
    filePath: "template.hbs",
    workingDir: packageRoot,
  });

  assert.equal(result.output, source);
  assert.equal(result.isFixed, false);
  assert.equal(result.messages.length, 1);
  assert.equal(result.messages[0].isFixable, false);
});

test("valid-static-argument-values handles inline values and valuesRef", async () => {
  assert.equal(
    (
      await verify(
        "valid-static-argument-values",
        '<Hds::Button @color="unknown" @icon="settings" />',
      )
    ).length,
    1,
  );
  assert.match(
    (
      await verify(
        "valid-static-argument-values",
        '<Hds::Button @color="primary" @icon="missing" />',
      )
    )[0].message,
    /Allowed values: search, settings/,
  );
  assert.equal(
    (
      await verify(
        "valid-static-argument-values",
        '<Hds::Button @color={{"unknown"}} />',
      )
    ).length,
    1,
  );
});

test("valid-static-argument-values skips dynamic values and fixes one close match", async () => {
  assert.deepEqual(
    await verify(
      "valid-static-argument-values",
      "<Hds::Button @color={{this.color}} />",
    ),
    [],
  );

  const result = await linterFor("valid-static-argument-values").verifyAndFix({
    source: '<Hds::Button @color="primry" />',
    filePath: "template.hbs",
    workingDir: packageRoot,
  });
  assert.equal(result.output, '<Hds::Button @color="primary" />');
});

test("valid-static-argument-values normalizes unique case matches in HBS and GTS", async () => {
  for (const [source, expected, filePath] of [
    [
      '<Hds::Text::Body @tag="P">Text</Hds::Text::Body>',
      '<Hds::Text::Body @tag="p">Text</Hds::Text::Body>',
      "template.hbs",
    ],
    [
      "<Hds::Text::Body @tag='P'>Text</Hds::Text::Body>",
      "<Hds::Text::Body @tag='p'>Text</Hds::Text::Body>",
      "template.hbs",
    ],
    [
      'const Example = <template><Hds::Text::Body @tag={{"P"}}>Text</Hds::Text::Body></template>;',
      'const Example = <template><Hds::Text::Body @tag={{"p"}}>Text</Hds::Text::Body></template>;',
      "component.gts",
    ],
  ]) {
    const result = await fixWithInstalledCatalog(
      "valid-static-argument-values",
      source,
      filePath,
    );
    assert.equal(result.output, expected);
    const idempotent = await fixWithInstalledCatalog(
      "valid-static-argument-values",
      result.output,
      filePath,
    );
    assert.equal(idempotent.output, expected);
    assert.equal(idempotent.isFixed, false);
  }
});

test("valid-static-argument-values applies explicit value aliases before fuzzy matching", async () => {
  for (const display of ["Friendly", "friendly"]) {
    const result = await fixWithInstalledCatalog(
      "valid-static-argument-values",
      `<Hds::Time @display="${display}" />`,
    );
    assert.equal(result.output, '<Hds::Time @display="friendly-only" />');
  }
  const dynamic = "<Hds::Time @display={{this.display}} />";
  const result = await fixWithInstalledCatalog(
    "valid-static-argument-values",
    dynamic,
  );
  assert.equal(result.output, dynamic);
  assert.equal(result.messages.length, 0);
});

test("valid-static-argument-values ignores inherited alias properties", async () => {
  for (const display of ["toString", "constructor", "__proto__"]) {
    const source = `<Hds::Time @display="${display}" />`;
    const result = await fixWithInstalledCatalog(
      "valid-static-argument-values",
      source,
    );

    assert.equal(result.output, source);
    assert.equal(result.isFixed, false);
    assert.equal(result.messages.length, 1);
  }
});

test("no-unknown-arguments applies conditional Link aliases and preserves dynamic values", async () => {
  for (const component of ["Inline", "Standalone"]) {
    for (const [navigation, replacement] of [
      ['@href="/docs"', "@isHrefExternal"],
      ['@route="docs"', "@isRouteExternal"],
    ]) {
      const source = `<Hds::Link::${component} ${navigation} @isExternal={{this.external}} />`;
      const result = await fixWithInstalledCatalog(
        "no-unknown-arguments",
        source,
      );
      assert.equal(
        result.output,
        `<Hds::Link::${component} ${navigation} ${replacement}={{this.external}} />`,
      );
    }
  }
});

test("conditional Link aliases remain diagnostic-only when ambiguous or duplicated", async () => {
  for (const source of [
    "<Hds::Link::Inline @isExternal={{true}} />",
    '<Hds::Link::Inline @href="/" @route="index" @isExternal={{true}} />',
    '<Hds::Link::Inline @href="/" @isExternal={{true}} @isHrefExternal={{false}} />',
  ]) {
    const result = await fixWithInstalledCatalog(
      "no-unknown-arguments",
      source,
    );
    assert.equal(result.output, source);
    assert.equal(result.isFixed, false);
    assert.equal(result.messages[0].isFixable, false);
    assert.match(
      result.messages[0].message,
      /@isHrefExternal.*@isRouteExternal|Replace @isExternal with @isHrefExternal/,
    );
  }
});

test("no-unknown-arguments applies allowlisted native attribute aliases", async () => {
  const cases = [
    [
      "<Hds::Button @disabled={{this.disabled}} />",
      "<Hds::Button disabled={{this.disabled}} />",
    ],
    [
      '<Hds::Button @isDisabled={{true}} @ariaExpanded="false" />',
      '<Hds::Button disabled={{true}} aria-expanded="false" />',
    ],
    [
      '<Hds::Form::TextInput::Field @disabled={{true}} @name="query" @placeholder={{this.placeholder}} @ariaExpanded="false" @ariaLabelledBy="label" />',
      '<Hds::Form::TextInput::Field disabled={{true}} name="query" placeholder={{this.placeholder}} aria-expanded="false" aria-labelledby="label" />',
    ],
    [
      '<Hds::Form::Textarea::Field @disabled={{true}} @name="notes" @placeholder="Notes" />',
      '<Hds::Form::Textarea::Field disabled={{true}} name="notes" placeholder="Notes" />',
    ],
    [
      "<Hds::Form::Checkbox::Field @checked={{this.checked}} />",
      "<Hds::Form::Checkbox::Field checked={{this.checked}} />",
    ],
  ];

  for (const [source, expected] of cases) {
    const result = await fixWithInstalledCatalog(
      "no-unknown-arguments",
      source,
    );
    assert.equal(result.output, expected);
    const idempotent = await fixWithInstalledCatalog(
      "no-unknown-arguments",
      expected,
    );
    assert.equal(idempotent.output, expected);
    assert.equal(idempotent.isFixed, false);
  }
});

test("native aliases honor conditions and suppress duplicate destinations", async () => {
  for (const source of [
    '<Hds::Button @href="/" @disabled={{true}} />',
    '<Hds::Button @route="index" @isDisabled={{true}} />',
    "<Hds::Button @disabled={{true}} disabled={{false}} />",
    "<Hds::Button @disabled={{true}} @isDisabled={{false}} />",
    '<Hds::Form::TextInput::Field @name="query" name="existing" />',
  ]) {
    const result = await fixWithInstalledCatalog(
      "no-unknown-arguments",
      source,
    );
    if (source.includes("@disabled") && source.includes("@isDisabled")) {
      assert.equal(
        result.output,
        "<Hds::Button disabled={{true}} @isDisabled={{false}} />",
      );
    } else {
      assert.equal(result.output, source);
    }
    assert.equal(result.messages[0].isFixable, false);
    assert.match(result.messages[0].message, /Replace|replace/);
  }
});

test("non-allowlisted Atlas cases remain diagnostic-only", async () => {
  for (const source of [
    '<Hds::Form::Textarea::Field @type="text" />',
    "<Hds::Button @isLoading={{true}} />",
    '<Hds::CodeBlock @plaintext="content" />',
    "<Hds::Form::RadioCard @fixed={{true}} />",
    "<Hds::Pagination::Numbered @isComapct={{true}} />",
    "<Hds::Table @colums={{this.columns}} />",
    '<Hds::Form::SuperSelect::Single::Field @widht="200px" />',
    "<Hds::TooltipButton @isDisabeld={{true}} />",
  ]) {
    const result = await fixWithInstalledCatalog(
      "no-unknown-arguments",
      source,
    );
    assert.equal(result.output, source);
    assert.equal(result.isFixed, false);
    assert.equal(result.messages[0].isFixable, false);
  }
});

test("rules run on embedded gts and gjs templates", async () => {
  for (const extension of ["gts", "gjs"]) {
    const messages = await verify(
      "no-unknown-arguments",
      'const Example = <template><Hds::Button @colro="primary" /></template>;',
      `example.${extension}`,
    );
    assert.equal(messages.length, 1);
  }
});

test("valid-argument-combinations enforces the tertiary button policy", async () => {
  assert.equal(
    (
      await verify(
        "valid-argument-combinations",
        '<Hds::Button @color="tertiary" />',
      )
    ).length,
    1,
  );
  assert.deepEqual(
    await verify(
      "valid-argument-combinations",
      '<Hds::Button @color="tertiary" @icon="search" />',
    ),
    [],
  );
  assert.deepEqual(
    await verify(
      "valid-argument-combinations",
      "<Hds::Button @color={{this.color}} />",
    ),
    [],
  );
  assert.deepEqual(
    await verify("valid-argument-combinations", "<Hds::Button />"),
    [],
  );
});

test("the default catalog resolves from the installed HDS package", () => {
  const catalog = loadCatalog(packageRoot);
  assert.ok(
    catalog.components.some((component) => component.name === "Hds::Button"),
  );
});

test("catalog loading fails explicitly for unavailable and malformed catalogs", async () => {
  assert.throws(
    () => loadCatalog(packageRoot, "tests/fixtures/missing.json"),
    /Unable to read HDS component catalog/,
  );
  assert.throws(
    () => loadCatalog(packageRoot, "tests/fixtures/malformed.json"),
    /Invalid HDS component catalog/,
  );

  const messages = await linterFor("no-unknown-arguments", {
    catalogPath: "tests/fixtures/missing.json",
  }).verify({
    source: "<Hds::Button />",
    filePath: "template.hbs",
    workingDir: packageRoot,
  });
  assert.equal(messages[0].fatal, true);
  assert.match(messages[0].message, /Unable to read HDS component catalog/);
});
