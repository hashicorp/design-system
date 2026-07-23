/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { buildCodeExamplesCatalog } from "../../../scripts/mcp/generate-code-examples-catalog.mjs";

const temporaryDirectories: string[] = [];

const writeFragment = async (
  root: string,
  path: string,
  source: string,
): Promise<void> => {
  const filePath = resolve(root, path);
  await mkdir(resolve(filePath, ".."), { recursive: true });
  await writeFile(filePath, source);
};

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { force: true, recursive: true })),
  );
});

describe("code examples catalog generator", () => {
  it("discovers only code-fragment gts files", async () => {
    const root = await mkdtemp(resolve(tmpdir(), "hds-examples-"));
    temporaryDirectories.push(root);

    await writeFragment(
      root,
      "page-components/accordion/code-fragments/with-external-control.gts",
      "import { HdsAccordion } from '@hashicorp/design-system-components/components';\n",
    );

    // Should be ignored: sub-section file
    await writeFragment(
      root,
      "page-components/accordion/sub-sections/overview.gts",
      "",
    );

    const catalog = await buildCodeExamplesCatalog(root);

    expect(catalog.version).toBe(1);
    expect(catalog.examples).toHaveLength(1);
    expect(catalog.examples[0]?.id).toBe(
      "page-components/accordion/code-fragments/with-external-control",
    );
  });

  it("sorts file paths deterministically", async () => {
    const root = await mkdtemp(resolve(tmpdir(), "hds-examples-"));
    temporaryDirectories.push(root);

    await writeFragment(
      root,
      "page-components/button/code-fragments/with-loading-state.gts",
      "",
    );
    await writeFragment(
      root,
      "page-components/accordion/code-fragments/with-toggle-variants.gts",
      "",
    );

    const catalog = await buildCodeExamplesCatalog(root);
    const ids = catalog.examples.map((e: { id: string }) => e.id);

    expect(ids).toEqual([
      "page-components/accordion/code-fragments/with-toggle-variants",
      "page-components/button/code-fragments/with-loading-state",
    ]);
  });

  it("derives simple component from path", async () => {
    const root = await mkdtemp(resolve(tmpdir(), "hds-examples-"));
    temporaryDirectories.push(root);

    await writeFragment(
      root,
      "page-components/accordion/code-fragments/with-toggle.gts",
      "",
    );

    const catalog = await buildCodeExamplesCatalog(root);

    expect(catalog.examples[0]?.component).toBe("accordion");
  });

  it("preserves nested component path", async () => {
    const root = await mkdtemp(resolve(tmpdir(), "hds-examples-"));
    temporaryDirectories.push(root);

    await writeFragment(
      root,
      "page-components/form/super-select/code-fragments/with-single-field-element.gts",
      "",
    );

    const catalog = await buildCodeExamplesCatalog(root);

    expect(catalog.examples[0]?.component).toBe("form/super-select");
  });

  it("converts kebab-case filename to title", async () => {
    const root = await mkdtemp(resolve(tmpdir(), "hds-examples-"));
    temporaryDirectories.push(root);

    await writeFragment(
      root,
      "page-components/button/code-fragments/with-loading-state.gts",
      "",
    );

    const catalog = await buildCodeExamplesCatalog(root);

    expect(catalog.examples[0]?.title).toBe("With loading state");
  });

  it("extracts HDS component identifiers from single-line imports", async () => {
    const root = await mkdtemp(resolve(tmpdir(), "hds-examples-"));
    temporaryDirectories.push(root);

    await writeFragment(
      root,
      "page-components/button/code-fragments/with-loading-state.gts",
      `import { HdsButton, HdsBadge } from '@hashicorp/design-system-components/components';\n`,
    );

    const catalog = await buildCodeExamplesCatalog(root);

    expect(catalog.examples[0]?.importedHdsComponents).toEqual([
      "HdsBadge",
      "HdsButton",
    ]);
  });

  it("extracts HDS component identifiers from multi-line imports", async () => {
    const root = await mkdtemp(resolve(tmpdir(), "hds-examples-"));
    temporaryDirectories.push(root);

    await writeFragment(
      root,
      "page-components/advanced-table/code-fragments/with-filtering.gts",
      `import {\n  HdsAdvancedTable,\n  HdsBadge,\n  HdsIcon,\n} from '@hashicorp/design-system-components/components';\nimport type { HdsBadgeSignature } from '@hashicorp/design-system-components/components';\n`,
    );

    const catalog = await buildCodeExamplesCatalog(root);

    expect(catalog.examples[0]?.importedHdsComponents).toEqual([
      "HdsAdvancedTable",
      "HdsBadge",
      "HdsIcon",
    ]);
  });

  it("detects showcase module imports as local dependencies", async () => {
    const root = await mkdtemp(resolve(tmpdir(), "hds-examples-"));
    temporaryDirectories.push(root);

    await writeFragment(
      root,
      "page-components/table/code-fragments/with-users-data.gts",
      `import USERS from 'showcase/mocks/user-data';\nimport { HdsTable } from '@hashicorp/design-system-components/components';\n`,
    );

    const catalog = await buildCodeExamplesCatalog(root);

    expect(catalog.examples[0]?.localDependencies).toContain(
      "showcase/mocks/user-data",
    );
  });

  it("detects relative imports as local dependencies", async () => {
    const root = await mkdtemp(resolve(tmpdir(), "hds-examples-"));
    temporaryDirectories.push(root);

    await writeFragment(
      root,
      "page-components/table/code-fragments/with-multi-select/deletion.gts",
      `import CodeFragmentWithMultiSelectTopbar from './topbar';\nimport CodeFragmentWithUsersData from '../with-users-data';\n`,
    );

    const catalog = await buildCodeExamplesCatalog(root);

    expect(catalog.examples[0]?.localDependencies).toContain("./topbar");
    expect(catalog.examples[0]?.localDependencies).toContain(
      "../with-users-data",
    );
  });

  it("sets isStandalone false when local dependencies exist", async () => {
    const root = await mkdtemp(resolve(tmpdir(), "hds-examples-"));
    temporaryDirectories.push(root);

    await writeFragment(
      root,
      "page-components/table/code-fragments/with-cluster-data.gts",
      `import CLUSTER from 'showcase/mocks/cluster-data';\n`,
    );

    const catalog = await buildCodeExamplesCatalog(root);

    expect(catalog.examples[0]?.isStandalone).toBe(false);
  });

  it("sets isStandalone true when no showcase or relative imports exist", async () => {
    const root = await mkdtemp(resolve(tmpdir(), "hds-examples-"));
    temporaryDirectories.push(root);

    await writeFragment(
      root,
      "page-components/accordion/code-fragments/with-placeholder-content.gts",
      `import { HdsAccordion } from '@hashicorp/design-system-components/components';\nimport Component from '@glimmer/component';\n`,
    );

    const catalog = await buildCodeExamplesCatalog(root);

    expect(catalog.examples[0]?.isStandalone).toBe(true);
  });

  it("sets sourcePath relative to showcase/app/components", async () => {
    const root = await mkdtemp(resolve(tmpdir(), "hds-examples-"));
    temporaryDirectories.push(root);

    await writeFragment(
      root,
      "page-components/accordion/code-fragments/with-toggle-variants.gts",
      "",
    );

    const catalog = await buildCodeExamplesCatalog(root);

    expect(catalog.examples[0]?.sourcePath).toBe(
      "showcase/app/components/page-components/accordion/code-fragments/with-toggle-variants.gts",
    );
  });
});
