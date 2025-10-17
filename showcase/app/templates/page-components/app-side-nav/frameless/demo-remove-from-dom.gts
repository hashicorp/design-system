/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { pageTitle } from 'ember-page-title';
import { tracked } from '@glimmer/tracking';

import MockApp from 'showcase/components/mock/app';

export default class PageComponentsAppSideNavFramelessDemoRemoveFromDom extends Component {
  @tracked isRendered = true;

  removeSideNavFromDOM = (isOpen: boolean) => {
    if (isOpen) this.isRendered = false;
  };

  <template>
    {{pageTitle "App SideNav remove from DOM demo - Frameless"}}

    <MockApp>
      <:sidebar as |S|>
        {{#if this.isRendered}}
          <S.AppSideNav
            @showDevToggle={{true}}
            @onToggleMinimizedStatus={{this.removeSideNavFromDOM}}
          />
        {{/if}}
      </:sidebar>
      <:main as |M|>
        <M.PageHeader @showActionButton={{true}} />
        <M.GenericTextContent />
        <M.GenericTextContent />
        <M.GenericTextContent />
        <M.GenericTextContent />
      </:main>
    </MockApp>
  </template>
}
