// Copyright (c) HashiCorp, Inc.
// SPDX-License-Identifier: MPL-2.0

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array } from '@ember/helper';
import { capitalize } from '@ember/string';
import { get } from '@ember/object';
import { pageTitle } from 'ember-page-title';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwOutliner from 'showcase/components/shw/outliner';
import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import { HdsCopyButton } from '@hashicorp/design-system-components/components';
import { SIZES } from '@hashicorp/design-system-components/components/hds/copy/button/index';

import CopyButtonStates from 'showcase/components/mock/components/copy/button/copy-button-states';
import CopyButtonWithMaskedInput, {
  MASKED_INPUT_VARIANTS,
} from 'showcase/components/mock/components/copy/button/copy-button-with-masked-input';
import type { CopyButtonWithMaskedInputSignature } from 'showcase/components/mock/components/copy/button/copy-button-with-masked-input';
import CopyButtonText from 'showcase/components/mock/components/copy/button/text';
import CopyButtonTargets from 'showcase/components/mock/components/copy/button/targets';

const maskedInputVariantToLabelMap: Record<
  CopyButtonWithMaskedInputSignature['Args']['variant'],
  string
> = {
  'masked-input-base': 'With MaskedInput::Base',
  'masked-input-base-form-field': 'With Form::Field + MaskedInput::Base',
  'masked-input-field': 'With MaskedInput::Field',
};

const PageComponentCopyButton: TemplateOnlyComponent = <template>
  {{pageTitle "Copy::Button Component"}}

  <ShwTextH1>Copy::Button</ShwTextH1>

  <section data-test-percy>
    <input
      type="hidden"
      id="targetToCopy"
      value="This is some text stored in a hidden &lt;input&gt; element"
    />

    <ShwTextH2>Content</ShwTextH2>

    <ShwFlex as |SF|>
      <SF.Item @label="Default">
        <HdsCopyButton @text="Copy" @targetToCopy="#targetToCopy" />
      </SF.Item>
      <SF.Item @label="Icon only">
        <HdsCopyButton
          @isIconOnly={{true}}
          @text="Copy"
          @targetToCopy="#targetToCopy"
        />
      </SF.Item>
    </ShwFlex>

    <ShwTextH2>Sizes</ShwTextH2>

    <ShwFlex as |SF|>
      {{#each SIZES as |size|}}
        <SF.Item @label={{capitalize size}}>
          <HdsCopyButton
            @text="Copy"
            @size={{size}}
            @targetToCopy="#targetToCopy"
          />
        </SF.Item>
      {{/each}}
      <SF.Item @label="Full width">
        <ShwOutliner {{style width="300px"}}>
          <HdsCopyButton
            @text="Copy"
            @isFullWidth={{true}}
            @targetToCopy="#targetToCopy"
          />
        </ShwOutliner>
      </SF.Item>
    </ShwFlex>

    <ShwTextH2>States</ShwTextH2>

    <CopyButtonStates />

    <ShwDivider />

    <ShwTextH2>Compositions</ShwTextH2>

    {{#each MASKED_INPUT_VARIANTS as |variant|}}
      <ShwFlex as |SF|>
        {{#let (array false true) as |isMultilineOptions|}}
          {{#each isMultilineOptions as |isMultiline|}}
            <SF.Item @label={{get maskedInputVariantToLabelMap variant}}>
              <CopyButtonWithMaskedInput
                @variant={{variant}}
                @isMultiline={{isMultiline}}
              />
            </SF.Item>
          {{/each}}
        {{/let}}
      </ShwFlex>
    {{/each}}

    <ShwDivider />

    <ShwTextH2>Demo</ShwTextH2>

    <ShwTextH3>With <code>text</code> as argument</ShwTextH3>

    <CopyButtonText />

    <ShwDivider @level={{2}} />

    <ShwTextH3>With <code>target</code> element</ShwTextH3>

    <CopyButtonTargets />
  </section>
</template>;

export default PageComponentCopyButton;
