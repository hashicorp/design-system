/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, setupOnerror } from '@ember/test-helpers';

import hdsT from '@hashicorp/design-system-components/helpers/hds-t';

import { setupRenderingTest } from 'showcase/tests/helpers';

const DEFAULT_STRING = 'Default text';

module('Integration | Helper | hds-t', function (hooks) {
  setupRenderingTest(hooks);

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

        await render(
          <template>
            {{! @glint-expect-error - testing invalid scenarios }}
            {{hdsT value default=DEFAULT_STRING}}
          </template>,
        );

        assert.throws(function () {
          throw new Error(errorMessage);
        });
      });
    });
  });

  module('ember-intl service is available', function () {
    test('it returns translated string if locale is present and key exists', async function (assert) {
      const intl = this.owner.lookup('service:intl');

      intl.addTranslations('en-us', {
        greeting: 'Hello from Real Intl!',
      });

      await render(
        <template>{{hdsT "greeting" default=DEFAULT_STRING}}</template>,
      );

      assert.dom().hasText('Hello from Real Intl!');
    });

    test('it passes options to intl.t() and translates if key exists', async function (assert) {
      const intl = this.owner.lookup('service:intl');

      intl.addTranslations('en-us', {
        farewell: 'Goodbye {name}, aged {age}!',
      });

      const props = {
        key: 'farewell',
        nameParam: 'Tester',
        ageParam: 30,
      };

      await render(
        <template>
          {{hdsT
            props.key
            name=props.nameParam
            age=props.ageParam
            default=DEFAULT_STRING
          }}
        </template>,
      );

      assert.dom().hasText('Goodbye Tester, aged 30!');
    });

    test('it returns default string if key is valid but not found in translations', async function (assert) {
      const intl = this.owner.lookup('service:intl');
      const testKey = 'untranslated.key';

      assert.notOk(intl.exists(testKey), `intl.exists('${testKey}') is false`);

      await render(
        <template>{{hdsT testKey default=DEFAULT_STRING}}</template>,
      );

      assert
        .dom()
        .hasText(DEFAULT_STRING, 'returns default for untranslated key');
    });
  });
});
