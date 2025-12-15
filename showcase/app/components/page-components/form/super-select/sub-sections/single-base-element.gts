/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import style from 'ember-style-modifier';
import { eq, and } from 'ember-truth-helpers';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwDivider from 'showcase/components/shw/divider';
import ShwOutliner from 'showcase/components/shw/outliner';

import CodeFragmentWithSingleBaseElement from 'showcase/components/page-components/form/super-select/code-fragments/with-single-base-element';

const STATES = ['default', 'hover', 'focus'];
const VARIANTS = ['base', 'invalid', 'disabled'];

const SubSectionSingleBaseElement: TemplateOnlyComponent = <template>
  <ShwTextH2>FormSuperSelectSingleBase</ShwTextH2>

  <ShwTextH3>Interaction status</ShwTextH3>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Default">
      <CodeFragmentWithSingleBaseElement />
    </SG.Item>
    <SG.Item @label="With placeholder">
      <CodeFragmentWithSingleBaseElement @placeholder="Placeholder text" />
    </SG.Item>
    <SG.Item @label="Selected">
      <CodeFragmentWithSingleBaseElement @isSelected={{true}} />
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>States</ShwTextH3>

  <ShwGrid @columns={{3}} as |SG|>
    {{#each STATES as |state|}}
      <SG.Item>
        <ShwFlex @direction="column" as |SF|>
          {{#each VARIANTS as |variant|}}
            {{#let
              (and (eq variant "disabled") (eq state "focus"))
              as |dontDisplay|
            }}
              {{#unless dontDisplay}}
                <SF.Item @label="{{capitalize variant}} / {{capitalize state}}">
                  <CodeFragmentWithSingleBaseElement
                    @isSelected={{true}}
                    @disabled={{if (eq variant "disabled") true}}
                    @isInvalid={{if (eq variant "invalid") true}}
                    class="mock-{{state}}"
                  />
                </SF.Item>
              {{/unless}}
            {{/let}}
          {{/each}}
        </ShwFlex>
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>List</ShwTextH3>

  <ShwFlex {{style padding-bottom="11em"}} @direction="row" as |SF|>
    <SF.Item {{style flex="1"}} @label="Default">
      <CodeFragmentWithSingleBaseElement
        @isSelected={{true}}
        @initiallyOpened={{true}}
        @verticalPosition="below"
      />
    </SF.Item>
    <SF.Item {{style flex="1"}} @label="Search enabled">
      <CodeFragmentWithSingleBaseElement
        @isSelected={{true}}
        @searchEnabled={{true}}
        @initiallyOpened={{true}}
        @verticalPosition="below"
      />
    </SF.Item>
  </ShwFlex>

  <ShwTextH4>List position</ShwTextH4>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item>
      <ShwFlex as |SF|>
        <SF.Item {{style flex="1"}} @label="Auto (default)">
          <CodeFragmentWithSingleBaseElement @isSelected={{true}} />
        </SF.Item>
        <SF.Item {{style flex="1"}} @label="Below">
          <CodeFragmentWithSingleBaseElement
            @isSelected={{true}}
            @verticalPosition="below"
          />
        </SF.Item>
        <SF.Item {{style flex="1"}} @label="Above">
          <CodeFragmentWithSingleBaseElement
            @isSelected={{true}}
            @verticalPosition="above"
          />
        </SF.Item>
      </ShwFlex>
    </SF.Item>
    <SF.Item>
      <ShwFlex as |SF|>
        <SF.Item {{style flex="1"}} @label="Left (+ matchTriggerWidth=False)">
          <CodeFragmentWithSingleBaseElement
            @options="places"
            @isSelected={{true}}
            @matchTriggerWidth={{false}}
            @horizontalPosition="left"
          />
        </SF.Item>
        <SF.Item {{style flex="1"}} @label="Center (+ matchTriggerWidth=False)">
          <CodeFragmentWithSingleBaseElement
            @options="places"
            @isSelected={{true}}
            @matchTriggerWidth={{false}}
            @horizontalPosition="center"
          />
        </SF.Item>
        <SF.Item {{style flex="1"}} @label="Right (+ matchTriggerWidth=False)">
          <CodeFragmentWithSingleBaseElement
            @options="places"
            @isSelected={{true}}
            @matchTriggerWidth={{false}}
            @horizontalPosition="right"
          />
        </SF.Item>
      </ShwFlex>
    </SF.Item>
  </ShwFlex>

  <ShwTextH4>List width</ShwTextH4>

  <ShwFlex {{style padding-bottom="11em"}} as |SF|>
    <SF.Item
      {{style min-width="10em"}}
      @label="matchTriggerWidth = true (default)"
    >
      <CodeFragmentWithSingleBaseElement
        @isSelected={{true}}
        @initiallyOpened={{true}}
        @verticalPosition="below"
      />
    </SF.Item>
    <SF.Item {{style min-width="10em"}} @label="matchTriggerWidth = false">
      <CodeFragmentWithSingleBaseElement
        @isSelected={{true}}
        @initiallyOpened={{true}}
        @verticalPosition="below"
        @matchTriggerWidth={{false}}
      />
    </SF.Item>
    <SF.Item @label="dropdownMaxWidth = 30em">
      <CodeFragmentWithSingleBaseElement
        @options="places"
        @isSelected={{true}}
        @initiallyOpened={{true}}
        @verticalPosition="below"
        @dropdownMaxWidth="30em"
      />
    </SF.Item>
  </ShwFlex>

  <ShwTextH4>List search results messages</ShwTextH4>

  <ShwFlex as |SF|>
    <SF.Item {{style min-width="10em"}} @label="Loading options message">
      <ShwOutliner>
        <div class="hds-form-super-select hds-form-super-select-single">
          <div class="ember-basic-dropdown">
            <ul role="listbox" class="ember-power-select-options">
              <li
                class="ember-power-select-option ember-power-select-option--loading-message"
                role="option"
              >Loading options...</li>
            </ul>
          </div>
        </div>
      </ShwOutliner>
    </SF.Item>
    <SF.Item {{style min-width="22em"}} @label="No results found message">
      <ShwOutliner>
        <div class="hds-form-super-select hds-form-super-select-single">
          <div class="ember-basic-dropdown">
            <ul role="listbox" class="ember-power-select-options">
              <li
                class="ember-power-select-option ember-power-select-option--no-matches-message"
                role="option"
              >
                No results found
              </li>
            </ul>
          </div>
        </div>
      </ShwOutliner>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Before &amp; after options</ShwTextH3>

  <ShwFlex
    {{style padding-bottom="15.5em" max-width="50%"}}
    @direction="row"
    as |SF|
  >
    <SF.Item {{style flex="1"}} @label="Before options generic content">
      <CodeFragmentWithSingleBaseElement
        @hasBeforeOptionsComponent={{true}}
        @options="places"
        @isSelected={{true}}
        @initiallyOpened={{true}}
        @verticalPosition="below"
      />
    </SF.Item>
    {{! left empty on purpose }}
    <SF.Item />
  </ShwFlex>

  <ShwFlex {{style padding-bottom="15em"}} @direction="row" as |SF|>
    <SF.Item {{style flex="1"}} @label="After options default content">
      <CodeFragmentWithSingleBaseElement
        @options="places"
        @isSelected={{true}}
        @initiallyOpened={{true}}
        @verticalPosition="below"
        @showAfterOptions={{true}}
      />
    </SF.Item>
    <SF.Item {{style flex="1"}} @label="After options no content">
      <CodeFragmentWithSingleBaseElement
        @options="places"
        @isSelected={{true}}
        @initiallyOpened={{true}}
        @verticalPosition="below"
      />
    </SF.Item>
  </ShwFlex>

  <ShwFlex {{style padding-bottom="15em"}} @direction="row" as |SF|>
    <SF.Item {{style flex="1"}} @label="After options text content in footer">
      <CodeFragmentWithSingleBaseElement
        @options="places"
        @isSelected={{true}}
        @initiallyOpened={{true}}
        @verticalPosition="below"
        @afterOptionsContent="After options content"
      />
    </SF.Item>
    <SF.Item
      {{style flex="1"}}
      @label="After options generic content in footer"
    >
      <CodeFragmentWithSingleBaseElement
        @hasAfterOptionsComponent={{true}}
        @options="places"
        @isSelected={{true}}
        @initiallyOpened={{true}}
        @verticalPosition="below"
        @showAfterOptions={{true}}
      />
    </SF.Item>
  </ShwFlex>

  <ShwTextH4>Custom result count message</ShwTextH4>

  <ShwFlex
    {{style padding-bottom="15em" max-width="50%"}}
    @direction="row"
    as |SF|
  >
    <SF.Item {{style flex="1"}}>
      <CodeFragmentWithSingleBaseElement
        @options="places"
        @isSelected={{true}}
        @hasResultCountMessage={{true}}
        @initiallyOpened={{true}}
        @verticalPosition="below"
        @showAfterOptions={{true}}
      />
    </SF.Item>
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionSingleBaseElement;
