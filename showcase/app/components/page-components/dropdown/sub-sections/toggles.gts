/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwOutliner from 'showcase/components/shw/outliner';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import {
  HdsDropdownToggleButton,
  HdsDropdownToggleIcon,
} from '@hashicorp/design-system-components/components';
import {
  COLORS,
  SIZES,
} from '@hashicorp/design-system-components/components/hds/dropdown/toggle/button';

// these are used only for presentation purpose in the showcase
const STATES = ['default', 'hover', 'active', 'focus', 'disabled'];

const SubSectionToggles: TemplateOnlyComponent = <template>
  <ShwTextH2>Toggles</ShwTextH2>

  {{#each COLORS as |color|}}
    <ShwFlex as |SF|>
      {{#each SIZES as |size|}}
        <SF.Item @label="{{capitalize color}} {{size}}">
          <HdsDropdownToggleButton
            @color={{color}}
            @text="Lorem ipsum"
            @size={{size}}
          />
        </SF.Item>
      {{/each}}
      <SF.Item @label="{{capitalize color}} full width">
        <ShwOutliner {{style width="300px"}}>
          <HdsDropdownToggleButton
            @isFullWidth={{true}}
            @text="Lorem ipsum"
            @color={{color}}
          />
        </ShwOutliner>
      </SF.Item>
    </ShwFlex>
  {{/each}}

  <ShwTextH3>With icon</ShwTextH3>

  {{#each COLORS as |color|}}
    <ShwFlex as |SF|>
      {{#each SIZES as |size|}}
        <SF.Item @label="{{capitalize color}} {{size}}">
          <HdsDropdownToggleButton
            @icon="hexagon"
            @color={{color}}
            @text="Lorem ipsum"
            @size={{size}}
          />
        </SF.Item>
      {{/each}}
      <SF.Item @label="{{capitalize color}} full width">
        <ShwOutliner {{style width="300px"}}>
          <HdsDropdownToggleButton
            @icon="hexagon"
            @isFullWidth={{true}}
            @text="Lorem ipsum"
            @color={{color}}
          />
        </ShwOutliner>
      </SF.Item>
    </ShwFlex>
  {{/each}}

  <ShwTextH3>With count</ShwTextH3>

  {{#each COLORS as |color|}}
    <ShwFlex as |SF|>
      {{#each SIZES as |size|}}
        <SF.Item @label="{{capitalize color}} {{size}}">
          <HdsDropdownToggleButton
            @color={{color}}
            @text="Lorem ipsum"
            @size={{size}}
            @count="12"
          />
        </SF.Item>
      {{/each}}
      <SF.Item @label="{{capitalize color}} full width">
        <ShwOutliner {{style width="300px"}}>
          <HdsDropdownToggleButton
            @isFullWidth={{true}}
            @text="Lorem ipsum"
            @color={{color}}
            @count="12"
          />
        </ShwOutliner>
      </SF.Item>
    </ShwFlex>
  {{/each}}

  <ShwTextH3>With badge</ShwTextH3>

  {{#each COLORS as |color|}}
    <ShwFlex as |SF|>
      {{#each SIZES as |size|}}
        <SF.Item @label="{{capitalize color}} {{size}}">
          <HdsDropdownToggleButton
            @color={{color}}
            @text="Lorem ipsum"
            @size={{size}}
            @badge="Badge"
            @badgeIcon="hexagon"
          />
        </SF.Item>
      {{/each}}
      <SF.Item @label="{{capitalize color}} full width">
        <ShwOutliner {{style width="300px"}}>
          <HdsDropdownToggleButton
            @isFullWidth={{true}}
            @text="Lorem ipsum"
            @color={{color}}
            @badge="Badge"
            @badgeIcon="hexagon"
          />
        </ShwOutliner>
      </SF.Item>
    </ShwFlex>
  {{/each}}

  <ShwDivider @level={{2}} />

  <ShwTextH3>Icon</ShwTextH3>

  <ShwFlex as |SF|>
    {{#each SIZES as |size|}}
      <SF.Item @label="With icon + chevron, {{size}}">
        <HdsDropdownToggleIcon @icon="user" @text="user menu" @size={{size}} />
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwFlex as |SF|>
    {{#each SIZES as |size|}}
      <SF.Item @label="With image (avatar), {{size}}">
        <HdsDropdownToggleIcon
          @imageSrc="/assets/images/avatar.png"
          @text="user menu"
          @size={{size}}
        />
      </SF.Item>
    {{/each}}
    <SF.Item @label="With broken image (fallback to icon)">
      <HdsDropdownToggleIcon
        @imageSrc="/assets/images/avatar-broken.png"
        @text="user menu"
      />
    </SF.Item>
  </ShwFlex>

  <ShwFlex as |SF|>
    {{#each SIZES as |size|}}
      <SF.Item @label="Icon only, {{size}}">
        <HdsDropdownToggleIcon
          @icon="more-horizontal"
          @hasChevron={{false}}
          @text="overflow menu"
          @size={{size}}
        />
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>States</ShwTextH3>

  <ShwGrid @columns={{6}} class="shw-component-dropdown-states-matrix" as |SG|>

    {{! Notice: we use a non-standard way to showcase the states to reduce the (visual) complexity of this matrix }}

    {{#each STATES as |state|}}
      <SG.Item>
        <span class="shw-label">{{capitalize state}}</span>
      </SG.Item>
    {{/each}}
    <SG.Item>
      <span class="shw-label">Open</span>
    </SG.Item>

    {{#each COLORS as |color|}}
      {{#each STATES as |state|}}
        <SG.Item @label="{{capitalize color}}">
          {{#if (eq state "disabled")}}
            <HdsDropdownToggleButton
              @text="Lorem ipsum"
              @color={{color}}
              disabled
            />
          {{else}}
            <HdsDropdownToggleButton
              @text="Lorem ipsum"
              @color={{color}}
              mock-state-value={{state}}
            />
          {{/if}}
        </SG.Item>
      {{/each}}
      <SG.Item @label="{{capitalize color}}">
        <HdsDropdownToggleButton
          @text="Lorem ipsum"
          @isOpen={{true}}
          @color={{color}}
        />
      </SG.Item>
      {{#each STATES as |state|}}
        <SG.Item @label="With icon">
          {{#if (eq state "disabled")}}
            <HdsDropdownToggleButton
              @icon="hexagon"
              @text="Lorem"
              @color={{color}}
              disabled
            />
          {{else}}
            <HdsDropdownToggleButton
              @icon="hexagon"
              @text="Lorem"
              @color={{color}}
              mock-state-value={{state}}
            />
          {{/if}}
        </SG.Item>
      {{/each}}
      <SG.Item @label="With icon">
        <HdsDropdownToggleButton
          @icon="hexagon"
          @text="Lorem"
          @isOpen={{true}}
          @color={{color}}
        />
      </SG.Item>
      {{#each STATES as |state|}}
        <SG.Item @label="With count">
          {{#if (eq state "disabled")}}
            <HdsDropdownToggleButton
              @count="12"
              @text="Lorem"
              @color={{color}}
              disabled
            />
          {{else}}
            <HdsDropdownToggleButton
              @count="12"
              @text="Lorem"
              @color={{color}}
              mock-state-value={{state}}
            />
          {{/if}}
        </SG.Item>
      {{/each}}
      <SG.Item @label="With count">
        <HdsDropdownToggleButton
          @count="12"
          @text="Lorem"
          @isOpen={{true}}
          @color={{color}}
        />
      </SG.Item>
      {{#each STATES as |state|}}
        <SG.Item @label="With badge">
          {{#if (eq state "disabled")}}
            <HdsDropdownToggleButton
              @badge="Sit"
              @badgeIcon="hexagon"
              @text="Lorem"
              @color={{color}}
              disabled
            />
          {{else}}
            <HdsDropdownToggleButton
              @badge="Sit"
              @badgeIcon="hexagon"
              @text="Lorem"
              @color={{color}}
              mock-state-value={{state}}
            />
          {{/if}}
        </SG.Item>
      {{/each}}
      <SG.Item @label="With badge">
        <HdsDropdownToggleButton
          @badge="Sit"
          @badgeIcon="hexagon"
          @text="Lorem"
          @isOpen={{true}}
          @color={{color}}
        />
      </SG.Item>
    {{/each}}

    {{#each STATES as |state|}}
      <SG.Item @label="Icon">
        <HdsDropdownToggleIcon
          @icon="more-horizontal"
          @text="overflow menu"
          @hasChevron={{false}}
          mock-state-value={{state}}
        />
      </SG.Item>
    {{/each}}
    <SG.Item @label="Icon">
      <HdsDropdownToggleIcon
        @icon="more-horizontal"
        @text="overflow menu"
        @hasChevron={{false}}
        @isOpen={{true}}
      />
    </SG.Item>

    {{#each STATES as |state|}}
      <SG.Item @label="Icon+chevron">
        <HdsDropdownToggleIcon
          @icon="user"
          @text={{state}}
          mock-state-value={{state}}
        />
      </SG.Item>
    {{/each}}
    <SG.Item @label="Icon+chevron">
      <HdsDropdownToggleIcon @icon="user" @text="open" @isOpen={{true}} />
    </SG.Item>

    {{#each STATES as |state|}}
      <SG.Item @label="Avatar+chevron">
        <HdsDropdownToggleIcon
          @text={{state}}
          @imageSrc="/assets/images/avatar.png"
          mock-state-value={{state}}
        />
      </SG.Item>
    {{/each}}
    <SG.Item @label="Avatar+chevron">
      <HdsDropdownToggleIcon
        @text="open"
        @isOpen={{true}}
        @imageSrc="/assets/images/avatar.png"
      />
    </SG.Item>
  </ShwGrid>

  <ShwDivider />
</template>;

export default SubSectionToggles;
