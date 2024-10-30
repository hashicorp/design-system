/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

// HDS components
import {
  HdsBadge,
  HdsButton,
  HdsLinkInline,
  HdsBreadcrumb,
  HdsBreadcrumbItem,
  HdsPageHeader,
} from '@hashicorp/design-system-components/components';

// types
import type { HdsPageHeaderSignature } from '@hashicorp/design-system-components/components/hds/page-header/index';

export interface MockAppMainPageHeaderSignature {
  Element: HdsPageHeaderSignature['Element'];
}

const MockAppMainPageHeader: TemplateOnlyComponent<MockAppMainPageHeaderSignature> =
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
      <PH.Actions>
        <HdsButton
          @text="Create"
          @icon="plus"
          @iconPosition="leading"
          @color="primary"
        />
      </PH.Actions>
    </HdsPageHeader>
  </template>;
export default MockAppMainPageHeader;
