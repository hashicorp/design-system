/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';
import { array } from '@ember/helper';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import {
  HdsButton,
  HdsButtonSet,
  HdsDropdownFooter,
  HdsDropdownHeader,
  HdsDropdownListItemGeneric,
  HdsDropdownListItemInteractive,
  HdsFormTextInputBase,
  HdsLinkStandalone,
} from '@hashicorp/design-system-components/components';

const SubSectionHeaderAndFooter: TemplateOnlyComponent = <template>
  <ShwTextH2>Header and footer</ShwTextH2>

  <ShwTextH3>Header</ShwTextH3>

  <ShwFlex as |SF|>
    {{#let (array false true) as |hasDividerOptions|}}
      {{#each hasDividerOptions as |hasDivider|}}
        <SF.Item @label="Generic header {{if hasDivider 'with divider'}}">
          <div class="hds-dropdown__content">
            <HdsDropdownHeader @hasDivider={{hasDivider}}>
              <ShwPlaceholder
                @text="generic header content"
                @width="200"
                @height="36"
                @background="#e1f5fe"
              />
            </HdsDropdownHeader>
            <ul class="hds-dropdown__list">
              <HdsDropdownListItemGeneric>
                <ShwPlaceholder
                  @text="generic item content"
                  @height="36"
                  @background="#e1f5fe"
                />
              </HdsDropdownListItemGeneric>
              <HdsDropdownListItemGeneric>
                <ShwPlaceholder
                  @text="generic item content"
                  @height="36"
                  @background="#e1f5fe"
                />
              </HdsDropdownListItemGeneric>
              <HdsDropdownListItemGeneric>
                <ShwPlaceholder
                  @text="generic item content"
                  @height="36"
                  @background="#e1f5fe"
                />
              </HdsDropdownListItemGeneric>
            </ul>
          </div>
        </SF.Item>
      {{/each}}
    {{/let}}
    <SF.Item @label="Input type search">
      <div class="hds-dropdown__content">
        <HdsDropdownHeader @hasDivider={{true}}>
          <HdsFormTextInputBase @type="search" placeholder="Narrow results" />
        </HdsDropdownHeader>
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemInteractive
            @route="page-components"
          >Create</HdsDropdownListItemInteractive>
          <HdsDropdownListItemInteractive
            @route="page-components"
          >Edit</HdsDropdownListItemInteractive>
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Link secondary">
      <div class="hds-dropdown__content">
        <HdsDropdownHeader @hasDivider={{true}}>
          <HdsLinkStandalone
            @icon="list"
            @text="Organizations"
            @color="secondary"
            @href="#"
          />
        </HdsDropdownHeader>
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemInteractive
            @route="page-components"
          >Create</HdsDropdownListItemInteractive>
          <HdsDropdownListItemInteractive
            @route="page-components"
          >Edit</HdsDropdownListItemInteractive>
        </ul>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Footer</ShwTextH3>

  <ShwFlex as |SF|>
    {{#let (array false true) as |hasDividerOptions|}}
      {{#each hasDividerOptions as |hasDivider|}}
        <SF.Item @label="Generic footer  {{if hasDivider 'with divider'}}">
          <div class="hds-dropdown__content">
            <ul class="hds-dropdown__list">
              <HdsDropdownListItemGeneric>
                <ShwPlaceholder
                  @text="generic item content"
                  @height="36"
                  @background="#e1f5fe"
                />
              </HdsDropdownListItemGeneric>
              <HdsDropdownListItemGeneric>
                <ShwPlaceholder
                  @text="generic item content"
                  @height="36"
                  @background="#e1f5fe"
                />
              </HdsDropdownListItemGeneric>
              <HdsDropdownListItemGeneric>
                <ShwPlaceholder
                  @text="generic item content"
                  @height="36"
                  @background="#e1f5fe"
                />
              </HdsDropdownListItemGeneric>
            </ul>
            <HdsDropdownFooter @hasDivider={{hasDivider}}>
              <ShwPlaceholder
                @text="generic footer content"
                @width="200"
                @height="36"
                @background="#e1f5fe"
              />
            </HdsDropdownFooter>
          </div>
        </SF.Item>
      {{/each}}
    {{/let}}
    <SF.Item @label="Button">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemInteractive @route="page-components">Organization
            A</HdsDropdownListItemInteractive>
          <HdsDropdownListItemInteractive @route="page-components">Organization
            B</HdsDropdownListItemInteractive>
          <HdsDropdownListItemInteractive @route="page-components">Organization
            C</HdsDropdownListItemInteractive>
        </ul>
        <HdsDropdownFooter @hasDivider={{true}}>
          <HdsButton
            @text="Apply filters"
            @isFullWidth={{true}}
            @size="small"
          />
        </HdsDropdownFooter>
      </div>
    </SF.Item>
    <SF.Item @label="Link">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemInteractive @route="page-components">Organization
            A</HdsDropdownListItemInteractive>
          <HdsDropdownListItemInteractive @route="page-components">Organization
            B</HdsDropdownListItemInteractive>
          <HdsDropdownListItemInteractive @route="page-components">Organization
            C</HdsDropdownListItemInteractive>
        </ul>
        <HdsDropdownFooter @hasDivider={{true}}>
          <HdsLinkStandalone
            @icon="list"
            @text="Organizations"
            @color="secondary"
            @href="#"
          />
        </HdsDropdownFooter>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Header and footer</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="Generic header and footer">
      <div class="hds-dropdown__content">
        <HdsDropdownHeader @hasDivider={{true}}>
          <ShwPlaceholder
            @text="generic header content"
            @width="200"
            @height="36"
            @background="#e1f5fe"
          />
        </HdsDropdownHeader>
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemGeneric>
            <ShwPlaceholder
              @text="generic item content"
              @height="36"
              @background="#e1f5fe"
            />
          </HdsDropdownListItemGeneric>
          <HdsDropdownListItemGeneric>
            <ShwPlaceholder
              @text="generic item content"
              @height="36"
              @background="#e1f5fe"
            />
          </HdsDropdownListItemGeneric>
          <HdsDropdownListItemGeneric>
            <ShwPlaceholder
              @text="generic item content"
              @height="36"
              @background="#e1f5fe"
            />
          </HdsDropdownListItemGeneric>
        </ul>
        <HdsDropdownFooter @hasDivider={{true}}>
          <ShwPlaceholder
            @text="generic footer content"
            @width="200"
            @height="36"
            @background="#e1f5fe"
          />
        </HdsDropdownFooter>
      </div>
    </SF.Item>

    <SF.Item @label="Generic, fixed height list">
      <div class="hds-dropdown__content" {{style maxHeight="195px"}}>
        <HdsDropdownHeader @hasDivider={{true}}>
          <ShwPlaceholder
            @text="generic header content"
            @width="200"
            @height="36"
            @background="#e1f5fe"
          />
        </HdsDropdownHeader>
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemInteractive @route="page-components">Interactive
            for testing</HdsDropdownListItemInteractive>
          <HdsDropdownListItemGeneric>
            <ShwPlaceholder
              @text="generic item content"
              @height="36"
              @background="#e1f5fe"
            />
          </HdsDropdownListItemGeneric>
          <HdsDropdownListItemGeneric>
            <ShwPlaceholder
              @text="generic item content"
              @height="36"
              @background="#e1f5fe"
            />
          </HdsDropdownListItemGeneric>
          <HdsDropdownListItemGeneric>
            <ShwPlaceholder
              @text="generic item content"
              @height="36"
              @background="#e1f5fe"
            />
          </HdsDropdownListItemGeneric>
          <HdsDropdownListItemGeneric>
            <ShwPlaceholder
              @text="generic item content"
              @height="36"
              @background="#e1f5fe"
            />
          </HdsDropdownListItemGeneric>
        </ul>
        <HdsDropdownFooter @hasDivider={{true}}>
          <ShwPlaceholder
            @text="generic footer content"
            @width="200"
            @height="36"
            @background="#e1f5fe"
          />
        </HdsDropdownFooter>
      </div>
    </SF.Item>
    <SF.Item @label="Input and Button Set">
      <div class="hds-dropdown__content">
        <HdsDropdownHeader @hasDivider={{true}}>
          <HdsFormTextInputBase @type="search" placeholder="Narrow results" />
        </HdsDropdownHeader>
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemInteractive @route="page-components">Organization
            A</HdsDropdownListItemInteractive>
          <HdsDropdownListItemInteractive @route="page-components">Organization
            B</HdsDropdownListItemInteractive>
          <HdsDropdownListItemInteractive @route="page-components">Organization
            C</HdsDropdownListItemInteractive>
        </ul>
        <HdsDropdownFooter @hasDivider={{true}}>
          <HdsButtonSet>
            <HdsButton @text="Apply" @isFullWidth={{true}} @size="small" />
            <HdsButton
              @text="Cancel"
              @color="secondary"
              @isFullWidth={{true}}
              @size="small"
            />
          </HdsButtonSet>
        </HdsDropdownFooter>
      </div>
    </SF.Item>
    <SF.Item @label="Input and Link, fixed height list">
      <div class="hds-dropdown__content" {{style maxHeight="190px"}}>
        <HdsDropdownHeader @hasDivider={{true}}>
          <HdsFormTextInputBase @type="search" placeholder="Narrow results" />
        </HdsDropdownHeader>
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemInteractive @route="page-components">Organization
            A</HdsDropdownListItemInteractive>
          <HdsDropdownListItemInteractive @route="page-components">Organization
            B</HdsDropdownListItemInteractive>
          <HdsDropdownListItemInteractive @route="page-components">Organization
            C</HdsDropdownListItemInteractive>
        </ul>
        <HdsDropdownFooter @hasDivider={{true}}>
          <HdsLinkStandalone @icon="plus" @text="Add organization" @href="#" />
        </HdsDropdownFooter>
      </div>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionHeaderAndFooter;
