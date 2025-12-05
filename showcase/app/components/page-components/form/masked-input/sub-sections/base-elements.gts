/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array } from '@ember/helper';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import { HdsFormMaskedInputBase } from '@hashicorp/design-system-components/components';

import CodeFragmentWithExternalControl from 'showcase/components/page-components/form/masked-input/code-fragments/with-external-control';

const STATES = ['default', 'hover', 'focus'];

const multilineTextWithNewLineCharacters = 'Lorem\nipsum\ndolor';
const multilineTextWithReturns = `Lorem
ipsum
dolor`;

const SubSectionBaseElements: TemplateOnlyComponent = <template>
  <ShwTextH2>"Base" control</ShwTextH2>

  <ShwTextH3>Interaction status</ShwTextH3>

  <ShwTextH4>Single line</ShwTextH4>

  <ShwFlex as |SF|>
    <SF.Item @label="Default">
      <HdsFormMaskedInputBase aria-label="Default" />
    </SF.Item>
    <SF.Item @label="With placeholder">
      <HdsFormMaskedInputBase
        placeholder="Lorem ipsum dolor"
        aria-label="Placeholder"
      />
    </SF.Item>
    <SF.Item @label="With value (masked)">
      <HdsFormMaskedInputBase
        @value="Lorem ipsum dolor"
        aria-label="Value (masked)"
      />
    </SF.Item>
    <SF.Item @label="With value (in clear)">
      <HdsFormMaskedInputBase
        @isContentMasked={{false}}
        @value="Lorem ipsum dolor"
        aria-label="Value (in clear)"
      />
    </SF.Item>
    <SF.Item @label="With multiline value (inline \n)">
      <HdsFormMaskedInputBase
        @isContentMasked={{false}}
        @value={{multilineTextWithNewLineCharacters}}
        aria-label="Multiline value (inline)"
      />
    </SF.Item>
    <SF.Item @label="With multiline value (template literal)">
      <HdsFormMaskedInputBase
        @isContentMasked={{false}}
        @value={{multilineTextWithReturns}}
        aria-label="Multiline value (template)"
      />
    </SF.Item>
  </ShwFlex>

  <ShwTextH4>Multiline</ShwTextH4>

  <ShwFlex as |SF|>
    <SF.Item @label="Default">
      <HdsFormMaskedInputBase
        @isMultiline={{true}}
        aria-label="Multiline default"
      />
    </SF.Item>
    <SF.Item @label="With placeholder">
      <HdsFormMaskedInputBase
        @isMultiline={{true}}
        placeholder="Lorem ipsum dolor"
        aria-label="Multiline placeholder"
      />
    </SF.Item>
    <SF.Item @label="With value (masked)">
      <HdsFormMaskedInputBase
        @isMultiline={{true}}
        @value="Lorem ipsum dolor"
        aria-label="Multiline value (masked)"
      />
    </SF.Item>
    <SF.Item @label="With value (in clear)">
      <HdsFormMaskedInputBase
        @isMultiline={{true}}
        @isContentMasked={{false}}
        @value="Lorem ipsum dolor"
        aria-label="Multiline value (in clear)"
      />
    </SF.Item>
    <SF.Item @label="With multiline value (inline \n)">
      <HdsFormMaskedInputBase
        @isMultiline={{true}}
        @isContentMasked={{false}}
        @value={{multilineTextWithNewLineCharacters}}
        aria-label="Mutltiline value (inline)"
      />
    </SF.Item>
    <SF.Item @label="With multiline value (template literal)">
      <HdsFormMaskedInputBase
        @isMultiline={{true}}
        @isContentMasked={{false}}
        @value={{multilineTextWithReturns}}
        aria-label="Multiline value (template)"
      />
    </SF.Item>
    <SF.Item @label="With long wrapping text (masked)">
      <HdsFormMaskedInputBase
        @isMultiline={{true}}
        @value="Lorem ipsum odor amet, consectetuer adipiscing elit. Feugiat sed felis dictum taciti arcu senectus! Nulla mauris sollicitudin venenatis et leo; tortor facilisi penatibus. Tempor efficitur suspendisse sollicitudin netus sollicitudin sagittis euismod accumsan habitasse. Fusce nibh malesuada neque elementum venenatis risus platea montes. Risus vivamus maecenas hendrerit eu in ante potenti odio. Ex tellus cubilia fringilla condimentum velit; euismod dui. Ultricies lobortis senectus dis ut purus."
        aria-label="Multiline long wrapping text (masked)"
      />
    </SF.Item>
    <SF.Item @label="With long wrapping text (in clear)">
      <HdsFormMaskedInputBase
        @isMultiline={{true}}
        @isContentMasked={{false}}
        @value="Lorem ipsum odor amet, consectetuer adipiscing elit. Feugiat sed felis dictum taciti arcu senectus! Nulla mauris sollicitudin venenatis et leo; tortor facilisi penatibus. Tempor efficitur suspendisse sollicitudin netus sollicitudin sagittis euismod accumsan habitasse. Fusce nibh malesuada neque elementum venenatis risus platea montes. Risus vivamus maecenas hendrerit eu in ante potenti odio. Ex tellus cubilia fringilla condimentum velit; euismod dui. Ultricies lobortis senectus dis ut purus."
        aria-label="Multiline long wrapping text (in clear)"
      />
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>States</ShwTextH3>

  <ShwTextH4>Single line</ShwTextH4>

  {{#let (array "base" "invalid" "readonly" "disabled") as |variants|}}
    {{#each variants as |variant|}}
      <ShwGrid @columns={{3}} as |SG|>
        {{#each STATES as |state|}}
          <SG.Item
            @label="{{capitalize variant}} / {{capitalize state}}"
            mock-state-value={{state}}
            mock-state-selector="input"
          >
            <ShwFlex @direction="column" as |SF|>
              <SF.Item>
                <HdsFormMaskedInputBase
                  disabled={{if (eq variant "disabled") "disabled"}}
                  readonly={{if (eq variant "readonly") "readonly"}}
                  @value="Lorem ipsum dolor"
                  @isInvalid={{if (eq variant "invalid") true}}
                  aria-label="{{variant}} - {{state}}"
                />
              </SF.Item>
            </ShwFlex>
          </SG.Item>
        {{/each}}
      </ShwGrid>
    {{/each}}
  {{/let}}

  <ShwTextH4>Multiline</ShwTextH4>

  {{#let (array "base" "invalid" "readonly" "disabled") as |variants|}}
    {{#each variants as |variant|}}
      <ShwGrid @columns={{3}} as |SG|>
        {{#each STATES as |state|}}
          <SG.Item
            @label="{{capitalize variant}} / {{capitalize state}}"
            mock-state-value={{state}}
            mock-state-selector="textarea"
          >
            <ShwFlex @direction="column" as |SF|>
              <SF.Item>
                <HdsFormMaskedInputBase
                  disabled={{if (eq variant "disabled") "disabled"}}
                  readonly={{if (eq variant "readonly") "readonly"}}
                  @isMultiline={{true}}
                  @value="Lorem ipsum dolor"
                  @isInvalid={{if (eq variant "invalid") true}}
                  aria-label="Multiline {{variant}} - {{state}}"
                />
              </SF.Item>
            </ShwFlex>
          </SG.Item>
        {{/each}}
      </ShwGrid>
    {{/each}}
  {{/let}}

  <ShwDivider @level={{2}} />

  <ShwTextH3>Copy button</ShwTextH3>

  <ShwTextH4>Single line</ShwTextH4>

  {{#let (array "base" "invalid" "readonly") as |variants|}}
    {{#each variants as |variant|}}
      <ShwGrid @columns={{3}} as |SG|>
        {{#each STATES as |state|}}
          <SG.Item
            @label="{{capitalize variant}} / {{capitalize state}}"
            mock-state-value={{state}}
            mock-state-selector="input"
          >
            <ShwFlex @direction="column" as |SF|>
              <SF.Item>
                <HdsFormMaskedInputBase
                  disabled={{if (eq variant "disabled") "disabled"}}
                  readonly={{if (eq variant "readonly") "readonly"}}
                  @hasCopyButton={{true}}
                  @value="Lorem ipsum dolor"
                  @isInvalid={{if (eq variant "invalid") true}}
                  aria-label="Copy button {{variant}} - {{state}}"
                />
              </SF.Item>
            </ShwFlex>
          </SG.Item>
        {{/each}}
      </ShwGrid>
    {{/each}}
  {{/let}}

  <ShwTextH4>Multiline</ShwTextH4>

  {{#let (array "base" "invalid" "readonly") as |variants|}}
    {{#each variants as |variant|}}
      <ShwGrid @columns={{3}} as |SG|>
        {{#each STATES as |state|}}
          <SG.Item
            @label="{{capitalize variant}} / {{capitalize state}}"
            mock-state-value={{state}}
            mock-state-selector="textarea"
          >
            <ShwFlex @direction="column" as |SF|>
              <SF.Item>
                <HdsFormMaskedInputBase
                  disabled={{if (eq variant "disabled") "disabled"}}
                  readonly={{if (eq variant "readonly") "readonly"}}
                  @isMultiline={{true}}
                  @hasCopyButton={{true}}
                  @value="Lorem ipsum dolor"
                  @isInvalid={{if (eq variant "invalid") true}}
                  aria-label="Copy button multiline {{variant}} - {{state}}"
                />
              </SF.Item>
            </ShwFlex>
          </SG.Item>
        {{/each}}
      </ShwGrid>
    {{/each}}
  {{/let}}

  <ShwDivider @level={{2}} />

  <ShwTextH3>Externally controlled</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item>
      <CodeFragmentWithExternalControl />
    </SF.Item>
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionBaseElements;
