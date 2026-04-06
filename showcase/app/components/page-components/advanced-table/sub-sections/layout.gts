/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array, hash, get } from '@ember/helper';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import MUSIC from 'showcase/mocks/folk-music-data';
import SPANNING_CELLS from 'showcase/mocks/spanning-cell-data';
import USERS from 'showcase/mocks/user-data';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';

const USER_DATA_SHORT = USERS.slice(0, 5);

const SubSectionLayout: TemplateOnlyComponent = <template>
  <ShwTextH2>Layout</ShwTextH2>

  <ShwTextH3>AdvancedTable with custom column widths</ShwTextH3>
  <HdsAdvancedTable
    @model={{MUSIC}}
    @caption="table with multi-line content"
    @columns={{array
      (hash key="artist" label="Artist (120px)" width="120px")
      (hash key="album" label="Album (1fr)" width="1fr")
      (hash key="quote" label="Quote (2fr)" width="2fr")
    }}
  >
    <:body as |B|>
      <B.Tr>
        <B.Td>{{B.data.artist}}</B.Td>
        <B.Td>{{B.data.album}}</B.Td>
        <B.Td>&ldquo;{{B.data.quote}}&rdquo;</B.Td>
      </B.Tr>
    </:body>
  </HdsAdvancedTable>

  <ShwTextH3>Selectable AdvancedTable with custom column widths</ShwTextH3>
  <HdsAdvancedTable
    @isSelectable={{true}}
    @model={{USER_DATA_SHORT}}
    @columns={{array
      (hash key="id" label="ID (120px)" width="120px")
      (hash key="name" label="Name (auto)" width="auto")
      (hash key="email" label="Email (1fr)" width="1fr")
      (hash key="role" label="Role (auto)" width="auto")
    }}
  >
    <:body as |B|>
      <B.Tr @selectionKey="{{B.data.id}}">
        <B.Td>{{B.data.id}}</B.Td>
        <B.Td>{{B.data.name}}</B.Td>
        <B.Td>{{B.data.email}}</B.Td>
        <B.Td>{{B.data.role}}</B.Td>
      </B.Tr>
    </:body>
  </HdsAdvancedTable>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Wide container with a narrow AdvancedTable</ShwTextH3>

  <div class="shw-component-advanced-table-narrow-wrapper">
    <HdsAdvancedTable
      @isSelectable={{true}}
      @model={{USER_DATA_SHORT}}
      @columns={{array
        (hash key="id" label="ID" width="150px")
        (hash key="name" label="Name" width="150px")
      }}
    >
      <:body as |B|>
        <B.Tr
          @selectionKey="{{B.data.id}}"
          @isSelected={{B.data.isSelected}}
          @selectionAriaLabelSuffix="row #{{B.data.id}}"
        >
          <B.Td>{{B.data.id}}</B.Td>
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
    @model={{SPANNING_CELLS}}
    @columns={{array
      (hash key="name" label="Name")
      (hash key="service" label="Service")
      (hash key="description" label="Description")
      (hash key="email" label="Email")
    }}
  >
    <:body as |B|>
      <B.Tr id={{B.data.id}}>
        {{#if (get B.data "name")}}
          <B.Th @rowspan={{B.data.name.rowspan}}>
            {{#if B.data.name.text}}
              {{B.data.name.text}}
            {{/if}}
          </B.Th>
        {{/if}}
        {{#if (get B.data "service")}}
          <B.Td @colspan={{B.data.service.colspan}}>
            {{#if B.data.service.text}}
              {{B.data.service.text}}
            {{/if}}
          </B.Td>
        {{/if}}
        {{#if (get B.data "description")}}
          <B.Td>
            {{#if B.data.description.text}}
              {{B.data.description.text}}
            {{/if}}
          </B.Td>
        {{/if}}
        {{#if B.data.email}}
          <B.Td>{{B.data.email}}</B.Td>
        {{/if}}
      </B.Tr>
    </:body>
  </HdsAdvancedTable>

  <ShwDivider />
</template>;

export default SubSectionLayout;
