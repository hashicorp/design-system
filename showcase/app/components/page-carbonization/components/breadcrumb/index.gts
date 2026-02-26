/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import {
  HdsBreadcrumb,
  HdsBreadcrumbItem,
  HdsBreadcrumbTruncation,
  HdsIcon,
} from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'active', 'focus'];

const BreadcrumbCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Breadcrumb - Carbonization"}}

  <ShwTextH1>Breadcrumb - Carbonization</ShwTextH1>

  <section>

    <ShwTextH2>Variants</ShwTextH2>

    <ShwCarbonizationComparisonGrid @label="Text only" @sideBySide={{true}}>
      <:theming>
        <HdsBreadcrumb aria-label="breadcrumb text only example">
          <HdsBreadcrumbItem @text="Level one" />
          <HdsBreadcrumbItem @text="Level two" />
          <HdsBreadcrumbItem @text="Level three" />
          <HdsBreadcrumbItem @text="Current" @current={{true}} />
        </HdsBreadcrumb>
      </:theming>
      <:reference>
        <cds-breadcrumb>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="#">Level one</cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="#">Level two</cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="#">Level three</cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link
              href="#"
              aria-current="page"
            >Current</cds-breadcrumb-link>
          </cds-breadcrumb-item>
        </cds-breadcrumb>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="With icons" @sideBySide={{true}}>
      <:theming>
        <HdsBreadcrumb aria-label="breadcrumb with icons example">
          <HdsBreadcrumbItem @text="Level one" @icon="org" />
          <HdsBreadcrumbItem @text="Level two" @icon="folder" />
          <HdsBreadcrumbItem @text="Level three" />
          <HdsBreadcrumbItem @text="Current" @current={{true}} />
        </HdsBreadcrumb>
      </:theming>
      <:reference>
        <cds-breadcrumb>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="#">
              <HdsIcon @name="org" slot="icon" />
              Level one
            </cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="#">
              <HdsIcon @name="folder" slot="icon" />
              Level two
            </cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="#">Level three</cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link is-currentpage>Current</cds-breadcrumb-link>
          </cds-breadcrumb-item>
        </cds-breadcrumb>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid
      @label="With truncation"
      @sideBySide={{true}}
    >
      <:theming>
        <HdsBreadcrumb aria-label="breadcrumb with truncation example">
          <HdsBreadcrumbItem @text="Level one" @icon="org" />
          <HdsBreadcrumbItem @text="Level two" @icon="folder" />
          <HdsBreadcrumbTruncation>
            <HdsBreadcrumbItem @text="Sub-level one" />
            <HdsBreadcrumbItem
              @text="Sub-level two with a very long string that we may want to trim somehow"
            />
          </HdsBreadcrumbTruncation>
          <HdsBreadcrumbItem @text="Level three" />
          <HdsBreadcrumbItem @text="Current" @current={{true}} />
        </HdsBreadcrumb>
      </:theming>
      <:reference>
        <cds-breadcrumb>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="#">
              <HdsIcon @name="org" slot="icon" />
              Level one
            </cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="#">
              <HdsIcon @name="folder" slot="icon" />
              Level two
            </cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-overflow-menu breadcrumb="" align="bottom">
              <svg
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="cds--overflow-menu__icon"
                slot="icon"
                width="16"
                height="16"
                viewBox="0 0 32 32"
                aria-hidden="true"
              ><circle cx="8" cy="16" r="2"></circle><circle
                  cx="16"
                  cy="16"
                  r="2"
                ></circle><circle cx="24" cy="16" r="2"></circle></svg>
              <span slot="tooltip-content"> Options </span>
              <cds-overflow-menu-body>
                <cds-overflow-menu-item>Sub-level one</cds-overflow-menu-item>
                <cds-overflow-menu-item>Sub-level two with a very long string
                  that we may want to trim somehow</cds-overflow-menu-item>
              </cds-overflow-menu-body>
            </cds-overflow-menu>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="#">Level three</cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link is-currentpage>Current</cds-breadcrumb-link>
          </cds-breadcrumb-item>
        </cds-breadcrumb>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid
      @label="With long strings / Items can wrap"
      @sideBySide={{true}}
    >
      <:theming>
        <HdsBreadcrumb aria-label="breadcrumb with icons example">
          <HdsBreadcrumbItem @text="Level one long string" />
          <HdsBreadcrumbItem @text="Level two long string" />
          <HdsBreadcrumbItem @text="Level three long string" />
          <HdsBreadcrumbItem @text="Current long string" @current={{true}} />
        </HdsBreadcrumb>
      </:theming>
      <:reference>
        <cds-breadcrumb>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="#">Level one long string</cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="#">Level two long string</cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="#">Level three long string</cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link is-currentpage>Current long string</cds-breadcrumb-link>
          </cds-breadcrumb-item>
        </cds-breadcrumb>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>States</ShwTextH2>

    {{#each STATES as |state|}}
      <ShwCarbonizationComparisonGrid
        @label={{capitalize state}}
        @sideBySide={{true}}
      >
        <:theming>
          <HdsBreadcrumb aria-label="breadcrumb in {{state}} state example">
            <HdsBreadcrumbItem
              @text="Level one"
              mock-state-value={{unless (eq state "default") state}}
              mock-state-selector="a,button"
            />
            <HdsBreadcrumbItem
              @text="Level two"
              mock-state-value={{unless (eq state "default") state}}
              mock-state-selector="a,button"
            />
            <HdsBreadcrumbTruncation
              mock-state-value={{unless (eq state "default") state}}
              mock-state-selector="button"
            >
              <HdsBreadcrumbItem @text="Sub-level one" />
              <HdsBreadcrumbItem
                @text="Sub-level two with a very long string that we may want to trim somehow"
              />
              <HdsBreadcrumbItem @text="Sub-level with icon" />
              <HdsBreadcrumbItem @text="Another sub-level with icon" />
            </HdsBreadcrumbTruncation>
            <HdsBreadcrumbItem
              @text="Level three"
              mock-state-value={{unless (eq state "default") state}}
              mock-state-selector="a,button"
            />
            <HdsBreadcrumbItem
              @text="Current"
              @current={{true}}
              mock-state-value={{unless (eq state "default") state}}
              mock-state-selector="a,button"
            />
          </HdsBreadcrumb>
        </:theming>
        <:reference>
          <pre>TODO: add static image here</pre>
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

  </section>
</template>;

export default BreadcrumbCarbonizationIndex;
