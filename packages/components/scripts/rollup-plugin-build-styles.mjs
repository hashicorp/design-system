import { join, dirname, resolve } from 'node:path';
import fs from 'fs-extra';
import * as sass from 'sass';

/**
 * Compile a single SCSS entry into CSS (+ .map) under distRoot, preserving the same relative path.
 * Example:
 *   srcRoot:  src/styles
 *   distRoot: dist/styles
 *   relScss:  @hashicorp/design-system-components.scss
 * -> writes:
 *   dist/styles/@hashicorp/design-system-components.css
 *   dist/styles/@hashicorp/design-system-components.css.map
 */
function compileOne({ srcRoot, distRoot, relScss, includePaths = [] }) {
  const inFile = join(srcRoot, relScss);

  const outCss = join(distRoot, relScss).replace(/\.scss$/, '.css');
  const outMap = `${outCss}.map`;

  const result = sass.compile(inFile, {
    style: 'expanded',
    sourceMap: true,
    sourceMapIncludeSources: true,
    // allow @use/@import to resolve from your styles root, includePaths, and node_modules
    loadPaths: [srcRoot, ...includePaths, 'node_modules'],
  });

  fs.ensureDirSync(dirname(outCss));
  fs.writeFileSync(outCss, result.css);

  if (result.sourceMap) {
    fs.writeFileSync(outMap, JSON.stringify(result.sourceMap));
  }
}

export function buildStylesPlugin(options = {}) {
  const {
    srcRoot = 'src/styles',
    distRoot = 'dist/styles',
    entries = [],
    includePathsByEntry = {},
  } = options;

  // Force a build at least once, then only when styles change.
  let needsBuild = true;

  const absSrcRoot = resolve(srcRoot);

  function isInStylesTree(id) {
    // Rollup provides absolute paths for watched files most of the time.
    // In case it doesn't, fall back to simple substring check too.
    const abs = resolve(id);
    return (
      abs.startsWith(absSrcRoot) ||
      id.includes('/src/styles/') ||
      id.includes('\\src\\styles\\')
    );
  }

  async function copyStylesTree() {
    // Mirror srcRoot into distRoot
    await fs.ensureDir(dirname(distRoot));
    await fs.remove(distRoot);
    await fs.copy(srcRoot, distRoot);
  }

  async function buildAll() {
    // 1) Copy the whole styles tree late, so Embroider can't clean it away.
    await copyStylesTree();

    // 2) Compile entrypoints into CSS next to the copied SCSS.
    for (const relScss of entries) {
      compileOne({
        srcRoot,
        distRoot,
        relScss,
        includePaths: includePathsByEntry[relScss] ?? [],
      });
    }
  }

  return {
    name: 'build-styles-sidecar',

    buildStart() {
      // Ensure watch mode re-runs when anything under styles changes.
      // (Rollup will re-run the build when watched files change.)
      this.addWatchFile(absSrcRoot);
    },

    watchChange(id) {
      if (isInStylesTree(id)) {
        needsBuild = true;
      }
    },

    async writeBundle() {
      if (!needsBuild) return;

      await buildAll();
      needsBuild = false;
    },
  };
}
