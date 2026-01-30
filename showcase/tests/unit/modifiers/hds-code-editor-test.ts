/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';

import {
  getCSPNonceFromMeta,
  getErrorMessage,
} from '@hashicorp/design-system-components/modifiers/hds-code-editor';

module('Unit | Helper | hds-code-editor', function (hooks) {
  hooks.afterEach(() => {
    const meta = document.querySelector(
      'meta[http-equiv="Content-Security-Policy"]',
    );

    if (meta) {
      meta.parentNode?.removeChild(meta);
    }
  });

  test('returns undefined when no meta tag is present', function (assert) {
    const existing = document.querySelector(
      'meta[http-equiv="Content-Security-Policy"]',
    );

    if (existing) {
      existing.parentNode?.removeChild(existing);
    }

    assert.strictEqual(
      getCSPNonceFromMeta(),
      undefined,
      'Should return undefined if no meta tag is found',
    );
  });

  test('returns undefined when meta tag is present without a content attribute', function (assert) {
    const meta = document.createElement('meta');

    meta.setAttribute('http-equiv', 'Content-Security-Policy');

    document.head.appendChild(meta);

    assert.strictEqual(
      getCSPNonceFromMeta(),
      undefined,
      'Should return undefined if content attribute is missing',
    );
  });

  test('extracts nonce from a meta tag with a style-src directive', function (assert) {
    const meta = document.createElement('meta');

    meta.setAttribute('http-equiv', 'Content-Security-Policy');
    meta.setAttribute(
      'content',
      "default-src 'none'; style-src 'nonce-ABC123';",
    );

    document.head.appendChild(meta);

    assert.strictEqual(
      getCSPNonceFromMeta(),
      'ABC123',
      'Should extract nonce "ABC123" from style-src directive',
    );
  });

  test('extracts nonce from a meta tag with a script-src directive', function (assert) {
    const meta = document.createElement('meta');

    meta.setAttribute('http-equiv', 'Content-Security-Policy');
    meta.setAttribute(
      'content',
      "default-src 'none'; script-src 'nonce-XYZ789';",
    );

    document.head.appendChild(meta);

    assert.strictEqual(
      getCSPNonceFromMeta(),
      'XYZ789',
      'Should extract nonce "XYZ789" from script-src directive',
    );
  });

  test('returns undefined if nonce is not present in the meta content', function (assert) {
    const meta = document.createElement('meta');

    meta.setAttribute('http-equiv', 'Content-Security-Policy');
    meta.setAttribute(
      'content',
      "default-src 'none'; style-src 'unsafe-inline';",
    );

    document.head.appendChild(meta);

    assert.strictEqual(
      getCSPNonceFromMeta(),
      undefined,
      'Should return undefined if nonce is not present',
    );
  });

  // getErrorMessage

  test('returns the message property for Error instances', function (assert) {
    const error = new Error('Something went wrong');
    assert.strictEqual(getErrorMessage(error), 'Something went wrong');
  });

  test('returns string representation for non-Error values', function (assert) {
    assert.strictEqual(getErrorMessage('a string error'), 'a string error');
    assert.strictEqual(getErrorMessage(42), '42');
    assert.strictEqual(
      getErrorMessage({ custom: 'object' }),
      '{"custom":"object"}',
    );
    assert.strictEqual(getErrorMessage(null), 'null');
    assert.strictEqual(getErrorMessage(undefined), 'undefined');
  });
});
