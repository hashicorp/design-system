/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { waitFor, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'showcase/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/code-editor', function (hooks) {
  setupApplicationTest(hooks);

  test('Components/code-editor page passes automated a11y checks', async function (assert) {
    await visit('/components/code-editor');

    // Wait for CodeMirror to initialize
    await waitFor('.cm-editor');

    // CodeMirror 6 intentionally sets tabindex="-1" on the scroller and delegates
    // keyboard scrolling to the inner content-editable element.
    // We disable 'scrollable-region-focusable' because the editor remains
    // functional for keyboard users via arrow keys, making this a false positive.
    await a11yAudit({
      rules: {
        'scrollable-region-focusable': { enabled: false },
      },
    });

    assert.ok(true, 'a11y automation audit passed');
  });
});
