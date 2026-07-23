import { readdir } from "node:fs/promises";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export async function getFilesOfType(directory, extension) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve(directory, entry.name);

      return entry.isDirectory()
        ? getFilesOfType(entryPath, extension)
        : Promise.resolve(extname(entry.name) === extension ? [entryPath] : []);
    }),
  );

  return files.flat();
}

export function getDirectoryPaths(defaultPaths) {
  const { defaultInput: defaultInputPath, defaultOutput: defaultOutputPath } =
    defaultPaths;

  const current = dirname(fileURLToPath(import.meta.url));
  const packageRoot = resolve(current, "../..");
  const workspaceRoot = resolve(packageRoot, "../..");
  const defaultInput = resolve(workspaceRoot, defaultInputPath);
  const defaultOutput = resolve(packageRoot, defaultOutputPath);

  return {
    current,
    packageRoot,
    workspaceRoot,
    defaultInput,
    defaultOutput,
  };
}
