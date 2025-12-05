/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array } from '@ember/helper';
import style from 'ember-style-modifier';

import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import { HdsFormMaskedInputField } from '@hashicorp/design-system-components/components';

const SubSectionContainers: TemplateOnlyComponent = <template>
  <ShwTextH3>Containers</ShwTextH3>

  <ShwTextH4>Single line</ShwTextH4>

  <ShwGrid @columns={{3}} as |SG|>
    {{#let (array "block" "flex" "grid") as |displays|}}
      {{#each displays as |display|}}
        <SG.Item as |SGI|>
          <SGI.Label>Parent with
            <code>display: {{display}}</code></SGI.Label>
          <ShwFlex as |SF|>
            <SF.Item @grow={{true}} {{style display=display}}>
              <HdsFormMaskedInputField @value="Default width" as |F|>
                <F.Label>This is the label</F.Label>
                <F.HelperText>This is the helper text</F.HelperText>
              </HdsFormMaskedInputField>
            </SF.Item>
            <SF.Item @grow={{true}} {{style display=display}}>
              <HdsFormMaskedInputField
                @value="Custom width"
                @width="120px"
                @isInvalid={{true}}
                as |F|
              >
                <F.Label>This is the label text that should go on multiple lines</F.Label>
                <F.HelperText>This is the helper text that should go on multiple
                  lines</F.HelperText>
                <F.Error as |E|>
                  <E.Message>This is the first error text</E.Message>
                  <E.Message>This is the second error text that should go on
                    multiple lines</E.Message>
                </F.Error>
              </HdsFormMaskedInputField>
            </SF.Item>
          </ShwFlex>
        </SG.Item>
      {{/each}}
    {{/let}}
  </ShwGrid>

  <ShwTextH4>Multiline</ShwTextH4>

  <ShwGrid @columns={{3}} as |SG|>
    {{#let (array "block" "flex" "grid") as |displays|}}
      {{#each displays as |display|}}
        <SG.Item as |SGI|>
          <SGI.Label>Parent with
            <code>display: {{display}}</code></SGI.Label>
          <ShwFlex as |SF|>
            <SF.Item @grow={{true}} {{style display=display}}>
              <HdsFormMaskedInputField
                @isMultiline={{true}}
                @value="Default width"
                as |F|
              >
                <F.Label>This is the label</F.Label>
                <F.HelperText>This is the helper text</F.HelperText>
              </HdsFormMaskedInputField>
            </SF.Item>
            <SF.Item @grow={{true}} {{style display=display}}>
              <HdsFormMaskedInputField
                @isMultiline={{true}}
                @value="Custom width"
                @width="120px"
                @height="150px"
                @isInvalid={{true}}
                as |F|
              >
                <F.Label>This is the label text that should go on multiple lines</F.Label>
                <F.HelperText>This is the helper text that should go on multiple
                  lines</F.HelperText>
                <F.Error as |E|>
                  <E.Message>This is the first error text</E.Message>
                  <E.Message>This is the second error text that should go on
                    multiple lines</E.Message>
                </F.Error>
              </HdsFormMaskedInputField>
            </SF.Item>
          </ShwFlex>
        </SG.Item>
      {{/each}}
    {{/let}}
  </ShwGrid>
</template>;

export default SubSectionContainers;
