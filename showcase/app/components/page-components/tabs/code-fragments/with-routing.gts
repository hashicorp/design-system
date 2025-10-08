/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import type RouterService from '@ember/routing/router-service';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsTabs } from '@hashicorp/design-system-components/components';
import type { HdsTabsSignature } from '@hashicorp/design-system-components/components/hds/tabs/index';

interface CodeFragmentWithRoutingSignature {
  Args: {
    selectedTabIndex: HdsTabsSignature['Args']['selectedTabIndex'];
  };
}

export default class CodeFragmentWithRouting extends Component<CodeFragmentWithRoutingSignature> {
  @service declare router: RouterService;

  onClickTab = (_event: MouseEvent, index: number) => {
    this.router.transitionTo({
      queryParams: { currentTabWithRouting: index },
    });
  };

  <template>
    <HdsTabs
      @selectedTabIndex={{@selectedTabIndex}}
      @onClickTab={{this.onClickTab}}
      as |T|
    >
      <T.Tab>One</T.Tab>
      <T.Tab>Two</T.Tab>
      <T.Tab>Three</T.Tab>
      <T.Panel><ShwPlaceholder @text="Content one" @height="50" /></T.Panel>
      <T.Panel><ShwPlaceholder @text="Content two" @height="50" /></T.Panel>
      <T.Panel><ShwPlaceholder @text="Content three" @height="50" /></T.Panel>
    </HdsTabs>
  </template>
}
