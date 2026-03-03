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
} from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'active', 'focus'];

const BreadcrumbCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Breadcrumb - Carbonization"}}

  <ShwTextH1>Breadcrumb - Carbonization</ShwTextH1>

  <section>

    <ShwTextH2>Variants</ShwTextH2>

    {{! Text only variant }}
    <ShwCarbonizationComparisonGrid @label="Text only">
      <:theming>
        <HdsBreadcrumb aria-label="breadcrumb text only example">
          <HdsBreadcrumbItem @text="Level one" />
          <HdsBreadcrumbItem @text="Level two" />
          <HdsBreadcrumbItem @text="Level three" />
          <HdsBreadcrumbItem @text="Level four" />
          <HdsBreadcrumbItem @text="Level five" />
          <HdsBreadcrumbItem @text="Current" @current={{true}} />
        </HdsBreadcrumb>
      </:theming>
      <:reference>
        <cds-breadcrumb>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="javascript:void(0)">Level one</cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="javascript:void(0)">Level two</cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="javascript:void(0)">Level three</cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="javascript:void(0)">Level four</cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="javascript:void(0)">Level five</cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link
              href="javascript:void(0)"
              aria-current="page"
            >Current</cds-breadcrumb-link>
          </cds-breadcrumb-item>
        </cds-breadcrumb>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    {{! With icons variant }}
    <ShwCarbonizationComparisonGrid @label="With icons">
      <:theming>
        <HdsBreadcrumb aria-label="breadcrumb with icons example">
          <HdsBreadcrumbItem @text="Level one" @icon="org" />
          <HdsBreadcrumbItem @text="Level two" @icon="folder" />
          <HdsBreadcrumbItem @text="Level three" />
          <HdsBreadcrumbItem @text="Level four" />
          <HdsBreadcrumbItem @text="Level five" />
          <HdsBreadcrumbItem @text="Current" @current={{true}} />
        </HdsBreadcrumb>
      </:theming>
      <:reference>
        <cds-breadcrumb>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="javascript:void(0)">Level one</cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="javascript:void(0)">Level two</cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="javascript:void(0)">Level three</cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="javascript:void(0)">Level four</cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="javascript:void(0)">Level five</cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link
              href="javascript:void(0)"
              aria-current="page"
            >Current</cds-breadcrumb-link>
          </cds-breadcrumb-item>
        </cds-breadcrumb>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    {{! With truncation variant }}
    <ShwCarbonizationComparisonGrid @label="With truncation">
      <:theming>
        <HdsBreadcrumb aria-label="breadcrumb with truncation example">
          <HdsBreadcrumbItem @text="Level one" />
          <HdsBreadcrumbItem @text="Level two" />
          <HdsBreadcrumbTruncation>
            <HdsBreadcrumbItem @text="Sub-level one" />
            <HdsBreadcrumbItem
              @text="Sub-level two with a very long string that we may want to trim somehow"
            />
            <HdsBreadcrumbItem @text="Sub-level with icon" @icon="org" />
            <HdsBreadcrumbItem
              @text="Another sub-level with icon"
              @icon="folder"
            />
          </HdsBreadcrumbTruncation>
          <HdsBreadcrumbItem @text="Level four" />
          <HdsBreadcrumbItem @text="Current" @current={{true}} />
        </HdsBreadcrumb>
      </:theming>
      <:reference>
        <cds-breadcrumb>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="javascript:void(0)">Level one</cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="javascript:void(0)">Level two</cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link
              href="javascript:void(0)"
            >...</cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link href="javascript:void(0)">Level four</cds-breadcrumb-link>
          </cds-breadcrumb-item>
          <cds-breadcrumb-item>
            <cds-breadcrumb-link
              href="javascript:void(0)"
              aria-current="page"
            >Current</cds-breadcrumb-link>
          </cds-breadcrumb-item>
        </cds-breadcrumb>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>States</ShwTextH2>

    {{#each STATES as |state|}}
      <ShwCarbonizationComparisonGrid @label={{capitalize state}}>
        <:theming>
          <HdsBreadcrumb aria-label="breadcrumb in {{state}} state example">
            <HdsBreadcrumbItem
              @text="Level one"
              @icon="org"
              mock-state-value={{unless (eq state "default") state}}
              mock-state-selector="a,button"
            />
            <HdsBreadcrumbItem
              @text="Level two"
              @icon="folder"
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
              <HdsBreadcrumbItem @text="Sub-level with icon" @icon="org" />
              <HdsBreadcrumbItem
                @text="Another sub-level with icon"
                @icon="folder"
              />
            </HdsBreadcrumbTruncation>
            <HdsBreadcrumbItem
              @text="Level four"
              mock-state-value={{unless (eq state "default") state}}
              mock-state-selector="a,button"
            />
            <HdsBreadcrumbItem
              @route="index"
              @text="Level five"
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
