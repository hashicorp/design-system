#!/usr/bin/env node
/**
 * Ensure execute permissions for the published npm `bin` entry
 * (`hds-mcp` -> `dist/index.js`) on Unix-like systems.
 *
 * This runs in `prepack` so local dev builds stay simple (`build` is just `tsc`).
 */

import { chmodSync } from 'node:fs';

chmodSync('dist/index.js', 0o755);
