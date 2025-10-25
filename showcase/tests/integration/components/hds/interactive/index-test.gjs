/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, triggerKeyEvent } from '@ember/test-helpers';
import Interactive from "@hashicorp/design-system-components/components/hds/interactive/index";
import { on } from "@ember/modifier";

module('Integration | Component | hds/interactive/index', function (hooks) {
  setupRenderingTest(hooks);

  // notice: since this element can generate different HTML element, to make the tests even more solid, in the DOM selectors we prefix the #ID of the element with the tag name

  test('it renders the interactive container', async function (assert) {
    await render(<template><Interactive /></template>);
    assert.dom(this.element).exists();
  });

  // GENERATED ELEMENTS

  test('it should render a <button> if no @href or @route is passed (default)', async function (assert) {
    await render(<template><Interactive id="test-interactive" /></template>);
    assert.dom('#test-interactive').hasTagName('button');
  });
  test('it should render a <a> link if @href is passed', async function (assert) {
    await render(<template><Interactive @href="#" id="test-interactive" /></template>);
    assert.dom('#test-interactive').hasTagName('a');
    assert.dom('#test-interactive').hasAttribute('href', '#');
  });
  test('it should render a <a> link if @route is passed', async function (assert) {
    await render(
      <template><Interactive @route="page-utilities.interactive" id="test-interactive" /></template>,
    );
    assert.dom('#test-interactive').hasTagName('a');
    assert
      .dom('#test-interactive')
      .hasAttribute('href', '/utilities/interactive');
  });

  // TARGET/REL ATTRIBUTES

  test('it should render a <a> link with the right "target" and "rel" attributes if @href is passed', async function (assert) {
    await render(<template><Interactive @href="#" id="test-interactive" /></template>);
    assert.dom('#test-interactive').hasAttribute('target', '_blank');
    assert.dom('#test-interactive').hasAttribute('rel', 'noopener noreferrer');
  });
  test('it should render a <a> link with custom "target" and "rel" attributes if they are passed as attributes', async function (assert) {
    await render(
      <template><Interactive @href="#" id="test-interactive" target="test-target" rel="test-rel" /></template>,
    );
    assert.dom('#test-interactive').hasAttribute('target', 'test-target');
    assert.dom('#test-interactive').hasAttribute('rel', 'test-rel');
  });
  test('it should render a <a> link withhout "target" and "rel" attributes if @isHrefExternal is false', async function (assert) {
    await render(
      <template><Interactive @href="#" @isHrefExternal={{false}} id="test-interactive" /></template>,
    );
    assert.dom('#test-interactive').doesNotHaveAttribute('target');
    assert.dom('#test-interactive').doesNotHaveAttribute('rel');
  });

  // YIELDING

  test('it should yield the children of the <button> element', async function (assert) {
    await render(
      <template><Interactive id="test-interactive"><pre>test</pre></Interactive></template>,
    );
    assert.dom('button#test-interactive > pre').exists();
    assert.dom('button#test-interactive > pre').hasText('test');
  });
  test('it should yield the children of the <a> element', async function (assert) {
    await render(
      <template><Interactive @href="#" id="test-interactive"><pre>test</pre></Interactive></template>,
    );
    assert.dom('a#test-interactive > pre').exists();
    assert.dom('a#test-interactive > pre').hasText('test');
  });
  test('it should yield the children of the <LinkTo> element', async function (assert) {
    await render(
      <template><Interactive @route="index" id="test-interactive"><pre>test</pre></Interactive></template>,
    );
    assert.dom('a#test-interactive > pre').exists();
    assert.dom('a#test-interactive > pre').hasText('test');
  });

  // A11Y

  test('it should render with the correct button "type" by default', async function (assert) {
    await render(<template><Interactive id="test-interactive" /></template>);
    assert.dom('button#test-interactive').hasAttribute('type', 'button');
  });
  test('it should have a custom type if @type is set', async function (assert) {
    await render(<template><Interactive id="test-interactive" type="submit" /></template>);
    assert.dom('button#test-interactive').hasAttribute('type', 'submit');
  });
  test('it should dispatch a click event when pressing space key on a link', async function (assert) {
    let clicked = false;
    this.set('clickHandler', () => (clicked = true));
    await render(
      <template><div {{on "click" this.clickHandler}}><Interactive @href="javascript:;" id="test-interactive" /></div></template>,
    );
    await triggerKeyEvent('#test-interactive', 'keyup', ' ');
    assert.ok(clicked);
  });
});
