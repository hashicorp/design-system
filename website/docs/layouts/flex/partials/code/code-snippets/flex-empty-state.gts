import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsLayoutFlex,
  HdsApplicationState,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex
    @justify="center"
    @align="center"
    class="doc-flex-fixed-height-container doc-flex-outlined-container"
  >
    <HdsApplicationState as |A|>
      <A.Header @title="Empty state title text" @icon="alert-circle" />
      <A.Body @text="The item you were looking for was not found." />
    </HdsApplicationState>
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
