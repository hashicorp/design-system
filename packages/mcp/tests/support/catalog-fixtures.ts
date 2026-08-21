/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// builds throwaway installs and runs the real resolution cascade against them

import { execFileSync } from "node:child_process";
import {
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { PROJECT_ROOT_ENV_VAR } from "../../src/resources/shared/project-root.js";

import type {
  CatalogAnchor,
  CatalogSource,
} from "../../src/resources/shared/catalog.js";

export type InstalledPackage = {
  name: string;
  version: string;
  files?: Record<string, string>;
  dependencies?: InstalledPackage[];
};

export type ProjectFixture = {
  root: string;
  cleanup: () => void;
};

export type CascadeResult =
  | { ok: true; source: CatalogSource }
  | { ok: false; message: string };

export type RunCascadeInput = {
  specifier: string;
  anchors: CatalogAnchor[];
  projectRoot: string;
  installed?: InstalledPackage[];
};

const SHARED_SOURCE_DIRECTORY = fileURLToPath(
  new URL("../../src/resources/shared/", import.meta.url),
);

const RUNNER_SOURCE = `import { createCatalogLoader } from "./catalog.ts";

const loader = createCatalogLoader({
  specifier: process.argv[2],
  anchors: JSON.parse(process.argv[3]),
  create: (value, source) => source,
});

try {
  process.stdout.write(JSON.stringify({ ok: true, source: loader.getOrLoad() }));
} catch (error) {
  process.stdout.write(JSON.stringify({ ok: false, message: error.message }));
}
`;

const installPackages = (
  nodeModulesRoot: string,
  packages: InstalledPackage[],
): void => {
  for (const installed of packages) {
    const packageRoot = join(nodeModulesRoot, ...installed.name.split("/"));

    mkdirSync(packageRoot, { recursive: true });
    writeFileSync(
      join(packageRoot, "package.json"),
      JSON.stringify(
        { name: installed.name, version: installed.version },
        null,
        2,
      ),
    );

    for (const [relativePath, contents] of Object.entries(
      installed.files ?? {},
    )) {
      writeFileSync(join(packageRoot, relativePath), contents);
    }

    if (installed.dependencies !== undefined) {
      installPackages(
        join(packageRoot, "node_modules"),
        installed.dependencies,
      );
    }
  }
};

export const createProjectFixture = (
  packages: InstalledPackage[] = [],
): ProjectFixture => {
  const root = mkdtempSync(join(tmpdir(), "hds-mcp-project-"));

  writeFileSync(
    join(root, "package.json"),
    JSON.stringify({ name: "fixture-project", version: "0.0.0" }, null, 2),
  );

  installPackages(join(root, "node_modules"), packages);

  return {
    root,
    cleanup: () => rmSync(root, { recursive: true, force: true }),
  };
};

const createModuleDirectory = (installed: InstalledPackage[]): string => {
  const moduleDirectory = mkdtempSync(join(tmpdir(), "hds-mcp-module-"));

  writeFileSync(
    join(moduleDirectory, "package.json"),
    JSON.stringify({ name: "fixture-module", type: "module" }, null, 2),
  );

  const catalogSource = readFileSync(
    join(SHARED_SOURCE_DIRECTORY, "catalog.ts"),
    "utf8",
  ).replace("./project-root.js", "./project-root.ts");

  writeFileSync(join(moduleDirectory, "catalog.ts"), catalogSource);

  copyFileSync(
    join(SHARED_SOURCE_DIRECTORY, "project-root.ts"),
    join(moduleDirectory, "project-root.ts"),
  );

  writeFileSync(join(moduleDirectory, "run.ts"), RUNNER_SOURCE);

  installPackages(join(moduleDirectory, "node_modules"), installed);

  return moduleDirectory;
};

export const runCatalogCascade = ({
  specifier,
  anchors,
  projectRoot,
  installed = [],
}: RunCascadeInput): CascadeResult => {
  const moduleDirectory = createModuleDirectory(installed);
  const env: NodeJS.ProcessEnv = {
    ...process.env,
    [PROJECT_ROOT_ENV_VAR]: projectRoot,
  };

  // vitest points these at its own dependency tree, which would let every anchor
  // reach the workspace store and resolve packages the fixture never installed
  delete env.NODE_PATH;
  delete env.NODE_OPTIONS;

  try {
    const stdout = execFileSync(
      process.execPath,
      [join(moduleDirectory, "run.ts"), specifier, JSON.stringify(anchors)],
      {
        cwd: moduleDirectory,
        encoding: "utf8",
        env,
        stdio: ["ignore", "pipe", "pipe"],
      },
    );

    return JSON.parse(stdout) as CascadeResult;
  } finally {
    rmSync(moduleDirectory, { recursive: true, force: true });
  }
};
