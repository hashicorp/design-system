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
    this.service = this.owner.lookup('service:hds-intl');
    this.defaultOptions = { default: defaultString };
  });

  test('it exists', function (assert) {
    assert.ok(this.service);
  });

  test('it returns the default string if the key does not exist in translations', function (assert) {
    const testKey = 'key.that.does.not.exist';
    const result = this.service.t(testKey, this.defaultOptions);

    assert.strictEqual(
      result,
      defaultString,
      'returns default for non-existent key',
    );
  });

  test('it returns the translated string if key exists in translations', function (assert) {
    const testKey = 'greeting';
    this.intl.addTranslations('en-us', {
      greeting: 'Hello from Real Intl!',
    });

    const result = this.service.t(testKey, this.defaultOptions);

    assert.strictEqual(
      result,
      'Hello from Real Intl!',
      'returns translated string',
    );
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

    const result = this.service.t(testKey, options);

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

    const result = this.service.t(testKey, options);

    assert.strictEqual(
      result,
      '¡Hola!',
      'uses specified locale for translation',
    );
  });
});
