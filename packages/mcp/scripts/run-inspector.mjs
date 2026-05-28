/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import { spawn } from 'node:child_process';

const TOKEN_FILE = resolve(process.cwd(), '.mcp-inspector-auth-token');

const readOrCreateToken = () => {
  if (process.env['MCP_PROXY_AUTH_TOKEN']) {
    return process.env['MCP_PROXY_AUTH_TOKEN'];
  }

  if (existsSync(TOKEN_FILE)) {
    const persistedToken = readFileSync(TOKEN_FILE, 'utf8').trim();

    if (persistedToken.length > 0) {
      return persistedToken;
    }
  }

  const token = randomBytes(32).toString('hex');

  writeFileSync(TOKEN_FILE, `${token}\n`, {
    encoding: 'utf8',
    mode: 0o600,
  });

  return token;
};

const serverArgs = process.argv.slice(2);

if (serverArgs.length === 0) {
  throw new Error('Expected MCP server command arguments for mcp-inspector.');
}

const env = {
  ...process.env,
  MCP_PROXY_AUTH_TOKEN: readOrCreateToken(),
  MCP_AUTO_OPEN_ENABLED: process.env['MCP_AUTO_OPEN_ENABLED'] ?? 'false',
  CLIENT_PORT: process.env['CLIENT_PORT'] ?? '6274',
  SERVER_PORT: process.env['SERVER_PORT'] ?? '6277',
};

const inspector = spawn('pnpm', ['exec', 'mcp-inspector', ...serverArgs], {
  env,
  stdio: 'inherit',
});

inspector.on('exit', (code, signal) => {
  if (signal !== null) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});
