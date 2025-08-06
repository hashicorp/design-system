import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';
import { deepTracked } from 'ember-deep-tracked';
import { action } from '@ember/object';
import { on } from '@ember/modifier';
import { later } from '@ember/runloop';

import ShwTextBody from 'showcase/components/shw/text/body';
import ShwTextH4 from 'showcase/components/shw/text/h4';

// HDS Components
import {
  HdsTable,
  HdsButton,
} from '@hashicorp/design-system-components/components';

import type { HdsTableOnSelectionChangeSignature } from '@hashicorp/design-system-components/components/hds/table/types';
import type { PageComponentsTableModel } from 'showcase/routes/page-components/table';

export interface MockTableMultiSelectExamplesExternalActionSignature {
  Args: {
    model: PageComponentsTableModel;
  };
  Element: HTMLElement;
}

export default class MockTableMultiSelectExternalExamplesExternalAction extends Component<MockTableMultiSelectExamplesExternalActionSignature> {
  declare model: PageComponentsTableModel;

  @deepTracked userData = [...this.args.model.userDataDemo4];

  @action
  onSelectionChange({ selectedRowsKeys }: HdsTableOnSelectionChangeSignature) {
    console.group(
      'MockTableMultiSelectExternalExamplesExternalAction onSelectionChange invoked with arguments:',
    );
    console.log('Selected Row Keys:', selectedRowsKeys);
    console.groupEnd();
    this.userData.forEach((user) => {
      user.isSelected = selectedRowsKeys.includes(String(user.id));
    });
  }

  @action
  animateSelectedUsers() {
    this.userData.forEach((user) => {
      user.isAnimated = user.isSelected ? user.isSelected : false;
    });
    // eslint-disable-next-line ember/no-runloop
    later(() => {
      this.resetUserAnimation();
    }, 5000);
  }

  @action
  resetUserAnimation() {
    this.userData.forEach((user) => {
      user.isAnimated = false;
    });
  }

  <template>
    <ShwTextH4>Execute action on selected rows</ShwTextH4>

    <ShwTextBody>This demo emulates, for example, when a user needs to download
      the selected files.</ShwTextBody>

    <div class="shw-component-table-demo-topbar">
      <div class="shw-component-table-demo-topbar__action">
        <HdsButton
          @text="Animate users"
          @icon="play"
          {{on "click" this.animateSelectedUsers}}
        />
      </div>
    </div>

    <HdsTable
      @isSelectable={{true}}
      @onSelectionChange={{this.onSelectionChange}}
      @model={{this.userData}}
      @columns={{array
        (hash key="id" label="ID")
        (hash key="name" label="Name")
        (hash key="email" label="Email")
        (hash key="role" label="Role")
      }}
    >
      <:body as |B|>
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        <B.Tr
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          @selectionKey="{{B.data.id}}"
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          @isSelected={{B.data.isSelected}}
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          @selectionAriaLabelSuffix="row #{{B.data.lorem}}"
        >
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.id}}</B.Td>
          <B.Td>
            <span
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              class={{if B.data.isAnimated "shw-component-table-animate-user"}}
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            >{{B.data.name}}</span>
          </B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.email}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.role}}</B.Td>
        </B.Tr>
      </:body>
    </HdsTable>
  </template>
}
