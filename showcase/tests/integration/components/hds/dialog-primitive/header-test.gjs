/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { click, render, resetOnerror } from '@ember/test-helpers';
import Header from "@hashicorp/design-system-components/components/hds/dialog-primitive/header";

module(
  'Integration | Component | hds/dialog-primitive/header',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.afterEach(() => {
      resetOnerror();
    });

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
        <Header id="test-header">Title</Header>
      </template>,
      );
      assert.dom('#test-header').hasClass('hds-dialog-primitive__header');
    });

    // TITLE (ICON, TAGLINE & DESCRIPTION)

    test('it renders the title without icon, tagline, or description', async function (assert) {
      await render(
        <template>
        <Header>
          Title
        </Header>
      </template>,
      );
      assert.dom('.hds-dialog-primitive__title').exists();
      assert.dom('.hds-dialog-primitive__title').hasText('Title');
      assert.dom('.hds-dialog-primitive__icon').doesNotExist();
      assert.dom('.hds-dialog-primitive__tagline').doesNotExist();
    });

    test('it renders the title with icon and tagline if provided', async function (assert) {
      await render(
        <template>
        <Header @icon="info" @tagline="Tagline">
          Title
        </Header>
      </template>,
      );
      assert.dom('.hds-dialog-primitive__title').exists();
      assert.dom('.hds-dialog-primitive__title').hasText('Tagline Title');
      assert.dom('.hds-dialog-primitive__icon.hds-icon-info').exists();
      assert.dom('.hds-dialog-primitive__tagline').exists();
      assert.dom('.hds-dialog-primitive__tagline').hasText('Tagline');
    });

    test('it renders the title as a div when the @titleTag argument is not provided', async function (assert) {
      await render(<template>
        <Header @icon="info" @tagline="Tagline">
          Title
        </Header>
      </template>);
      assert.dom('.hds-dialog-primitive__title').hasTagName('div');
    });

    test('it renders the title as a custom title tag when the @titleTag argument is provided', async function (assert) {
      await render(<template>
        <Header @icon="info" @tagline="Tagline" @titleTag="h1">
          Title
        </Header>
      </template>);
      assert.dom('.hds-dialog-primitive__title').hasTagName('h1');
    });

    // CONTEXTUAL CLASSES

    test('it adds contextual classes to different DOM nodes using the `@contextualClassPrefix`', async function (assert) {
      await render(
        <template>
        <Header @icon="info" @tagline="Tagline" @contextualClassPrefix="abc">
          Title
        </Header>
      </template>,
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
        <template>
        <Header>
          Title
        </Header>
      </template>,
      );
      assert.dom('button.hds-dialog-primitive__dismiss').exists();
    });

    // CALLBACK

    test('the "dismiss" button should invoke the `onDismiss` callback function', async function (assert) {
      let dismissed = false;
      this.set('onDismiss', () => (dismissed = true));
      await render(
        <template>
        <Header @onDismiss={{this.onDismiss}}>
          Title
        </Header>
      </template>,
      );
      await click('button.hds-dialog-primitive__dismiss');
      assert.ok(dismissed);
    });
  },
);
