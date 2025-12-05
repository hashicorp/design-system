/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, setupOnerror } from '@ember/test-helpers';

import { HdsForm } from '@hashicorp/design-system-components/components';
import { AVAILABLE_TAGS } from '@hashicorp/design-system-components/components/hds/form/index';

module('Integration | Component | hds/form/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(<template><HdsForm id="test-form" /></template>);
    assert.dom('#test-form').hasClass('hds-form');
  });

  // OPTIONS

  // Tag

  test('it should render the component using a form tag by default', async function (assert) {
    await render(<template><HdsForm id="test-form-component" /></template>);
    assert.dom('#test-form-component').hasTagName('form');
  });

  test('it should render the component using a div tag if specified in the @tag prop', async function (assert) {
    await render(
      <template><HdsForm id="test-form-component" @tag="div" /></template>,
    );
    assert.dom('#test-form-component').hasTagName('div');
  });

  // SectionMaxWidth

  test('it should set an inline style for the section max-width custom property', async function (assert) {
    await render(
      <template>
        <HdsForm id="test-form-component" @sectionMaxWidth="32em" />
      </template>,
    );
    assert.dom('#test-form-component').hasStyle(
      {
        '--hds-form-section-max-width': '32em',
      },
      'Inline style for section max-width is set',
    );
  });

  // CONTENT

  test('it should yield the different subcomponents as children, for the different available tags', async function (assert) {
    for (const tag of AVAILABLE_TAGS) {
      await render(
        <template>
          <HdsForm id="test-form" @tag={{tag}} as |FORM|>
            <FORM.Header>
              <FORM.HeaderTitle />
              <FORM.HeaderDescription />
            </FORM.Header>
            <FORM.Section>
              <FORM.SectionHeader>
                <FORM.SectionHeaderTitle />
                <FORM.SectionHeaderDescription />
              </FORM.SectionHeader>
              <FORM.SectionMultiFieldGroup>
                <FORM.SectionMultiFieldGroupItem />
              </FORM.SectionMultiFieldGroup>
            </FORM.Section>
            <FORM.Separator />
            <FORM.Footer />
          </HdsForm>
        </template>,
      );

      // Form Header content
      assert
        .dom('#test-form > .hds-form__header')
        .exists(`Header is yielded for tag=${tag}`);
      assert
        .dom('#test-form > .hds-form__header > .hds-form__header-title')
        .exists(`HeaderTitle is yielded for tag=${tag}`);
      assert
        .dom('#test-form > .hds-form__header > .hds-form__header-description')
        .exists(`HeaderDescription is yielded for tag=${tag}`);

      // Section & Section Header content
      assert
        .dom('#test-form > .hds-form__section')
        .exists(`Section is yielded for tag=${tag}`);
      assert
        .dom('#test-form > .hds-form__section > .hds-form__section-header')
        .exists(`SectionHeader is yielded for tag=${tag}`);
      assert
        .dom(
          '#test-form > .hds-form__section > .hds-form__section-header > .hds-form__header-title',
        )
        .exists(`SectionHeaderTitle is yielded for tag=${tag}`);
      assert
        .dom(
          '#test-form > .hds-form__section > .hds-form__section-header > .hds-form__header-description',
        )
        .exists(`SectionHeaderDescription is yielded for tag=${tag}`);

      // SectionMultiFieldGroup content
      assert
        .dom(
          '#test-form > .hds-form__section > .hds-form__section-multi-field-group',
        )
        .exists(`SectionMultiFieldGroup is yielded for tag=${tag}`);
      assert
        .dom(
          '#test-form > .hds-form__section > .hds-form__section-multi-field-group > .hds-form__section-multi-field-group-item',
        )
        .exists(`MultiFieldGroupItem is yielded for tag=${tag}`);

      // Separator & Footer content
      assert
        .dom('#test-form > hr.hds-separator')
        .exists(`Separator is yielded for tag=${tag}`);

      assert
        .dom('#test-form > .hds-form__footer')
        .exists(`Footer is yielded for tag=${tag}`);
    }
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

    await render(
      <template>
        {{! @glint-expect-error - testing invalid component usage }}
        <HdsForm @tag="section" />
      </template>,
    );

    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
