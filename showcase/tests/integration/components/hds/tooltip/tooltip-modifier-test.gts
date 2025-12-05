/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { focus, render, find } from '@ember/test-helpers';

import hdsTooltip from '@hashicorp/design-system-components/modifiers/hds-tooltip';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/tooltip/modifier', function (hooks) {
  setupRenderingTest(hooks);

  test('it attaches a tooltip to the element it is invoked on', async function (assert) {
    await render(
      <template>
        <a
          href="#"
          {{hdsTooltip "More info."}}
          id="test-tooltip-modifier"
        >Info</a>
      </template>,
    );
    // activate the tooltip:
    await focus('#test-tooltip-modifier');
    // test that the tooltip exists and has the passed in content:
    assert.dom('.tippy-content').hasText('More info.');

    // test the expected accessibility related attributes:
    assert.dom('#test-tooltip-modifier').hasAttribute('aria-describedby');
    assert.dom('.hds-tooltip-container').exists();
    assert.dom('.hds-tooltip-container').hasAttribute('id');

    const tooltipContainer = find('.hds-tooltip-container');
    const tooltipContainerId = tooltipContainer?.id ?? '';

    const tooltipModifier = find('#test-tooltip-modifier');

    assert.strictEqual(
      tooltipModifier?.getAttribute('aria-describedby'),
      tooltipContainerId,
    );
    assert.strictEqual(
      tooltipModifier?.getAttribute('aria-controls'),
      tooltipContainerId,
    );
  });
});
