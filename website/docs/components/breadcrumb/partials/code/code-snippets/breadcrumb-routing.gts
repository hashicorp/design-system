import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsBreadcrumb,
  HdsBreadcrumbItem,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsBreadcrumb>
    <HdsBreadcrumbItem @text="My org" @icon="org" @route="components" />
    <HdsBreadcrumbItem @text="Consul" @icon="consul" @route="components" />
    <HdsBreadcrumbItem
      @text="my-consul-cluster"
      @route="components"
      @model="my-model"
    />
    <HdsBreadcrumbItem @text="Overview" @current={{true}} />
  </HdsBreadcrumb>
</template>;

export default LocalComponent;
