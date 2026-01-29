import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsLayoutFlex } from '@hashicorp/design-system-components/components';

import DocPlaceholder from 'website/components/doc/placeholder';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex
    @direction="column"
    @tag="ul"
    class="doc-flex-demo-plain-list"
    as |LF|
  >
    <LF.Item @tag="li">
      <DocPlaceholder @height="40px" @background="#e5ffd2">
        Some content
      </DocPlaceholder>
    </LF.Item>
    <LF.Item @tag="li">
      <DocPlaceholder @height="40px" @background="#e4c5f3">
        Other content
      </DocPlaceholder>
    </LF.Item>
    <LF.Item @tag="li">
      <DocPlaceholder @height="40px" @background="#d2f4ff">
        More content
      </DocPlaceholder>
    </LF.Item>
    <LF.Item @tag="li">
      <DocPlaceholder @height="40px" @background="#fff8d2">
        Extra content
      </DocPlaceholder>
    </LF.Item>
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
