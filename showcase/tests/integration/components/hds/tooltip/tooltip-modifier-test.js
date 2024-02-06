/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { focus, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/tooltip/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it attaches a tooltip to the element it is invoked on', async function (assert) {
    await render(
      hbs`<a href="#" {{hds-tooltip "More info."}}  id="test-tooltip-modifier">Info</a>`
    );
    // activate the tooltip:
    await focus('#test-tooltip-modifier');
    // test that the tooltip exists and has the passed in content:
    assert.dom('.tippy-content').hasText('More info.');

    // test the expected accessibility related attributes:
    assert.dom('#test-tooltip-modifier').hasAttribute('aria-describedby');
    assert.dom('[data-tippy-root]').hasAttribute('id');
    assert.strictEqual(
      this.element
        .querySelector('#test-tooltip-modifier')
        .getAttribute('aria-describedby'),
      this.element.querySelector('[data-tippy-root]').getAttribute('id')
    );
  });
});
