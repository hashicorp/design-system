/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  buildCodeExamplesCatalog,
  deriveComponent,
  deriveTitle,
  generateCodeExamplesCatalog,
  parseImports,
} from "../../../scripts/mcp/generate-code-examples-catalog.mjs";

let root: string;

const writeFragment = async (
  path: string,
  source: string,
): Promise<void> => {
  const filePath = resolve(root, path);
  await mkdir(resolve(filePath, ".."), { recursive: true });
  await writeFile(filePath, source);
};

beforeEach(async () => {
  root = await mkdtemp(resolve(tmpdir(), "hds-examples-"));
});

afterEach(async () => {
  await rm(root, { force: true, recursive: true });
});

describe("deriveComponent", () => {
  it("returns the component segment for a standard page-components path", () => {
    expect(
      deriveComponent("page-components/accordion/code-fragments/with-toggle.gts"),
    ).toBe("accordion");
  });

  it("preserves nested component path segments", () => {
    expect(
      deriveComponent(
        "page-components/form/super-select/code-fragments/with-single-field-element.gts",
      ),
    ).toBe("form/super-select");
  });

  it("returns the leading segment when code-fragments appears at index 1", () => {
    expect(deriveComponent("standalone/code-fragments/example.gts")).toBe(
      "standalone",
    );
  });

  it("returns 'unknown' when there are no segments before code-fragments", () => {
    expect(deriveComponent("code-fragments/example.gts")).toBe("unknown");
  });
});

describe("deriveTitle", () => {
  it("capitalises the first letter", () => {
    expect(deriveTitle("with-loading-state.gts")).toBe("With loading state");
  });

  it("replaces all hyphens with spaces", () => {
    expect(deriveTitle("multi-word-kebab-case.gts")).toBe(
      "Multi word kebab case",
    );
  });

  it("strips the .gts extension", () => {
    expect(deriveTitle("example.gts")).toBe("Example");
  });

  it("returns the filename unchanged (minus extension) when there are no hyphens", () => {
    expect(deriveTitle("overview.gts")).toBe("Overview");
  });
});

describe("parseImports", () => {
  it("extracts HDS components from a single-line import", () => {
    const result = parseImports(
      `import { HdsButton, HdsBadge } from '@hashicorp/design-system-components/components';\n`,
      "example.gts",
    );

    expect(result.importedHdsComponents).toEqual(["HdsBadge", "HdsButton"]);
  });

  it("extracts HDS components from a multi-line import", () => {
    const result = parseImports(
      `import {\n  HdsAdvancedTable,\n  HdsBadge,\n  HdsIcon,\n} from '@hashicorp/design-system-components/components';\n`,
      "example.gts",
    );

    expect(result.importedHdsComponents).toEqual([
      "HdsAdvancedTable",
      "HdsBadge",
      "HdsIcon",
    ]);
  });

  it("ignores a top-level import type declaration from the HDS module", () => {
    const result = parseImports(
      `import type { HdsButtonSignature } from '@hashicorp/design-system-components/components';\n`,
      "example.gts",
    );

    expect(result.importedHdsComponents).toEqual([]);
  });

  it("ignores inline type specifiers while keeping value specifiers", () => {
    const result = parseImports(
      `import { type HdsBadgeSignature, HdsButton } from '@hashicorp/design-system-components/components';\n`,
      "example.gts",
    );

    expect(result.importedHdsComponents).toEqual(["HdsButton"]);
  });

  it("ignores imports from modules other than the HDS components module", () => {
    const result = parseImports(
      `import Component from '@glimmer/component';\nimport { tracked } from '@glimmer/tracking';\n`,
      "example.gts",
    );

    expect(result.importedHdsComponents).toEqual([]);
  });

  it("does not include non-Hds-prefixed specifiers from the HDS module", () => {
    const result = parseImports(
      `import { HdsButton, someHelper } from '@hashicorp/design-system-components/components';\n`,
      "example.gts",
    );

    expect(result.importedHdsComponents).toEqual(["HdsButton"]);
  });

  it("returns importedHdsComponents sorted alphabetically", () => {
    const result = parseImports(
      `import { HdsTag, HdsAccordion, HdsBadge } from '@hashicorp/design-system-components/components';\n`,
      "example.gts",
    );

    expect(result.importedHdsComponents).toEqual([
      "HdsAccordion",
      "HdsBadge",
      "HdsTag",
    ]);
  });

  it("detects showcase/ imports as local dependencies", () => {
    const result = parseImports(
      `import USERS from 'showcase/mocks/user-data';\n`,
      "example.gts",
    );

    expect(result.localDependencies).toEqual(["showcase/mocks/user-data"]);
  });

  it("detects ./ relative imports as local dependencies", () => {
    const result = parseImports(
      `import Topbar from './topbar';\n`,
      "example.gts",
    );

    expect(result.localDependencies).toEqual(["./topbar"]);
  });

  it("detects ../ relative imports as local dependencies", () => {
    const result = parseImports(
      `import Base from '../with-users-data';\n`,
      "example.gts",
    );

    expect(result.localDependencies).toEqual(["../with-users-data"]);
  });

  it("returns localDependencies sorted alphabetically", () => {
    const result = parseImports(
      `import Z from 'showcase/z';\nimport A from 'showcase/a';\n`,
      "example.gts",
    );

    expect(result.localDependencies).toEqual(["showcase/a", "showcase/z"]);
  });

  it("returns empty arrays when there are no imports", () => {
    const result = parseImports(`const x = 1;\n`, "example.gts");

    expect(result.importedHdsComponents).toEqual([]);
    expect(result.localDependencies).toEqual([]);
  });
});

