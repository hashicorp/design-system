/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

module(
  'Integration | Component | hds/code-editor/full-screen-button',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      this.set('noop', () => {});

      await render(
        hbs`<Hds::CodeEditor::FullScreenButton @isFullScreen={{false}} @onToggleFullScreen={{this.noop}} />`
      );

      assert.dom('.hds-code-editor__full-screen-button').exists();
    });

    // @isFullScreen
    test('it should render the component with the correct class and icon based on the `@isFullScreen` argument', async function (assert) {
      this.setProperties({
        noop: () => {},
        isFullScreen: false,
      });

      await render(
        hbs`<Hds::CodeEditor::FullScreenButton @isFullScreen={{this.isFullScreen}} @onToggleFullScreen={{this.noop}} />`
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

      this.set('isFullScreen', true);
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

      this.set('onToggleFullScreen', onToggleFullScreen);

      await render(
        hbs`<Hds::CodeEditor::FullScreenButton @isFullScreen={{false}} @onToggleFullScreen={{this.onToggleFullScreen}} />`
      );

      await click('.hds-code-editor__full-screen-button');

      assert.ok(onToggleFullScreen.calledOnce);
    });
  }
);
