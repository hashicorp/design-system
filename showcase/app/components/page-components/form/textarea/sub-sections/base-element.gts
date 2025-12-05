/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array } from '@ember/helper';
import { capitalize } from '@ember/string';
import { eq, and } from 'ember-truth-helpers';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwDivider from 'showcase/components/shw/divider';

import { HdsFormTextareaBase } from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'focus'];

const SubSectionBaseElement: TemplateOnlyComponent = <template>
  <ShwTextH2>"Base" control</ShwTextH2>

  <ShwTextH3>Interaction status</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="Default">
      <HdsFormTextareaBase aria-label="default textarea example" />
    </SF.Item>
    <SF.Item @label="With placeholder">
      <HdsFormTextareaBase
        aria-label="textarea example with placeholder"
        placeholder="Lorem ipsum dolor"
      />
    </SF.Item>
    <SF.Item @label="With value">
      <HdsFormTextareaBase
        aria-label="textarea example with value"
        @value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
      />
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>States</ShwTextH3>

  {{#let (array "base" "invalid" "readonly" "disabled") as |variants|}}
    {{#each variants as |variant|}}
      <ShwGrid @columns={{3}} as |SG|>
        {{#each STATES as |state|}}
          {{#let
            (and (eq variant "disabled") (eq state "focus"))
            as |dontDisplay|
          }}
            {{#unless dontDisplay}}
              <SG.Item
                @label="{{capitalize variant}} / {{capitalize state}}"
                mock-state-value={{state}}
                mock-state-selector="textarea"
              >
                <ShwFlex @direction="column" as |SF|>
                  <SF.Item>
                    <HdsFormTextareaBase
                      aria-label="textarea example as {{state}}"
                      disabled={{if (eq variant "disabled") "disabled"}}
                      readonly={{if (eq variant "readonly") "readonly"}}
                      @isInvalid={{if (eq variant "invalid") true}}
                    />
                  </SF.Item>
                  <SF.Item>
                    <HdsFormTextareaBase
                      aria-label="textarea example as with placeholder in{{state}}"
                      placeholder="Placeholder"
                      disabled={{if (eq variant "disabled") "disabled"}}
                      readonly={{if (eq variant "readonly") "readonly"}}
                      @isInvalid={{if (eq variant "invalid") true}}
                    />
                  </SF.Item>
                  <SF.Item>
                    <HdsFormTextareaBase
                      aria-label="textarea example with value as {{state}}"
                      @value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
                      disabled={{if (eq variant "disabled") "disabled"}}
                      readonly={{if (eq variant "readonly") "readonly"}}
                      @isInvalid={{if (eq variant "invalid") true}}
                    />
                  </SF.Item>
                </ShwFlex>
              </SG.Item>
            {{/unless}}
          {{/let}}
        {{/each}}
      </ShwGrid>
    {{/each}}
  {{/let}}

  <ShwDivider @level={{2}} />

  <ShwTextH3>Custom layout</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="With custom layout">
      <div class="shw-component-form-textarea-base-custom-layout">
        <div class="shw-component-form-textarea-base-custom-layout__heading">
          <label for="my-custom-textare-example">Custom label</label>
          <span>Some content</span>
        </div>
        <HdsFormTextareaBase
          id="my-custom-textare-example"
          class="shw-component-form-textarea-base-custom-layout__control"
          @value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
        />
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Containers</ShwTextH3>

  <ShwGrid @columns={{3}} as |SG|>
    {{#let (array "block" "flex" "grid") as |displays|}}
      {{#each displays as |display|}}
        <SG.Item as |SGI|>
          <SGI.Label>Parent with
            <code>display: {{display}}</code></SGI.Label>
          <ShwFlex as |SF|>
            <SF.Item @grow={{true}} {{style display=display}}>
              <HdsFormTextareaBase
                aria-label="textarea example as {{display}}"
                @value="Default width"
              />
            </SF.Item>
            <SF.Item @grow={{true}} {{style display=display}}>
              <HdsFormTextareaBase
                aria-label="textarea example as {{display}}"
                @value="Custom width and height"
                @width="248px"
                @height="150px"
              />
            </SF.Item>
          </ShwFlex>
        </SG.Item>
      {{/each}}
    {{/let}}
  </ShwGrid>

  <ShwDivider />
</template>;

export default SubSectionBaseElement;
