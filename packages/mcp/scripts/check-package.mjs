/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = fileURLToPath(new URL('../', import.meta.url));
const temporaryRoot = mkdtempSync(join(tmpdir(), 'hds-mcp-package-'));
const tarball = join(temporaryRoot, 'mcp.tgz');
const client = new Client({ name: 'package-smoke-test', version: '1.0.0' });

try {
  mkdirSync(join(packageRoot, 'dist'), { recursive: true });
  writeFileSync(join(packageRoot, 'dist', 'stale-package-check.js'), '');
  execFileSync('pnpm', ['pack', '--out', tarball], {
    cwd: packageRoot,
    stdio: 'inherit',
    timeout: 120_000,
  });

  const files = execFileSync('tar', ['-tzf', tarball], { encoding: 'utf8' })
    .trim()
    .split('\n');
  for (const required of ['dist/index.js', 'docs-catalog.json', 'LICENSE.md', 'README.md', 'package.json']) {
    assert.ok(files.includes(`package/${required}`), `missing ${required}`);
  }
  assert.equal(files.includes('package/dist/stale-package-check.js'), false);
  assert.equal(files.some((file) => /^package\/(src|tests|scripts|node_modules)\//.test(file)), false);

  execFileSync('tar', ['-xzf', tarball, '-C', temporaryRoot]);
  const packedRoot = join(temporaryRoot, 'package');
  const manifest = JSON.parse(readFileSync(join(packedRoot, 'package.json'), 'utf8'));
  assert.notEqual(manifest.private, true);
  assert.equal(manifest.bin['helios-design-system-mcp'], './dist/index.js');
  assert.ok(readFileSync(join(packedRoot, manifest.bin['helios-design-system-mcp']), 'utf8').startsWith('#!/usr/bin/env node\n'));
  assert.ok(Object.values(manifest.dependencies).every((range) => !range.startsWith('workspace:')));

  // link only declared runtime dependencies so the packed server cannot load MCP source or dev tooling
  for (const name of Object.keys(manifest.dependencies)) {
    const target = join(packedRoot, 'node_modules', name);
    mkdirSync(dirname(target), { recursive: true });
    symlinkSync(realpathSync(join(packageRoot, 'node_modules', name)), target, 'dir');
  }

  const consumerRoot = join(temporaryRoot, 'consumer');
  const installedPackage = join(consumerRoot, 'node_modules', manifest.name);
  const binary = join(consumerRoot, 'node_modules', '.bin', 'helios-design-system-mcp');
  mkdirSync(dirname(installedPackage), { recursive: true });
  mkdirSync(dirname(binary), { recursive: true });
  writeFileSync(join(consumerRoot, 'package.json'), JSON.stringify({
    private: true,
    devDependencies: { [manifest.name]: manifest.version },
  }));
  symlinkSync(packedRoot, installedPackage, 'dir');
  symlinkSync(join(installedPackage, manifest.bin['helios-design-system-mcp']), binary);

  const transport = new StdioClientTransport({
    command: binary,
    cwd: consumerRoot,
    env: { PATH: process.env.PATH ?? '', HDS_MCP_PROJECT_ROOT: consumerRoot },
    stderr: 'inherit',
  });
  await client.connect(transport);
  assert.equal(client.getServerVersion()?.version, manifest.version);

  for (const [domain, count] of [
    ['components', 'totalComponentCount'],
    ['tokens', 'totalTokenCount'],
    ['icons', 'totalIconCount'],
  ]) {
    const response = await client.readResource({ uri: `hds://${domain}` });
    const payload = JSON.parse(response.contents[0].text);
    assert.ok(payload[count] > 0, `${domain} catalog failed: ${JSON.stringify(payload)}`);
    assert.equal(payload.source.resolvedVia, 'default');
  }

  const docs = await client.callTool({
    name: 'search_hds_docs',
    arguments: { query: 'button', limit: 1 },
  });
  assert.notEqual(docs.isError, true);
  assert.ok(docs.structuredContent.returnedMatches > 0);
  console.log('Packed MCP binary, runtime catalogs, and bundled documentation passed.');
} finally {
  await client.close();
  rmSync(temporaryRoot, { recursive: true, force: true });
}
