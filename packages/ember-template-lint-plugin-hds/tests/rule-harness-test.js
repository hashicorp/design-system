import assert from "node:assert/strict";
import path from "node:path";
import { beforeEach, describe, it } from "node:test";
import { fileURLToPath } from "node:url";

import { generateRuleTests } from "ember-template-lint";

import plugin from "../index.js";

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const config = {
  catalogPath: path.join(packageRoot, "tests/fixtures/catalog.json"),
};
const harness = {
  groupingMethod: describe,
  groupMethodBefore: beforeEach,
  testMethod: it,
  plugins: [plugin],
  skipDisabledTests: true,
  config,
  meta: {
    workingDir: packageRoot,
  },
};

generateRuleTests({
  ...harness,
  name: "no-unknown-arguments",
  good: ['<Hds::Button @color="primary" />'],
  bad: [
    {
      name: "fixes an HBS argument typo",
      template: '<Hds::Button @colro="primary" />',
      fixedTemplate: '<Hds::Button @color="primary" />',
    },
    {
      name: "fixes an embedded GTS argument typo",
      template:
        'const Example = <template><Hds::Button @colro="primary" /></template>;',
      fixedTemplate:
        'const Example = <template><Hds::Button @color="primary" /></template>;',
      meta: {
        filePath: "component.gts",
        workingDir: packageRoot,
      },
    },
  ],
});

generateRuleTests({
  ...harness,
  config: true,
  name: "no-unknown-arguments",
  good: [
    '<Hds::Link::Inline @href="/" @isHrefExternal={{true}} />',
    '<Hds::Form::Textarea::Field type="text" />',
  ],
  bad: [
    {
      name: "fixes a conditional Link argument alias",
      template: '<Hds::Link::Inline @href="/" @isExternal={{this.external}} />',
      fixedTemplate:
        '<Hds::Link::Inline @href="/" @isHrefExternal={{this.external}} />',
    },
    {
      name: "fixes native attributes for form fields",
      template:
        '<Hds::Form::TextInput::Field @disabled={{true}} @name="query" @placeholder="Search" @ariaExpanded="false" @ariaLabelledBy="label" />',
      fixedTemplate:
        '<Hds::Form::TextInput::Field disabled={{true}} name="query" placeholder="Search" aria-expanded="false" aria-labelledby="label" />',
    },
    {
      name: "fixes native attributes in embedded GTS",
      template:
        "const Example = <template><Hds::Form::Checkbox::Field @checked={{this.checked}} /></template>;",
      fixedTemplate:
        "const Example = <template><Hds::Form::Checkbox::Field checked={{this.checked}} /></template>;",
      meta: {
        filePath: "component.gts",
        workingDir: packageRoot,
      },
    },
  ],
});

generateRuleTests({
  ...harness,
  name: "valid-static-argument-values",
  good: ['<Hds::Button @color="primary" />'],
  bad: [
    {
      name: "fixes a static argument value",
      template: '<Hds::Button @color="primry" />',
      fixedTemplate: '<Hds::Button @color="primary" />',
    },
  ],
});

generateRuleTests({
  ...harness,
  config: true,
  name: "valid-static-argument-values",
  good: ['<Hds::Text::Body @tag="p">Text</Hds::Text::Body>'],
  bad: [
    {
      name: "normalizes case in HBS",
      template: '<Hds::Text::Body @tag="P">Text</Hds::Text::Body>',
      fixedTemplate: '<Hds::Text::Body @tag="p">Text</Hds::Text::Body>',
    },
    {
      name: "normalizes case in embedded GTS",
      template:
        'const Example = <template><Hds::Text::Body @tag="P">Text</Hds::Text::Body></template>;',
      fixedTemplate:
        'const Example = <template><Hds::Text::Body @tag="p">Text</Hds::Text::Body></template>;',
      meta: {
        filePath: "component.gts",
        workingDir: packageRoot,
      },
    },
    {
      name: "fixes an explicit value alias",
      template: '<Hds::Time @display="Friendly" />',
      fixedTemplate: '<Hds::Time @display="friendly-only" />',
    },
  ],
});

generateRuleTests({
  ...harness,
  name: "valid-argument-combinations",
  good: ['<Hds::Button @color="tertiary" @icon="search" />'],
  bad: [
    {
      name: "reports the tertiary Button policy",
      template: '<Hds::Button @color="tertiary" />',
      verifyResults(results) {
        assert.equal(results.length, 1);
        assert.match(results[0].message, /requires @icon/);
      },
    },
  ],
});
