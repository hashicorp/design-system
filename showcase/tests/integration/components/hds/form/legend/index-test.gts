/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { HdsFormLegend } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/form/legend/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(<template><HdsFormLegend id="test-form-legend" /></template>);
    assert.dom('#test-form-legend').hasClass('hds-form-legend');
  });
  test('it renders the element as <legend>', async function (assert) {
    await render(<template><HdsFormLegend id="test-form-legend" /></template>);
    assert.dom('#test-form-legend').hasTagName('legend');
  });
  test('it should render with a CSS class provided via the @contextualClass argument', async function (assert) {
    await render(
      <template>
        <HdsFormLegend @contextualClass="my-class" id="test-form-legend" />
      </template>,
    );
    assert.dom('#test-form-legend').hasClass('my-class');
  });

  test('it should set the id correctly if pass @id argument', async function (assert) {
    await render(<template><HdsFormLegend @id="custom-id" /></template>);
    assert.dom('#custom-id').exists();
  });

  // CONTENT

  test('it renders a legend with the defined text', async function (assert) {
    await render(
      <template>
        <HdsFormLegend id="test-form-legend">This is the legend</HdsFormLegend>
      </template>,
    );
    assert.dom('#test-form-legend').hasText('This is the legend');
  });
  test('it renders a legend with the yielded content', async function (assert) {
    await render(
      <template>
        <HdsFormLegend id="test-form-legend"><pre
          >This is an HTML element inside the legend</pre></HdsFormLegend>
      </template>,
    );
    assert.dom('#test-form-legend > pre').exists();
    assert
      .dom('#test-form-legend pre')
      .hasText('This is an HTML element inside the legend');
  });

  // REQUIRED AND OPTIONAL

  test('it appends an indicator to the legend text when user input is required', async function (assert) {
    await render(
      <template>
        <HdsFormLegend id="test-form-legend" @isRequired={{true}}>This is the
          legend</HdsFormLegend>
      </template>,
    );
    assert.dom('#test-form-legend .hds-form-indicator').exists();
    assert.dom('#test-form-legend .hds-form-indicator').hasText('Required');
  });
  test('it appends an indicator to the legend text when user input is optional', async function (assert) {
    await render(
      <template>
        <HdsFormLegend id="test-form-legend" @isOptional={{true}}>This is the
          legend</HdsFormLegend>
      </template>,
    );
    assert.dom('#test-form-legend > .hds-form-indicator').exists();
    assert.dom('#test-form-legend .hds-form-indicator').hasText('(Optional)');
  });
});
