/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

const defaultString = 'Default text';

module('Integration | Helper | hds-t', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('defaultString', defaultString);
  });

  module('invalid key values', function () {
    test('it returns the default string if key is undefined', async function (assert) {
      this.set('translationKey', undefined);

      await render(
        hbs`{{hds-t this.translationKey default=this.defaultString}}`
      );

      assert.dom().hasText(defaultString, 'returns default for undefined key');
    });

    test('it returns the default string if key is null', async function (assert) {
      this.set('translationKey', null);

      await render(
        hbs`{{hds-t this.translationKey default=this.defaultString}}`
      );

      assert.dom().hasText(defaultString, 'returns default for null key');
    });

    test('it returns the default string if key is an empty string', async function (assert) {
      this.set('translationKey', '');

      await render(
        hbs`{{hds-t this.translationKey default=this.defaultString}}`
      );

      assert
        .dom()
        .hasText(defaultString, 'returns default for empty string key');
    });

    test('it returns the default string if key is only whitespace', async function (assert) {
      this.set('translationKey', '   ');

      await render(
        hbs`{{hds-t this.translationKey default=this.defaultString}}`
      );

      assert.dom().hasText(defaultString, 'returns default for whitespace key');
    });

    test('it returns the default string if key is not a string', async function (assert) {
      this.set('translationKey', 123);

      await render(
        hbs`{{hds-t this.translationKey default=this.defaultString}}`
      );

      assert.dom().hasText(defaultString, 'returns default for non-string key');
    });
  });

  module('ember-intl service is not available', function () {
    test('it returns the default string for a valid key', async function (assert) {
      this.set('translationKey', 'some.valid.key');

      await render(
        hbs`{{hds-t this.translationKey default=this.defaultString}}`
      );

      assert.dom().hasText(defaultString, 'returns default for valid key');
    });

    test('it returns the default string for a valid key, ignoring other passed options', async function (assert) {
      this.setProperties({
        translationKey: 'some.valid.key',
        nameParam: 'User',
      });

      await render(
        hbs`{{hds-t this.translationKey name=this.nameParam default=this.defaultString}}`
      );

      assert
        .dom()
        .hasText(
          defaultString,
          'returns default for valid key, ignoring options'
        );
    });
  });

  module(
    'ember-intl service is available (using this.intl from setupIntl)',
    function () {
      test('it returns default string if intl.exists(key) is false (for a valid key)', async function (assert) {
        const testKey = 'key.that.does.not.exist';

        this.set('key', testKey);

        assert.notOk(
          this.intl.exists(testKey),
          `intl.exists('${testKey}') is false`
        );

        await render(hbs`{{hds-t this.key default=this.defaultString}}`);

        assert
          .dom()
          .hasText(defaultString, 'returns default for non-existent key');
      });

      test('it returns translated string if locale is present and key exists', async function (assert) {
        this.intl.addTranslations('en-us', {
          greeting: 'Hello from Real Intl!',
        });

        this.set('key', 'greeting');

        await render(hbs`{{hds-t this.key default=this.defaultString}}`);

        assert.dom().hasText('Hello from Real Intl!');
      });

      test('it passes options to intl.t() and translates if key exists', async function (assert) {
        this.intl.addTranslations('en-us', {
          farewell: 'Goodbye {name}, aged {age}!',
        });

        this.setProperties({
          key: 'farewell',
          nameParam: 'Tester',
          ageParam: 30,
        });

        await render(
          hbs`{{hds-t this.key name=this.nameParam age=this.ageParam default=this.defaultString}}`
        );

        assert.dom().hasText('Goodbye Tester, aged 30!');
      });

      test('it returns default string if key is valid but not found in translations', async function (assert) {
        const testKey = 'untranslated.key';

        this.set('key', testKey);

        assert.notOk(
          this.intl.exists(testKey),
          `intl.exists('${testKey}') is false`
        );

        await render(hbs`{{hds-t this.key default=this.defaultString}}`);

        assert
          .dom()
          .hasText(defaultString, 'returns default for untranslated key');
      });
    }
  );
});
