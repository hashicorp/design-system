/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextBody from 'showcase/components/shw/text/body';
// import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import {
  HdsPageHeader,
  HdsBreadcrumb,
  HdsBreadcrumbItem,
  HdsDropdown,
  HdsButton,
  HdsBadge,
  HdsBadgeCount,
} from '@hashicorp/design-system-components/components';

const PageHeaderCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "PageHeader - Carbonization"}}

  <ShwTextH1>PageHeader - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>Content</ShwTextH2>
    <ShwTextBody>
      Note: Carbon does not appear to have a PageHeader web component, however,
      a PageHeader pattern could be implemented using the components they
      provide such as the breadcrumb component and others. (There is actually a
      React PageHeader component.)
    </ShwTextBody>

    <ShwCarbonizationComparisonGrid
      @label="With similar child components to recommended Carbon ones"
      @layout="column"
    >
      <:theming>
        <HdsPageHeader as |PH|>
          <PH.Breadcrumb>
            <HdsBreadcrumb>
              <HdsBreadcrumbItem @text="Level one" />
              <HdsBreadcrumbItem @text="Level two" />
              <HdsBreadcrumbItem @text="Level three" />
              <HdsBreadcrumbItem @text="Current" @current={{true}} />
            </HdsBreadcrumb>
          </PH.Breadcrumb>
          <PH.Title>PageHeader Title</PH.Title>
          <PH.Badges>
            <HdsBadge @text="Active" @icon="check" @color="success" />
            <HdsBadgeCount @text="v1.5" @color="neutral" />
          </PH.Badges>
          <PH.Subtitle>Subtitle for the PageHeader component</PH.Subtitle>
          <PH.Description>
            This is a description for the PageHeader. Donec ac semper odio.
            Donec vehicula, nisl eget consectetur sagittis, nisl nunc
            consectetur nisi, eu consectetur nisl nunc eu nisl. Donec ac semper
            odio.
          </PH.Description>
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
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>
  </section>
</template>;

export default PageHeaderCarbonizationIndex;
