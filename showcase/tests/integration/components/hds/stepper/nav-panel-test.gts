/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import {
  HdsStepperNav,
  HdsStepperNavPanel,
} from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

// NOTICE
// Because of how the `panel` subcomponent is built,
// it's practically impossible to test in isolation, so in our tests
// in this file it will be wrapped inside its parent component.
const createNavPanel = async (options: {
  currentStep?: number;
  isNavInteractive?: boolean;
}) => {
  return await render(
    <template>
      <HdsStepperNav
        @ariaLabel="Sample stepper"
        @currentStep={{options.currentStep}}
        @isInteractive={{options.isNavInteractive}}
        as |S|
      >
        <S.Step />
        <S.Panel>
          <div id="test-panel-content">Test</div>
        </S.Panel>
      </HdsStepperNav>
    </template>,
  );
};

module('Integration | Component | hds/stepper/nav/panel', function (hooks) {
  setupRenderingTest(hooks);

  // CLASSES

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template>
        <HdsStepperNavPanel @currentStep={{1}} data-test="panel-1" />
      </template>,
    );
    assert.dom('[data-test="panel-1"]').hasClass('hds-stepper-nav__panel');
  });

  // VISIBILITY

  test('it sets the panel content to not visible when the @currentStep argument does not match the panel index in the @panelIds argument', async function (assert) {
    await createNavPanel({ currentStep: 1 });
    assert.dom('.hds-stepper-nav__panel').hasAttribute('hidden');
    assert.dom('#test-panel-content').doesNotExist();
    assert.dom('.hds-stepper-nav__panel').hasAttribute('aria-labelledby');
  });

  test('it sets the panel content to visible when the @currentStep argument matches the panel index in the @panelIds argument', async function (assert) {
    await createNavPanel({ currentStep: 0 });
    assert.dom('.hds-stepper-nav__panel').hasNoAttribute('hidden');
    assert.dom('#test-panel-content').exists();
    assert.dom('.hds-stepper-nav__panel').hasAttribute('aria-labelledby');
  });

  // INTERACTIVITY

  test('it sets the panel to interactive when the @isNavInteractive argument is not provided', async function (assert) {
    await createNavPanel({ currentStep: 0 });
    assert.dom('.hds-stepper-nav__panel').hasAttribute('role', 'tabpanel');
  });

  test('it sets the panel to non-interactive when the @isNavInteractive argument is provided', async function (assert) {
    await createNavPanel({ isNavInteractive: false });
    assert.dom('.hds-stepper-nav__panel').hasNoAttribute('role');
  });
});
