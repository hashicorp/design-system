#!/usr/bin/env node
/**
 * Performance Benchmark Script for @hashicorp/design-system-components
 * Compares HBS to GTS migration impact
 *
 * Metrics measured:
 * - Production build time
 * - JS bundle size (total and gzipped)
 * - CSS bundle size (total and gzipped)
 * - Number of build output files
 */

import { execSync, spawnSync } from 'child_process';
import {
  readdirSync,
  statSync,
  readFileSync,
  writeFileSync,
  existsSync,
  rmSync,
} from 'fs';
import { join, extname } from 'path';
import { gzipSync } from 'zlib';

const ITERATIONS = 3; // Number of build iterations for averaging
const RESULTS_FILE = 'benchmark-results.json';

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatMs(ms) {
  if (ms < 1000) return `${ms.toFixed(0)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

function getDirectorySize(dirPath, extensions = []) {
  let totalSize = 0;
  const files = [];

  function walkDir(currentPath) {
    const entries = readdirSync(currentPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(currentPath, entry.name);
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (entry.isFile()) {
        const ext = extname(entry.name);
        if (extensions.length === 0 || extensions.includes(ext)) {
          const stats = statSync(fullPath);
          totalSize += stats.size;
          files.push({ path: fullPath, size: stats.size });
        }
      }
    }
  }

  if (existsSync(dirPath)) {
    walkDir(dirPath);
  }
  return { totalSize, files };
}

function getGzippedSize(filePath) {
  try {
    const content = readFileSync(filePath);
    const gzipped = gzipSync(content);
    return gzipped.length;
  } catch {
    return 0;
  }
}

function cleanBuild() {
  const distPath = join(process.cwd(), 'dist');
  if (existsSync(distPath)) {
    rmSync(distPath, { recursive: true, force: true });
  }

  // Clean tmp folders
  const tmpPath = join(process.cwd(), 'tmp');
  if (existsSync(tmpPath)) {
    rmSync(tmpPath, { recursive: true, force: true });
  }
}

function runBuild() {
  const start = performance.now();

  // Check if we're using workspace version or npm version
  const pkgPath = join(process.cwd(), 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
  const isWorkspace =
    pkg.devDependencies['@hashicorp/design-system-components']?.includes(
      'workspace',
    );

  const buildCmd = isWorkspace
    ? 'pnpm build:packages && ember build --environment=production'
    : 'ember build --environment=production';

  try {
    execSync(buildCmd, {
      stdio: 'pipe',
      cwd: process.cwd(),
      env: { ...process.env, FORCE_COLOR: '0' },
    });
  } catch (error) {
    console.error('Build failed:', error.message);
    throw error;
  }

  const end = performance.now();
  return end - start;
}

function measureBundleSizes() {
  const distAssetsPath = join(process.cwd(), 'dist', 'assets');

  // Get JS files
  const jsResult = getDirectorySize(distAssetsPath, ['.js']);
  const jsGzippedSize = jsResult.files.reduce(
    (sum, f) => sum + getGzippedSize(f.path),
    0,
  );

  // Get CSS files
  const cssResult = getDirectorySize(distAssetsPath, ['.css']);
  const cssGzippedSize = cssResult.files.reduce(
    (sum, f) => sum + getGzippedSize(f.path),
    0,
  );

  // Get map files
  const mapResult = getDirectorySize(distAssetsPath, ['.map']);

  // Count total files in dist
  const allFiles = getDirectorySize(join(process.cwd(), 'dist'));

  return {
    js: {
      raw: jsResult.totalSize,
      gzipped: jsGzippedSize,
      fileCount: jsResult.files.length,
      files: jsResult.files.map((f) => ({
        name: f.path.split('/assets/').pop(),
        size: f.size,
        gzipped: getGzippedSize(f.path),
      })),
    },
    css: {
      raw: cssResult.totalSize,
      gzipped: cssGzippedSize,
      fileCount: cssResult.files.length,
      files: cssResult.files.map((f) => ({
        name: f.path.split('/assets/').pop(),
        size: f.size,
        gzipped: getGzippedSize(f.path),
      })),
    },
    maps: {
      raw: mapResult.totalSize,
      fileCount: mapResult.files.length,
    },
    totalFiles: allFiles.files.length,
  };
}

function getVersionInfo() {
  try {
    // Try to get version from node_modules
    const pkgPath = join(
      process.cwd(),
      'node_modules',
      '@hashicorp',
      'design-system-components',
      'package.json',
    );
    if (existsSync(pkgPath)) {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
      return pkg.version;
    }

    // Fallback to workspace package
    const workspacePkgPath = join(
      process.cwd(),
      '..',
      'packages',
      'components',
      'package.json',
    );
    if (existsSync(workspacePkgPath)) {
      const pkg = JSON.parse(readFileSync(workspacePkgPath, 'utf-8'));
      return pkg.version + ' (workspace)';
    }

    return 'unknown';
  } catch {
    return 'unknown';
  }
}

async function runBenchmark(label = '') {
  const version = getVersionInfo();
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Benchmarking @hashicorp/design-system-components v${version}`);
  if (label) console.log(`Label: ${label}`);
  console.log('='.repeat(60));

  const buildTimes = [];
  let bundleSizes = null;

  for (let i = 1; i <= ITERATIONS; i++) {
    console.log(`\n[${i}/${ITERATIONS}] Cleaning and building...`);
    cleanBuild();

    const buildTime = runBuild();
    buildTimes.push(buildTime);
    console.log(`  Build time: ${formatMs(buildTime)}`);

    // Measure bundle sizes only on last iteration
    if (i === ITERATIONS) {
      bundleSizes = measureBundleSizes();
    }
  }

  const avgBuildTime =
    buildTimes.reduce((a, b) => a + b, 0) / buildTimes.length;
  const minBuildTime = Math.min(...buildTimes);
  const maxBuildTime = Math.max(...buildTimes);

  const results = {
    version,
    label,
    timestamp: new Date().toISOString(),
    iterations: ITERATIONS,
    buildTime: {
      average: avgBuildTime,
      min: minBuildTime,
      max: maxBuildTime,
      all: buildTimes,
    },
    bundleSizes,
  };

  // Print summary
  console.log('\n' + '-'.repeat(60));
  console.log('BENCHMARK RESULTS');
  console.log('-'.repeat(60));
  console.log(`\nVersion: ${version}`);
  console.log(`\n📊 Build Time (${ITERATIONS} iterations):`);
  console.log(`   Average: ${formatMs(avgBuildTime)}`);
  console.log(`   Min:     ${formatMs(minBuildTime)}`);
  console.log(`   Max:     ${formatMs(maxBuildTime)}`);

  console.log(`\n📦 JavaScript Bundle:`);
  console.log(
    `   Raw:     ${formatBytes(bundleSizes.js.raw)} (${bundleSizes.js.fileCount} files)`,
  );
  console.log(`   Gzipped: ${formatBytes(bundleSizes.js.gzipped)}`);

  console.log(`\n🎨 CSS Bundle:`);
  console.log(
    `   Raw:     ${formatBytes(bundleSizes.css.raw)} (${bundleSizes.css.fileCount} files)`,
  );
  console.log(`   Gzipped: ${formatBytes(bundleSizes.css.gzipped)}`);

  console.log(`\n📁 Total files in dist: ${bundleSizes.totalFiles}`);
  console.log(
    `\n🗺️  Source Maps: ${formatBytes(bundleSizes.maps.raw)} (${bundleSizes.maps.fileCount} files)`,
  );

  // Print largest JS files
  console.log(`\n📄 Largest JS files:`);
  bundleSizes.js.files
    .sort((a, b) => b.size - a.size)
    .slice(0, 5)
    .forEach((f) => {
      console.log(
        `   ${f.name}: ${formatBytes(f.size)} (${formatBytes(f.gzipped)} gzipped)`,
      );
    });

  return results;
}

