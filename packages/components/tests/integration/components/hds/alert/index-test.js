/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/alert/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Alert @type="inline" id="test-alert" />`);
    assert.dom('#test-alert').hasClass('hds-alert');
  });

  // TYPE

  test('it should render the correct CSS type class depending on the @type prop', async function (assert) {
    await render(hbs`<Hds::Alert @type="page" id="test-alert" />`);
    assert.dom('#test-alert').hasClass('hds-alert--type-page');
  });

  // ICON

  test('it should render an icon by default depending on the type and color', async function (assert) {
    // here we don't test all the possible combinations, only some of them as precaution
    await render(hbs`<Hds::Alert @type="inline" />`);
    assert.dom('.flight-icon-info').exists();
    await render(hbs`<Hds::Alert @type="compact" />`);
    assert.dom('.flight-icon-info-fill').exists();
    await render(hbs`<Hds::Alert @type="inline" @color="highlight" />`);
    assert.dom('.flight-icon-info').exists();
    await render(hbs`<Hds::Alert @type="inline" @color="success" />`);
    assert.dom('.flight-icon-check-circle').exists();
    await render(hbs`<Hds::Alert @type="inline" @color="warning" />`);
    assert.dom('.flight-icon-alert-triangle').exists();
    await render(hbs`<Hds::Alert @type="inline" @color="critical" />`);
    assert.dom('.flight-icon-alert-diamond').exists();
  });

  test('if an icon is declared, the icon should render in the component and override the default one', async function (assert) {
    await render(hbs`<Hds::Alert @type="inline" @icon="clipboard-copy" />`);
    assert.dom('.flight-icon-clipboard-copy').exists();
    await render(hbs`<Hds::Alert @type="compact" @icon="clipboard-copy" />`);
    assert.dom('.flight-icon-clipboard-copy').exists();
  });

  test('it should display no icon when @icon is set to false', async function (assert) {
    await render(hbs`<Hds::Alert @type="inline" @icon={{false}} />`);
    assert.dom('.flight-icon').doesNotExist();
  });

  // TEXT (TITLE + DESCRIPTION)

  test('it should render the title when the "title" contextual component is provided', async function (assert) {
    await render(
      hbs`<Hds::Alert @type="inline" as |A|><A.Title>This is the title</A.Title></Hds::Alert>`
    );
    assert.dom(this.element).hasText('This is the title');
  });
  test('it should render the description when the "description" contextual component is provided', async function (assert) {
    await render(
      hbs`<Hds::Alert @type="inline" as |A|><A.Description>This is the description</A.Description></Hds::Alert>`
    );
    assert.dom(this.element).hasText('This is the description');
  });
  test('it should render rich HTML when the "description" contextual component contains HTML tags', async function (assert) {
    await render(
      hbs`<Hds::Alert @type="inline" as |A|><A.Description>Hello <strong>strong</strong> and <em>em</em> and <code>code</code> and <a href='#'>link</a></A.Description></Hds::Alert>`
    );
    assert.dom('.hds-alert__description strong').exists().hasText('strong');
    assert.dom('.hds-alert__description em').exists().hasText('em');
    assert.dom('.hds-alert__description code').exists().hasText('code');
    assert.dom('.hds-alert__description a').exists().hasText('link');
  });

  // ACTIONS

  test('it should render an Hds::Button component yielded to the "actions" container', async function (assert) {
    await render(
      hbs`<Hds::Alert @type="inline" aria-labelledby="test-alert-button" id="test-alert" as |A|><A.Button @text="I am a button" @size="small" @color="secondary" id="test-alert-button"/></Hds::Alert>`
    );
    assert
      .dom('#test-alert .hds-alert__actions button')
      .exists()
      .hasClass('hds-button')
      .hasClass('hds-button--size-small')
      .hasClass('hds-button--color-secondary')
      .hasText('I am a button');
  });
  test('it should render an Hds::Link::Standalone component yielded to the "actions" container', async function (assert) {
    await render(
      hbs`<Hds::Alert @type="inline" aria-labelledby="test-alert-link" id="test-alert" as |A|><A.Link::Standalone @icon="plus" @text="I am a link" @href="#" @size="small" @color="secondary" id="test-alert-link" /></Hds::Alert>`
    );
    assert
      .dom('#test-alert .hds-alert__actions a')
      .exists()
      .hasClass('hds-link-standalone')
      .hasClass('hds-link-standalone--size-small')
      .hasClass('hds-link-standalone--color-secondary')
      .hasText('I am a link');
  });

  // GENERIC

  test('it should render any content passed to the "generic" contextual component', async function (assert) {
    await render(
      hbs`<Hds::Alert @type="inline" id="test-alert" as |A|><A.Generic><pre>test</pre></A.Generic></Hds::Alert>`
    );
    assert.dom('#test-alert .hds-alert__content pre').exists().hasText('test');
  });

  // DISMISS

  test('it should not render the "dismiss" button by default', async function (assert) {
    await render(hbs`<Hds::Alert @type="inline" />`);
    assert.dom('button.hds-alert__dismiss').doesNotExist();
  });
  test('it should render the "dismiss" button if a callback function is passed to the @onDismiss argument', async function (assert) {
    this.set('NOOP', () => {});
    await render(hbs`<Hds::Alert @type="inline" @onDismiss={{this.NOOP}} />`);
    assert.dom('button.hds-alert__dismiss').exists();
  });

  // A11Y

  test('it should render with the correct semantic tags and aria attributes', async function (assert) {
    await render(hbs`<Hds::Alert @type="inline" id="test-alert" />`);
    assert.dom('#test-alert').hasAttribute('role', 'alert');
  });

  test('it should render with an `alertdialog` role and auto-generated `aria-labelledby` when title and actions are provided', async function (assert) {
    await render(
      hbs`<Hds::Alert @type="inline" id="test-alert" as |A|><A.Title>This is the title</A.Title><A.Button @text="I am a button" @size="small" /></Hds::Alert>`
    );
    let title = this.element.querySelector('#test-alert .hds-alert__title');
    assert.dom('#test-alert').hasAttribute('role', 'alertdialog');
    assert.dom('#test-alert').hasAttribute('aria-labelledby', title.id);
  });

  test('it should render with an `alertdialog` role and auto-generated `aria-labelledby` when description and actions are provided', async function (assert) {
    await render(
      hbs`<Hds::Alert @type="inline" id="test-alert" as |A|><A.Description>This is the title</A.Description><A.Button @text="I am a button" @size="small" /></Hds::Alert>`
    );
    let description = this.element.querySelector(
      '#test-alert .hds-alert__description'
    );
    assert.dom('#test-alert').hasAttribute('role', 'alertdialog');
    assert.dom('#test-alert').hasAttribute('aria-labelledby', description.id);
  });

  test('it should render with an `alertdialog` role and `aria-labelledby` when title and actions are provided', async function (assert) {
    await render(
      hbs`<Hds::Alert @type="inline" id="test-alert" as |A|><A.Title id="custom-id">This is the title</A.Title><A.Button @text="I am a button" @size="small" /></Hds::Alert>`
    );
    assert.dom('#test-alert').hasAttribute('role', 'alertdialog');
    assert.dom('#test-alert').hasAttribute('aria-labelledby', 'custom-id');
  });

  // ASSERTIONS

  test('it should throw an assertion if an incorrect value for @type is provided', async function (assert) {
    const errorMessage =
      '@type for "Hds::Alert" must be one of the following: page, inline, compact; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Alert @type="foo" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if a "compact" alerts is rendered with @icon equal to false', async function (assert) {
    const errorMessage =
      '@icon for "Hds::Alert" with @type "compact" is required';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Alert @type="compact" @icon={{false}} />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if an incorrect value for @color is provided', async function (assert) {
    const errorMessage =
      '@color for "Hds::Alert" must be one of the following: neutral, highlight, success, warning, critical; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Alert @type="inline" @color="foo" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
