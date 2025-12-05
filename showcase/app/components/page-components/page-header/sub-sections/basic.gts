/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import {
  HdsPageHeader,
  HdsBadge,
  HdsBreadcrumb,
  HdsBreadcrumbItem,
  HdsButton,
  HdsDropdown,
} from '@hashicorp/design-system-components/components';

const SubSectionBasic: TemplateOnlyComponent = <template>
  <ShwTextH2>Basic examples</ShwTextH2>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="Only title">
      <HdsPageHeader as |PH|>
        <PH.Title>Page title</PH.Title>
      </HdsPageHeader>
      <ShwDivider @level={{2}} />
    </SF.Item>

    <SF.Item @label="Badge">
      <HdsPageHeader as |PH|>
        <PH.Title>Page title</PH.Title>
        <PH.Badges>
          <HdsBadge @text="Badge" @icon="beaker" @color="highlight" />
        </PH.Badges>
      </HdsPageHeader>
      <ShwDivider @level={{2}} />
    </SF.Item>

    <SF.Item @label="IconTile">
      <HdsPageHeader as |PH|>
        <PH.Title>Page title</PH.Title>
        <PH.IconTile @icon="server-cluster" />
      </HdsPageHeader>
      <ShwDivider @level={{2}} />
    </SF.Item>

    <SF.Item @label="Breadcrumb">
      <HdsPageHeader as |PH|>
        <PH.Title>Page title</PH.Title>
        <PH.Breadcrumb>
          <HdsBreadcrumb aria-label="breadcrumbs with page title example">
            <HdsBreadcrumbItem @text="Organization" @icon="org" />
            <HdsBreadcrumbItem @text="Project" @icon="folder" />
            <HdsBreadcrumbItem @text="User" @icon="user" />
          </HdsBreadcrumb>
        </PH.Breadcrumb>
      </HdsPageHeader>
      <ShwDivider @level={{2}} />
    </SF.Item>

    <SF.Item @label="Subtitle + description">
      <HdsPageHeader as |PH|>
        <PH.Title>Page title</PH.Title>
        <PH.Subtitle>Subtitle lorem ipsum</PH.Subtitle>
        <PH.Description>Description lorem ipsum dolor sit amet.</PH.Description>
      </HdsPageHeader>
      <ShwDivider @level={{2}} />
    </SF.Item>

    <SF.Item @label="Single action">
      <HdsPageHeader as |PH|>
        <PH.Title>Page title</PH.Title>
        <PH.Actions>
          <HdsButton
            @text="Create registry"
            @icon="plus"
            @iconPosition="leading"
            @color="primary"
          />
        </PH.Actions>
      </HdsPageHeader>
      <ShwDivider @level={{2}} />
    </SF.Item>

    <SF.Item @label="Two actions">
      <HdsPageHeader as |PH|>
        <PH.Title>Page title</PH.Title>
        <PH.Actions>
          <HdsDropdown as |D|>
            <D.ToggleButton @text="Manage" @color="secondary" />
            <D.Interactive>Manage cluster externally</D.Interactive>
            <D.Interactive>Launch desktop</D.Interactive>
            <D.Interactive
              @color="critical"
              @icon="trash"
            >Delete</D.Interactive>
          </HdsDropdown>
          <HdsButton
            @text="Create"
            @icon="plus"
            @iconPosition="leading"
            @color="primary"
          />
        </PH.Actions>
      </HdsPageHeader>
      <ShwDivider @level={{2}} />
    </SF.Item>

    <SF.Item @label="Three actions">
      <HdsPageHeader as |PH|>
        <PH.Title>Page title</PH.Title>
        <PH.Actions>
          <HdsButton
            @color="tertiary"
            @text="Migrate instructions"
            @icon="migrate"
            @iconPosition="leading"
          />
          <HdsButton @color="secondary" @text="Edit cluster" />
          <HdsButton
            @color="primary"
            @text="Create cluster"
            @icon="plus"
            @iconPosition="leading"
          />
        </PH.Actions>
      </HdsPageHeader>
      <ShwDivider @level={{2}} />
    </SF.Item>

    <SF.Item @label="Custom metadata">
      <HdsPageHeader as |PH|>
        <PH.Title>Page title</PH.Title>
        <PH.Generic>
          <ShwPlaceholder
            @text="generic content"
            @width="500"
            @height="36"
            @background="#e1f5fe"
          />
        </PH.Generic>
      </HdsPageHeader>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionBasic;
