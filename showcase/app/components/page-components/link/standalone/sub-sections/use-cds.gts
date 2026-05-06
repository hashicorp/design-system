/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import { HdsLinkStandalone } from '@hashicorp/design-system-components/components';
import { SIZES } from '@hashicorp/design-system-components/components/hds/link/standalone';

const SubSectionUseCds: TemplateOnlyComponent = <template>
  <ShwTextH2>useCds</ShwTextH2>

  <p class="hds-typography-body-200">When
    <code>@useCds</code>
    is true the link renders as a Carbon
    <code>cds-link</code>. The Carbon implementation is only used when no Ember
    routing args (<code>@route</code>,
    <code>@model(s)</code>,
    <code>@query</code>,
    <code>@replace</code>,
    <code>@isRouteExternal</code>,
    <code>@current-when</code>) are present; otherwise the original HDS
    implementation is used so routing keeps working.</p>

  <ShwTextH3>HDS vs Carbon</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="HDS (default)">
      <HdsLinkStandalone
        @text="Lorem ipsum"
        @icon="arrow-right"
        @href="/components/link/standalone"
      />
    </SF.Item>
    <SF.Item @label="useCds=true">
      <HdsLinkStandalone
        @text="Lorem ipsum"
        @icon="arrow-right"
        @href="/components/link/standalone"
        @useCds={{true}}
      />
    </SF.Item>
    <SF.Item @label="useCds=true with @route (falls back to HDS)">
      <HdsLinkStandalone
        @text="Lorem ipsum"
        @icon="arrow-right"
        @route="index"
        @useCds={{true}}
      />
    </SF.Item>
  </ShwFlex>

  <ShwTextH3>useCds across sizes</ShwTextH3>

  <ShwFlex as |SF|>
    {{#each SIZES as |size|}}
      <SF.Item @label={{capitalize size}}>
        <HdsLinkStandalone
          @text="Lorem ipsum"
          @icon="arrow-right"
          @href="/components/link/standalone"
          @size={{size}}
          @useCds={{true}}
        />
      </SF.Item>
    {{/each}}
  </ShwFlex>
</template>;

export default SubSectionUseCds;
