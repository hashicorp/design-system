/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array, hash } from '@ember/helper';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';

import USERS from 'showcase/mocks/user-data';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';

const USER_DATA_SHORT = USERS.slice(0, 5);

const SubSectionPinnableColumns: TemplateOnlyComponent = <template>
  <ShwTextH2>Pinnable first column</ShwTextH2>

  <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
    {{#let (array false true) as |stickyBools|}}
      {{#each stickyBools as |stickyBool|}}
        {{#let (array false true) as |selectableBools|}}
          {{#each selectableBools as |selectableBool|}}
            {{#let (array false true) as |sortableBools|}}
              {{#each sortableBools as |sortableBool|}}
                <SG.Item
                  @label="hasStickyFirstColumn={{stickyBool}}, isSelectable={{selectableBool}}, isSortable={{sortableBool}}"
                >
                  <HdsAdvancedTable
                    @isSelectable={{selectableBool}}
                    {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                    @model={{USER_DATA_SHORT}}
                    @columns={{array
                      (hash key="id" label="ID" isSortable=sortableBool)
                      (hash key="name" label="Name")
                      (hash key="email" label="Email")
                      (hash key="role" label="Role")
                    }}
                    @hasStickyFirstColumn={{stickyBool}}
                  >
                    <:body as |B|>
                      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                      <B.Tr @selectionKey="{{B.data.id}}">
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
                </SG.Item>
              {{/each}}
            {{/let}}
          {{/each}}
        {{/let}}
      {{/each}}
    {{/let}}
  </ShwGrid>

  <ShwDivider />
</template>;

export default SubSectionPinnableColumns;
