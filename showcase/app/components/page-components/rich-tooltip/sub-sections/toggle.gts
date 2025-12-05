/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
// import Component from '@glimmer/component';
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array } from '@ember/helper';
import { capitalize } from '@ember/string';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwOutliner from 'showcase/components/shw/outliner';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import { HdsRichTooltip } from '@hashicorp/design-system-components/components';
import { SIZES as TOGGLE_SIZES } from '@hashicorp/design-system-components/components/hds/rich-tooltip/toggle';

const SubSectionToggle: TemplateOnlyComponent = <template>
  <ShwTextH2>Toggle</ShwTextH2>

  <ShwTextH3>Text + Icon (optional)</ShwTextH3>

  <ShwTextH4>Content</ShwTextH4>

  <ShwFlex as |SF|>
    <SF.Item @label="Text">
      <HdsRichTooltip as |RT|>
        <RT.Toggle @text="Lorem ipsum dolor" />
        <RT.Bubble>
          <ShwPlaceholder @text="generic content" @height="40" />
        </RT.Bubble>
      </HdsRichTooltip>
    </SF.Item>
    <SF.Item @label="Text + Icon (trailing/default)">
      <HdsRichTooltip as |RT|>
        <RT.Toggle
          @text="Lorem ipsum dolor"
          @icon="info"
          @iconPosition="trailing"
        />
        <RT.Bubble>
          <ShwPlaceholder @text="generic content" @height="40" />
        </RT.Bubble>
      </HdsRichTooltip>
    </SF.Item>
    <SF.Item @label="Icon (leading) + Text">
      <HdsRichTooltip as |RT|>
        <RT.Toggle
          @text="Lorem ipsum dolor"
          @icon="info"
          @iconPosition="leading"
        />
        <RT.Bubble>
          <ShwPlaceholder @text="generic content" @height="40" />
        </RT.Bubble>
      </HdsRichTooltip>
    </SF.Item>
  </ShwFlex>

  <ShwTextH4>Sizes</ShwTextH4>

  <ShwFlex @label="Inherited (default)" as |SF|>
    <SF.Item>
      <HdsRichTooltip as |RT|>
        <RT.Toggle @text="Lorem ipsum dolor" />
        <RT.Bubble>
          <ShwPlaceholder @text="generic content" @height="40" />
        </RT.Bubble>
      </HdsRichTooltip>
    </SF.Item>
    <SF.Item>
      <HdsRichTooltip as |RT|>
        <RT.Toggle @text="Lorem ipsum dolor" @icon="info" />
        <RT.Bubble>
          <ShwPlaceholder @text="generic content" @height="40" />
        </RT.Bubble>
      </HdsRichTooltip>
    </SF.Item>
    <SF.Item>
      <HdsRichTooltip as |RT|>
        <RT.Toggle
          @text="Lorem ipsum dolor"
          @icon="info"
          @iconPosition="leading"
        />
        <RT.Bubble>
          <ShwPlaceholder @text="generic content" @height="40" />
        </RT.Bubble>
      </HdsRichTooltip>
    </SF.Item>
  </ShwFlex>
  {{#each TOGGLE_SIZES as |size|}}
    <ShwFlex @label="{{capitalize size}}" as |SF|>
      <SF.Item>
        <HdsRichTooltip as |RT|>
          <RT.Toggle @text="Lorem ipsum dolor" @size={{size}} />
          <RT.Bubble>
            <ShwPlaceholder @text="generic content" @height="40" />
          </RT.Bubble>
        </HdsRichTooltip>
      </SF.Item>
      <SF.Item>
        <HdsRichTooltip as |RT|>
          <RT.Toggle @text="Lorem ipsum dolor" @size={{size}} @icon="info" />
          <RT.Bubble>
            <ShwPlaceholder @text="generic content" @height="40" />
          </RT.Bubble>
        </HdsRichTooltip>
      </SF.Item>
      <SF.Item>
        <HdsRichTooltip as |RT|>
          <RT.Toggle
            @text="Lorem ipsum dolor"
            @size={{size}}
            @icon="info"
            @iconPosition="leading"
          />
          <RT.Bubble>
            <ShwPlaceholder @text="generic content" @height="40" />
          </RT.Bubble>
        </HdsRichTooltip>
      </SF.Item>
    </ShwFlex>
  {{/each}}

  <ShwDivider @level={{2}} />

  <ShwTextH3>Yield</ShwTextH3>

  <ShwTextH4>Content</ShwTextH4>

  <ShwFlex as |SF|>
    <SF.Item @label="Generic">
      <HdsRichTooltip as |RT|>
        <RT.Toggle>
          <ShwOutliner>Lorem ipsum dolor</ShwOutliner>
        </RT.Toggle>
        <RT.Bubble>
          <ShwPlaceholder @text="generic content" @height="40" />
        </RT.Bubble>
      </HdsRichTooltip>
    </SF.Item>
  </ShwFlex>

  <ShwTextH4>Sizes</ShwTextH4>

  <ShwFlex as |SF|>
    <SF.Item @label="Inherited">
      {{#let (array "18px" "20px" "22px") as |sizes|}}
        {{#each sizes as |size|}}
          <div {{style font-size=size line-height="1.4"}}>
            <HdsRichTooltip as |RT|>
              <RT.Toggle>Lorem ipsum dolor</RT.Toggle>
              <RT.Bubble>
                <ShwPlaceholder @text="generic content" @height="40" />
              </RT.Bubble>
            </HdsRichTooltip>
          </div>
        {{/each}}
      {{/let}}
    </SF.Item>
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionToggle;
