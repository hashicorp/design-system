/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import {
  initialize,
  insertSpriteRoot,
  ROOT_ID,
} from '@hashicorp/design-system-components/instance-initializers/load-sprite-empty';

const getRoots = (): NodeListOf<Element> =>
  document.querySelectorAll(`#${ROOT_ID}`);

module('Unit | Instance Initializer | load-sprite-empty', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    getRoots().forEach((root) => root.remove());
  });

  test('it adds the sprite root to #ember-testing in tests', function (assert) {
    initialize();

    const roots = getRoots();

    assert.strictEqual(roots.length, 1, 'adds one sprite root');
    assert.strictEqual(
      roots[0]?.parentElement?.id,
      'ember-testing',
      'the sprite root is inside #ember-testing, so Percy snapshots include it',
    );
  });

  test('it does not add a second sprite root', function (assert) {
    initialize();

    const root = insertSpriteRoot();

    assert.strictEqual(getRoots().length, 1, 'adds only one sprite root');
    assert.strictEqual<Element | null | undefined>(
      root,
      getRoots()[0],
      'returns the existing sprite root',
    );
  });
});
