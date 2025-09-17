/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array, hash, get } from '@ember/helper';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwDivider from 'showcase/components/shw/divider';

import MUSIC from 'showcase/mocks/folk-music-data';
import SPANNING_CELLS from 'showcase/mocks/spanning-cell-data';
import USERS from 'showcase/mocks/user-data';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';

const USER_DATA_SHORT = USERS.slice(0, 5);

const SubSectionLayout: TemplateOnlyComponent = <template>
  <ShwTextH2>Layout</ShwTextH2>

  <ShwTextH3>AdvancedTable with custom column widths</ShwTextH3>
  <HdsAdvancedTable
    {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
    @model={{MUSIC}}
    @caption="table with multi-line content"
    @columns={{array
      (hash key="artist" label="Artist" width="120px")
      (hash key="album" label="Album" width="1fr")
      (hash key="quote" label="Quote" width="2fr")
    }}
  >
    <:body as |B|>
      <B.Tr>
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        <B.Td>{{B.data.artist}}</B.Td>
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        <B.Td>{{B.data.album}}</B.Td>
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        <B.Td>&ldquo;{{B.data.quote}}&rdquo;</B.Td>
      </B.Tr>
    </:body>
  </HdsAdvancedTable>

  <ShwTextH3>Selectable AdvancedTable with custom column widths</ShwTextH3>
  <HdsAdvancedTable
    @isSelectable={{true}}
    {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
    @model={{USER_DATA_SHORT}}
    @columns={{array
      (hash key="id" label="ID (120px)" width="120px")
      (hash key="name" label="Name (auto)" width="auto")
      (hash key="email" label="Email (1fr)" width="1fr")
      (hash key="role" label="Role (auto)" width="auto")
    }}
  >
    <:body as |B|>
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      <B.Tr @selectionKey="{{B.data.id}}">
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

  <ShwDivider @level={{2}} />

  <ShwTextH3>Wide container with a narrow AdvancedTable</ShwTextH3>

  <div class="shw-component-advanced-table-narrow-wrapper">
    <HdsAdvancedTable
      @isSelectable={{true}}
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      @model={{USER_DATA_SHORT}}
      @columns={{array
        (hash key="id" label="ID" width="150px")
        (hash key="name" label="Name" width="150px")
      }}
    >
      <:body as |B|>
        <B.Tr
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          @selectionKey="{{B.data.id}}"
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          @isSelected={{B.data.isSelected}}
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          @selectionAriaLabelSuffix="row #{{B.data.id}}"
        >
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.id}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.name}}</B.Td>
        </B.Tr>
      </:body>
    </HdsAdvancedTable>
  </div>

  <ShwDivider @level={{2}} />

  <ShwTextH3>AdvancedTable with
    <code>colspan/rowspan</code>
    attributes</ShwTextH3>

  <HdsAdvancedTable
    {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
    @model={{SPANNING_CELLS}}
    @columns={{array
      (hash key="name" label="Name")
      (hash key="service" label="Service")
      (hash key="description" label="Description")
      (hash key="email" label="Email")
    }}
  >
    <:body as |B|>
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      <B.Tr id={{B.data.id}}>
        {{#if (get B.data "name")}}
          <B.Th
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            @rowspan={{B.data.name.rowspan}}
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            @colspan={{B.data.name.colspan}}
          >
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            {{#if B.data.name.text}}
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              {{B.data.name.text}}
            {{else}}
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              {{B.data.name}}
            {{/if}}
          </B.Th>
        {{/if}}
        {{#if (get B.data "service")}}
          <B.Td
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            @rowspan={{B.data.service.rowspan}}
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            @colspan={{B.data.service.colspan}}
          >
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            {{#if B.data.service.text}}
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              {{B.data.service.text}}
            {{else}}
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              {{B.data.service}}
            {{/if}}
          </B.Td>
        {{/if}}
        {{#if (get B.data "description")}}
          <B.Td
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            @rowspan={{B.data.description.rowspan}}
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            @colspan={{B.data.description.colspan}}
          >
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            {{#if B.data.description.text}}
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              {{B.data.description.text}}
            {{else}}
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              {{B.data.description}}
            {{/if}}
          </B.Td>
        {{/if}}
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        {{#if B.data.email}}
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.email}}</B.Td>
        {{/if}}
      </B.Tr>
    </:body>
  </HdsAdvancedTable>

  <ShwDivider />
</template>;

export default SubSectionLayout;
