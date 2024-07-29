/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, resetOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/dialog-primitive/header',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.afterEach(() => {
      resetOnerror();
    });

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`
        <Hds::DialogPrimitive::Header id="test-header">Title</Hds::DialogPrimitive::Header>
      `
      );
      assert.dom('#test-header').hasClass('hds-dialog-primitive__header');
    });

    // TITLE (ICON, TAGLINE & DESCRIPTION)

    test('it renders the title without icon, tagline, or description', async function (assert) {
      await render(
        hbs`
        <Hds::DialogPrimitive::Header>
          Title
        </Hds::DialogPrimitive::Header>
      `
      );
      assert.dom('.hds-dialog-primitive__title').exists();
      assert.dom('.hds-dialog-primitive__title').hasText('Title');
      assert.dom('.hds-dialog-primitive__icon').doesNotExist();
      assert.dom('.hds-dialog-primitive__tagline').doesNotExist();
    });

    test('it renders the title with icon and tagline if provided', async function (assert) {
      await render(
        hbs`
        <Hds::DialogPrimitive::Header @icon="info" @tagline="Tagline">
          Title
        </Hds::DialogPrimitive::Header>
      `
      );
      assert.dom('.hds-dialog-primitive__title').exists();
      assert.dom('.hds-dialog-primitive__title').hasText('Tagline Title');
      assert.dom('.hds-dialog-primitive__icon.flight-icon-info').exists();
      assert.dom('.hds-dialog-primitive__tagline').exists();
      assert.dom('.hds-dialog-primitive__tagline').hasText('Tagline');
    });

    // CONTEXTUAL CLASSES

    test('it adds contextual classes to different DOM nodes using the `@contextualClassPrefix`', async function (assert) {
      await render(
        hbs`
        <Hds::DialogPrimitive::Header @icon="info" @tagline="Tagline" @contextualClassPrefix="abc">
          Title
        </Hds::DialogPrimitive::Header>
      `
      );
      assert.dom('.hds-dialog-primitive__header.abc__header').exists();
      assert.dom('.hds-dialog-primitive__icon.abc__icon').exists();
      assert.dom('.hds-dialog-primitive__title.abc__title').exists();
      assert.dom('.hds-dialog-primitive__tagline.abc__tagline').exists();
      assert.dom('.hds-dialog-primitive__dismiss.abc__dismiss').exists();
    });

    // DISMISS

    test('it should always render the "dismiss" button', async function (assert) {
      await render(
        hbs`
        <Hds::DialogPrimitive::Header>
          Title
        </Hds::DialogPrimitive::Header>
      `
      );
      assert.dom('button.hds-dialog-primitive__dismiss').exists();
    });

    // CALLBACK

    test('the "dismiss" button should invoke the `onDismiss` callback function', async function (assert) {
      let dismissed = false;
      this.set('onDismiss', () => (dismissed = true));
      await render(
        hbs`
        <Hds::DialogPrimitive::Header @onDismiss={{this.onDismiss}}>
          Title
        </Hds::DialogPrimitive::Header>
      `
      );
      await click('button.hds-dialog-primitive__dismiss');
      assert.ok(dismissed);
    });
  }
);
