/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { capitalize } from '@ember/string';
import { get } from '@ember/helper';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';
import NOOP from 'showcase/utils/noop';

import {
  HdsToast,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';
import { COLORS } from '@hashicorp/design-system-components/components/hds/alert/index';

// Mapping of HDS Toast colors to Carbon notification kinds
const HDS_COLOR_TO_CDS_KIND_MAP: Record<string, string | null> = {
  neutral: 'info',
  highlight: 'info',
  success: 'success',
  warning: 'warning',
  critical: 'error',
};

const ToastCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Toast - Carbonization"}}

  <ShwTextH1>Toast - Carbonization</ShwTextH1>

  <section>

    <ShwTextH2>Color</ShwTextH2>

    {{#each COLORS as |color|}}
      <ShwTextH3>{{capitalize color}}</ShwTextH3>
      <ShwCarbonizationComparisonGrid @layout="side-by-side">
        <:theming>
          <ShwFlex as |SF|>
            <SF.Item @grow={{true}}>
              <HdsToast @color={{color}} @onDismiss={{NOOP}} as |T|>
                <T.Title>Lorem ipsum dolor</T.Title>
                <T.Description>This is the toast with
                  <em>{{color}}</em>
                  color.</T.Description>
              </HdsToast>
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference>
          <ShwFlex as |SF|>
            <SF.Item @grow={{true}}>
              <cds-inline-notification
                kind={{get HDS_COLOR_TO_CDS_KIND_MAP color}}
                title="Lorem ipsum dolor"
                subtitle="This is the toast with {{color}} color."
                low-contrast
              />
            </SF.Item>
          </ShwFlex>
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwDivider @level={{2}} />

    <ShwTextH2>Actions</ShwTextH2>

    <ShwTextH3>Single action</ShwTextH3>
    <ShwCarbonizationComparisonGrid @layout="side-by-side">
      <:theming>
        <ShwFlex as |SF|>
          <SF.Item @grow={{true}}>
            <HdsToast @color="warning" @onDismiss={{NOOP}} as |T|>
              <T.Title>Action passed as yielded component</T.Title>
              <T.Description>Lorem ipsum dolor sit amet, consectetur adipiscing
                elit.</T.Description>
              <T.Button @text="Action" @color="secondary" />
            </HdsToast>
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
            <HdsToast @color="warning" @onDismiss={{NOOP}} as |T|>
              <T.Title>With multiple actions passed as yielded components</T.Title>
              <T.Description>Lorem ipsum dolor sit amet, consectetur adipiscing
                elit.</T.Description>
              <T.Button @text="Secondary" @color="secondary" />
              <T.Button @icon="plus" @text="Tertiary" @color="tertiary" />
              <T.LinkStandalone
                @icon="plus"
                @text="Standalone"
                @href="#"
                @color="secondary"
              />
            </HdsToast>
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
            <HdsToast @color="success" @onDismiss={{NOOP}} as |T|>
              <T.Title>A toast with a rich description (HTML)</T.Title>
              <T.Description>Using the
                <code>T.Description</code>
                contextual component it's possible to have content that contains
                HTML tags, like
                <strong>strong text</strong>
                and
                <em>emphasized text</em>
                as well as
                <code>code</code>,
                <pre>pre</pre>
                and
                <a href="#">inline links</a>.</T.Description>
            </HdsToast>
          </SF.Item>
          <SF.Item>
            <HdsToast @color="success" @onDismiss={{NOOP}} as |T|>
              <T.Title>A toast comparing different types of links in the
                description</T.Title>
              <T.Description>
                Description with
                <a href="#">HTML link</a>
                compared with
                <HdsLinkInline @href="#">Primary HdsLinkInline</HdsLinkInline>
                and
                <HdsLinkInline @href="#" @color="secondary">Secondary
                  HdsLinkInline</HdsLinkInline>.
              </T.Description>
            </HdsToast>
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent />
      </:reference>
    </ShwCarbonizationComparisonGrid>

  </section>
</template>;

export default ToastCarbonizationIndex;
