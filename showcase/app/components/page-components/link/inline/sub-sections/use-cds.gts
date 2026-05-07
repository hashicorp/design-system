/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import { HdsLinkInline } from '@hashicorp/design-system-components/components';

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
      <div class="hds-typography-body-300">Lorem
        <HdsLinkInline @href="/components/link/inline">ipsum dolor</HdsLinkInline>
        sit amet
      </div>
    </SF.Item>
    <SF.Item @label="useCds=true">
      <div class="hds-typography-body-300">Lorem
        <HdsLinkInline @href="/components/link/inline" @useCds={{true}}>ipsum
          dolor</HdsLinkInline>
        sit amet
      </div>
    </SF.Item>
    <SF.Item @label="useCds=true with trailing icon">
      <div class="hds-typography-body-300">Lorem
        <HdsLinkInline
          @href="/components/link/inline"
          @icon="external-link"
          @iconPosition="trailing"
          @useCds={{true}}
        >ipsum dolor</HdsLinkInline>
        sit amet
      </div>
    </SF.Item>
    <SF.Item @label="useCds=true with @route (falls back to HDS)">
      <div class="hds-typography-body-300">Lorem
        <HdsLinkInline @route="index" @useCds={{true}}>ipsum dolor</HdsLinkInline>
        sit amet
      </div>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionUseCds;
