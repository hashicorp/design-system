/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { hdsLinkToModels } from '@hashicorp/design-system-components/helpers/hds-link-to-models';

// Note: helper arguments are positional, so need to pass undefined for unused args
module('Unit | Helper | hds-link-to-models', function () {
  test('returns the same array of models that is passed as argument', function (assert) {
    assert.deepEqual(
      hdsLinkToModels([undefined, ['model-1', 'model-2', 'model-3']]),
      ['model-1', 'model-2', 'model-3'],
    );
  });
  test('returns an array containing the model if a single model is passed as argument', function (assert) {
    assert.deepEqual(hdsLinkToModels(['model', undefined]), ['model']);
  });
  test('returns an empty array if no argument is passed', function (assert) {
    assert.deepEqual(hdsLinkToModels([undefined, undefined]), []);
  });
  test('it should throw an assertion if both "model" and "models" are provided', function (assert) {
    assert.throws(function () {
      hdsLinkToModels(['model', ['model-1', 'model-2', 'model-3']]);
    });
  });
});
