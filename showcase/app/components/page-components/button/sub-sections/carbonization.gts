import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwFlex from 'showcase/components/shw/flex';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import { HdsButton } from '@hashicorp/design-system-components/components';
import {
  COLORS,
  SIZES,
} from '@hashicorp/design-system-components/components/hds/button/index';

// these are used only for presentation purpose in the showcase
const STATES = ['default', 'hover', 'active', 'focus', 'disabled'];

import CodeFragmentWithLoadingState from 'showcase/components/page-components/button/code-fragments/with-loading-state';

const SubSectionCarbonization: TemplateOnlyComponent = <template>
  <ShwTextH2>Content</ShwTextH2>

  <ShwCarbonizationComparisonGrid>
    <:themed>
      <ShwFlex @direction="column" as |SF|>
        <SF.Item>
          <HdsButton @text="Lorem ipsum" />
        </SF.Item>
        <SF.Item>
          <HdsButton @icon="plus" @iconPosition="leading" @text="Lorem ipsum" />
        </SF.Item>
        <SF.Item>
          <HdsButton
            @icon="arrow-right"
            @iconPosition="trailing"
            @text="Lorem ipsum"
          />
        </SF.Item>
        <SF.Item>
          <HdsButton @icon="plus" @isIconOnly={{true}} @text="Lorem ipsum" />
        </SF.Item>
        <SF.Item {{style width="200px"}}>
          <HdsButton
            @icon="plus"
            @text="This is a very long text that should go on multiple lines"
          />
        </SF.Item>
        <SF.Item {{style width="150px"}}>
          <CodeFragmentWithLoadingState />
        </SF.Item>
      </ShwFlex>
    </:themed>
  </ShwCarbonizationComparisonGrid>

  <ShwTextH2>Sizes</ShwTextH2>

  <ShwCarbonizationComparisonGrid>
    <:themed>
      <ShwFlex @direction="column" as |SF|>
        {{#each SIZES as |size|}}
          <SF.Item>
            <HdsButton
              @icon="plus"
              @text="Lorem ipsum"
              @size={{size}}
              @isInline={{true}}
            />
          </SF.Item>
        {{/each}}
      </ShwFlex>
    </:themed>
  </ShwCarbonizationComparisonGrid>

  <ShwTextH2>Colors</ShwTextH2>

  <ShwCarbonizationComparisonGrid>
    <:themed>
      <ShwFlex @direction="column" as |SF|>
        {{#each COLORS as |color|}}
          <SF.Item>
            <HdsButton @icon="plus" @text="Lorem ipsum" @color={{color}} />
          </SF.Item>
        {{/each}}
      </ShwFlex>
    </:themed>
  </ShwCarbonizationComparisonGrid>

  <ShwTextH2>States</ShwTextH2>

  {{#each COLORS as |color|}}
    <ShwTextH3>{{capitalize color}}</ShwTextH3>
    {{#each STATES as |state|}}
      <ShwTextBody>{{state}}</ShwTextBody>
      <ShwCarbonizationComparisonGrid>
        <:themed>
          <ShwFlex @direction="column" @gap="0.75rem" as |SF|>
            {{#each SIZES as |size|}}
              <SF.Item>
                {{#if (eq state "disabled")}}
                  <HdsButton
                    @icon="plus"
                    @text="Lorem"
                    @size={{size}}
                    @color={{color}}
                    disabled
                  />
                {{else}}
                  <HdsButton
                    @icon="plus"
                    @text="Lorem"
                    @size={{size}}
                    @color={{color}}
                    mock-state-value={{state}}
                  />
                {{/if}}
              </SF.Item>
            {{/each}}
          </ShwFlex>
        </:themed>
      </ShwCarbonizationComparisonGrid>
    {{/each}}
  {{/each}}
</template>;

export default SubSectionCarbonization;
