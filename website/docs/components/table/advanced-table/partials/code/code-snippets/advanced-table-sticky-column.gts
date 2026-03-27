import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';

import USER_WITH_MORE_COLUMNS_DATA from 'website/mocks/user-with-more-columns-data';

export default class LocalComponent extends Component {
  get myDemoData() {
    return USER_WITH_MORE_COLUMNS_DATA;
  }

  <template>
    <HdsAdvancedTable
      @hasStickyFirstColumn={{true}}
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      @model={{this.myDemoData}}
      @columns={{array
        (hash key="first_name" label="First Name" isSortable=true)
        (hash key="last_name" label="Last Name" isSortable=true)
        (hash key="age" label="Age" isSortable=true)
        (hash key="email" label="Email")
        (hash key="phone" label="Phone")
        (hash key="bio" label="Biography" width="350px")
        (hash key="education" label="Education Degree")
        (hash key="occupation" label="Occupation")
      }}
    >
      <:body as |B|>
        <B.Tr>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Th>{{B.data.first_name}}</B.Th>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.last_name}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.age}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.email}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.phone}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.bio}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.education}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.occupation}}</B.Td>
        </B.Tr>
      </:body>
    </HdsAdvancedTable>
  </template>
}
