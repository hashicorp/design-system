/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// locates the consumer project directory that catalog resolution anchors against
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const PROJECT_ROOT_ENV_VAR = "HDS_MCP_PROJECT_ROOT";

export type ResolveProjectRootInput = {
  cwd: string;
  env: NodeJS.ProcessEnv;
};

// nearest directory at or above `startDirectory` that holds a package.json
export const findPackageDirectory = (startDirectory: string): string | null => {
  let directory = resolve(startDirectory);

  while (true) {
    if (existsSync(join(directory, "package.json"))) {
      return directory;
    }

    const parent = dirname(directory);

    if (parent === directory) {
      return null;
    }

    directory = parent;
  }
};

export const getMcpPackageDirectory = (): string => {
  const packageDirectory = findPackageDirectory(
    dirname(fileURLToPath(import.meta.url)),
  );

  if (packageDirectory === null) {
    throw new Error(
      "Unable to locate the MCP package directory: no package.json found above this module.",
    );
  }

  return packageDirectory;
};

export const resolveProjectRoot = ({
  cwd,
  env,
}: ResolveProjectRootInput): string => {
  const override = env[PROJECT_ROOT_ENV_VAR];

  if (override !== undefined && override.trim().length > 0) {
    return override;
  }

  return findPackageDirectory(cwd) ?? cwd;
};

let projectRoot: string | null = null;

export const getProjectRoot = (): string => {
  if (projectRoot === null) {
    projectRoot = resolveProjectRoot({
      cwd: process.cwd(),
      env: process.env,
    });
  }

  return projectRoot;
};
