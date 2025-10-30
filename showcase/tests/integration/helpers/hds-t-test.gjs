/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, setupOnerror } from '@ember/test-helpers';
import hdsT from '@hashicorp/design-system-components/helpers/hds-t';

const defaultString = 'Default text';

module('Integration | Helper | hds-t', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('defaultString', defaultString);
  });

  module('invalid key values', function () {
    const invalidKeyScenarios = [
      {
        name: 'undefined',
        value: undefined,
      },
      {
        name: 'null',
        value: null,
      },
      {
        name: 'an empty string',
        value: '',
      },
      {
        name: 'only whitespace',
        value: '     ',
      },
      {
        name: 'not a string',
        value: 123,
      },
    ];

    invalidKeyScenarios.forEach(({ name, value }) => {
      test(`it throws an error if key is ${name}`, async function (assert) {
        const errorMessage = `Hds::T helper requires a key as the first positional argument`;
        setupOnerror(function (error) {
          assert.strictEqual(
            error.message,
            `Assertion Failed: ${errorMessage}`,
          );
        });

        this.set('translationKey', value);

        await render(
          <template>
            {{hdsT this.translationKey default=this.defaultString}}
          </template>,
        );

        assert.throws(function () {
          throw new Error(errorMessage);
        });
      });
    });
  });

  module('ember-intl service is available', function (hooks) {
    hooks.beforeEach(function () {
      this.intl = this.owner.lookup('service:intl');
    });

    test('it returns translated string if locale is present and key exists', async function (assert) {
      this.intl.addTranslations('en-us', {
        greeting: 'Hello from Real Intl!',
      });

      this.set('key', 'greeting');

      await render(
        <template>{{hdsT this.key default=this.defaultString}}</template>,
      );

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
        <template>
          {{hdsT
            this.key
            name=this.nameParam
            age=this.ageParam
            default=this.defaultString
          }}
        </template>,
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

      await render(
        <template>{{hdsT this.key default=this.defaultString}}</template>,
      );

      assert
        .dom()
        .hasText(defaultString, 'returns default for untranslated key');
    });
  });
});
