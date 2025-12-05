/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupTest } from 'showcase/tests/helpers';

import HdsIntlService from '@hashicorp/design-system-components/services/hds-intl';

const defaultString = 'Default text';

module('Unit | Service | hds-intl', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const hdsIntl = this.owner.lookup('service:hds-intl');
    assert.ok(hdsIntl);
  });

  test('it returns the default string if the key does not exist in translations', function (assert) {
    const hdsIntl = this.owner.lookup('service:hds-intl') as HdsIntlService;

    const result = hdsIntl.t('key.that.does.not.exist', {
      default: defaultString,
    });

    assert.strictEqual(
      result,
      defaultString,
      'returns default for non-existent key',
    );
  });

  test('it returns the translated string if key exists in translations', function (assert) {
    const intl = this.owner.lookup('service:intl');
    const hdsIntl = this.owner.lookup('service:hds-intl') as HdsIntlService;

    const greeting = 'Hello from HDS Intl!';
    const testKey = 'greeting';

    intl.addTranslations('en-us', { greeting });

    const result = hdsIntl.t(testKey, { default: defaultString });

    assert.strictEqual(result, greeting, 'returns translated string');
  });

  test('it passes options to intl.t() when translating', function (assert) {
    const intl = this.owner.lookup('service:intl');
    const hdsIntl = this.owner.lookup('service:hds-intl') as HdsIntlService;

    const testKey = 'farewell';
    intl.addTranslations('en-us', {
      farewell: 'Goodbye {name}, aged {age}!',
    });

    const options = {
      default: defaultString,
      name: 'Tester',
      age: 30,
    };

    const result = hdsIntl.t(testKey, options);

    assert.strictEqual(
      result,
      'Goodbye Tester, aged 30!',
      'interpolates parameters correctly',
    );
  });

  test('it handles locale option correctly', function (assert) {
    const intl = this.owner.lookup('service:intl');
    const hdsIntl = this.owner.lookup('service:hds-intl') as HdsIntlService;

    const testKey = 'greeting';

    intl.addTranslations('en-us', {
      greeting: 'Hello!',
    });

    intl.addTranslations('es-es', {
      greeting: '¡Hola!',
    });

    const options = {
      default: defaultString,
      locale: 'es-es',
    };

    const result = hdsIntl.t(testKey, options);

    assert.strictEqual(
      result,
      '¡Hola!',
      'uses specified locale for translation',
    );
  });

  test('it throws an error if the key is not a non-empty string', function (assert) {
    const hdsIntl = this.owner.lookup('service:hds-intl') as HdsIntlService;

    assert.throws(() => {
      // @ts-expect-error testing invalid usage
      hdsIntl.t(undefined, { default: '' });
    });
  });
});
