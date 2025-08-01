/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupTest } from 'showcase/tests/helpers';

const defaultString = 'Default text';

module('Unit | Service | hds-intl', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.intl = this.owner.lookup('service:intl');
    this.hdsIntl = this.owner.lookup('service:hds-intl');
    this.defaultOptions = { default: defaultString };
  });

  test('it exists', function (assert) {
    assert.ok(this.hdsIntl);
  });

  test('it returns the default string if the key does not exist in translations', function (assert) {
    const testKey = 'key.that.does.not.exist';
    const result = this.hdsIntl.t(testKey, this.defaultOptions);

    assert.strictEqual(
      result,
      defaultString,
      'returns default for non-existent key',
    );
  });

  test('it returns the translated string if key exists in translations', function (assert) {
    const greeting = 'Hello from HDS Intl!';
    const testKey = 'greeting';
    this.intl.addTranslations('en-us', { greeting });

    const result = this.hdsIntl.t(testKey, this.defaultOptions);

    assert.strictEqual(result, greeting, 'returns translated string');
  });

  test('it passes options to intl.t() when translating', function (assert) {
    const testKey = 'farewell';
    this.intl.addTranslations('en-us', {
      farewell: 'Goodbye {name}, aged {age}!',
    });

    const options = {
      default: defaultString,
      name: 'Tester',
      age: 30,
    };

    const result = this.hdsIntl.t(testKey, options);

    assert.strictEqual(
      result,
      'Goodbye Tester, aged 30!',
      'interpolates parameters correctly',
    );
  });

  test('it handles locale option correctly', function (assert) {
    const testKey = 'greeting';

    this.intl.addTranslations('en-us', {
      greeting: 'Hello!',
    });

    this.intl.addTranslations('es-es', {
      greeting: '¡Hola!',
    });

    const options = {
      default: defaultString,
      locale: 'es-es',
    };

    const result = this.hdsIntl.t(testKey, options);

    assert.strictEqual(
      result,
      '¡Hola!',
      'uses specified locale for translation',
    );
  });

  test('it throws an error if the key is not a non-empty string', function (assert) {
    assert.throws(() => {
      this.hdsIntl.t(undefined, { default: '' });
    });
  });
});
