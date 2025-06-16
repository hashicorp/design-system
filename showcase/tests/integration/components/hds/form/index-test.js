/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/form/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Form id="test-form" />`);
    assert.dom('#test-form').hasClass('hds-form');
  });

  // CONTENT

  // OPTIONS

  test('it should yield the Header, HeaderTitle, HeaderDescription, Section, SectionHeader, SectionHeaderTitle, SectionHeaderDescription, SectionFieldGroup, Separator, and ButtonSet children', async function (assert) {
    await render(
      hbs`<Hds::Form id="test-form" as |FORM|>
            <FORM.Header>
              <FORM.HeaderTitle />
              <FORM.HeaderDescription />
            </FORM.Header>
            <FORM.Section>
              <FORM.SectionHeader>
                <FORM.SectionHeaderTitle />
                <FORM.SectionHeaderDescription />
              </FORM.SectionHeader>
              <FORM.SectionFieldGroup as |FG|>
                <FG.Item />
              </FORM.SectionFieldGroup>
            </FORM.Section>
            <FORM.Separator />
            <FORM.ButtonSet />
          </Hds::Form>`,
    );

    // Form Header content
    assert.dom('#test-form > .hds-form__header').exists('Header is yielded');
    assert
      .dom('#test-form > .hds-form__header > .hds-form__header-title')
      .exists('HeaderTitle is yielded');
    assert
      .dom('#test-form > .hds-form__header > .hds-form__header-description')
      .exists('HeaderDescription is yielded');

    // Section & Section Header content
    assert.dom('#test-form > .hds-form__section').exists('Section is yielded');
    assert
      .dom('#test-form > .hds-form__section > .hds-form__section-header')
      .exists('SectionHeader is yielded');
    assert
      .dom(
        '#test-form > .hds-form__section > .hds-form__section-header > .hds-form__header-title',
      )
      .exists('SectionHeaderTitle is yielded');
    assert
      .dom(
        '#test-form > .hds-form__section > .hds-form__section-header > .hds-form__header-description',
      )
      .exists('SectionHeaderDescription is yielded');

    // SectionFieldGroup content
    assert
      .dom('#test-form > .hds-form__section > .hds-form__section-field-group')
      .exists('SectionFieldGroup is yielded');
    assert
      .dom(
        '#test-form > .hds-form__section > .hds-form__section-field-group > .hds-layout-flex-item',
      )
      .exists('FieldGroup Item is yielded');

    // other content
    assert.dom('#test-form > hr.hds-separator').exists('Separator is yielded');
    assert.dom('#test-form > .hds-button-set').exists('ButtonSet is yielded');
  });

  // Tag

  test('it should render the component using a form tag by default', async function (assert) {
    await render(hbs`<Hds::Form id="test-form-component" />`);
    assert.dom('#test-form-component').hasTagName('form');
  });

  test('it should render the component using a div tag if specified in the @tag prop', async function (assert) {
    await render(hbs`<Hds::Form id="test-form-component" @tag="div" />`);
    assert.dom('#test-form-component').hasTagName('div');
  });

  // ASSERTIONS

  // If a tag other than form or div is passed, it should throw an assertion
  test('it should throw an assertion if an incorrect value for @tag is provided', async function (assert) {
    const errorMessage =
      '@tag for "Hds::Form" must be one of the following: form, div; received: section';
    assert.expect(2);

    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });

    await render(hbs`<Hds::Form @tag="section" />`);

    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
