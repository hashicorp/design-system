#!/usr/bin/env node
/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

'use strict';

if (process.argv[2] === 'v8/textarea') {
  require('../transforms/v8/textarea/migrate')
    .run(process.argv.slice(3))
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
} else {
  require('codemod-cli').runTransform(
    __dirname,
    process.argv[2] /* transform name */,
    process.argv.slice(3) /* paths or globs */
  );
}
