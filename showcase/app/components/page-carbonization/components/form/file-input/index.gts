/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import {
  HdsFormFileInputBase,
  HdsFormFileInputField,
} from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'active', 'focus'];

const FormFileInputCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "FileInput - Carbonization"}}

  <ShwTextH1>FileInput - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>“Base” control</ShwTextH2>

    <ShwCarbonizationComparisonGrid @layout="column-stacked">
      <:theming>
        <HdsFormFileInputBase aria-label="default file input" />
      </:theming>
      <:reference>
        <cds-file-uploader>
          <cds-file-uploader-button
            accept="image/jpeg"
            name="default-file-uploader-button"
            button-kind="primary"
            size="md"
          >
            Add file
          </cds-file-uploader-button>
        </cds-file-uploader>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>States</ShwTextH3>

    {{#each STATES as |state|}}
      <ShwCarbonizationComparisonGrid
        @label={{capitalize state}}
        @layout="column-stacked"
      >
        <:theming>
          <HdsFormFileInputBase
            mock-state-value={{state}}
            aria-label={{state}}
          />
        </:theming>
        <:reference>
          {{#if (eq state "default")}}
            <cds-file-uploader>
              <cds-file-uploader-button
                accept="image/jpeg"
                name="default-file-uploader-button"
                button-kind="primary"
                size="md"
              >
                Add file
              </cds-file-uploader-button>
            </cds-file-uploader>
          {{else}}
            <pre>TODO: static image here</pre>
          {{/if}}
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}
    <ShwCarbonizationComparisonGrid @label="Disabled" @layout="column-stacked">
      <:theming>
        <HdsFormFileInputBase disabled aria-label="disabled file input" />
      </:theming>
      <:reference>
        <cds-file-uploader icon-description="Delete file" disabled>
          <cds-file-uploader-button
            accept="image/jpeg"
            name="default-file-uploader-button"
            button-kind="primary"
            size="md"
          >
            Add file
          </cds-file-uploader-button>
        </cds-file-uploader>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>“Field” control</ShwTextH2>

    <ShwTextH3>Content</ShwTextH3>

    <ShwCarbonizationComparisonGrid
      @label="Only label"
      @layout="column-stacked"
    >
      <:theming>
        <HdsFormFileInputField as |F|>
          <F.Label>This is the label text</F.Label>
        </HdsFormFileInputField>
      </:theming>
      <:reference>
        <cds-file-uploader
          label-title="This is the label text"
          icon-description="Delete file"
        >
          <cds-file-uploader-button
            accept="image/jpeg"
            name="default-file-uploader-button"
            button-kind="primary"
            size="md"
          >
            Add file
          </cds-file-uploader-button>
        </cds-file-uploader>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid
      @label="Label + Helper text"
      @layout="column-stacked"
    >
      <:theming>
        <HdsFormFileInputField as |F|>
          <F.Label>This is the label text</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
        </HdsFormFileInputField>
      </:theming>
      <:reference>
        <cds-file-uploader
          label-title="This is the label text"
          label-description="This is the helper text"
          icon-description="Delete file"
        >
          <cds-file-uploader-button
            accept="image/jpeg"
            name="default-file-uploader-button"
            button-kind="primary"
            size="md"
          >
            Add file
          </cds-file-uploader-button>
        </cds-file-uploader>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid
      @label="Label + Error"
      @layout="column-stacked"
    >
      <:theming>
        <HdsFormFileInputField as |F|>
          <F.Label>This is the label text</F.Label>
          <F.Error>This is the error</F.Error>
        </HdsFormFileInputField>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} @entity="variant" />
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid
      @label="Label + Helper text + Error"
      @layout="column-stacked"
    >
      <:theming>
        <HdsFormFileInputField as |F|>
          <F.Label>This is the label text</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Error>This is the error</F.Error>
        </HdsFormFileInputField>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} @entity="variant" />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>States</ShwTextH3>

    {{#each STATES as |state|}}
      <ShwCarbonizationComparisonGrid
        @label={{capitalize state}}
        @layout="column-stacked"
        mock-state-value={{state}}
        mock-state-selector="input"
      >
        <:theming>
          <HdsFormFileInputField as |F|>
            <F.Label>This is the label text</F.Label>
            <F.HelperText>This is the helper text</F.HelperText>
          </HdsFormFileInputField>
        </:theming>
        <:reference>
          <cds-file-uploader
            label-title="This is the label text"
            label-description="This is the helper text"
            icon-description="Delete file"
          >
            <cds-file-uploader-button
              accept="image/jpeg"
              name="default-file-uploader-button"
              button-kind="primary"
              size="md"
            >
              Add file
            </cds-file-uploader-button>
          </cds-file-uploader>
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}
    <ShwCarbonizationComparisonGrid @label="Disabled" @layout="column-stacked">
      <:theming>
        <HdsFormFileInputField disabled={{true}} as |F|>
          <F.Label>This is the label text</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
        </HdsFormFileInputField>
      </:theming>
      <:reference>
        <cds-file-uploader
          label-title="This is the label text"
          label-description="This is the helper text"
          icon-description="Delete file"
          disabled
        >
          <cds-file-uploader-button
            accept="image/jpeg"
            name="default-file-uploader-button"
            button-kind="primary"
            size="md"
          >
            Add file
          </cds-file-uploader-button>
        </cds-file-uploader>
      </:reference>
    </ShwCarbonizationComparisonGrid>
  </section>
</template>;

export default FormFileInputCarbonizationIndex;
