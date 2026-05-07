/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import { HdsButton } from '@hashicorp/design-system-components/components';
import {
  COLORS,
  SIZES,
} from '@hashicorp/design-system-components/components/hds/button/index';

const SubSectionUseCds: TemplateOnlyComponent = <template>
  <ShwTextH2>useCds</ShwTextH2>

  <p class="hds-typography-body-200">When
    <code>@useCds</code>
    is true the button renders as a Carbon
    <code>cds-button</code>. The Carbon implementation is only used when no
    Ember routing args (<code>@route</code>,
    <code>@model(s)</code>,
    <code>@query</code>,
    <code>@replace</code>,
    <code>@isRouteExternal</code>,
    <code>@current-when</code>) are present; otherwise the original HDS
    implementation is used so routing keeps working.</p>

  <ShwTextH3>HDS vs Carbon (default)</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="HDS (default)">
      <HdsButton @text="Lorem ipsum" @href="#" />
    </SF.Item>
    <SF.Item @label="useCds=true">
      <HdsButton @text="Lorem ipsum" @href="#" @useCds={{true}} />
    </SF.Item>
    <SF.Item @label="useCds=true (with @route — falls back to HDS)">
      <HdsButton @text="Lorem ipsum" @route="index" @useCds={{true}} />
    </SF.Item>
  </ShwFlex>

  <ShwTextH3>useCds across sizes</ShwTextH3>

  <ShwFlex as |SF|>
    {{#each SIZES as |size|}}
      <SF.Item @label={{capitalize size}}>
        <HdsButton
          @text="Lorem ipsum"
          @href="#"
          @size={{size}}
          @useCds={{true}}
        />
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwTextH3>useCds across colors</ShwTextH3>

  <ShwFlex as |SF|>
    {{#each COLORS as |color|}}
      <SF.Item @label={{capitalize color}}>
        <HdsButton
          @text="Lorem ipsum"
          @href="#"
          @icon={{if (eq color "tertiary") "plus"}}
          @color={{color}}
          @useCds={{true}}
        />
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwTextH3>useCds with leading icon</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="HDS">
      <HdsButton @text="Lorem ipsum" @icon="plus" @href="#" />
    </SF.Item>
    <SF.Item @label="useCds (icon shown via slot)">
      <HdsButton @text="Lorem ipsum" @icon="plus" @href="#" @useCds={{true}} />
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionUseCds;
