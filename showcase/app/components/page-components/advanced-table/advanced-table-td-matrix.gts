/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';

import {
  HdsAdvancedTableTh,
  HdsAdvancedTableTd,
  HdsIcon,
  HdsBadge,
  HdsDropdown,
  HdsTooltipButton,
  HdsButton,
} from '@hashicorp/design-system-components/components';

import {
  ALIGNMENTS,
  VALIGNMENTS,
} from '@hashicorp/design-system-components/components/hds/advanced-table/index';

import ShwFlex from 'showcase/components/shw/flex';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

export interface AdvancedTableTdMatrixSignature {
  Element: HTMLDivElement;
}

const AdvancedTableTdMatrix: TemplateOnlyComponent<AdvancedTableTdMatrixSignature> =
  <template>
    <ShwFlex @label="Horizontal alignment" as |SF|>
      <SF.Item @grow={{true}}>
        <div
          class="hds-advanced-table hds-advanced-table--density-medium"
          role="grid"
          {{style gridTemplateColumns="repeat(4, 1fr)"}}
        >
          <div class="hds-advanced-table__thead" role="rowgroup">
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableTh>
                Entity
              </HdsAdvancedTableTh>
              {{#each ALIGNMENTS as |alignment|}}
                <HdsAdvancedTableTh @align={{alignment}}>
                  {{capitalize alignment}}
                </HdsAdvancedTableTh>
              {{/each}}
            </div>
          </div>
          <div class="hds-advanced-table__tbody" role="rowgroup">
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableTh>Text</HdsAdvancedTableTh>
              {{#each ALIGNMENTS as |alignment|}}
                <HdsAdvancedTableTd @align={{alignment}}>
                  Text is
                  {{alignment}}
                  aligned
                </HdsAdvancedTableTd>
              {{/each}}
            </div>
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableTh>Icon</HdsAdvancedTableTh>
              {{#each ALIGNMENTS as |alignment|}}
                <HdsAdvancedTableTd @align={{alignment}}>
                  <HdsIcon @name="film" @isInline={{true}} />
                </HdsAdvancedTableTd>
              {{/each}}
            </div>
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableTh>Icon + Inline text</HdsAdvancedTableTh>
              {{#each ALIGNMENTS as |alignment|}}
                <HdsAdvancedTableTd @align={{alignment}}>
                  <HdsIcon @name="film" @isInline={{true}} />
                  <span>
                    Text in a
                    <code>&lt;span&gt;</code>
                  </span>
                </HdsAdvancedTableTd>
              {{/each}}
            </div>
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableTh>Badge</HdsAdvancedTableTh>
              {{#each ALIGNMENTS as |alignment|}}
                <HdsAdvancedTableTd @align={{alignment}}>
                  <HdsBadge @text="Badge" />
                </HdsAdvancedTableTd>
              {{/each}}
            </div>
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableTh>Button (with inline container)</HdsAdvancedTableTh>
              {{#each ALIGNMENTS as |alignment|}}
                <HdsAdvancedTableTd @align={{alignment}}>
                  <div {{style display="inline-block"}}>
                    <HdsButton
                      @size="small"
                      @icon="plus"
                      @text="Lorem ipsum"
                      @color="secondary"
                    />
                  </div>
                </HdsAdvancedTableTd>
              {{/each}}
            </div>
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableTh>
                Dropdown (with
                <code>@isInline</code>
                )
              </HdsAdvancedTableTh>
              {{#each ALIGNMENTS as |alignment|}}
                <HdsAdvancedTableTd @align={{alignment}}>
                  <HdsDropdown
                    @isInline={{true}}
                    @listPosition="bottom-right"
                    as |dd|
                  >
                    <dd.ToggleIcon
                      @icon="more-horizontal"
                      @text="Overflow Options"
                      @hasChevron={{false}}
                      @size="small"
                    />
                    <dd.Interactive @route="page-components.advanced-table">
                      Dropdown
                    </dd.Interactive>
                  </HdsDropdown>
                </HdsAdvancedTableTd>
              {{/each}}
            </div>
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableTh>Tooltip(Button)</HdsAdvancedTableTh>
              {{#each ALIGNMENTS as |alignment|}}
                <HdsAdvancedTableTd @align={{alignment}}>
                  <HdsTooltipButton @text="Hello!">
                    December 15, 2022,<br />16:40:09 PM
                  </HdsTooltipButton>
                </HdsAdvancedTableTd>
              {{/each}}
            </div>
          </div>
        </div>
      </SF.Item>
    </ShwFlex>
    <ShwFlex @label="Vertical alignment" as |SF|>
      {{#each VALIGNMENTS as |valignment|}}
        <SF.Item @grow={{true}}>
          <div
            class="hds-advanced-table hds-advanced-table--density-medium hds-advanced-table--valign-{{valignment}}"
            role="grid"
            {{style gridTemplateColumns="repeat(8, 1fr)"}}
          >
            <div class="hds-advanced-table__thead" role="rowgroup">
              <div class="hds-advanced-table__tr" role="row">
                <HdsAdvancedTableTh>Spacer</HdsAdvancedTableTh>
                <HdsAdvancedTableTh>Text</HdsAdvancedTableTh>
                <HdsAdvancedTableTh>Icon</HdsAdvancedTableTh>
                <HdsAdvancedTableTh>Icon + Text</HdsAdvancedTableTh>
                <HdsAdvancedTableTh>Icon + Text (with flex container)</HdsAdvancedTableTh>
                <HdsAdvancedTableTh>Badge</HdsAdvancedTableTh>
                <HdsAdvancedTableTh>Dropdown</HdsAdvancedTableTh>
                <HdsAdvancedTableTh>Tooltip(Button)</HdsAdvancedTableTh>
              </div>
            </div>
            <div class="hds-advanced-table__tbody" role="rowgroup">
              <div class="hds-advanced-table__tr" role="row">
                <HdsAdvancedTableTh>
                  {{#if (eq valignment "top")}}
                    {{capitalize valignment}}
                    (default)
                    <ShwPlaceholder @height="50" />
                  {{else}}
                    <ShwPlaceholder @height="25" />{{capitalize
                      valignment
                    }}<ShwPlaceholder @height="25" />
                  {{/if}}
                </HdsAdvancedTableTh>
                <HdsAdvancedTableTd>
                  Text is
                  {{valignment}}
                  aligned
                </HdsAdvancedTableTd>
                <HdsAdvancedTableTd>
                  <HdsIcon @name="film" @isInline={{true}} />
                </HdsAdvancedTableTd>
                <HdsAdvancedTableTd>
                  <HdsIcon @name="film" @isInline={{true}} />
                  <span>Text in a
                    <code>&lt;span&gt;</code>
                  </span>
                </HdsAdvancedTableTd>
                <HdsAdvancedTableTd>
                  <div {{style display="flex" gap="8px" align-items="center"}}>
                    <HdsIcon @name="film" />
                    <span>Text in a
                      <code>&lt;span&gt;</code>
                    </span>
                  </div>
                </HdsAdvancedTableTd>
                <HdsAdvancedTableTd>
                  <HdsBadge @text="Badge" />
                </HdsAdvancedTableTd>
                <HdsAdvancedTableTd>
                  <HdsDropdown as |D|>
                    <D.ToggleIcon
                      @icon="more-horizontal"
                      @text="Overflow Options"
                      @hasChevron={{false}}
                      @size="small"
                    />
                    <D.Interactive @route="page-components.advanced-table">
                      Dropdown
                    </D.Interactive>
                  </HdsDropdown>
                </HdsAdvancedTableTd>
                <HdsAdvancedTableTd>
                  <HdsTooltipButton @text="Hello!">
                    December 15, 2022,<br />16:40:09 PM
                  </HdsTooltipButton>
                </HdsAdvancedTableTd>
              </div>
            </div>
          </div>
        </SF.Item>
      {{/each}}
    </ShwFlex>
  </template>;

export default AdvancedTableTdMatrix;
