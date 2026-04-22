/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { capitalize } from '@ember/string';
import { eq, notEq, and } from 'ember-truth-helpers';
import { get } from '@ember/helper';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';
import NOOP from 'showcase/utils/noop';

import {
  HdsAlert,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';
import {
  TYPES,
  COLORS,
} from '@hashicorp/design-system-components/components/hds/alert/index';

// Mapping of HDS Alert colors to Carbon notification kinds
const HDS_COLOR_TO_CDS_KIND_MAP: Record<string, string | null> = {
  neutral: 'info',
  highlight: 'info',
  success: 'success',
  warning: 'warning',
  critical: 'error',
};

const AlertCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Alert - Carbonization"}}

  <ShwTextH1>Alert - Carbonization</ShwTextH1>

  <section>

    <ShwTextH2>Type</ShwTextH2>

    {{#each TYPES as |type|}}
      <ShwTextBody>{{capitalize type}}</ShwTextBody>
      <ShwCarbonizationComparisonGrid @layout="side-by-side">
        <:theming>
          <ShwFlex as |SF|>
            <SF.Item @grow={{true}}>
              <HdsAlert @type={{type}} as |A|>
                <A.Title>Lorem ipsum</A.Title>
                <A.Description>Lorem ipsum dolor sit amet.</A.Description>
              </HdsAlert>
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference as |R|>
          {{#if (eq type "inline")}}
            <ShwFlex as |SF|>
              <SF.Item @grow={{true}}>
                <cds-inline-notification
                  kind="info"
                  title="Lorem ipsum"
                  subtitle="Lorem ipsum dolor sit amet."
                  low-contrast
                />
              </SF.Item>
            </ShwFlex>
          {{else}}
            <R.NoEquivalent @isCompact={{true}} />
          {{/if}}
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwDivider @level={{2}} />

    <ShwTextH2>Color</ShwTextH2>

    {{#each COLORS as |color|}}
      <ShwTextH3>{{capitalize color}}</ShwTextH3>
      {{#each TYPES as |type|}}
        <ShwTextBody>{{capitalize type}}</ShwTextBody>
        <ShwCarbonizationComparisonGrid @layout="side-by-side">
          <:theming>
            <ShwFlex as |SF|>
              <SF.Item @grow={{true}}>
                <HdsAlert @type={{type}} @color={{color}} as |A|>
                  <A.Title>Lorem ipsum dolor</A.Title>
                  <A.Description>This is the
                    <em>{{type}}</em>
                    alert with
                    <em>{{color}}</em>
                    color.</A.Description>
                </HdsAlert>
              </SF.Item>
            </ShwFlex>
          </:theming>
          <:reference as |R|>
            {{#if (and (eq type "inline") (notEq color "neutral"))}}
              <ShwFlex as |SF|>
                <SF.Item @grow={{true}}>
                  <cds-inline-notification
                    kind={{get HDS_COLOR_TO_CDS_KIND_MAP color}}
                    title="Lorem ipsum dolor"
                    subtitle="This is the {{type}} alert with {{color}} color."
                    low-contrast
                  />
                </SF.Item>
              </ShwFlex>
            {{else}}
              <R.NoEquivalent @isCompact={{true}} />
            {{/if}}
          </:reference>
        </ShwCarbonizationComparisonGrid>
      {{/each}}
    {{/each}}

    <ShwDivider @level={{2}} />

    <ShwTextH2>Dismiss</ShwTextH2>

    <ShwCarbonizationComparisonGrid @layout="side-by-side">
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsAlert @type="inline" @color="neutral" as |A|>
              <A.Title>Without the dismiss button (default)</A.Title>
              <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing
                elit.</A.Description>
            </HdsAlert>
          </SF.Item>
          <SF.Item>
            <HdsAlert
              @type="inline"
              @color="neutral"
              @onDismiss={{NOOP}}
              as |A|
            >
              <A.Title>With the dismiss button</A.Title>
              <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing
                elit.</A.Description>
            </HdsAlert>
          </SF.Item>
          <SF.Item>
            <HdsAlert
              @type="inline"
              @color="neutral"
              @icon={{false}}
              @onDismiss={{NOOP}}
              as |A|
            >
              <A.Title>With the dismiss button and no icon</A.Title>
              <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing
                elit.</A.Description>
            </HdsAlert>
          </SF.Item>
          <SF.Item>
            <HdsAlert
              @type="inline"
              @color="neutral"
              @onDismiss={{NOOP}}
              as |A|
            >
              <A.Description>With the dismiss button and no title</A.Description>
            </HdsAlert>
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <cds-inline-notification
              kind="info"
              title="Without the dismiss button (default)"
              subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              low-contrast
              hide-close-button
            />
          </SF.Item>
          <SF.Item>
            <cds-inline-notification
              kind="info"
              title="With the dismiss button"
              subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              low-contrast
            />
          </SF.Item>
          <SF.Item>
            <R.NoEquivalent @isCompact={{true}} />
          </SF.Item>
          <SF.Item>
            <cds-inline-notification
              kind="info"
              subtitle="With the dismiss button and no title"
              low-contrast
            />
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>Actions</ShwTextH2>

    <ShwTextH3>Single action</ShwTextH3>
    <ShwCarbonizationComparisonGrid @layout="side-by-side">
      <:theming>
        <ShwFlex as |SF|>
          <SF.Item @grow={{true}}>
            <HdsAlert @type="inline" @color="warning" as |A|>
              <A.Title>Action passed as yielded component</A.Title>
              <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing
                elit.</A.Description>
              <A.Button @text="Action" @color="secondary" />
            </HdsAlert>
          </SF.Item>
          <SF.Item @grow={{true}}>
            <HdsAlert @type="page" @color="warning" as |A|>
              <A.Title>Action passed as yielded component</A.Title>
              <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing
                elit.</A.Description>
              <A.Button @text="Action" @color="secondary" />
            </HdsAlert>
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference>
        <ShwFlex as |SF|>
          <SF.Item @grow={{true}}>
            <cds-actionable-notification
              kind="warning"
              title="Action passed as yielded component"
              subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              low-contrast
            >
              <cds-actionable-notification-button slot="action">
                Action
              </cds-actionable-notification-button>
            </cds-actionable-notification>
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH3>Multiple actions</ShwTextH3>
    <ShwCarbonizationComparisonGrid @layout="side-by-side">
      <:theming>
        <ShwFlex as |SF|>
          <SF.Item @grow={{true}}>
            <HdsAlert @type="inline" @color="warning" as |A|>
              <A.Title>With multiple actions passed as yielded components</A.Title>
              <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing
                elit.</A.Description>
              <A.Button @text="Secondary" @color="secondary" />
              <A.Button @icon="plus" @text="Tertiary" @color="tertiary" />
              <A.LinkStandalone
                @icon="plus"
                @text="Standalone"
                @href="#"
                @color="secondary"
              />
            </HdsAlert>
          </SF.Item>
          <SF.Item @grow={{true}}>
            <HdsAlert @type="page" @color="warning" as |A|>
              <A.Title>With multiple actions passed as yielded components</A.Title>
              <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing
                elit.</A.Description>
              <A.Button @text="Secondary" @color="secondary" />
              <A.Button @icon="plus" @text="Tertiary" @color="tertiary" />
              <A.LinkStandalone
                @icon="plus"
                @text="Standalone"
                @href="#"
                @color="secondary"
              />
            </HdsAlert>
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>Links and rich content</ShwTextH2>

    <ShwCarbonizationComparisonGrid @layout="side-by-side">
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsAlert @type="inline" @color="success" as |A|>
              <A.Title>An alert with a rich description (HTML)</A.Title>
              <A.Description>Using the
                <code>A.Description</code>
                contextual component it's possible to have content that contains
                HTML tags, like
                <strong>strong text</strong>
                and
                <em>emphasized text</em>
                as well as
                <code>code</code>,
                <pre>pre</pre>
                and
                <a href="#">inline links</a>.</A.Description>
            </HdsAlert>
          </SF.Item>
          <SF.Item>
            <HdsAlert @type="page" @color="success" as |A|>
              <A.Title>HTML link compared to
                <code>HdsLink</code>
                in the description</A.Title>
              <A.Description>
                Description with
                <a href="#">HTML link</a>
                compared with
                <HdsLinkInline @href="#">Primary HdsLinkInline</HdsLinkInline>
                and
                <HdsLinkInline @href="#" @color="secondary">Secondary
                  HdsLinkInline</HdsLinkInline>.
              </A.Description>
            </HdsAlert>
          </SF.Item>
          <SF.Item>
            <HdsAlert @type="compact" @color="success" as |A|>
              <A.Title>An alert with HTML link compared to
                <code>HdsLink</code>
                in Description</A.Title>
              <A.Description>
                Compact alert with
                <a href="#">HTML link</a>
                compared with
                <HdsLinkInline @href="#">Primary HdsLinkInline</HdsLinkInline>
                and
                <HdsLinkInline @href="#" @color="secondary">Secondary
                  HdsLinkInline</HdsLinkInline>.
              </A.Description>
            </HdsAlert>
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent />
      </:reference>
    </ShwCarbonizationComparisonGrid>

  </section>
</template>;

export default AlertCarbonizationIndex;
