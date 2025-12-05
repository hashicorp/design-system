/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { HdsFormSection } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/form/section/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template><HdsFormSection id="test-form-section" /></template>,
    );
    assert.dom('#test-form-section').hasClass('hds-form__section');
  });

  // CONTENT

  test('it should yield the Section Header, HeaderTitle/Description, SectionMultiFieldGroup, SectionMultiFieldGroupItem, and Section children', async function (assert) {
    await render(
      <template>
        <HdsFormSection id="test-form-section" as |Section|>
          <Section.Header>
            <Section.HeaderTitle />
            <Section.HeaderDescription />
          </Section.Header>
          <Section.MultiFieldGroup>
            <Section.MultiFieldGroupItem />
          </Section.MultiFieldGroup>
        </HdsFormSection>
      </template>,
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
      .dom('#test-form-section > .hds-form__section-multi-field-group')
      .exists('MultiFieldGroup is yielded');
    assert
      .dom(
        '#test-form-section > .hds-form__section-multi-field-group > .hds-form__section-multi-field-group-item',
      )
      .exists('Item is yielded');
  });

  // OPTIONS

  // isFullWidth
  test(`it should have the default max-width if no @isFullWidth prop is declared`, async function (assert) {
    await render(
      <template><HdsFormSection id="test-form-section" /></template>,
    );
    assert
      .dom('#test-form-section')
      .doesNotHaveClass('hds-form-content--is-full-width');
  });

  test(`if @isFullWidth is true, it should not have a max-width set`, async function (assert) {
    await render(
      <template>
        <HdsFormSection id="test-form-section" @isFullWidth={{true}} />
      </template>,
    );
    assert
      .dom('#test-form-section')
      .hasClass('hds-form-content--is-full-width');
  });
});
