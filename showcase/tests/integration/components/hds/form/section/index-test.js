/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/form/section/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Form::Section id="test-form-section" />`);
    assert.dom('#test-form-section').hasClass('hds-form__section');
  });

  // CONTENT

  test('it should yield the Section Header, HeaderTitle/Description, SectionFieldGroup and Section children', async function (assert) {
    await render(
      hbs`<Hds::Form::Section id="test-form-section" as |Section|>
            <Section.Header>
              <Section.HeaderTitle />
              <Section.HeaderDescription />
            </Section.Header>
            <Section.FieldGroup as |FG|>
              <FG.Item />
            </Section.FieldGroup>
            <span>misc content</span>
          </Hds::Form::Section>`,
    );
    assert
      .dom('#test-form-section > .hds-form__section-header')
      .exists('Header is yielded');
    assert
      .dom(
        '#test-form-section > .hds-form__section-header > .hds-form__header-title',
      )
      .exists('HeaderTitle is yielded');
    assert
      .dom(
        '#test-form-section .hds-form__section-header > .hds-form__header-description',
      )
      .exists('HeaderDescription is yielded');
    assert
      .dom('#test-form-section > .hds-form__section-field-group')
      .exists('FieldGroup is yielded');
    assert
      .dom(
        '#test-form-section > .hds-form__section-field-group > .hds-layout-flex-item',
      )
      .exists('Item is yielded');
    assert
      .dom('#test-form-section > span')
      .exists('Misc content is yielded')
      .hasText('misc content');
  });

  // OPTIONS

  // hasBorder
  test(`it should not have a border by default`, async function (assert) {
    await render(hbs`<Hds::Form::Section id="test-form-section" />`);
    assert
      .dom('#test-form-section')
      .doesNotHaveClass('hds-form__section--has-border');
  });

  test(`it should have a border if @hasBorder is true`, async function (assert) {
    await render(
      hbs`<Hds::Form::Section id="test-form-section" @hasBorder={{true}} />`,
    );
    assert.dom('#test-form-section').hasClass('hds-form__section--has-border');
  });

  // isFullWidth
  test(`it should have the default max-width if no @isFullWidth prop is declared`, async function (assert) {
    await render(hbs`<Hds::Form::Section id="test-form-section" />`);
    assert
      .dom('#test-form-section')
      .doesNotHaveClass('hds-form-content--is-full-width');
  });

  test(`if @isFullWidth is true, it should not have a max-width set`, async function (assert) {
    await render(
      hbs`<Hds::Form::Section id="test-form-section" @isFullWidth={{true}} />`,
    );
    assert
      .dom('#test-form-section')
      .hasClass('hds-form-content--is-full-width');
  });
});