describe("buildCodeExamplesCatalog", () => {
  it("discovers only code-fragment gts files", async () => {
    await writeFragment(
      "page-components/accordion/code-fragments/with-external-control.gts",
      "import { HdsAccordion } from '@hashicorp/design-system-components/components';\n",
    );

    // Should be ignored: sub-section file
    await writeFragment(
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

  it("stores source content verbatim", async () => {
    const source =
      "import { HdsAccordion } from '@hashicorp/design-system-components/components';\n";

    await writeFragment(
      "page-components/accordion/code-fragments/with-external-control.gts",
      source,
    );

    const catalog = await buildCodeExamplesCatalog(root);

    expect(catalog.examples[0]?.source).toBe(source);
  });

  it("sorts file paths deterministically", async () => {
    await writeFragment(
      "page-components/button/code-fragments/with-loading-state.gts",
      "",
    );
    await writeFragment(
      "page-components/accordion/code-fragments/with-toggle-variants.gts",
      "",
    );

    const catalog = await buildCodeExamplesCatalog(root);
    const ids = catalog.examples.map((e) => e.id);

    expect(ids).toEqual([
      "page-components/accordion/code-fragments/with-toggle-variants",
      "page-components/button/code-fragments/with-loading-state",
    ]);
  });

  it("derives simple component from path", async () => {
    await writeFragment(
      "page-components/accordion/code-fragments/with-toggle.gts",
      "",
    );

    const catalog = await buildCodeExamplesCatalog(root);

    expect(catalog.examples[0]?.component).toBe("accordion");
  });

  it("preserves nested component path", async () => {
    await writeFragment(
      "page-components/form/super-select/code-fragments/with-single-field-element.gts",
      "",
    );

    const catalog = await buildCodeExamplesCatalog(root);

    expect(catalog.examples[0]?.component).toBe("form/super-select");
  });

  it("uses the single path segment as component when file sits directly under a code-fragments directory", async () => {
    await writeFragment(
      "standalone/code-fragments/example.gts",
      "",
    );

    const catalog = await buildCodeExamplesCatalog(root);

    expect(catalog.examples[0]?.component).toBe("standalone");
  });

  it("converts kebab-case filename to title", async () => {
    await writeFragment(
      "page-components/button/code-fragments/with-loading-state.gts",
      "",
    );

    const catalog = await buildCodeExamplesCatalog(root);

    expect(catalog.examples[0]?.title).toBe("With loading state");
  });

  it("extracts HDS component identifiers from single-line imports", async () => {
    await writeFragment(
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
    await writeFragment(
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
    await writeFragment(
      "page-components/table/code-fragments/with-users-data.gts",
      `import USERS from 'showcase/mocks/user-data';\nimport { HdsTable } from '@hashicorp/design-system-components/components';\n`,
    );

    const catalog = await buildCodeExamplesCatalog(root);

    expect(catalog.examples[0]?.localDependencies).toEqual([
      "showcase/mocks/user-data",
    ]);
  });

  it("detects relative imports as local dependencies", async () => {
    await writeFragment(
      "page-components/table/code-fragments/with-multi-select/deletion.gts",
      `import CodeFragmentWithMultiSelectTopbar from './topbar';\nimport CodeFragmentWithUsersData from '../with-users-data';\n`,
    );

    const catalog = await buildCodeExamplesCatalog(root);

    expect(catalog.examples[0]?.localDependencies).toEqual([
      "../with-users-data",
      "./topbar",
    ]);
  });

  it("sets isStandalone false when local dependencies exist", async () => {
    await writeFragment(
      "page-components/table/code-fragments/with-cluster-data.gts",
      `import CLUSTER from 'showcase/mocks/cluster-data';\n`,
    );

    const catalog = await buildCodeExamplesCatalog(root);

    expect(catalog.examples[0]?.isStandalone).toBe(false);
  });

  it("sets isStandalone true when no showcase or relative imports exist", async () => {
    await writeFragment(
      "page-components/accordion/code-fragments/with-placeholder-content.gts",
      `import { HdsAccordion } from '@hashicorp/design-system-components/components';\nimport Component from '@glimmer/component';\n`,
    );

    const catalog = await buildCodeExamplesCatalog(root);

    expect(catalog.examples[0]?.isStandalone).toBe(true);
  });

  it("sets sourcePath relative to showcase/app/components", async () => {
    await writeFragment(
      "page-components/accordion/code-fragments/with-toggle-variants.gts",
      "",
    );

    const catalog = await buildCodeExamplesCatalog(root);

    expect(catalog.examples[0]?.sourcePath).toBe(
      "showcase/app/components/page-components/accordion/code-fragments/with-toggle-variants.gts",
    );
  });
});

describe("generateCodeExamplesCatalog", () => {
  it("writes the catalog JSON to the specified output path", async () => {
    await writeFragment(
      "page-components/button/code-fragments/with-loading-state.gts",
      `import { HdsButton } from '@hashicorp/design-system-components/components';\n`,
    );

    const outputPath = join(root, "output", "catalog.json");
    const catalog = await generateCodeExamplesCatalog({
      inputDirectory: root,
      outputPath,
    });

    const written = JSON.parse(await readFile(outputPath, "utf8")) as unknown;

    expect(written).toEqual(catalog);
  });

  it("creates the output directory if it does not exist", async () => {
    await writeFragment(
      "page-components/button/code-fragments/with-loading-state.gts",
      "",
    );

    const outputPath = join(root, "deeply", "nested", "dir", "catalog.json");

    await expect(
      generateCodeExamplesCatalog({ inputDirectory: root, outputPath }),
    ).resolves.not.toThrow();

    const content = await readFile(outputPath, "utf8");

    expect(content).toContain('"version": 1');
  });

  it("returns the catalog object", async () => {
    await writeFragment(
      "page-components/accordion/code-fragments/with-toggle.gts",
      `import { HdsAccordion } from '@hashicorp/design-system-components/components';\n`,
    );

    const outputPath = join(root, "catalog.json");
    const catalog = await generateCodeExamplesCatalog({
      inputDirectory: root,
      outputPath,
    });

    expect(catalog.version).toBe(1);
    expect(catalog.examples).toHaveLength(1);
  });
});
