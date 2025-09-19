import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';
import { array, hash } from '@ember/helper';
import { eq, or } from 'ember-truth-helpers';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwDivider from 'showcase/components/shw/divider';
import ShwOutliner from 'showcase/components/shw/outliner';
import NOOP from 'showcase/utils/noop';

import {
  HdsTooltipButton,
  HdsAlert,
  HdsBadge,
  HdsIcon,
  HdsTabs,
} from '@hashicorp/design-system-components/components';
import { PLACEMENTS } from '@hashicorp/design-system-components/components/hds/tooltip-button/index';

const STATES = ['default', 'hover', 'focus'];

const SubSectionTooltip: TemplateOnlyComponent = <template>
  <ShwTextH2>TooltipButton</ShwTextH2>

  <ShwTextH3>Content</ShwTextH3>

  <ShwTextH4>On its own</ShwTextH4>
  <ShwFlex as |SF|>
    <SF.Item @label="With Icon as content">
      <HdsTooltipButton
        @text="Here is more information"
        aria-label="Information"
      >
        <HdsIcon @name="info" />
      </HdsTooltipButton>
    </SF.Item>

    <SF.Item @label="With an HTML time element as content">
      <HdsTooltipButton @text="2023-03-30T19:18:01.684Z">
        <time datetime="2023-03-30T19:18:01.684Z">Apr 5, 2023</time>
      </HdsTooltipButton>
    </SF.Item>

    <SF.Item @label="With really long content in tooltip">
      <HdsTooltipButton
        aria-label="Information"
        @text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      >
        <HdsBadge @icon="activity" @text="Lorem ipsum" />
      </HdsTooltipButton>
    </SF.Item>

    <SF.Item @label="With a really long string">
      <HdsTooltipButton
        aria-label="Information"
        @text="Loremipsumdolorsitametconsecteturadipiscingelitseddoeiusmodtempor!"
      >
        <HdsBadge @icon="activity" @text="Lorem ipsum" />
      </HdsTooltipButton>
    </SF.Item>
  </ShwFlex>

  <ShwTextH4>Used next to text</ShwTextH4>
  <p>
    <span class="hds-typography-display-300">Lorem ipsum dolor sit amet
      consectetur</span>
    <HdsTooltipButton @text="Here is more info" aria-label="Information">
      <HdsIcon @name="info" />
    </HdsTooltipButton>
  </p>

  <p class="hds-typography-body-300">
    Lorem ipsum dolor sit amet consectetur
    <HdsTooltipButton aria-label="more information" @text="Here is more info">
      <HdsIcon @name="info" />
    </HdsTooltipButton>
    adipisicing elit. Doloremque blanditiis sapiente iste beatae voluptates
    voluptatum.
  </p>

  <ShwTextH4>Used within various non-interactive components</ShwTextH4>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="Used within a tab panel">
      {{! Using within a T.Tab would result with a button nested inside a button and won't function. }}
      <HdsTabs as |T|>
        <T.Tab>One</T.Tab>
        <T.Tab>Two</T.Tab>
        <T.Tab>Three</T.Tab>
        <T.Panel>
          <p class="hds-typography-body-300">
            Content 1
            <HdsTooltipButton
              @text="Here is more info"
              aria-label="Information"
            >
              <HdsIcon @name="info" />
            </HdsTooltipButton>
          </p>
        </T.Panel>
        <T.Panel><p class="hds-typography-body-300">
            Content 2
            <HdsTooltipButton
              @text="Here is more info"
              aria-label="Information"
            >
              <HdsIcon @name="info" />
            </HdsTooltipButton>
          </p></T.Panel>
        <T.Panel><p class="hds-typography-body-300">
            Content 3
            <HdsTooltipButton
              @text="Here is more info"
              aria-label="Information"
            >
              <HdsIcon @name="info" />
            </HdsTooltipButton>
          </p>
        </T.Panel>
      </HdsTabs>
    </SF.Item>
    <SF.Item @label="Used within an alert">
      <HdsAlert @type="inline" @color="warning" @onDismiss={{NOOP}} as |A|>
        <A.Title>Warning</A.Title>
        <A.Description>
          Caution is advised.
          <HdsTooltipButton
            @text="Be careful with this"
            aria-label="Information"
          >
            <HdsIcon @name="info" />
          </HdsTooltipButton>
        </A.Description>
      </HdsAlert>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Display</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="With isInline=false">
      <p class="hds-typography-body-300">
        Lorem ipsum dolor sit amet consectetur
        <HdsTooltipButton
          @text="Here is more info"
          @isInline={{false}}
          aria-label="Information"
        >
          <HdsIcon @name="info" />
        </HdsTooltipButton>
        adipisicing elit. Doloremque blanditiis sapiente iste beatae voluptates
        voluptatum.
      </p>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Inheritance</ShwTextH3>

  <ShwTextBody>HDS classes</ShwTextBody>

  <ShwFlex @gap="2rem" as |SF|>
    <SF.Item @label="Applied to parent">
      <div
        class="hds-typography-display-400 hds-foreground-warning-on-surface hds-surface-warning"
      >
        <HdsTooltipButton
          @text="Here is more info"
          @isInline={{false}}
          aria-label="Information"
        >
          Lorem ipsum dolor
        </HdsTooltipButton>
      </div>
    </SF.Item>
    <SF.Item @label="Applied to the button">
      <HdsTooltipButton
        class="hds-typography-display-400 hds-foreground-warning-on-surface hds-surface-warning"
        @text="Here is more info"
      >
        Lorem ipsum dolor
      </HdsTooltipButton>
    </SF.Item>
    <SF.Item @label="Applied to children">
      <HdsTooltipButton
        @text="Here is more info"
        @isInline={{false}}
        aria-label="Information"
      >
        <div
          class="hds-typography-display-400 hds-foreground-warning-on-surface hds-surface-warning"
        >
          Lorem ipsum dolor
        </div>
      </HdsTooltipButton>
    </SF.Item>
  </ShwFlex>

  <ShwTextBody>Using a custom class</ShwTextBody>

  <ShwFlex @gap="2rem" as |SF|>
    <SF.Item @label="Applied to parent">
      <div class="shw-component-tooltip-font-style">
        <HdsTooltipButton
          @text="Here is more info"
          @isInline={{false}}
          aria-label="Information"
        >
          Lorem ipsum dolor
        </HdsTooltipButton>
      </div>
    </SF.Item>
    <SF.Item @label="Applied to the button">
      <HdsTooltipButton
        class="shw-component-tooltip-font-style"
        @text="Here is more info"
      >
        Lorem ipsum dolor
      </HdsTooltipButton>
    </SF.Item>
    <SF.Item @label="Applied to children">
      <HdsTooltipButton
        @text="Here is more info"
        @isInline={{false}}
        aria-label="Information"
      >
        <div class="shw-component-tooltip-font-style">
          Lorem ipsum dolor
        </div>
      </HdsTooltipButton>
    </SF.Item>
  </ShwFlex>

  <ShwTextBody>Style interference</ShwTextBody>

  <ShwFlex @gap="2rem" as |SF|>
    <SF.Item as |SFI|>
      <SFI.Label>Parent has <code>white-space: nowrap</code></SFI.Label>
      <div {{style whiteSpace="nowrap"}}>
        <HdsTooltipButton
          aria-label="tooltip button example"
          @text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        >
          <HdsIcon @name="info" />
        </HdsTooltipButton>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwTextBody>Used within a parent with explicit text alignment</ShwTextBody>

  <ShwGrid class="shw-component-tooltip-text-alignment" @columns={{3}} as |SG|>
    <SG.Item @label="text-align = left" {{style text-align="left"}}>
      <ShwOutliner>
        <HdsTooltipButton
          @text="Lorem ipsum dolor sit amet consectetur adipiscing elit"
          @placement="bottom"
          @extraTippyOptions={{hash showOnCreate=true}}
          aria-label="Information"
        >
          <p class="hds-typography-body-300">Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor</p>
        </HdsTooltipButton>
      </ShwOutliner>
    </SG.Item>
    <SG.Item @label="text-align = center" {{style text-align="center"}}>
      <ShwOutliner>
        <HdsTooltipButton
          @text="Lorem ipsum dolor sit amet consectetur adipiscing elit"
          @placement="bottom"
          @extraTippyOptions={{hash showOnCreate=true}}
          aria-label="Information"
        >
          <p class="hds-typography-body-300">Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor</p>
        </HdsTooltipButton>
      </ShwOutliner>
    </SG.Item>
    <SG.Item @label="text-align = right" {{style text-align="right"}}>
      <ShwOutliner>
        <HdsTooltipButton
          @text="Lorem ipsum dolor sit amet consectetur adipiscing elit"
          @placement="bottom"
          @extraTippyOptions={{hash showOnCreate=true}}
          aria-label="Information"
        >
          <p class="hds-typography-body-300">Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor</p>
        </HdsTooltipButton>
      </ShwOutliner>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>States</ShwTextH3>

  <ShwTextBody>
    The button which serves as the opener for the tooltip has no special styles
    of its own other than for the focus state.
  </ShwTextBody>

  <ShwTextBody>
    <strong>Note:</strong>
    There is a bug with the position of the tooltips below which are set to show
    on page load for example purposes. If you scroll the page a bit they will
    snap back to showing as centered. (Tooltips displayed on hover or focus do
    not have this bug.)
  </ShwTextBody>

  <ShwTextH4>With icon as opener content</ShwTextH4>

  <ShwFlex @gap="5rem" as |SF|>
    {{#each STATES as |state|}}
      <SF.Item @label={{state}}>
        {{#if (or (eq state "hover") (eq state "focus"))}}
          <HdsTooltipButton
            @text="More info"
            mock-state-value={{state}}
            @extraTippyOptions={{hash showOnCreate=true}}
            aria-label="Information"
          ><HdsIcon @name="info" /></HdsTooltipButton>
        {{else}}
          <HdsTooltipButton
            @text="More info"
            aria-label="Information"
            mock-state-value={{state}}
          >
            <HdsIcon @name="info" />
          </HdsTooltipButton>
        {{/if}}
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwTextH4>With text as opener content</ShwTextH4>

  <ShwFlex @gap="5rem" as |SF|>
    {{#each STATES as |state|}}
      <SF.Item @label={{state}}>
        {{#if (or (eq state "hover") (eq state "focus"))}}
          <HdsTooltipButton
            @text="More info"
            mock-state-value={{state}}
            @extraTippyOptions={{hash showOnCreate=true}}
          >Text</HdsTooltipButton>
        {{else}}
          <HdsTooltipButton
            @text="More info"
            mock-state-value={{state}}
          >Text</HdsTooltipButton>
        {{/if}}
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Options</ShwTextH3>

  <ShwTextH4>Placement</ShwTextH4>
  <ShwGrid class="shw-component-tooltip-placement-grid" @columns={{5}} as |SG|>
    {{#each PLACEMENTS as |place|}}
      <SG.Item class="shw-component-tooltip-placement-grid__item--{{place}}">
        <HdsTooltipButton
          @text="More info"
          @placement={{place}}
          @extraTippyOptions={{hash showOnCreate=true}}
        >
          <div
            class="shw-component-tooltip-placement-grid__target"
          >{{place}}</div>
        </HdsTooltipButton>
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwTextH4>Offset</ShwTextH4>

  <ShwFlex @gap="5rem" {{style margin-top="4rem"}} as |SF|>
    <SF.Item>
      <HdsTooltipButton
        @text="More info"
        @extraTippyOptions={{hash showOnCreate=true}}
        class="shw-component-tooltip-outline"
      >Default offset</HdsTooltipButton>
    </SF.Item>

    <SF.Item>
      <HdsTooltipButton
        @text="More info"
        @offset={{array 0 40}}
        @extraTippyOptions={{hash showOnCreate=true}}
        class="shw-component-tooltip-outline"
      >Offset: 0 40</HdsTooltipButton>
    </SF.Item>

    <SF.Item>
      <HdsTooltipButton
        @text="More info"
        @offset={{array 20 0}}
        @extraTippyOptions={{hash showOnCreate=true}}
        class="shw-component-tooltip-outline"
      >Offset: 20 0</HdsTooltipButton>
    </SF.Item>
  </ShwFlex>

  <ShwTextH4>With allowHTML=true</ShwTextH4>
  <HdsTooltipButton
    @extraTippyOptions={{hash allowHTML=true showOnCreate=true}}
    @placement="right"
    @text="<b>Hello</b> <em>there</em>!"
    aria-label="Information"
  >
    <HdsIcon @name="info" />
  </HdsTooltipButton>

  <ShwDivider />
</template>;

export default SubSectionTooltip;
