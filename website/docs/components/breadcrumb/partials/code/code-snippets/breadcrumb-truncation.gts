import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsBreadcrumb,
  HdsBreadcrumbItem,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsBreadcrumb @itemsCanWrap={{false}}>
    <HdsBreadcrumbItem @text="Level one with a very long string" @icon="org" />
    <HdsBreadcrumbItem
      @text="Level two with a very long string"
      @icon="folder"
    />
    <HdsBreadcrumbItem @text="Level three with a very long string" />
    <HdsBreadcrumbItem @text="Level four with a very long string" />
    <HdsBreadcrumbItem @text="Level five with a very long string" />
    <HdsBreadcrumbItem
      @text="Current with a very long string"
      @current={{true}}
    />
  </HdsBreadcrumb>
</template>;

export default LocalComponent;
