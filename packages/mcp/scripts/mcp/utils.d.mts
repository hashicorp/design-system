/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

export declare function getFilesOfType(
  directory: string,
  extension: string,
): Promise<string[]>;

export interface DirectoryPaths {
  current: string;
  packageRoot: string;
  workspaceRoot: string;
  defaultInput: string;
  defaultOutput: string;
}

export declare function getDirectoryPaths(defaultPaths: {
  defaultInput: string;
  defaultOutput: string;
}): DirectoryPaths;
