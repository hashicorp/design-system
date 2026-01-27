import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsBreadcrumb,
  HdsBreadcrumbItem,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsBreadcrumb @itemsCanWrap={{false}}>
    <HdsBreadcrumbItem @text="My org" @icon="org" />
    <HdsBreadcrumbItem @text="Consul" @icon="consul" />
    <HdsBreadcrumbItem @text="my-consul-cluster" />
    <HdsBreadcrumbItem @text="Overview" @current={{true}} />
  </HdsBreadcrumb>
</template>;

export default LocalComponent;
