/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

const defaultString = 'Default text';

module('Integration | Helper | hds-t', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('defaultString', defaultString);
  });

  module('invalid key values', function () {
    test('it throws an error if key is undefined', async function (assert) {
      const errorMessage = `Hds::T helper requires a key as the first positional argument`;
      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });

      this.set('translationKey', undefined);

      await render(
        hbs`{{hds-t this.translationKey default=this.defaultString}}`,
      );

      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });

    test('it throws an error if key is null', async function (assert) {
      const errorMessage = `Hds::T helper requires a key as the first positional argument`;
      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });

      this.set('translationKey', null);

      await render(
        hbs`{{hds-t this.translationKey default=this.defaultString}}`,
      );

      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });

    test('it throws an error if key is an empty string', async function (assert) {
      const errorMessage = `Hds::T helper requires a key as the first positional argument`;
      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });

      this.set('translationKey', '');

      await render(
        hbs`{{hds-t this.translationKey default=this.defaultString}}`,
      );

      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });

    test('it throws an error if key is only whitespace', async function (assert) {
      const errorMessage = `Hds::T helper requires a key as the first positional argument`;
      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });

      this.set('translationKey', '     ');

      await render(
        hbs`{{hds-t this.translationKey default=this.defaultString}}`,
      );

      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });

    test('it throws an error if key is not a string', async function (assert) {
      const errorMessage = `Hds::T helper requires a key as the first positional argument`;
      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });

      this.set('translationKey', 123);

      await render(
        hbs`{{hds-t this.translationKey default=this.defaultString}}`,
      );

      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });
  });

  module('ember-intl service is available', function (hooks) {
    hooks.beforeEach(function () {
      this.intl = this.owner.lookup('service:intl');
    });

    test('it returns default string if intl.exists(key) is false (for a valid key)', async function (assert) {
      const testKey = 'key.that.does.not.exist';

      this.set('key', testKey);

      assert.notOk(
        this.intl.exists(testKey),
        `intl.exists('${testKey}') is false`,
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
        hbs`{{hds-t this.key name=this.nameParam age=this.ageParam default=this.defaultString}}`,
      );

      assert.dom().hasText('Goodbye Tester, aged 30!');
    });

    test('it returns default string if key is valid but not found in translations', async function (assert) {
      const testKey = 'untranslated.key';

      this.set('key', testKey);

      assert.notOk(
        this.intl.exists(testKey),
        `intl.exists('${testKey}') is false`,
      );

      await render(hbs`{{hds-t this.key default=this.defaultString}}`);

      assert
        .dom()
        .hasText(defaultString, 'returns default for untranslated key');
    });
  });
});
