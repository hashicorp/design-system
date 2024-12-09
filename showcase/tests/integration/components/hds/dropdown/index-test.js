/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

import { wait } from 'showcase/tests/helpers';

module('Integration | Component | hds/dropdown/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`
      <Hds::Dropdown id="test-dropdown" as |D|>
        <D.ToggleButton @text="toggle button" />
      </Hds::Dropdown>
    `);
    assert.dom('#test-dropdown').hasClass('hds-dropdown');
  });

  // NAMED YIELDS

  test('it renders the "toggle" sub-components', async function (assert) {
    await render(hbs`
      <Hds::Dropdown id="test-dropdown" as |D|>
        <D.ToggleButton @text="toggle button" id="test-toggle-button" />
        <D.ToggleIcon @icon="user" @text="toggle icon" id="test-toggle-icon" />
      </Hds::Dropdown>
    `);
    assert.dom('#test-dropdown #test-toggle-button').exists();
    assert.dom('#test-dropdown #test-toggle-icon').exists();
  });
  test('it renders the "list-item" sub-components', async function (assert) {
    await render(hbs`
      <Hds::Dropdown id="test-dropdown" as |D|>
        <D.ToggleButton @text="toggle button" id="test-toggle-button" />
        <D.Description @text="description" id="test-list-item-description" />
        <D.Generic>
          <div id="test-list-item-generic" />
        </D.Generic>
        <D.Interactive @route="components.dropdown" @text="interactive" id="test-list-item-interactive" />
        <D.Separator id="test-list-item-separator" />
        <D.Title @text="title" id="test-list-item-title" />
      </Hds::Dropdown>
    `);
    await click('button#test-toggle-button');
    assert.dom('#test-dropdown ul').exists();
    assert.dom('#test-dropdown #test-list-item-description').exists();
    assert.dom('#test-dropdown #test-list-item-generic').exists();
    assert.dom('#test-dropdown #test-list-item-interactive').exists();
    assert.dom('#test-dropdown #test-list-item-separator').exists();
    assert.dom('#test-dropdown #test-list-item-title').exists();
  });
  test('it renders the "header"/"footer" sub-components', async function (assert) {
    await render(hbs`
      <Hds::Dropdown id="test-dropdown" as |D|>
        <D.ToggleButton @text="toggle button" id="test-toggle-button" />
        <D.Header id="test-header">Header</D.Header>
        <D.Footer id="test-footer">Footer</D.Footer>
      </Hds::Dropdown>
    `);
    await click('button#test-toggle-button');
    assert.dom('#test-dropdown #test-header').hasText('Header');
    assert.dom('#test-dropdown #test-footer').hasText('Footer');
  });

  test('it renders the "header"/"footer" sub-components with separators', async function (assert) {
    await render(hbs`
      <Hds::Dropdown id="test-dropdown" as |D|>
        <D.ToggleButton @text="toggle button" id="test-toggle-button" />
        <D.Header @hasDivider={{true}} id="test-header">Header</D.Header>
        <D.Footer @hasDivider={{true}} id="test-footer">Footer</D.Footer>
      </Hds::Dropdown>
    `);
    await click('button#test-toggle-button');
    assert
      .dom('#test-dropdown #test-header')
      .hasClass('hds-dropdown__header--with-divider');
    assert
      .dom('#test-dropdown #test-footer')
      .hasClass('hds-dropdown__footer--with-divider');
  });

  test('it does not render the content sub-components when closed, by default', async function (assert) {
    await render(hbs`
      <Hds::Dropdown id="test-dropdown" as |D|>
        <D.ToggleButton @text="toggle button" id="test-toggle-button" />
        <D.Header id="test-header">Header</D.Header>
        <D.Interactive @route="components.dropdown" @text="interactive" />
        <D.Footer id="test-footer">Footer</D.Footer>
      </Hds::Dropdown>
    `);

    // the container should exist in the DOM
    assert.dom('#test-dropdown .hds-dropdown__content').exists();
    // but the content should not
    assert.dom('#test-dropdown #test-header').doesNotExist();
    assert.dom('#test-dropdown .hds-dropdown__list').doesNotExist();
    assert.dom('#test-dropdown #test-footer').doesNotExist();
  });

  test('it renders the content sub-components even when closed, when `@preserveContentInDom` is `true`', async function (assert) {
    await render(hbs`
      <Hds::Dropdown id="test-dropdown" @preserveContentInDom={{true}} as |D|>
        <D.ToggleButton @text="toggle button" id="test-toggle-button" />
        <D.Header id="test-header">Header</D.Header>
        <D.Interactive id="test-list-item" @route="components.dropdown" @text="interactive-always-rendered" />
        <D.Footer id="test-footer">Footer</D.Footer>
      </Hds::Dropdown>
    `);

    // the container should exist in the DOM
    assert.dom('#test-dropdown .hds-dropdown__content').exists();
    // the list content should too
    assert.dom('#test-dropdown #test-header').exists();
    assert.dom('#test-dropdown .hds-dropdown__list').exists();
    assert.dom('#test-dropdown #test-list-item').exists();
    assert.dom('#test-dropdown #test-footer').exists();
  });

  // POSITION

  test('it should render the content aligned on the right by default', async function (assert) {
    await render(hbs`
      <Hds::Dropdown id="test-dropdown" as |D|>
        <D.ToggleButton @text="toggle button" id="test-toggle-button" />
        <D.Interactive @route="components.dropdown" @text="interactive" />
      </Hds::Dropdown>
    `);
    await click('button#test-toggle-button');
    assert
      .dom('#test-dropdown .hds-dropdown__content')
      .hasClass('hds-dropdown__content--position-bottom-right');
  });
  test('it should render the content aligned on the left if the value of @listPosition is "bottom-left"', async function (assert) {
    await render(hbs`
      <Hds::Dropdown id="test-dropdown" @listPosition="bottom-left" as |D|>
        <D.ToggleButton @text="toggle button" id="test-toggle-button" />
        <D.Interactive @route="components.dropdown" @text="interactive" />
      </Hds::Dropdown>
    `);
    await click('button#test-toggle-button');
    assert
      .dom('#test-dropdown .hds-dropdown__content')
      .hasClass('hds-dropdown__content--position-bottom-left');
  });
  test('it should render the element as `inline` if the value of @isInline is "true"', async function (assert) {
    await render(hbs`
      <Hds::Dropdown id="test-dropdown" @isInline={{true}} as |D|>
        <D.ToggleButton @text="toggle button" id="test-toggle-button" />
        <D.Interactive @route="components.dropdown" @text="interactive" />
      </Hds::Dropdown>
    `);
    await click('button#test-toggle-button');
    assert.dom('#test-dropdown').hasClass('hds-dropdown--is-inline');
  });

  // WIDTH

  test('it should render the content with a fixed width if a @width value is passed', async function (assert) {
    await render(hbs`
      <Hds::Dropdown @width="248px" id="test-dropdown" as |D|>
        <D.ToggleButton @text="toggle button" id="test-toggle-button" />
        <D.Interactive @route="components.dropdown" @text="interactive" />
      </Hds::Dropdown>
    `);
    await click('button#test-toggle-button');
    assert.dom('.hds-dropdown__content').hasStyle({ width: '248px' });
  });

  test('it should render the content with the same width as the ToggleButton if @matchToggleWidth is set', async function (assert) {
    await render(hbs`
      <Hds::Dropdown id="test-dropdown" @matchToggleWidth={{true}} as |D|>
        <D.ToggleButton {{style width="200px"}} @text="toggle button" id="test-toggle-button" />
        <D.Interactive @route="components.dropdown" @text="interactive" />
      </Hds::Dropdown>
    `);
    await click('button#test-toggle-button');
    await wait();
    // the expected value is 200px, but the ember-testing frame has a `transform: scale(0.5);`
    assert.dom('.hds-dropdown__content').hasStyle({ width: '100px' });
  });

  // PRESERVE DISCLOSED CONTENT WHEN INTERACTED WITH

  test('it should preserve the content visible when interacted with', async function (assert) {
    await render(hbs`
      <Hds::Dropdown id="test-dropdown" as |D|>
        <D.ToggleButton @text="toggle button" id="test-toggle-button" />
        <D.Interactive @route="components.dropdown" id="test-list-item-interactive" @text="interactive" />
      </Hds::Dropdown>
    `);
    await click('button#test-toggle-button');
    assert.dom('#test-dropdown #test-list-item-interactive').exists();
    // click on the dropdown content container as a minimal interaction with the content;
    // it could be followed by selection, a right click etc.
    await click('.hds-dropdown__content');
    assert.dom('#test-dropdown #test-list-item-interactive').exists();
  });

  // CLOSE DISCLOSED CONTENT ON CLICK

  test('it should hide the content when an interactive element triggers `close`', async function (assert) {
    await render(hbs`
      <Hds::Dropdown id="test-dropdown" as |D|>
        <D.ToggleButton @text="toggle button" id="test-toggle-button" />
        <D.Interactive @text="interactive" id="test-list-item-interactive" {{on "click" D.close}} />
      </Hds::Dropdown>
    `);
    await click('button#test-toggle-button');
    assert.dom('#test-dropdown #test-list-item-interactive').exists();
    await click('#test-list-item-interactive');
    assert.dom('#test-dropdown #test-list-item-interactive').doesNotExist();
  });

  // ACCESSIBILITY

  test('it should render a list of items without a role if no selectable items are passed in', async function (assert) {
    await render(hbs`
      <Hds::Dropdown id="test-dropdown" as |D|>
        <D.ToggleButton @text="toggle button" id="test-toggle-button" />
        <D.Interactive @text="interactive" id="test-list-item-interactive" {{on "click" D.close}} />
      </Hds::Dropdown>
    `);
    await click('button#test-toggle-button');
    assert.dom('#test-dropdown ul').doesNotHaveAttribute('role');
  });
  test('it should render a list of items with a `listbox` role, refering an existing `id` via `aria-labelledby` if selectable items are passed in', async function (assert) {
    await render(hbs`
      <Hds::Dropdown id="test-dropdown" as |D|>
        <D.ToggleButton @text="toggle button" id="test-toggle-button" />
        <D.Checkmark>Checkmark</D.Checkmark>
      </Hds::Dropdown>
    `);
    await click('button#test-toggle-button');
    assert.dom('#test-dropdown ul').hasAttribute('role', 'listbox');
    assert
      .dom('#test-dropdown ul')
      .hasAttribute('aria-labelledby', 'test-toggle-button');
  });
  test('it should render a list of items with a `listbox` role, refering an generated `id` via `aria-labelledby` if selectable items are passed in', async function (assert) {
    await render(hbs`
      <Hds::Dropdown id="test-dropdown" as |D|>
        <D.ToggleButton @text="toggle button" />
        <D.Checkmark>Checkmark</D.Checkmark>
      </Hds::Dropdown>
    `);
    const button = this.element.querySelector('.hds-dropdown-toggle-button');
    const buttonId = button.id;
    await click('button.hds-dropdown-toggle-button');
    assert.dom('#test-dropdown ul').hasAttribute('role', 'listbox');
    assert.dom('#test-dropdown ul').hasAttribute('aria-labelledby', buttonId);
  });
});
