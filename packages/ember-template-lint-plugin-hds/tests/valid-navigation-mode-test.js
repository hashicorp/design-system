import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, it, test } from "node:test";
import { fileURLToPath } from "node:url";

import Linter, { generateRuleTests } from "ember-template-lint";

import ValidNavigationMode from "../lib/rules/valid-navigation-mode.js";

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const plugin = {
  name: "hds-valid-navigation-mode-test",
  rules: {
    "valid-navigation-mode": ValidNavigationMode,
  },
};
const harness = {
  groupingMethod: describe,
  groupMethodBefore: beforeEach,
  testMethod: it,
  plugins: [plugin],
  skipDisabledTests: true,
  config: true,
  meta: {
    workingDir: packageRoot,
  },
};

function verifySingleResult(results) {
  assert.equal(results.length, 1);
}

generateRuleTests({
  ...harness,
  name: "valid-navigation-mode",
  good: [
    '<Hds::Button @text="Save" />',
    '<Hds::Button @text="Docs" @href="/docs" @isHrefExternal={{false}} />',
    '<Hds::Link::Inline @route="settings">Settings</Hds::Link::Inline>',
    '<Hds::Link::Standalone @text="Docs" @icon="external-link" @href="/docs" />',
    "<Hds::Dropdown::ListItem::Interactive @route={{this.route}}>Edit</Hds::Dropdown::ListItem::Interactive>",
    "<Hds::Interactive @href={{this.href}} @isHrefExternal={{this.external}}>Content</Hds::Interactive>",
    "<Hds::Interactive @route={{this.route}} @isRouteExternal={{this.external}}>Content</Hds::Interactive>",
    '<Hds::Text::Body @tag="p" @href="/" @route="index" @isHrefExternal={{true}}>Text</Hds::Text::Body>',
    '<Hds::Button @text="Save" @color="primary" />',
  ],
  bad: [
    {
      name: "rejects href and route on Button",
      template:
        '<Hds::Button @text="Docs" @href={{this.href}} @route={{this.route}} />',
      verifyResults(results) {
        assert.equal(results.length, 1);
        assert.match(
          results[0].message,
          /cannot receive both @href and @route/,
        );
      },
    },
    {
      name: "rejects href and route on Link Inline",
      template:
        '<Hds::Link::Inline @href="/" @route="index">Home</Hds::Link::Inline>',
      verifyResults: verifySingleResult,
    },
    {
      name: "rejects href and route on Link Standalone",
      template:
        '<Hds::Link::Standalone @text="Home" @icon="home" @href="/" @route="index" />',
      verifyResults: verifySingleResult,
    },
    {
      name: "rejects href and route on Dropdown Interactive",
      template:
        '<Hds::Dropdown::ListItem::Interactive @href="/" @route="index">Home</Hds::Dropdown::ListItem::Interactive>',
      verifyResults: verifySingleResult,
    },
    {
      name: "rejects href and route on shared Interactive",
      template:
        '<Hds::Interactive @href="/" @route="index">Home</Hds::Interactive>',
      verifyResults: verifySingleResult,
    },
    {
      name: "rejects isHrefExternal without href",
      template:
        '<Hds::Button @text="Docs" @isHrefExternal={{this.external}} />',
      verifyResults(results) {
        assert.equal(results.length, 1);
        assert.match(
          results[0].message,
          /cannot receive @isHrefExternal without @href/,
        );
      },
    },
    {
      name: "rejects isRouteExternal without route",
      template:
        "<Hds::Dropdown::ListItem::Interactive @isRouteExternal={{false}}>Edit</Hds::Dropdown::ListItem::Interactive>",
      verifyResults(results) {
        assert.equal(results.length, 1);
        assert.match(
          results[0].message,
          /cannot receive @isRouteExternal without @route/,
        );
      },
    },
    {
      name: "requires a target for Link Inline",
      template: "<Hds::Link::Inline>Home</Hds::Link::Inline>",
      verifyResults(results) {
        assert.equal(results.length, 1);
        assert.match(results[0].message, /requires either @href or @route/);
      },
    },
    {
      name: "requires a target for Link Standalone",
      template:
        '<Hds::Link::Standalone @text="Home" @icon="home" @color="primary" />',
      verifyResults: verifySingleResult,
    },
  ],
});

let fixtureNumber = 0;
const fixturePaths = [];

afterEach(() => {
  for (const fixturePath of fixturePaths.splice(0)) {
    fs.rmSync(fixturePath, { force: true });
  }
});

async function lintSaved(source, extension) {
  fixtureNumber++;
  const relativePath = `tests/fixtures/valid-navigation-mode-${fixtureNumber}.${extension}`;
  const absolutePath = path.join(packageRoot, relativePath);
  fixturePaths.push(absolutePath);
  fs.writeFileSync(absolutePath, source);

  const linter = new Linter({
    workingDir: packageRoot,
    config: {
      plugins: [plugin],
      rules: { "valid-navigation-mode": true },
    },
  });
  return linter.verify({
    source,
    filePath: relativePath,
    workingDir: packageRoot,
    checkHbsTemplateLiterals: true,
  });
}

test("checks statically resolved imported components and aliases", async () => {
  const messages = await lintSaved(
    `import {
  HdsButton,
  HdsLinkInline as Inline,
} from '@hashicorp/design-system-components/components';
const Example = <template>
  <HdsButton @text="Docs" @href={{this.href}} @route={{this.route}} />
  <Inline @isHrefExternal={{this.external}}>Docs</Inline>
</template>;`,
    "gts",
  );

  assert.equal(messages.length, 3);
  assert.match(messages[0].message, /cannot receive both @href and @route/);
  assert.match(messages[1].message, /cannot receive @isHrefExternal/);
  assert.match(messages[2].message, /requires either @href or @route/);
});

test("accepts dynamic targets on imported components", async () => {
  const messages = await lintSaved(
    `import {
  HdsDropdownListItemInteractive as Item,
  HdsLinkStandalone,
} from '@hashicorp/design-system-components/components';
const Example = <template>
  <Item @href={{this.href}} @isHrefExternal={{this.external}}>Docs</Item>
  <HdsLinkStandalone @text="Docs" @icon="external-link" @route={{this.route}} @isRouteExternal={{this.external}} />
</template>;`,
    "gjs",
  );

  assert.deepEqual(messages, []);
});
