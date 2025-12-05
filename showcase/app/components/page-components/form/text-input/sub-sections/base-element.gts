/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import { array } from '@ember/helper';
import style from 'ember-style-modifier';
import { eq, and } from 'ember-truth-helpers';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwDivider from 'showcase/components/shw/divider';

import { HdsFormTextInputBase } from '@hashicorp/design-system-components/components';
import { TYPES } from '@hashicorp/design-system-components/components/hds/form/text-input/base';

const STATES = ['default', 'hover', 'focus'];

const SubSectionBaseElement: TemplateOnlyComponent = <template>
  <ShwTextH2>"Base" control</ShwTextH2>

  <ShwTextH3>Interaction status</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="Default">
      <HdsFormTextInputBase aria-label="default input example" />
    </SF.Item>
    <SF.Item @label="With placeholder">
      <HdsFormTextInputBase placeholder="Lorem ipsum dolor" />
    </SF.Item>
    <SF.Item @label="With value">
      <HdsFormTextInputBase
        @value="Lorem ipsum dolor"
        aria-label="text input example with value"
      />
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Types (native)</ShwTextH3>

  <ShwGrid @columns={{4}} as |SG|>
    {{#each TYPES as |type|}}
      <SG.Item @label={{capitalize type}}>
        <HdsFormTextInputBase
          @type={{type}}
          @value={{type}}
          aria-label="text input example for {{type}}"
        />
      </SG.Item>
    {{/each}}
    <SG.Item @label="Search (loading state)">
      <HdsFormTextInputBase
        @type="search"
        @value="search"
        @isLoading={{true}}
        aria-label="example of textinput with search/loading state"
      />
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>States</ShwTextH3>

  {{#let (array "base" "invalid" "readonly" "disabled") as |variants|}}
    {{#each variants as |variant|}}
      <ShwGrid @columns={{3}} as |SG|>
        {{#each STATES as |state|}}
          {{#let
            (and (eq variant "disabled") (eq state "focus"))
            as |isInvalidState|
          }}
            {{#unless isInvalidState}}
              <SG.Item
                @label="{{capitalize variant}} / {{capitalize state}}"
                mock-state-value={{state}}
                mock-state-selector="input"
              >
                <ShwFlex @direction="column" as |SF|>
                  <SF.Item>
                    <HdsFormTextInputBase
                      aria-label="text input example as {{state}}"
                      disabled={{if (eq variant "disabled") "disabled"}}
                      readonly={{if (eq variant "readonly") "readonly"}}
                      @isInvalid={{if (eq variant "invalid") true}}
                    />
                  </SF.Item>
                  <SF.Item>
                    <HdsFormTextInputBase
                      aria-label="text input example as {{state}}"
                      placeholder="Placeholder"
                      disabled={{if (eq variant "disabled") "disabled"}}
                      readonly={{if (eq variant "readonly") "readonly"}}
                      @isInvalid={{if (eq variant "invalid") true}}
                    />
                  </SF.Item>
                  <SF.Item>
                    <HdsFormTextInputBase
                      aria-label="text input example as {{state}}"
                      @value="Lorem ipsum dolor"
                      disabled={{if (eq variant "disabled") "disabled"}}
                      readonly={{if (eq variant "readonly") "readonly"}}
                      @isInvalid={{if (eq variant "invalid") true}}
                    />
                  </SF.Item>
                  <SF.Item>
                    <HdsFormTextInputBase
                      aria-label="text input example as {{state}}"
                      @type="password"
                      @value="Lorem ipsum dolor"
                      disabled={{if (eq variant "disabled") "disabled"}}
                      readonly={{if (eq variant "readonly") "readonly"}}
                      @isInvalid={{if (eq variant "invalid") true}}
                    />
                  </SF.Item>
                  <SF.Item>
                    <HdsFormTextInputBase
                      aria-label="text input example as {{state}}"
                      @type="search"
                      @value="Lorem ipsum dolor"
                      disabled={{if (eq variant "disabled") "disabled"}}
                      readonly={{if (eq variant "readonly") "readonly"}}
                      @isInvalid={{if (eq variant "invalid") true}}
                    />
                  </SF.Item>
                  <SF.Item>
                    <HdsFormTextInputBase
                      aria-label="text input example as {{state}}"
                      @type="date"
                      @value="Lorem ipsum dolor"
                      disabled={{if (eq variant "disabled") "disabled"}}
                      readonly={{if (eq variant "readonly") "readonly"}}
                      @isInvalid={{if (eq variant "invalid") true}}
                    />
                  </SF.Item>
                  <SF.Item>
                    <HdsFormTextInputBase
                      aria-label="text input example as {{state}}"
                      @type="time"
                      @value="Lorem ipsum dolor"
                      disabled={{if (eq variant "disabled") "disabled"}}
                      readonly={{if (eq variant "readonly") "readonly"}}
                      @isInvalid={{if (eq variant "invalid") true}}
                    />
                  </SF.Item>
                  <SF.Item>
                    <HdsFormTextInputBase
                      aria-label="text input example as {{state}}"
                      @type="datetime-local"
                      @value="Lorem ipsum dolor"
                      disabled={{if (eq variant "disabled") "disabled"}}
                      readonly={{if (eq variant "readonly") "readonly"}}
                      @isInvalid={{if (eq variant "invalid") true}}
                    />
                  </SF.Item>
                  <SF.Item>
                    <HdsFormTextInputBase
                      aria-label="text input example as {{state}}"
                      @type="month"
                      disabled={{if (eq variant "disabled") "disabled"}}
                      readonly={{if (eq variant "readonly") "readonly"}}
                      @isInvalid={{if (eq variant "invalid") true}}
                    />
                  </SF.Item>
                  <SF.Item>
                    <HdsFormTextInputBase
                      aria-label="text input example as {{state}}"
                      @type="week"
                      disabled={{if (eq variant "disabled") "disabled"}}
                      readonly={{if (eq variant "readonly") "readonly"}}
                      @isInvalid={{if (eq variant "invalid") true}}
                    />
                  </SF.Item>
                  <SF.Item>
                    <HdsFormTextInputBase
                      aria-label="text input example as {{state}}"
                      @type="tel"
                      @value="1234567890"
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
      <div class="shw-component-form-textinput-base-custom-layout">
        <label for="my-custom-text-input-example">Custom label</label>
        <HdsFormTextInputBase
          id="my-custom-text-input-example"
          @value="Lorem ipsum dolor"
        />
        <span
          class="shw-component-form-textinput-base-custom-layout__append-text"
        >Some content</span>
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
          <ShwFlex @direction="column" as |SF|>
            <SF.Item {{style display=display}}>
              <HdsFormTextInputBase
                @value="Default width"
                aria-label="text input example as {{display}}"
              />
            </SF.Item>
            <SF.Item {{style display=display}}>
              <HdsFormTextInputBase
                @value="Custom width"
                @width="248px"
                aria-label="text input example as {{display}}"
              />
            </SF.Item>
            <SF.Item {{style display=display}}>
              <HdsFormTextInputBase
                aria-label="text input example as {{display}}"
                @type="date"
              />
            </SF.Item>
            <SF.Item {{style display=display}}>
              <HdsFormTextInputBase
                aria-label="text input example as {{display}}"
                @type="time"
              />
            </SF.Item>
            <SF.Item {{style display=display}}>
              <HdsFormTextInputBase
                aria-label="text input example as {{display}}"
                @type="datetime-local"
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
