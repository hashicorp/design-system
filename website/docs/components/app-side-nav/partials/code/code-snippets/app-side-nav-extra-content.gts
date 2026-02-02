import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsAppSideNav,
  HdsAppSideNavList,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsAppSideNav>
    <HdsAppSideNavList as |SNL|>
      <SNL.ExtraBefore
      >{{! content that is rendered before the list items }}</SNL.ExtraBefore>
      {{! ... list items ... }}
      <SNL.ExtraAfter
      >{{! content that is rendered after the list items }}</SNL.ExtraAfter>
    </HdsAppSideNavList>
  </HdsAppSideNav>
</template>;

export default LocalComponent;
