import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsPageHeader,
  HdsBreadcrumb,
  HdsBreadcrumbItem,
  HdsBadge,
  HdsButton,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsPageHeader as |PH|>
    <PH.Title>Page title</PH.Title>
    <PH.Breadcrumb>
      <HdsBreadcrumb>
        <HdsBreadcrumbItem @text="Organization" @icon="dashboard" />
        <HdsBreadcrumbItem @text="Project" @icon="file-text" />
        <HdsBreadcrumbItem @text="Clusters" @icon="server-cluster" />
      </HdsBreadcrumb>
    </PH.Breadcrumb>
    <PH.IconTile @icon="server-cluster" @color="consul" />
    <PH.Badges>
      <HdsBadge @text="Status badge" @icon="award" @color="highlight" />
    </PH.Badges>
    <PH.Subtitle>Page subtitle</PH.Subtitle>
    <PH.Description>Description of the page</PH.Description>
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

export default LocalComponent;
