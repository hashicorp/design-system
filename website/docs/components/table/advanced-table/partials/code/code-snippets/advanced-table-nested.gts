import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';
import { eq } from 'ember-truth-helpers';

import {
  HdsAdvancedTable,
  HdsBadge,
} from '@hashicorp/design-system-components/components';

import POLICY_DATA from 'website/mocks/policy-data';

export default class LocalComponent extends Component {
  get myDemoData() {
    // example of data retrieved for the model:
    // [
    //   {
    //     id: "1",
    //     name: "Policy set 1",
    //     status: "PASS",
    //     children: [
    //       {
    //         name: "test-advisory-pass.sentinel",
    //         status: "PASS",
    //         description: "Sample description for this thing.",
    //       },
    //       {
    //         name: "test-hard-mandatory-pass.sentinel",
    //         status: "PASS",
    //         description: "Sample description for this thing.",
    //       },
    //     ],
    //   },
    //   {
    //     id: "2",
    //     name: "Policy set 2",
    //     status: "FAIL",
    //     children: [
    //       {
    //         name: "test-advisory-pass.sentinel",
    //         status: "PASS",
    //         description: "Sample description for this thing.",
    //       },
    //       // ...
    //     ],
    //   },
    // ];

    return POLICY_DATA;
  }

  <template>
    <HdsAdvancedTable
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      @model={{this.myDemoData}}
      @columns={{array
        (hash key="name" label="Name" isExpandable=true)
        (hash key="status" label="Status")
        (hash key="description" label="Description")
      }}
    >
      <:body as |B|>
        <B.Tr>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Th>{{B.data.name}}</B.Th>
          <B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            {{#if (eq B.data.status "FAIL")}}
              <HdsBadge @text="Fail" @color="critical" @icon="x" />
            {{else}}
              <HdsBadge @text="Pass" @color="success" @icon="check" />
            {{/if}}
          </B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.description}}</B.Td>
        </B.Tr>
      </:body>
    </HdsAdvancedTable>
  </template>
}
