/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array } from '@ember/helper';
import { capitalize } from '@ember/string';
import { on } from '@ember/modifier';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { LAYOUT_TYPES } from '@hashicorp/design-system-components/components/hds/form/fieldset/index';

import { HdsFormFieldset } from '@hashicorp/design-system-components/components';

export interface SubSectionFieldsetSignature {
  Args: {
    showHighlight: boolean;
    toggleHighlight: () => void;
  };
}

const SubSectionFieldset: TemplateOnlyComponent<SubSectionFieldsetSignature> =
  <template>
    <ShwTextH2>Fieldset</ShwTextH2>

    <button
      id="dummy-toggle-highlight-2"
      type="button"
      {{on "click" @toggleHighlight}}
    >
      {{if @showHighlight "Hide" "Show"}}
      layout highlight
    </button>

    <div
      class="{{if
          @showHighlight
          'shw-component-form-base-elements-layout-highlight'
        }}"
    >

      <ShwTextH3>Layout</ShwTextH3>
      <ShwFlex @gap="3rem" as |SF|>
        {{#each LAYOUT_TYPES as |layout|}}
          <SF.Item @label={{capitalize layout}}>
            <HdsFormFieldset @layout={{layout}} as |F|>
              <F.Legend>This is the legend</F.Legend>
              <F.HelperText>This is the helper text</F.HelperText>
              <F.Control>
                <ShwPlaceholder
                  @text="field"
                  @width="120"
                  @height="32"
                  class="hds-form-group__control-field"
                />
              </F.Control>
              <F.Control>
                <ShwPlaceholder
                  @text="field"
                  @width="120"
                  @height="32"
                  class="hds-form-group__control-field"
                />
              </F.Control>
              <F.Control>
                <ShwPlaceholder
                  @text="field"
                  @width="120"
                  @height="32"
                  class="hds-form-group__control-field"
                />
              </F.Control>
              <F.Error>This is the error</F.Error>
            </HdsFormFieldset>
          </SF.Item>
        {{/each}}
      </ShwFlex>

      {{#each LAYOUT_TYPES as |layout|}}
        <ShwDivider @level={{2}} />
        <ShwTextH3>Containers / "{{layout}}" layout</ShwTextH3>
        <ShwGrid @columns={{3}} as |SG|>
          {{#let (array "block" "flex" "grid") as |displays|}}
            {{#each displays as |display|}}
              <SG.Item as |SGI|>
                <SGI.Label>Parent with
                  <code>display: {{display}}</code></SGI.Label>
                <div {{style display=display}}>
                  <HdsFormFieldset
                    @layout={{layout}}
                    @isRequired={{true}}
                    as |F|
                  >
                    <F.Legend>This is the legend</F.Legend>
                    <F.HelperText>This is the helper text</F.HelperText>
                    <F.Control>
                      <ShwPlaceholder
                        @text="field"
                        @width="120"
                        @height="32"
                        class="hds-form-group__control-field"
                      />
                    </F.Control>
                    <F.Control>
                      <ShwPlaceholder
                        @text="field"
                        @width="120"
                        @height="32"
                        class="hds-form-group__control-field"
                      />
                    </F.Control>
                    <F.Error>This is the error</F.Error>
                  </HdsFormFieldset>
                </div>
                <br />
                <div {{style display=display}}>
                  <HdsFormFieldset
                    @layout={{layout}}
                    @isRequired={{true}}
                    as |F|
                  >
                    <F.Legend>This is the legend text that should go on multiple
                      lines</F.Legend>
                    <F.HelperText>This is the helper text that should go on
                      multiple lines</F.HelperText>
                    <F.Control>
                      <ShwPlaceholder
                        @text="field"
                        @width="120"
                        @height="32"
                        class="hds-form-group__control-field"
                      />
                    </F.Control>
                    <F.Control>
                      <ShwPlaceholder
                        @text="field"
                        @width="120"
                        @height="32"
                        class="hds-form-group__control-field"
                      />
                    </F.Control>
                    <F.Error as |E|>
                      <E.Message>This is the first error text</E.Message>
                      <E.Message>This is the second error text that should go on
                        multiple lines</E.Message>
                    </F.Error>
                  </HdsFormFieldset>
                </div>
              </SG.Item>
            {{/each}}
          {{/let}}
        </ShwGrid>
      {{/each}}
    </div>
  </template>;

export default SubSectionFieldset;
