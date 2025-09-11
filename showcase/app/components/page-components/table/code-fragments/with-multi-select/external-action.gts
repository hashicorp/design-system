import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';
import { deepTracked } from 'ember-deep-tracked';
import { on } from '@ember/modifier';
import { later } from '@ember/runloop';

import USERS from 'showcase/mocks/user-data';
import CodeFragmentWithUsersData from '../with-users-data';

// HDS Components
import { HdsButton } from '@hashicorp/design-system-components/components';

import type { HdsTableOnSelectionChangeSignature } from '@hashicorp/design-system-components/components/hds/table/types';

export interface CodeFragmentWithMultiSelectExternalActionSignature {
  Element: HTMLElement;
}

export default class CodeFragmentWithMultiSelectExternalAction extends Component<CodeFragmentWithMultiSelectExternalActionSignature> {
  @deepTracked userData = USERS.slice(0, 4).map((user) => ({
    ...user,
    isAnimated: false,
  }));

  onSelectionChange = ({
    selectedRowsKeys,
  }: HdsTableOnSelectionChangeSignature) => {
    console.group(
      'CodeFragmentWithMultiSelectExternalAction onSelectionChange invoked with arguments:',
    );
    console.log('Selected Row Keys:', selectedRowsKeys);
    console.groupEnd();
    this.userData.forEach((user) => {
      user.isSelected = selectedRowsKeys.includes(String(user.id));
    });
  };

  animateSelectedUsers = () => {
    this.userData.forEach((user) => {
      user.isAnimated = user.isSelected ? user.isSelected : false;
    });
    // eslint-disable-next-line ember/no-runloop
    later(() => {
      this.resetUserAnimation();
    }, 5000);
  };

  resetUserAnimation = () => {
    this.userData.forEach((user) => {
      user.isAnimated = false;
    });
  };

  <template>
    <div class="shw-component-table-demo-topbar">
      <div class="shw-component-table-demo-topbar__action">
        <HdsButton
          @text="Animate users"
          @icon="play"
          {{on "click" this.animateSelectedUsers}}
        />
      </div>
    </div>

    <CodeFragmentWithUsersData
      @isSelectable={{true}}
      @onSelectionChange={{this.onSelectionChange}}
      @dataModel={{this.userData}}
      @columns={{array
        (hash key="id" label="ID")
        (hash key="name" label="Name")
        (hash key="email" label="Email")
        (hash key="role" label="Role")
      }}
      @dataSize="small"
    />
  </template>
}
