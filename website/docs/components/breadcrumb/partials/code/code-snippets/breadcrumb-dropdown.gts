import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsBreadcrumb,
  HdsBreadcrumbItem,
  HdsBreadcrumbTruncation,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsBreadcrumb>
    <HdsBreadcrumbItem @text="My org" @icon="org" @route="components" />
    <HdsBreadcrumbTruncation>
      <HdsBreadcrumbItem @text="Consul" @icon="consul" @route="components" />
      <HdsBreadcrumbItem @text="my-consul-cluster" @route="components" />
      <HdsBreadcrumbItem @text="Cluster details" @route="components" />
    </HdsBreadcrumbTruncation>
    <HdsBreadcrumbItem @text="Cluster sub-details" @current={{true}} />
  </HdsBreadcrumb>
</template>;

export default LocalComponent;
