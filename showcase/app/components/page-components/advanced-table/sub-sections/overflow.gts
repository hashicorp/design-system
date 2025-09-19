/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array, hash } from '@ember/helper';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import MUSIC from 'showcase/mocks/folk-music-data';
import USERS from 'showcase/mocks/user-data';

import {
  HdsAdvancedTable,
  HdsBadge,
  HdsButtonSet,
  HdsButton,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const SubSectionNestedRows: TemplateOnlyComponent = <template>
  <ShwTextH2>Horizontal scrolling indicators</ShwTextH2>
  <div class="shw-component-advanced-table-fixed-width-wrapper">
    <HdsAdvancedTable
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      @model={{MUSIC}}
      @isStriped={{true}}
      @maxHeight="400px"
      @hasStickyHeader={{false}}
      @columns={{array
        (hash
          key="artist"
          label="Artist"
          tooltip="More information."
          isSortable=true
        )
        (hash
          key="album" label="Album" tooltip="More information." isSortable=true
        )
        (hash
          key="year"
          label="Release Year"
          tooltip="More information."
          isSortable=true
        )
        (hash key="other" label="Additional Actions")
      }}
    >
      <:body as |B|>
        <B.Tr>
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
              @type="outlined"
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              @color={{B.data.badge-color}}
            />
          </B.Td>
          <B.Td>
            <HdsButtonSet>
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
            </HdsButtonSet>
          </B.Td>
        </B.Tr>
      </:body>
    </HdsAdvancedTable>
  </div>

  <ShwDivider />

  <ShwTextH2>Stickiness</ShwTextH2>

  <ShwTextH3>Sticky header</ShwTextH3>

  <HdsAdvancedTable
    @isSelectable={{true}}
    {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
    @model={{USERS}}
    @columns={{array
      (hash key="id" label="ID" width="auto")
      (hash key="name" label="Name")
      (hash key="email" label="Email")
      (hash key="role" label="Role")
    }}
    @maxHeight="400px"
    @isStriped={{true}}
  >
    <:body as |B|>
      <B.Tr
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @selectionKey="{{B.data.id}}"
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @isSelected={{B.data.isSelected}}
      >
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        <B.Td>{{B.data.id}}</B.Td>
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        <B.Td>{{B.data.name}}</B.Td>
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        <B.Td>{{B.data.email}}</B.Td>
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        <B.Td>{{B.data.role}}</B.Td>
      </B.Tr>
    </:body>
  </HdsAdvancedTable>

  <ShwTextH3>Sticky column</ShwTextH3>

  <div class="shw-component-advanced-table-fixed-width-wrapper">
    <HdsAdvancedTable
      @isSelectable={{true}}
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      @model={{USERS}}
      @maxHeight="400px"
      @hasStickyHeader={{false}}
      @columns={{array
        (hash key="id" label="ID" width="auto")
        (hash key="name" label="Name" width="max-content")
        (hash key="email" label="Email" width="max-content")
        (hash key="role" label="Role" width="max-content")
      }}
      @hasStickyFirstColumn={{true}}
      @isStriped={{true}}
    >
      <:body as |B|>
        <B.Tr
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          @selectionKey="{{B.data.id}}"
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          @isSelected={{B.data.isSelected}}
        >
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Th>{{B.data.id}}</B.Th>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.name}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.email}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.role}}</B.Td>
        </B.Tr>
      </:body>
    </HdsAdvancedTable>
  </div>

  <ShwTextH3>Sticky column not selectable</ShwTextH3>

  <div class="shw-component-advanced-table-fixed-width-wrapper">
    <HdsAdvancedTable
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      @model={{USERS}}
      @columns={{array
        (hash key="id" label="ID" width="auto")
        (hash key="name" label="Name" width="max-content")
        (hash key="email" label="Email" width="max-content")
        (hash key="role" label="Role" width="max-content")
      }}
      @hasStickyFirstColumn={{true}}
      @isStriped={{true}}
      @maxHeight="400px"
      @hasStickyHeader={{false}}
    >
      <:body as |B|>
        <B.Tr>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Th>{{B.data.id}}</B.Th>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.name}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.email}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.role}}</B.Td>
        </B.Tr>
      </:body>
    </HdsAdvancedTable>
  </div>

  <ShwTextH3>Sticky header and sticky column</ShwTextH3>

  <div class="shw-component-advanced-table-fixed-width-wrapper">
    <HdsAdvancedTable
      @isSelectable={{true}}
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      @model={{USERS}}
      @columns={{array
        (hash key="id" label="ID" width="auto")
        (hash key="name" label="Name" width="max-content")
        (hash key="email" label="Email" width="max-content")
        (hash key="role" label="Role" width="max-content")
      }}
      @maxHeight="400px"
      @hasStickyFirstColumn={{true}}
      @isStriped={{true}}
    >
      <:body as |B|>
        <B.Tr
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          @selectionKey="{{B.data.id}}"
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          @isSelected={{B.data.isSelected}}
        >
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Th>{{B.data.id}}</B.Th>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.name}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.email}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.role}}</B.Td>
        </B.Tr>
      </:body>
    </HdsAdvancedTable>
  </div>

  <ShwDivider />
</template>;

export default SubSectionNestedRows;
