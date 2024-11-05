/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { or } from 'ember-truth-helpers';

// HDS components
import {
  HdsBadge,
  HdsButton,
  HdsDropdown,
  HdsLinkInline,
  HdsBreadcrumb,
  HdsBreadcrumbItem,
  HdsPageHeader,
} from '@hashicorp/design-system-components/components';

// types
import type { HdsPageHeaderSignature } from '@hashicorp/design-system-components/components/hds/page-header/index';

export interface MockAppMainPageHeaderSignature {
  Args: {
    showActionButton?: boolean;
    showActionDropdown?: boolean;
  };
  Element: HdsPageHeaderSignature['Element'];
}

export default class MockAppMainPageHeader extends Component<MockAppMainPageHeaderSignature> {
  showActionButton;
  showActionDropdown;

  constructor(owner: unknown, args: MockAppMainPageHeaderSignature['Args']) {
    super(owner, args);
    this.showActionButton = this.args.showActionButton ?? false;
    this.showActionDropdown = this.args.showActionDropdown ?? false;
  }

  <template>
    <HdsPageHeader ...attributes as |PH|>
      <PH.Title>Page title</PH.Title>
      <PH.Breadcrumb>
        <HdsBreadcrumb>
          <HdsBreadcrumbItem @text="Organization" @icon="dashboard" />
          <HdsBreadcrumbItem @text="Project" @icon="file-text" />
          <HdsBreadcrumbItem @text="Clusters" @icon="server-cluster" />
        </HdsBreadcrumb>
      </PH.Breadcrumb>
      <PH.IconTile @icon="server-cluster" />
      <PH.Badges>
        <HdsBadge @text="Status badge" @icon="award" @color="highlight" />
      </PH.Badges>
      <PH.Subtitle>Project dashboard</PH.Subtitle>
      <PH.Description>
        An overview of all resources in the project.
        <HdsLinkInline @color="secondary" @href="#">Learn more</HdsLinkInline>.
      </PH.Description>
      {{#if (or this.showActionButton this.showActionDropdown)}}
        <PH.Actions>
          {{#if this.showActionButton}}
            <HdsButton
              @text="Create"
              @icon="plus"
              @iconPosition="leading"
              @color="primary"
            />
          {{/if}}
          {{#if this.showActionDropdown}}
            <HdsDropdown as |D|>
              <D.ToggleButton @text="Manage" @color="secondary" />
              <D.Interactive>Manage cluster externally</D.Interactive>
              <D.Interactive>Launch desktop</D.Interactive>
              <D.Interactive
                @color="critical"
                @icon="trash"
              >Delete</D.Interactive>
            </HdsDropdown>
          {{/if}}
        </PH.Actions>
      {{/if}}
    </HdsPageHeader>
  </template>
}
