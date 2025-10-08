/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';
import { array } from '@ember/helper';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwTextBody from 'showcase/components/shw/text/body';

import {
  HdsAppHeaderHomeLink,
  HdsDropdown,
  HdsButton,
  HdsButtonSet,
  HdsDropdownToggleButton,
  HdsDropdownToggleIcon,
} from '@hashicorp/design-system-components/components';
import { COLORS as TOGGLE_BUTTON_COLORS } from '@hashicorp/design-system-components/components/hds/dropdown/toggle/button';

const STATES = ['default', 'hover', 'active', 'focus', 'disabled'];

const SubSectionBaseElements: TemplateOnlyComponent = <template>
  <ShwTextH2>Base elements</ShwTextH2>

  <ShwTextH3>AppHeaderHomeLink</ShwTextH3>

  <ShwTextH4>Content</ShwTextH4>

  <ShwFlex as |SF|>
    <SF.Item @label="Icon">
      <div class="hds-app-header">
        <HdsAppHeaderHomeLink @icon="hashicorp" @text="HashiCorp" @href="#" />
      </div>
    </SF.Item>

    <SF.Item @label="Custom color">
      <div class="hds-app-header">
        <HdsAppHeaderHomeLink
          @icon="boundary"
          @text="Boundary"
          @color="var(--token-color-boundary-brand)"
          @href="#"
        />
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwTextH4>With text</ShwTextH4>

  <ShwFlex as |SF|>
    <SF.Item>
      <div class="hds-app-header">
        <HdsAppHeaderHomeLink
          @icon="hashicorp"
          @text="HashiCorp"
          @isIconOnly={{false}}
          @href="#"
        />
      </div>
    </SF.Item>

    <SF.Item>
      <div class="hds-app-header">
        <HdsAppHeaderHomeLink
          @icon="terraform"
          @text="Terraform"
          @href="#"
          @isIconOnly={{false}}
        />
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwTextH4>States</ShwTextH4>

  <ShwFlex as |SF|>
    {{#let (array "default" "hover" "active" "focus") as |states|}}
      {{#each states as |state|}}
        <SF.Item @label={{state}}>
          <div class="hds-app-header">
            <HdsAppHeaderHomeLink
              @icon="hashicorp"
              @text="HashiCorp"
              @href="#"
              mock-state-value={{state}}
            />
          </div>
        </SF.Item>
      {{/each}}
    {{/let}}
  </ShwFlex>

  <ShwFlex as |SF|>
    {{#let (array "default" "hover" "active" "focus") as |states|}}
      {{#each states as |state|}}
        <SF.Item>
          <div class="hds-app-header">
            <HdsAppHeaderHomeLink
              @icon="boundary"
              @text="Boundary"
              @color="var(--token-color-boundary-brand)"
              @href="#"
              mock-state-value={{state}}
            />
          </div>
        </SF.Item>
      {{/each}}
    {{/let}}
  </ShwFlex>

  <ShwFlex as |SF|>
    {{#let (array "default" "hover" "active" "focus") as |states|}}
      {{#each states as |state|}}
        <SF.Item @label={{state}}>
          <div class="hds-app-header">
            <HdsAppHeaderHomeLink
              @icon="terraform"
              @text="Terraform Admin Console"
              @isIconOnly={{false}}
              @href="#"
              mock-state-value={{state}}
            />
          </div>
        </SF.Item>
      {{/each}}
    {{/let}}
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Buttons within AppHeader</ShwTextH3>

  <ShwTextH4>States</ShwTextH4>

  {{#let (array "Primary" "Secondary") as |colors|}}
    {{#each colors as |color|}}
      <ShwTextBody>{{color}}</ShwTextBody>
      <ShwFlex as |SF|>
        {{#let
          (array "default" "hover" "active" "focus" "disabled")
          as |states|
        }}
          {{#each states as |state|}}
            <SF.Item @label={{state}}>
              <div class="hds-app-header">
                <HdsButton
                  @icon="search"
                  @isIconOnly={{true}}
                  @text="Search"
                  mock-state-value={{state}}
                />
              </div>
            </SF.Item>
          {{/each}}
        {{/let}}
      </ShwFlex>
    {{/each}}
  {{/let}}

  <ShwDivider @level={{2}} />

  <ShwTextH3>Dropdowns within AppHeader</ShwTextH3>

  <ShwTextH4>States</ShwTextH4>

  <ShwGrid @columns={{6}} class="shw-component-dropdown-states-matrix" as |SF|>
    {{! Notice: we use a non-standard way to showcase the states to reduce the (visual) complexity of this matrix }}
    {{#each STATES as |state|}}
      <SF.Item>
        <span class="shw-label">{{capitalize state}}</span>
      </SF.Item>
    {{/each}}
    <SF.Item>
      <span class="shw-label">Open</span>
    </SF.Item>

    {{#each TOGGLE_BUTTON_COLORS as |color|}}
      {{#each STATES as |state|}}
        <SF.Item @label="{{capitalize color}}">
          {{#if (eq state "disabled")}}
            <div class="hds-app-header">
              <HdsDropdownToggleButton
                @text="Lorem ipsum"
                @color={{color}}
                disabled
              />
            </div>
          {{else}}
            <div class="hds-app-header">
              <HdsDropdownToggleButton
                @text="Lorem ipsum"
                @color={{color}}
                mock-state-value={{state}}
              />
            </div>
          {{/if}}
        </SF.Item>
      {{/each}}

      <SF.Item @label="{{capitalize color}}">
        <div class="hds-app-header">
          <HdsDropdownToggleButton
            @text="Lorem ipsum"
            @isOpen={{true}}
            @color={{color}}
          />
        </div>
      </SF.Item>

      {{#each STATES as |state|}}
        <SF.Item @label="With icon">
          {{#if (eq state "disabled")}}
            <div class="hds-app-header">
              <HdsDropdownToggleButton
                @icon="hexagon"
                @text="Lorem"
                @color={{color}}
                disabled
              />
            </div>
          {{else}}
            <div class="hds-app-header">
              <HdsDropdownToggleButton
                @icon="hexagon"
                @text="Lorem"
                @color={{color}}
                mock-state-value={{state}}
              />
            </div>
          {{/if}}
        </SF.Item>
      {{/each}}

      <SF.Item @label="With icon">
        <div class="hds-app-header">
          <HdsDropdownToggleButton
            @icon="hexagon"
            @text="Lorem"
            @isOpen={{true}}
            @color={{color}}
          />
        </div>
      </SF.Item>

      {{#each STATES as |state|}}
        <SF.Item @label="With count">
          {{#if (eq state "disabled")}}
            <div class="hds-app-header">
              <HdsDropdownToggleButton
                @count="12"
                @text="Lorem"
                @color={{color}}
                disabled
              />
            </div>
          {{else}}
            <div class="hds-app-header">
              <HdsDropdownToggleButton
                @count="12"
                @text="Lorem"
                @color={{color}}
                mock-state-value={{state}}
              />
            </div>
          {{/if}}
        </SF.Item>
      {{/each}}

      <SF.Item @label="With count">
        <div class="hds-app-header">
          <HdsDropdownToggleButton
            @count="12"
            @text="Lorem"
            @isOpen={{true}}
            @color={{color}}
          />
        </div>
      </SF.Item>

      {{#each STATES as |state|}}
        <SF.Item @label="With badge">
          {{#if (eq state "disabled")}}
            <div class="hds-app-header">
              <HdsDropdownToggleButton
                @badge="Sit"
                @badgeIcon="hexagon"
                @text="Lorem"
                @color={{color}}
                disabled
              />
            </div>
          {{else}}
            <div class="hds-app-header">
              <HdsDropdownToggleButton
                @badge="Sit"
                @badgeIcon="hexagon"
                @text="Lorem"
                @color={{color}}
                mock-state-value={{state}}
              />
            </div>
          {{/if}}
        </SF.Item>
      {{/each}}

      <SF.Item @label="With badge">
        <div class="hds-app-header">
          <HdsDropdownToggleButton
            @badge="Sit"
            @badgeIcon="hexagon"
            @text="Lorem"
            @isOpen={{true}}
            @color={{color}}
          />
        </div>
      </SF.Item>
    {{/each}}

    {{#each STATES as |state|}}
      <SF.Item @label="Icon">
        <div class="hds-app-header">
          <HdsDropdownToggleIcon
            @icon="more-horizontal"
            @text="overflow menu"
            @hasChevron={{false}}
            mock-state-value={{state}}
          />
        </div>
      </SF.Item>
    {{/each}}
    <SF.Item @label="Icon">
      <div class="hds-app-header">
        <HdsDropdownToggleIcon
          @icon="more-horizontal"
          @text="overflow menu"
          @hasChevron={{false}}
          @isOpen={{true}}
        />
      </div>
    </SF.Item>

    {{#each STATES as |state|}}
      <SF.Item @label="Icon+chevron">
        <div class="hds-app-header">
          <HdsDropdownToggleIcon
            @icon="user"
            @text={{state}}
            mock-state-value={{state}}
          />
        </div>
      </SF.Item>
    {{/each}}

    <SF.Item @label="Icon+chevron">
      <div class="hds-app-header">
        <HdsDropdownToggleIcon @icon="user" @text="open" @isOpen={{true}} />
      </div>
    </SF.Item>

    {{#each STATES as |state|}}
      <SF.Item @label="Avatar+chevron">
        <div class="hds-app-header">
          <HdsDropdownToggleIcon
            @text={{state}}
            @imageSrc="/assets/images/avatar.png"
            mock-state-value={{state}}
          />
        </div>
      </SF.Item>
    {{/each}}

    <SF.Item @label="Avatar+chevron">
      <div class="hds-app-header">
        <HdsDropdownToggleIcon
          @text="open"
          @isOpen={{true}}
          @imageSrc="/assets/images/avatar.png"
        />
      </div>
    </SF.Item>

    <SF.Item @label="With nested content" {{style padding-bottom="11em"}}>
      <div class="hds-app-header">
        <HdsDropdown
          @height="284px"
          @listPosition="bottom-left"
          @isOpen={{true}}
          as |D|
        >
          <D.ToggleIcon @icon="help" @text="help menu" />
          <D.Generic>
            <HdsDropdown as |D|>
              <D.ToggleButton @text="Menu" />
              <D.Interactive @href="#">Add</D.Interactive>
              <D.Interactive @href="#">Add More</D.Interactive>
              <D.Interactive @href="#">Add Another Thing Too</D.Interactive>
            </HdsDropdown>
          </D.Generic>
          <D.Checkbox>access</D.Checkbox>
          <D.Checkbox>homework</D.Checkbox>
          <D.Footer @hasDivider={{true}}>
            <HdsButtonSet>
              <HdsButton
                @text="Apply filters"
                @isFullWidth={{true}}
                @size="small"
              />
              <HdsButton @text="Cancel" @color="secondary" @size="small" />
              <HdsDropdown as |D|>
                <D.ToggleButton @text="Menu" />
                <D.Interactive @href="#">Add</D.Interactive>
                <D.Interactive @href="#">Add More</D.Interactive>
                <D.Interactive @href="#">Add Another Thing Too</D.Interactive>
              </HdsDropdown>
            </HdsButtonSet>
          </D.Footer>
        </HdsDropdown>
      </div>
    </SF.Item>
  </ShwGrid>
</template>;

export default SubSectionBaseElements;
