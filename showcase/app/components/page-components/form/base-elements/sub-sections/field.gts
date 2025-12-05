/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array } from '@ember/helper';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';
import { on } from '@ember/modifier';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { LAYOUT_TYPES } from '@hashicorp/design-system-components/components/hds/form/field/index';

import { HdsFormField } from '@hashicorp/design-system-components/components';

export interface SubSectionFieldSignature {
  Args: {
    showHighlight: boolean;
    toggleHighlight: () => void;
  };
}

const SubSectionField: TemplateOnlyComponent<SubSectionFieldSignature> =
  <template>
    <ShwTextH2>Field</ShwTextH2>

    <button
      id="dummy-toggle-highlight"
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

      <ShwGrid @columns={{3}} as |SG|>
        {{#each LAYOUT_TYPES as |layout|}}
          <SG.Item @label={{capitalize layout}}>
            <HdsFormField @layout={{layout}} as |F|>
              <F.Label>This is the label</F.Label>
              <F.HelperText>This is the helper text</F.HelperText>
              <F.Control>
                {{#if (eq layout "vertical")}}
                  <ShwPlaceholder @text="control" @width="100%" @height="32" />
                {{/if}}
                {{#if (eq layout "flag")}}
                  <ShwPlaceholder @text="✔" @width="16" @height="16" />
                {{/if}}
              </F.Control>
              <F.Error>This is the error</F.Error>
            </HdsFormField>
          </SG.Item>
        {{/each}}
      </ShwGrid>

      {{#each LAYOUT_TYPES as |layout|}}
        <ShwDivider @level={{2}} />
        <ShwTextH3>Content / "{{layout}}" layout</ShwTextH3>
        <ShwGrid @columns={{3}} as |SG|>

          <SG.Item @label="Only label">
            <HdsFormField @layout={{layout}} as |F|>
              <F.Label>This is the label text</F.Label>
              <F.Control>
                {{#if (eq layout "vertical")}}
                  <ShwPlaceholder @text="control" @width="100%" @height="32" />
                {{/if}}
                {{#if (eq layout "flag")}}
                  <ShwPlaceholder @text="✔" @width="16" @height="16" />
                {{/if}}
              </F.Control>
            </HdsFormField>
          </SG.Item>
          <SG.Item @label="Label + Helper text">
            <HdsFormField @layout={{layout}} as |F|>
              <F.Label>This is the label text</F.Label>
              <F.HelperText>This is the helper text</F.HelperText>
              <F.Control>
                {{#if (eq layout "vertical")}}
                  <ShwPlaceholder @text="control" @width="100%" @height="32" />
                {{/if}}
                {{#if (eq layout "flag")}}
                  <ShwPlaceholder @text="✔" @width="16" @height="16" />
                {{/if}}
              </F.Control>
            </HdsFormField>
          </SG.Item>
          <SG.Item @label="Label + Helper text + Indicator">
            <HdsFormField @layout={{layout}} @isRequired={{true}} as |F|>
              <F.Label>This is the label text</F.Label>
              <F.HelperText>This is the helper text</F.HelperText>
              <F.Control>
                {{#if (eq layout "vertical")}}
                  <ShwPlaceholder @text="control" @width="100%" @height="32" />
                {{/if}}
                {{#if (eq layout "flag")}}
                  <ShwPlaceholder @text="✔" @width="16" @height="16" />
                {{/if}}
              </F.Control>
            </HdsFormField>
          </SG.Item>
        </ShwGrid>

        <br />

        <ShwGrid @columns={{3}} as |SG|>
          <SG.Item @label="Label + Error">
            <HdsFormField @layout={{layout}} as |F|>
              <F.Label>This is the label</F.Label>
              <F.Control>
                {{#if (eq layout "vertical")}}
                  <ShwPlaceholder @text="control" @width="100%" @height="32" />
                {{/if}}
                {{#if (eq layout "flag")}}
                  <ShwPlaceholder @text="✔" @width="16" @height="16" />
                {{/if}}
              </F.Control>
              <F.Error>This is the error</F.Error>
            </HdsFormField>
          </SG.Item>
          <SG.Item @label="Label + Helper text + Error">
            <HdsFormField @layout={{layout}} as |F|>
              <F.Label>This is the label</F.Label>
              <F.HelperText>This is the helper text</F.HelperText>
              <F.Control>
                {{#if (eq layout "vertical")}}
                  <ShwPlaceholder @text="control" @width="100%" @height="32" />
                {{/if}}
                {{#if (eq layout "flag")}}
                  <ShwPlaceholder @text="✔" @width="16" @height="16" />
                {{/if}}
              </F.Control>
              <F.Error>This is the error</F.Error>
            </HdsFormField>
          </SG.Item>
          <SG.Item @label="Label + Helper text + Errors">
            <HdsFormField @layout={{layout}} as |F|>
              <F.Label>This is the label</F.Label>
              <F.HelperText>This is the helper text</F.HelperText>
              <F.Control>
                {{#if (eq layout "vertical")}}
                  <ShwPlaceholder @text="control" @width="100%" @height="32" />
                {{/if}}
                {{#if (eq layout "flag")}}
                  <ShwPlaceholder @text="✔" @width="16" @height="16" />
                {{/if}}
              </F.Control>
              <F.Error as |E|>
                <E.Message>First error message</E.Message>
                <E.Message>Second error message</E.Message>
              </F.Error>
            </HdsFormField>
          </SG.Item>
        </ShwGrid>
      {{/each}}

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
                  <HdsFormField @layout={{layout}} @isRequired={{true}} as |F|>
                    <F.Label>This is the label</F.Label>
                    <F.HelperText>This is the helper text</F.HelperText>
                    <F.Control>
                      {{#if (eq layout "vertical")}}
                        <ShwPlaceholder
                          @text="control"
                          @width="100%"
                          @height="32"
                        />
                      {{/if}}
                      {{#if (eq layout "flag")}}
                        <ShwPlaceholder @text="✔" @width="16" @height="16" />
                      {{/if}}
                    </F.Control>
                    <F.Error>This is the error</F.Error>
                  </HdsFormField>
                </div>
                <br />
                <div {{style display=display}}>
                  <HdsFormField @layout={{layout}} @isRequired={{true}} as |F|>
                    <F.Label>This is the label text that should go on multiple
                      lines</F.Label>
                    <F.HelperText>This is the helper text that should go on
                      multiple lines</F.HelperText>
                    <F.Control>
                      {{#if (eq layout "vertical")}}
                        <ShwPlaceholder
                          @text="control"
                          @width="100%"
                          @height="32"
                        />
                      {{/if}}
                      {{#if (eq layout "flag")}}
                        <ShwPlaceholder @text="✔" @width="16" @height="16" />
                      {{/if}}
                    </F.Control>
                    <F.Error as |E|>
                      <E.Message>This is the first error text</E.Message>
                      <E.Message>This is the second error text that should go on
                        multiple lines</E.Message>
                    </F.Error>
                  </HdsFormField>
                </div>
              </SG.Item>
            {{/each}}
          {{/let}}
        </ShwGrid>
      {{/each}}
    </div>

    <ShwDivider />
  </template>;

export default SubSectionField;
