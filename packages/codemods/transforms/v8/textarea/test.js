/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

'use strict';

const { runTransformTest } = require('codemod-cli');

let warn;
beforeEach(() => {
  warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
});
afterEach(() => {
  const name = expect.getState().currentTestName;
  try {
    if (name.includes(' manual ')) {
      expect(warn).toHaveBeenCalledTimes(5);
      expect(warn.mock.calls.every(([message]) => /manual.hbs:\d+:\d+:/.test(message))).toBe(true);
      expect(warn.mock.calls[0][0]).toContain('existing modifiers');
      expect(warn.mock.calls[3][0]).toContain('Cannot infer a writable object/property');
    } else if (name.includes(' missing-helpers ')) {
      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn.mock.calls[0][0]).toContain('Automatic migration requires');
    } else if (name.includes(' shadowed-helpers ')) {
      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn.mock.calls[0][0]).toContain('shadows on, pick, or set');
    } else {
      expect(warn).not.toHaveBeenCalled();
    }
  } finally {
    warn.mockRestore();
  }
});

runTransformTest({ name: 'v8/textarea' });
