/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';

import {
  HdsPageHeader,
  HdsBadge,
  HdsBreadcrumb,
  HdsBreadcrumbItem,
  HdsAlert,
  HdsButton,
  HdsBadgeCount,
  HdsDropdown,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const SubSectionComplex: TemplateOnlyComponent = <template>
  <ShwTextH2>Complex examples</ShwTextH2>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="Product landing page">
      <HdsPageHeader as |PH|>
        <PH.Title>HCP Packer</PH.Title>
        <PH.Breadcrumb>
          <HdsBreadcrumb aria-label="breadcrumbs with complex examples">
            <HdsBreadcrumbItem @text="Sandbox" @icon="org" />
            <HdsBreadcrumbItem @text="HCP Packer" @icon="packer" />
            <HdsBreadcrumbItem @text="jane-doe" @icon="file-text" />
          </HdsBreadcrumb>
        </PH.Breadcrumb>
        <PH.IconTile @icon="packer-color" @color="packer" />
        <PH.Description>Create and view Packer registries in HCP.
        </PH.Description>
        <PH.Actions>
          <HdsButton
            @text="Create Packer registery"
            @icon="plus"
            @iconPosition="leading"
          />
        </PH.Actions>
      </HdsPageHeader>
      <ShwDivider @level={{2}} />
    </SF.Item>

    <SF.Item @label="Item page">
      <HdsPageHeader as |PH|>
        <PH.Title>Boundary clusters</PH.Title>
        <PH.IconTile @icon="boundary-color" @color="boundary" />
        <PH.Breadcrumb>
          <HdsBreadcrumb aria-label="breadcrumb example with item page">
            <HdsBreadcrumbItem @text="Cloud sandbox" @icon="org" />
            <HdsBreadcrumbItem @text="Boundary clusters" @icon="boundary" />
          </HdsBreadcrumb>
        </PH.Breadcrumb>
        <PH.Badges>
          <HdsBadge @text="Active" @icon="check" @color="success" />
        </PH.Badges>
        <PH.Subtitle>boundary-cluster-name</PH.Subtitle>
      </HdsPageHeader>
      <ShwDivider @level={{2}} />
    </SF.Item>

    <SF.Item @label="Multiple badges">
      <HdsPageHeader as |PH|>
        <PH.Title>Consul cluster</PH.Title>
        <PH.Badges>
          <HdsBadge @text="Active" @icon="check" @color="success" />
          <HdsBadge
            @text="Deployed to AWS west-2"
            @color="highlight"
            @icon="rocket"
          />
          <HdsBadgeCount @text="v1.5" @color="neutral" />
          <HdsBadge @text="Locked by jane-doe" @color="warning" @icon="lock" />
        </PH.Badges>
        <PH.Description>
          While this is supported by the contextual component, this many badges
          being used to represent metadata can be problematic.
        </PH.Description>
      </HdsPageHeader>
      <ShwDivider @level={{2}} />
    </SF.Item>

    <SF.Item @label="Kitchen sink example">
      <HdsPageHeader as |PH|>
        <PH.Title>Users</PH.Title>
        <PH.Subtitle>Access control (IAM)</PH.Subtitle>
        <PH.Description>Manage organization users, roles, and access control.
        </PH.Description>
        <PH.Description>This is a second description, in case multiple
          paragraphs are needed.</PH.Description>
        <PH.Breadcrumb>
          <HdsBreadcrumb>
            <HdsBreadcrumbItem @text="Cloud sandbox" @icon="org" />
            <HdsBreadcrumbItem @text="jane-doe" @icon="file-text" />
            <HdsBreadcrumbItem @text="Access control (IAM)" @icon="users" />
          </HdsBreadcrumb>
        </PH.Breadcrumb>
        <PH.IconTile @icon="users" @color="terraform" />
        <PH.Actions>
          <HdsDropdown as |D|>
            <D.ToggleButton @text="Manage users" @color="secondary" />
            <D.Interactive @icon="user">Assign roles</D.Interactive>
            <D.Interactive @icon="edit">Batch edit</D.Interactive>
            <D.Interactive @icon="trash">Delete user</D.Interactive>
          </HdsDropdown>
          <HdsButton @text="Add user" @icon="plus" @iconPosition="leading" />
        </PH.Actions>
      </HdsPageHeader>
      <ShwDivider @level={{2}} />
    </SF.Item>

    <SF.Item @label="With custom metadata">
      <HdsPageHeader as |PH|>
        <PH.Title>Custom metadata</PH.Title>
        <PH.Subtitle>beta-feature-cluster</PH.Subtitle>
        <PH.Generic>
          <HdsAlert @type="compact" @color="warning" as |A|>
            <A.Title>Beta feature</A.Title>
            <A.Description>
              This feature is in beta and is subject to change. Refer to the
              <HdsLinkInline @href="#" @icon="external-link">HCP documentation</HdsLinkInline>
              for more information and roadmap.
            </A.Description>
          </HdsAlert>
        </PH.Generic>
        <PH.Actions>
          <HdsButton
            @text="Get started"
            @icon="beaker"
            @iconPosition="leading"
          />
        </PH.Actions>
        <PH.Badges>
          <HdsBadge @text="Beta feature" @icon="wand" @color="highlight" />
        </PH.Badges>
      </HdsPageHeader>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />
</template>;
export default SubSectionComplex;
