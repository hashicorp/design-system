import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsLayoutFlex } from '@hashicorp/design-system-components/components';

import DocPlaceholder from 'website/components/doc/placeholder';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex @direction="column" class="doc-flex-outlined-container">
    <DocPlaceholder @height="50px" @background="#e5ffd2">
      Top content
    </DocPlaceholder>
    <HdsLayoutFlex @direction="row" as |LF|>
      <DocPlaceholder @width="150px" @height="auto" @background="#e4c5f3">
        Side content
      </DocPlaceholder>
      <LF.Item @grow={{true}}>
        <DocPlaceholder @width="auto" @height="250px" @background="#d2f4ff">
          Main content
        </DocPlaceholder>
      </LF.Item>
    </HdsLayoutFlex>
    <DocPlaceholder @height="50px" @background="#fff8d2">
      Bottom content
    </DocPlaceholder>
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
