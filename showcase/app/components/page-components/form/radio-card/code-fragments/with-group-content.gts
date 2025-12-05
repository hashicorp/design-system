/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { on } from '@ember/modifier';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsFormRadioCardGroup } from '@hashicorp/design-system-components/components';
import type { HdsFormRadioCardGroupSignature } from '@hashicorp/design-system-components/components/hds/form/radio-card/group';

const RADIOCARDS = [
  {
    value: '1',
    label: 'Radio card label 1',
    badge: 'Badge',
    checked: true,
    description: 'Radio card description 1',
    generic: 'Radio card custom content 1',
  },
  {
    value: '2',
    label: 'Radio card label 2',
    badge: 'Badge',
    description: 'Radio card description 2',
    generic: 'Radio card custom content 2',
  },
  {
    value: '3',
    label: 'Radio card label 3',
    badge: 'Badge',
    description: 'Radio card description 3',
    generic: 'Radio card custom content 3',
  },
];

export interface CodeFragmentWithGroupContentSignature {
  Args: {
    name: string;
    hasGeneric?: boolean;
    hasHelperText?: boolean;
    hasError?: boolean;
    controlPosition?: HdsFormRadioCardGroupSignature['Args']['controlPosition'];
    alignment?: HdsFormRadioCardGroupSignature['Args']['alignment'];
    isRequired?: HdsFormRadioCardGroupSignature['Args']['isRequired'];
    layout?: HdsFormRadioCardGroupSignature['Args']['layout'];
    maxWidth?: string;
    onChange: (event: Event) => void;
  };
  Element: HdsFormRadioCardGroupSignature['Element'];
}

const CodeFragmentWithGroupContent: TemplateOnlyComponent<CodeFragmentWithGroupContentSignature> =
  <template>
    <HdsFormRadioCardGroup
      @name={{@name}}
      @controlPosition={{@controlPosition}}
      @alignment={{@alignment}}
      @isRequired={{@isRequired}}
      @layout={{@layout}}
      as |G|
    >
      <G.Legend>Group legend</G.Legend>
      {{#if @hasHelperText}}
        <G.HelperText>Group helper text</G.HelperText>
      {{/if}}
      {{#each RADIOCARDS as |item|}}
        <G.RadioCard
          @checked={{item.checked}}
          @value={{item.value}}
          @maxWidth={{@maxWidth}}
          {{on "change" @onChange}}
          as |R|
        >
          <R.Icon @name="hexagon" />
          <R.Label>{{item.label}}</R.Label>
          {{#if @hasGeneric}}
            <R.Generic>
              <ShwPlaceholder @text={{item.generic}} @height="50" />
            </R.Generic>
          {{else}}
            <R.Badge @text={{item.badge}} />
            <R.Description>{{item.description}}</R.Description>
          {{/if}}
        </G.RadioCard>
      {{/each}}
      {{#if @hasError}}
        <G.Error>Group error message</G.Error>
      {{/if}}
    </HdsFormRadioCardGroup>
  </template>;

export default CodeFragmentWithGroupContent;
