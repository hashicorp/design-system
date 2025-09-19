/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';

import MUSIC from 'showcase/mocks/folk-music-data';

import {
  HdsAdvancedTable,
  HdsBadge,
  HdsButton,
  HdsButtonSet,
  HdsIcon,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

export interface CodeFragmentWithDynamicCellContentSignature {
  Element: HTMLDivElement;
}

export default class CodeFragmentWithDynamicCellContent extends Component<CodeFragmentWithDynamicCellContentSignature> {
  @tracked showAllButtons = false;

  toggleElementsVisibility = () => {
    this.showAllButtons = !this.showAllButtons;
  };

  <template>
    <HdsAdvancedTable
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      @model={{MUSIC}}
      @columns={{array
        (hash key="artist" label="Artist")
        (hash key="album" label="Album")
        (hash key="year" label="Release Year")
        (hash key="other" label="Additional Actions")
      }}
    >
      <:body as |B|>
        {{! @glint-expect-error - this argument shouldn't be required, will be fixed by https://hashicorp.atlassian.net/browse/HDS-5167}}
        <B.Tr @selectionKey="{{B.data.id}}">
          <B.Th @scope="row">
            <HdsLinkInline @href="#showcase">
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              {{B.data.artist}}
            </HdsLinkInline>
          </B.Th>
          <B.Td>
            <div class="shw-component-advanced-table-cell-content-div">
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              <HdsIcon @name={{B.data.icon}} @isInline={{true}} />
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              {{B.data.album}}
            </div>
          </B.Td>
          <B.Td>
            <HdsBadge
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              @text={{B.data.year}}
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              @type={{B.data.badge-type}}
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              @color={{B.data.badge-color.name}}
            />
          </B.Td>
          <B.Td>
            <HdsButtonSet>
              <HdsButton
                @text="Show more buttons"
                @icon="plus"
                @size="small"
                aria-pressed={{this.showAllButtons}}
                {{on "click" this.toggleElementsVisibility}}
              />
              {{#if this.showAllButtons}}
                <HdsButton
                  @text="Add"
                  @isIconOnly={{true}}
                  @icon="plus"
                  @size="small"
                />
                <HdsButton
                  @text="Edit"
                  @isIconOnly={{true}}
                  @icon="edit"
                  @size="small"
                  @color="secondary"
                />
                <HdsButton
                  @text="Delete"
                  @isIconOnly={{true}}
                  @icon="trash"
                  @size="small"
                  @color="critical"
                />
              {{/if}}
            </HdsButtonSet>
          </B.Td>
        </B.Tr>
      </:body>
    </HdsAdvancedTable>
  </template>
}