function compareResults(results1, results2) {
  console.log('\n' + '='.repeat(60));
  console.log('COMPARISON');
  console.log('='.repeat(60));

  const pctChange = (newVal, oldVal) => {
    const change = ((newVal - oldVal) / oldVal) * 100;
    const sign = change > 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  const diff = (newVal, oldVal) => {
    const d = newVal - oldVal;
    const sign = d > 0 ? '+' : '';
    return `${sign}${formatBytes(d)}`;
  };

  const timeDiff = (newVal, oldVal) => {
    const d = newVal - oldVal;
    const sign = d > 0 ? '+' : '';
    return `${sign}${formatMs(d)}`;
  };

  console.log(
    `\n${results1.label || results1.version} vs ${results2.label || results2.version}`,
  );

  console.log(`\n📊 Build Time:`);
  console.log(
    `   ${results1.version}: ${formatMs(results1.buildTime.average)}`,
  );
  console.log(
    `   ${results2.version}: ${formatMs(results2.buildTime.average)}`,
  );
  console.log(
    `   Change: ${timeDiff(results1.buildTime.average, results2.buildTime.average)} (${pctChange(results1.buildTime.average, results2.buildTime.average)})`,
  );

  console.log(`\n📦 JavaScript Bundle (raw):`);
  console.log(
    `   ${results1.version}: ${formatBytes(results1.bundleSizes.js.raw)}`,
  );
  console.log(
    `   ${results2.version}: ${formatBytes(results2.bundleSizes.js.raw)}`,
  );
  console.log(
    `   Change: ${diff(results1.bundleSizes.js.raw, results2.bundleSizes.js.raw)} (${pctChange(results1.bundleSizes.js.raw, results2.bundleSizes.js.raw)})`,
  );

  console.log(`\n📦 JavaScript Bundle (gzipped):`);
  console.log(
    `   ${results1.version}: ${formatBytes(results1.bundleSizes.js.gzipped)}`,
  );
  console.log(
    `   ${results2.version}: ${formatBytes(results2.bundleSizes.js.gzipped)}`,
  );
  console.log(
    `   Change: ${diff(results1.bundleSizes.js.gzipped, results2.bundleSizes.js.gzipped)} (${pctChange(results1.bundleSizes.js.gzipped, results2.bundleSizes.js.gzipped)})`,
  );

  console.log(`\n🎨 CSS Bundle (raw):`);
  console.log(
    `   ${results1.version}: ${formatBytes(results1.bundleSizes.css.raw)}`,
  );
  console.log(
    `   ${results2.version}: ${formatBytes(results2.bundleSizes.css.raw)}`,
  );
  console.log(
    `   Change: ${diff(results1.bundleSizes.css.raw, results2.bundleSizes.css.raw)} (${pctChange(results1.bundleSizes.css.raw, results2.bundleSizes.css.raw)})`,
  );

  console.log(`\n🎨 CSS Bundle (gzipped):`);
  console.log(
    `   ${results1.version}: ${formatBytes(results1.bundleSizes.css.gzipped)}`,
  );
  console.log(
    `   ${results2.version}: ${formatBytes(results2.bundleSizes.css.gzipped)}`,
  );
  console.log(
    `   Change: ${diff(results1.bundleSizes.css.gzipped, results2.bundleSizes.css.gzipped)} (${pctChange(results1.bundleSizes.css.gzipped, results2.bundleSizes.css.gzipped)})`,
  );
}

// Main execution
const args = process.argv.slice(2);
const command = args[0];

if (command === 'compare') {
  // Load and compare two result files
  const file1 = args[1];
  const file2 = args[2];

  if (!file1 || !file2) {
    console.error(
      'Usage: node benchmark.mjs compare <results1.json> <results2.json>',
    );
    process.exit(1);
  }

  const results1 = JSON.parse(readFileSync(file1, 'utf-8'));
  const results2 = JSON.parse(readFileSync(file2, 'utf-8'));
  compareResults(results1, results2);
} else {
  // Run a benchmark
  const label = args[0] || '';
  const outputFile =
    args[1] || `benchmark-${label || 'results'}-${Date.now()}.json`;

  runBenchmark(label)
    .then((results) => {
      writeFileSync(outputFile, JSON.stringify(results, null, 2));
      console.log(`\n✅ Results saved to: ${outputFile}`);
    })
    .catch((err) => {
      console.error('Benchmark failed:', err);
      process.exit(1);
    });
}
