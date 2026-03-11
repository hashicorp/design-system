/**
 * Copyright IBM Corp. 2021, 2025
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
      @model={{MUSIC}}
      @columns={{array
        (hash key="artist" label="Artist")
        (hash key="album" label="Album")
        (hash key="year" label="Release Year")
        (hash key="other" label="Additional Actions")
      }}
    >
      <:body as |B|>
        <B.Tr @selectionKey="{{B.data.id}}">
          <B.Th @scope="row">
            <HdsLinkInline @href="#showcase">
              {{B.data.artist}}
            </HdsLinkInline>
          </B.Th>
          <B.Td>
            <div class="shw-component-advanced-table-cell-content-div">
              <HdsIcon @name={{B.data.icon}} @isInline={{true}} />
              {{B.data.album}}
            </div>
          </B.Td>
          <B.Td>
            <HdsBadge
              @text={{B.data.year}}
              @type="outlined"
              @color={{B.data.badge-color}}
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
