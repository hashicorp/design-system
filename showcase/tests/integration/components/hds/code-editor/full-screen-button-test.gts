/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { click, render, settled } from '@ember/test-helpers';
import { tracked } from 'tracked-built-ins';
import sinon from 'sinon';

import { HdsCodeEditorFullScreenButton } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';
import NOOP from 'showcase/utils/noop';

module(
  'Integration | Component | hds/code-editor/full-screen-button',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsCodeEditorFullScreenButton
            @isFullScreen={{false}}
            @onToggleFullScreen={{NOOP}}
          />
        </template>,
      );

      assert.dom('.hds-code-editor__full-screen-button').exists();
    });

    // @isFullScreen
    test('it should render the component with the correct class and icon based on the `@isFullScreen` argument', async function (assert) {
      const context = tracked({ isFullScreen: false });

      await render(
        <template>
          <HdsCodeEditorFullScreenButton
            @isFullScreen={{context.isFullScreen}}
            @onToggleFullScreen={{NOOP}}
          />
        </template>,
      );
      assert
        .dom('.hds-code-editor__full-screen-button')
        .doesNotHaveClass('hds-code-editor__full-screen-button--minimize')
        .hasClass('hds-code-editor__full-screen-button--maximize');
      assert
        .dom('.hds-code-editor__full-screen-button .hds-icon-maximize')
        .exists();
      assert
        .dom('.hds-code-editor__full-screen-button .hds-icon-minimize')
        .doesNotExist();

      context.isFullScreen = true;
      await settled();

      assert
        .dom('.hds-code-editor__full-screen-button')
        .doesNotHaveClass('hds-code-editor__full-screen-button--maximize')
        .hasClass('hds-code-editor__full-screen-button--minimize');
      assert
        .dom('.hds-code-editor__full-screen-button .hds-icon-maximize')
        .doesNotExist();
      assert
        .dom('.hds-code-editor__full-screen-button .hds-icon-minimize')
        .exists();
    });

    // @onToggleFullScreen
    test('it should call the `@onToggleFullScreen` action when the button is clicked', async function (assert) {
      const onToggleFullScreen = sinon.spy();

      await render(
        <template>
          <HdsCodeEditorFullScreenButton
            id="test-button"
            @isFullScreen={{false}}
            @onToggleFullScreen={{onToggleFullScreen}}
          />
        </template>,
      );

      await click('#test-button');

      assert.ok(onToggleFullScreen.calledOnce);
    });
  },
);
