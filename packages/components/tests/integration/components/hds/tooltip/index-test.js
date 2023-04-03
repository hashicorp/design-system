/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { focus, render, triggerKeyEvent } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/tooltip/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::Tooltip @text="More info." id="test-tooltip">info</Hds::Tooltip>`
    );
    assert.dom('#test-tooltip').hasClass('hds-tooltip');
  });

  // Test Content & accessibility features:
  test('it renders content passed into the tooltip', async function (assert) {
    const escapeKey = 27;

    function wait(timeout = 1000) {
      return new Promise((resolve) => {
        setTimeout(resolve, timeout);
      });
    }

    await render(
      hbs`<Hds::Tooltip @text="More info." id="test-tooltip">info</Hds::Tooltip>`
    );

    // Test that tooltip does not display by default:
    assert.dom('.tippy-box').doesNotExist();

    // Focus button to trigger tooltip display:
    await focus('#test-tooltip');
    assert.dom('.tippy-box').exists();

    // Trigger escape key to close the tooltip:
    await triggerKeyEvent('#test-tooltip', 'keydown', escapeKey);
    await wait();
    // test that the tooltip is now gone:
    assert.dom('.tippy-box').doesNotExist();
  });

  // GENERATED ELEMENTS

  test('it should render a <button> if no @href or @route is passed (default)', async function (assert) {
    await render(
      hbs`<Hds::Tooltip @text="More info." id="test-tooltip">info</Hds::Tooltip>`
    );
    assert.dom('#test-tooltip').hasTagName('button');
  });

  test('it should render a <a> link if @href is passed', async function (assert) {
    await render(
      hbs`<Hds::Tooltip @text="More info." id="test-tooltip" @href="https://www.hashicorp.com/">info</Hds::Tooltip>`
    );
    assert
      .dom('#test-tooltip')
      .hasTagName('a')
      .hasAttribute('href', 'https://www.hashicorp.com/');
  });

  test('it should render a <a> link if @route is passed', async function (assert) {
    await render(
      hbs`<Hds::Tooltip @text="More info." id="test-tooltip" @route="utilities.interactive">info</Hds::Tooltip>`
    );
    assert
      .dom('#test-tooltip')
      .hasTagName('a')
      .hasAttribute('href', '/utilities/interactive');
  });

  // ATTRIBUTES

  test('it should spread all the attributes passed to the component on the element', async function (assert) {
    await render(
      hbs`
      <Hds::Tooltip @text="Here is more info." id="test-tooltip" class="my-class" data-test1 data-test2="test">info</Hds::Tooltip>
      `
    );
    assert.dom('#test-tooltip').hasClass('my-class');
    assert.dom('#test-tooltip').hasAttribute('data-test1');
    assert.dom('#test-tooltip').hasAttribute('data-test2', 'test');
  });
});
