/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { focus, render } from '@ember/test-helpers';
import hdsTooltip from "@hashicorp/design-system-components/modifiers/hds-tooltip";

module('Integration | Component | hds/tooltip/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it attaches a tooltip to the element it is invoked on', async function (assert) {
    await render(
      <template><a href="#" {{hdsTooltip "More info."}} id="test-tooltip-modifier">Info</a></template>,
    );
    // activate the tooltip:
    await focus('#test-tooltip-modifier');
    // test that the tooltip exists and has the passed in content:
    assert.dom('.tippy-content').hasText('More info.');

    // test the expected accessibility related attributes:
    assert.dom('#test-tooltip-modifier').hasAttribute('aria-describedby');
    assert.dom('.hds-tooltip-container').exists();
    assert.dom('.hds-tooltip-container').hasAttribute('id');
    assert.strictEqual(
      this.element
        .querySelector('#test-tooltip-modifier')
        .getAttribute('aria-describedby'),
      this.element.querySelector('.hds-tooltip-container').getAttribute('id'),
    );
    assert.strictEqual(
      this.element
        .querySelector('#test-tooltip-modifier')
        .getAttribute('aria-controls'),
      this.element.querySelector('.hds-tooltip-container').getAttribute('id'),
    );
  });
});
