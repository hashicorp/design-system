/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array, hash } from '@ember/helper';
import { get } from '@ember/object';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';

import spanningCellData from 'showcase/mocks/spanning-cell-data';

export interface AdvancedTableWithSpanningCellsSignature {
  Element: HTMLDivElement;
}

const AdvancedTableWithSpanningCells: TemplateOnlyComponent<AdvancedTableWithSpanningCellsSignature> =
  <template>
    <HdsAdvancedTable
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      @model={{spanningCellData}}
      @columns={{array
        (hash key="name" label="Name")
        (hash key="service" label="Service")
        (hash key="description" label="Description")
        (hash key="email" label="Email")
      }}
    >
      <:body as |B|>
        {{! @glint-expect-error - this argument shouldn't be required, will be fixed by https://hashicorp.atlassian.net/browse/HDS-5167}}
        <B.Tr id={{B.data.id}} @selectionKey="{{B.data.id}}">
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
  </template>;

export default AdvancedTableWithSpanningCells;
