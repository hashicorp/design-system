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
let fixtureNumber = 0;

function linterFor(rule) {
  return new Linter({
    workingDir: packageRoot,
    config: {
      plugins: [plugin],
      rules: { [rule]: true },
    },
  });
}

async function lintSaved(rule, source, extension, fix = false) {
  fixtureNumber++;
  const relativePath = `tests/fixtures/imported-components-${fixtureNumber}.${extension}`;
  const absolutePath = path.join(packageRoot, relativePath);
  fs.writeFileSync(absolutePath, source);
  try {
    const options = {
      source,
      filePath: relativePath,
      workingDir: packageRoot,
      checkHbsTemplateLiterals: true,
    };
    return fix
      ? await linterFor(rule).verifyAndFix(options)
      : await linterFor(rule).verify(options);
  } finally {
    fs.unlinkSync(absolutePath);
  }
}

test("checks direct and aliased named imports in GTS", async () => {
  const direct = await lintSaved(
    "no-unknown-arguments",
    `import { HdsButton } from '@hashicorp/design-system-components/components';
const Example = <template><HdsButton @colro="primary" /></template>;`,
    "gts",
  );
  const aliased = await lintSaved(
    "no-unknown-arguments",
    `import { HdsButton as Button } from '@hashicorp/design-system-components/components';
const Example = <template><Button @colro="primary" /></template>;`,
    "gts",
  );

  assert.equal(direct.length, 1);
  assert.match(direct[0].message, /Unknown argument @colro on <HdsButton>/);
  assert.equal(aliased.length, 1);
  assert.match(aliased[0].message, /Unknown argument @colro on <Button>/);
});

test("checks imported components in GJS", async () => {
  const messages = await lintSaved(
    "valid-static-argument-values",
    `import { HdsButton as Button } from '@hashicorp/design-system-components/components';
const Example = <template><Button @color="primry" /></template>;`,
    "gjs",
  );

  assert.equal(messages.length, 1);
  assert.match(messages[0].message, /Invalid value "primry"/);
});

test("does not guess unrelated or nonexistent imports", async () => {
  const unrelated = await lintSaved(
    "no-unknown-arguments",
    `import { HdsButton } from 'some-other-package';
const Example = <template><HdsButton @notAnArgument="value" /></template>;`,
    "gts",
  );
  const nonexistent = await lintSaved(
    "no-unknown-arguments",
    `import { HdsImaginary } from '@hashicorp/design-system-components/components';
const Example = <template><HdsImaginary @notAnArgument="value" /></template>;`,
    "gjs",
  );

  assert.deepEqual(unrelated, []);
  assert.deepEqual(nonexistent, []);
});

test("applies argument combination policies to imported components", async () => {
  const messages = await lintSaved(
    "valid-argument-combinations",
    `import { HdsButton } from '@hashicorp/design-system-components/components';
const Example = <template><HdsButton @color="tertiary" /></template>;`,
    "gts",
  );

  assert.equal(messages.length, 1);
  assert.match(messages[0].message, /requires @icon/);
});

test("migrates Dropdown Interactive direct imports", async () => {
  const source = `import { HdsDropdownListItemInteractive as Item } from '@hashicorp/design-system-components/components';
const Example = <template><Item @href="#" @text="Edit" /></template>;`;
  const result = await lintSaved("no-unknown-arguments", source, "gts", true);

  assert.equal(result.isFixed, true);
  assert.equal(
    result.output,
    `import { HdsDropdownListItemInteractive as Item } from '@hashicorp/design-system-components/components';
const Example = <template><Item @href="#">Edit</Item></template>;`,
  );
});

test("tracks contextual Interactive items from imported Dropdowns", async () => {
  const source = `import { HdsDropdown as Menu } from '@hashicorp/design-system-components/components';
const Example = <template><Menu as |dd|><dd.Interactive @text="Edit" /></Menu></template>;`;
  const result = await lintSaved("no-unknown-arguments", source, "gjs", true);

  assert.equal(result.isFixed, true);
  assert.equal(
    result.output,
    `import { HdsDropdown as Menu } from '@hashicorp/design-system-components/components';
const Example = <template><Menu as |dd|><dd.Interactive>Edit</dd.Interactive></Menu></template>;`,
  );
});

test("skips imported identifiers when the lint buffer is not saved", async () => {
  const saved = `import { HdsButton } from '@hashicorp/design-system-components/components';
const Example = <template><HdsButton @color="primary" /></template>;`;
  const unsaved = saved.replace("@color", "@colro");
  fixtureNumber++;
  const relativePath = `tests/fixtures/imported-components-${fixtureNumber}.gts`;
  const absolutePath = path.join(packageRoot, relativePath);
  fs.writeFileSync(absolutePath, saved);
  try {
    const messages = await linterFor("no-unknown-arguments").verify({
      source: unsaved,
      filePath: relativePath,
      workingDir: packageRoot,
      checkHbsTemplateLiterals: true,
    });
    assert.deepEqual(messages, []);
  } finally {
    fs.unlinkSync(absolutePath);
  }
});
