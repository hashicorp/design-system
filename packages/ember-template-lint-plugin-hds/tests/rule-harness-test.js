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
